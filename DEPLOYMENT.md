# AlgoGuild - Production Deployment Guide

## 🚀 AWS Deployment Strategy

### Architecture Overview
```
Internet → ALB → ECS Fargate (Backend + Executor) → MongoDB Atlas
                ↓
              S3 + CloudFront (Frontend)
```

### Option 1: AWS ECS Fargate (Recommended for Production)

#### Prerequisites
- AWS Account
- AWS CLI configured
- Docker installed
- MongoDB Atlas account (or AWS DocumentDB)

#### Step 1: Setup MongoDB Atlas
1. Create MongoDB Atlas cluster (Free tier available)
2. Whitelist AWS IP ranges
3. Get connection string
4. Update backend .env with connection string

#### Step 2: Push Docker Images to ECR
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Create repositories
aws ecr create-repository --repository-name algoguild-backend
aws ecr create-repository --repository-name algoguild-executor

# Build and push backend
cd server
docker build -t algoguild-backend .
docker tag algoguild-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/algoguild-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/algoguild-backend:latest

# Build and push executor
cd ../executor
docker build -t algoguild-executor .
docker tag algoguild-executor:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/algoguild-executor:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/algoguild-executor:latest
```

#### Step 3: Create ECS Cluster
```bash
aws ecs create-cluster --cluster-name algoguild-cluster --region us-east-1
```

#### Step 4: Create Task Definitions
Create `backend-task-definition.json`:
```json
{
  "family": "algoguild-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/algoguild-backend:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "MONGO_URI",
          "value": "your-mongodb-atlas-connection-string"
        },
        {
          "name": "JWT_SECRET",
          "value": "your-production-jwt-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/algoguild-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

Register task definition:
```bash
aws ecs register-task-definition --cli-input-json file://backend-task-definition.json
```

#### Step 5: Create ECS Service with ALB
```bash
# Create Application Load Balancer
aws elbv2 create-load-balancer \
  --name algoguild-alb \
  --subnets subnet-xxx subnet-yyy \
  --security-groups sg-xxx

# Create target group
aws elbv2 create-target-group \
  --name algoguild-backend-tg \
  --protocol HTTP \
  --port 5000 \
  --vpc-id vpc-xxx \
  --target-type ip

# Create ECS service
aws ecs create-service \
  --cluster algoguild-cluster \
  --service-name algoguild-backend-service \
  --task-definition algoguild-backend \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:...,containerName=backend,containerPort=5000"
```

#### Step 6: Deploy Frontend to S3 + CloudFront
```bash
# Build frontend
cd client
npm run build

# Create S3 bucket
aws s3 mb s3://algoguild-frontend

# Enable static website hosting
aws s3 website s3://algoguild-frontend --index-document index.html

# Upload build files
aws s3 sync dist/ s3://algoguild-frontend --acl public-read

# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name algoguild-frontend.s3.amazonaws.com \
  --default-root-object index.html
```

### Option 2: AWS Elastic Beanstalk (Simpler Setup)

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB application
cd server
eb init -p node.js algoguild-backend

# Create environment
eb create algoguild-backend-env

# Deploy
eb deploy
```

### Option 3: AWS EC2 (Manual Setup)

1. Launch EC2 instance (t3.medium recommended)
2. Install Docker and Docker Compose
3. Clone repository
4. Run `docker-compose up -d`
5. Configure security groups (ports 80, 443, 5000)
6. Setup Nginx reverse proxy
7. Configure SSL with Let's Encrypt

---

## 🔄 CI/CD Pipeline with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build and push backend
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: algoguild-backend
          IMAGE_TAG: ${{ github.sha }}
        run: |
          cd server
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      
      - name: Update ECS service
        run: |
          aws ecs update-service \
            --cluster algoguild-cluster \
            --service algoguild-backend-service \
            --force-new-deployment

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install and build
        run: |
          cd client
          npm install
          npm run build
      
      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          AWS_S3_BUCKET: algoguild-frontend
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
          SOURCE_DIR: 'client/dist'
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

---

## 🔒 Security Best Practices

1. **Environment Variables**: Use AWS Secrets Manager or Parameter Store
2. **Database**: Use MongoDB Atlas with IP whitelisting
3. **API Gateway**: Add rate limiting with AWS API Gateway
4. **SSL/TLS**: Use AWS Certificate Manager for free SSL
5. **WAF**: Enable AWS WAF for DDoS protection
6. **Monitoring**: Setup CloudWatch alarms
7. **Backup**: Enable automated MongoDB backups

---

## 📊 Monitoring & Logging

### CloudWatch Setup
```bash
# Create log groups
aws logs create-log-group --log-group-name /ecs/algoguild-backend
aws logs create-log-group --log-group-name /ecs/algoguild-executor

# Create alarms
aws cloudwatch put-metric-alarm \
  --alarm-name algoguild-high-cpu \
  --alarm-description "Alert when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ECS \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold
```

---

## 💰 Cost Estimation

### Monthly AWS Costs (Approximate)
- **ECS Fargate (2 tasks)**: $30-50
- **Application Load Balancer**: $20
- **MongoDB Atlas (M10)**: $57
- **S3 + CloudFront**: $5-10
- **ECR Storage**: $1-5
- **Total**: ~$115-145/month

### Cost Optimization
- Use AWS Free Tier where possible
- Enable auto-scaling based on traffic
- Use Reserved Instances for predictable workloads
- Implement caching with Redis/ElastiCache

---

## 🚦 Health Checks

Add to backend `app.js`:
```javascript
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});
```

Configure ALB health check:
- Path: `/api/health`
- Interval: 30 seconds
- Timeout: 5 seconds
- Healthy threshold: 2
- Unhealthy threshold: 3

---

## 📈 Scaling Strategy

### Horizontal Scaling
```bash
# Update ECS service desired count
aws ecs update-service \
  --cluster algoguild-cluster \
  --service algoguild-backend-service \
  --desired-count 4
```

### Auto Scaling
```bash
# Register scalable target
aws application-autoscaling register-scalable-target \
  --service-namespace ecs \
  --scalable-dimension ecs:service:DesiredCount \
  --resource-id service/algoguild-cluster/algoguild-backend-service \
  --min-capacity 2 \
  --max-capacity 10

# Create scaling policy
aws application-autoscaling put-scaling-policy \
  --service-namespace ecs \
  --scalable-dimension ecs:service:DesiredCount \
  --resource-id service/algoguild-cluster/algoguild-backend-service \
  --policy-name cpu-scaling-policy \
  --policy-type TargetTrackingScaling \
  --target-tracking-scaling-policy-configuration file://scaling-policy.json
```

---

## 🔧 Troubleshooting

### Common Issues
1. **ECS tasks failing**: Check CloudWatch logs
2. **Database connection**: Verify security groups and connection string
3. **Frontend not loading**: Check S3 bucket policy and CloudFront distribution
4. **High latency**: Enable CloudFront caching, add Redis

### Useful Commands
```bash
# View ECS service logs
aws logs tail /ecs/algoguild-backend --follow

# Check service status
aws ecs describe-services --cluster algoguild-cluster --services algoguild-backend-service

# View task details
aws ecs describe-tasks --cluster algoguild-cluster --tasks <task-id>
```
