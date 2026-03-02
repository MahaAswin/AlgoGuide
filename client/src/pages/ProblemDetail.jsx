import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ExecutorAPI from "../services/executor";
import { AuthContext } from "../context/AuthContext";

const ProblemDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [submissions, setSubmissions] = useState([]);
  const [runStatus, setRunStatus] = useState("");
  const [runOutput, setRunOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [shownHints, setShownHints] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [showCelebrate, setShowCelebrate] = useState(false);

  useEffect(() => {
    fetchProblem();
    if (user?.role === "student") fetchSubmissions();
  }, [id]);

  useEffect(() => {
    if (problem && problem.starterCode) {
      setCode(problem.starterCode[language] || "");
    }
  }, [language, problem]);

  const fetchProblem = async () => {
    try {
      const { data } = await API.get(`/problems/${id}`);
      setProblem(data);
      setCode(data.starterCode?.[language] || "");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const { data } = await API.get("/submissions/my");
      setSubmissions(data.filter(s => s.problem._id === id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRun = async () => {
    setRunStatus("");
    setRunOutput("");
    if (!code.trim()) {
      setRunOutput("Please write some code first.");
      return;
    }

    setIsRunning(true);
    try {
      const execResponse = await ExecutorAPI.post("/execute", {
        code,
        language,
        testCases: problem.testCases || [],
        customInput,
      });
      setRunStatus(execResponse.data.status || "");
      setRunOutput(execResponse.data.output || "");
    } catch (error) {
      setRunStatus("error");
      setRunOutput(
        error.response?.data?.error ||
          error.message ||
          "Failed to run code. Make sure the executor service is running on port 3001."
      );
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setMessage("");
    try {
      const { data } = await API.post("/submissions", {
        problemId: id,
        code,
        language,
      });
      setMessage("✓ Submission saved! Status: " + data.status);
      fetchSubmissions();
      setShowCelebrate(true);
      setTimeout(() => setShowCelebrate(false), 2200);
    } catch (error) {
      setMessage("✗ " + (error.response?.data?.message || "Submission failed"));
    }
  };

  if (!problem) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      {showCelebrate && (
        <div style={styles.celebrateOverlay}>
          <div style={styles.celebrateCard}>
            <div style={styles.celebrateBadge}>Submission stored</div>
            <p style={styles.celebrateTitle}>Nice work on this attempt.</p>
            <p style={styles.celebrateBody}>
              Review the test cases and hints, then see if you can optimize or try a harder
              variant next.
            </p>
          </div>
        </div>
      )}
      <div style={styles.leftPanel}>
        <div style={styles.tabs}>
          <button
            style={activeTab === "description" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          {user?.role === "student" && (
            <button
              style={activeTab === "submissions" ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab("submissions")}
            >
              Submissions
            </button>
          )}
        </div>

        {activeTab === "description" && (
          <div style={styles.content}>
            <div style={styles.problemHeader}>
              <div>
                <h1 style={styles.title}>{problem.title}</h1>
                <div style={styles.meta}>
                  <span style={getDifficultyStyle(problem.difficulty)}>
                    {problem.difficulty}
                  </span>
                  <span style={styles.topic}>{problem.topic}</span>
                  {problem.acceptanceRate > 0 && (
                    <span style={styles.acceptance}>
                      {problem.acceptanceRate.toFixed(1)}% acceptance
                    </span>
                  )}
                </div>
              </div>

              {problem.companies && problem.companies.length > 0 && (
                <div style={styles.companyPillRow}>
                  {problem.companies.slice(0, 3).map((company, idx) => (
                    <span key={idx} style={styles.companyTag}>
                      {company}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Problem</h2>
              <p style={styles.descriptionText}>{problem.description}</p>
            </section>

            {problem.intuition && (
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Intuition</h2>
                <p style={styles.descriptionText}>{problem.intuition}</p>
              </section>
            )}

            {problem.hints && problem.hints.length > 0 && (
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Hints</h2>
                <ul style={styles.hintsList}>
                  {problem.hints.slice(0, shownHints).map((hint, idx) => (
                    <li key={idx} style={styles.hintItem}>
                      {hint}
                    </li>
                  ))}
                </ul>
                {shownHints < problem.hints.length && (
                  <button
                    type="button"
                    style={styles.showHintBtn}
                    onClick={() => setShownHints((h) => h + 1)}
                  >
                    {shownHints === 0 ? "Show first hint" : "Show next hint"}
                  </button>
                )}
              </section>
            )}

            {problem.examples && problem.examples.length > 0 && (
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Examples</h2>
                <div style={styles.examples}>
                  {problem.examples.map((example, idx) => (
                    <div key={idx} style={styles.example}>
                      <p style={styles.exampleHeading}>Example {idx + 1}</p>
                      <div style={styles.ioBlock}>
                        <p style={styles.ioLabel}>Input:</p>
                        <pre style={styles.ioPre}>{example.input}</pre>
                      </div>
                      <div style={styles.ioBlock}>
                        <p style={styles.ioLabel}>Output:</p>
                        <pre style={styles.ioPre}>{example.output}</pre>
                      </div>
                      {example.explanation && (
                        <p style={styles.exampleExplanation}>
                          Explanation: {example.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {problem.constraints && (
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Constraints</h2>
                <pre style={styles.constraintsPre}>{problem.constraints}</pre>
              </section>
            )}

            {problem.videos && problem.videos.length > 0 && (
              <section style={styles.section}>
                <h2 style={styles.sectionTitle}>Recommended videos</h2>
                <div style={styles.videosGrid}>
                  {problem.videos.slice(0, 3).map((v) => (
                    <a
                      key={v.url}
                      href={v.url}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.videoCard}
                    >
                      <div style={styles.videoThumbnail} />
                      <div style={styles.videoText}>
                        <span style={styles.videoTitle}>{v.title}</span>
                        <span style={styles.videoMeta}>External • YouTube</span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === "submissions" && (
          <div style={styles.content}>
            <h2>Your Submissions</h2>
            {submissions.length === 0 ? (
              <p>No submissions yet</p>
            ) : (
              <div style={styles.submissionsList}>
                {submissions.map((sub) => (
                  <div key={sub._id} style={styles.submissionCard}>
                    <div>
                      <span style={getStatusStyle(sub.status)}>{sub.status}</span>
                      <span style={styles.submissionMeta}>
                        {sub.language} • {new Date(sub.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {user?.role === "student" && (
        <div style={styles.rightPanel}>
          <div style={styles.editorHeader}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.langSelect}
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div style={styles.editorLayout}>
            <div style={styles.editorMain}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={styles.editor}
                spellCheck="false"
              />

              <div style={styles.customInputPanel}>
                <div style={styles.customInputHeader}>
                  <span style={styles.customInputTitle}>Custom input (optional)</span>
                  <span style={styles.customInputHint}>
                    Sent to the executor as additional input payload.
                  </span>
                </div>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  style={styles.customInputTextarea}
                  placeholder="You can write custom test input or notes here."
                />
              </div>

              <div style={styles.resultPanel}>
                <div style={styles.resultHeader}>
                  <span style={styles.resultTitle}>Test Result</span>
                  {isRunning && <span style={styles.resultStatusRunning}>Running…</span>}
                  {!isRunning && runStatus && (
                    <span
                      style={
                        runStatus === "success"
                          ? styles.resultStatusSuccess
                          : styles.resultStatusError
                      }
                    >
                      {runStatus === "success" ? "Passed" : "Error"}
                    </span>
                  )}
                </div>
                <pre style={styles.resultOutput}>
{runOutput ? runOutput : "Run your code to see output here."}
                </pre>
              </div>

              {message && (
                <div style={message.includes("✓") ? styles.success : styles.error}>
                  {message}
                </div>
              )}

              <div style={styles.actions}>
                <button onClick={handleRun} style={styles.runBtn}>
                  Run
                </button>
                <button onClick={handleSubmit} style={styles.submitBtn}>
                  Submit
                </button>
              </div>
            </div>

            {problem.testCases && problem.testCases.length > 0 && (
              <aside style={styles.editorSidebar}>
                <div style={styles.samplesPanel}>
                  <div style={styles.samplesHeader}>
                    <span style={styles.samplesTitle}>Sample Tests</span>
                  </div>
                  <div style={styles.samplesList}>
                    {problem.testCases
                      .filter((tc) => !tc.isHidden)
                      .slice(0, 3)
                      .map((tc, idx) => (
                        <div key={idx} style={styles.sampleItem}>
                          <div style={styles.sampleLabel}>Sample {idx + 1}</div>
                          <div style={styles.sampleField}>
                            <span style={styles.sampleFieldLabel}>Input</span>
                            <pre style={styles.samplePre}>{tc.input}</pre>
                          </div>
                          <div style={styles.sampleField}>
                            <span style={styles.sampleFieldLabel}>Expected</span>
                            <pre style={styles.samplePre}>{tc.output}</pre>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const getDifficultyStyle = (difficulty) => ({
  ...styles.badge,
  color: "#fff",
  background: difficulty === "easy" ? "#00b8a3" : difficulty === "medium" ? "#ffc01e" : "#ef4743",
});

const getStatusStyle = (status) => ({
  ...styles.statusBadge,
  background: status === "accepted" ? "#00b8a3" : "#ef4743",
});

const styles = {
  container: {
    display: "flex",
    height: "calc(100vh - 100px)",
    gap: "1rem",
    maxWidth: "1800px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  leftPanel: {
    flex: 1,
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  rightPanel: {
    flex: 1,
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  editorLayout: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  editorMain: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  editorSidebar: {
    flex: 2,
    borderLeft: "1px solid #e5e7eb",
    background: "#f9fafb",
    padding: "0.5rem 0.75rem",
    overflowY: "auto",
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid #e0e0e0",
  },
  tab: {
    padding: "1rem 1.5rem",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "0.95rem",
    color: "#666",
  },
  activeTab: {
    padding: "1rem 1.5rem",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "0.95rem",
    color: "#2c3e50",
    borderBottom: "2px solid #3498db",
    fontWeight: "600",
  },
  content: {
    padding: "1.5rem",
    overflow: "auto",
    flex: 1,
  },
  problemHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1.5rem",
    marginBottom: "1.25rem",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "0.4rem",
  },
  meta: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "1rem",
  },
  badge: {
    padding: "0.25rem 0.75rem",
    borderRadius: "12px",
    fontSize: "0.85rem",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  topic: {
    color: "#666",
    fontSize: "0.9rem",
  },
  acceptance: {
    fontSize: "0.85rem",
    color: "#4b5563",
  },
  companyPillRow: {
    display: "flex",
    gap: "0.4rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  companies: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  companyTag: {
    background: "#f0f0f0",
    padding: "0.25rem 0.75rem",
    borderRadius: "4px",
    fontSize: "0.8rem",
    color: "#666",
  },
  section: {
    marginBottom: "1.4rem",
  },
  sectionTitle: {
    fontSize: "0.9rem",
    fontWeight: 600,
    marginBottom: "0.4rem",
    color: "#111827",
  },
  descriptionText: {
    lineHeight: 1.7,
    fontSize: "0.92rem",
    color: "#374151",
  },
  examples: {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },
  example: {
    background: "#f7f7f7",
    padding: "1rem",
    borderRadius: "6px",
  },
  exampleHeading: {
    fontWeight: 600,
    marginBottom: "0.4rem",
    fontSize: "0.9rem",
  },
  ioBlock: {
    marginBottom: "0.3rem",
  },
  ioLabel: {
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "#111827",
  },
  ioPre: {
    background: "#111827",
    color: "#e5e7eb",
    padding: "0.45rem 0.6rem",
    borderRadius: "4px",
    marginTop: "0.15rem",
    fontSize: "0.85rem",
    overflow: "auto",
  },
  exampleExplanation: {
    marginTop: "0.5rem",
    fontSize: "0.85rem",
    color: "#4b5563",
  },
  constraintsPre: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "0.7rem 0.8rem",
    fontSize: "0.86rem",
    whiteSpace: "pre-wrap",
  },
  editorHeader: {
    padding: "1rem",
    borderBottom: "1px solid #e0e0e0",
  },
  langSelect: {
    padding: "0.5rem 1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "0.9rem",
  },
  editor: {
    flex: 1,
    padding: "1rem",
    border: "none",
    fontFamily: "monospace",
    fontSize: "0.95rem",
    resize: "none",
    outline: "none",
  },
  resultPanel: {
    borderTop: "1px solid #e5e7eb",
    padding: "0.75rem 1rem 0.75rem",
    background: "#f9fafb",
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.4rem",
  },
  resultTitle: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#111827",
  },
  resultStatusRunning: {
    fontSize: "0.78rem",
    color: "#2563eb",
  },
  resultStatusSuccess: {
    fontSize: "0.78rem",
    color: "#16a34a",
  },
  resultStatusError: {
    fontSize: "0.78rem",
    color: "#dc2626",
  },
  resultOutput: {
    background: "#111827",
    color: "#e5e7eb",
    borderRadius: "4px",
    padding: "0.6rem 0.7rem",
    fontSize: "0.85rem",
    maxHeight: "8rem",
    overflow: "auto",
  },
  actions: {
    padding: "1rem",
    borderTop: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
  },
  runBtn: {
    background: "#111827",
    color: "#f9fafb",
    border: "none",
    padding: "0.65rem 1.4rem",
    borderRadius: "4px",
    fontSize: "0.9rem",
    cursor: "pointer",
    fontWeight: "500",
  },
  submitBtn: {
    background: "#00b8a3",
    color: "#fff",
    border: "none",
    padding: "0.75rem 2rem",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "600",
  },
  success: {
    background: "#d4edda",
    color: "#155724",
    padding: "0.75rem",
    margin: "0 1rem",
    borderRadius: "4px",
  },
  error: {
    background: "#f8d7da",
    color: "#721c24",
    padding: "0.75rem",
    margin: "0 1rem",
    borderRadius: "4px",
  },
  loading: {
    textAlign: "center",
    padding: "3rem",
    fontSize: "1.2rem",
  },
  submissionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "1rem",
  },
  submissionCard: {
    padding: "1rem",
    background: "#f7f7f7",
    borderRadius: "4px",
  },
  statusBadge: {
    color: "#fff",
    padding: "0.25rem 0.75rem",
    borderRadius: "12px",
    fontSize: "0.85rem",
    marginRight: "1rem",
    textTransform: "uppercase",
  },
  submissionMeta: {
    color: "#666",
    fontSize: "0.85rem",
  },
  celebrateOverlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    pointerEvents: "none",
    zIndex: 40,
  },
  celebrateCard: {
    marginTop: "4rem",
    padding: "0.85rem 1.1rem",
    borderRadius: "999px",
    background:
      "radial-gradient(circle at 0 0, rgba(34,197,94,0.25), transparent 55%), rgba(15,23,42,0.95)",
    border: "1px solid rgba(34,197,94,0.6)",
    boxShadow: "0 20px 45px rgba(15,23,42,0.85)",
    maxWidth: "480px",
    color: "#e5e7eb",
    pointerEvents: "auto",
  },
  celebrateBadge: {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "#bbf7d0",
  },
  celebrateTitle: {
    marginTop: "0.25rem",
    fontSize: "0.95rem",
    fontWeight: 600,
  },
  celebrateBody: {
    marginTop: "0.15rem",
    fontSize: "0.8rem",
    color: "#9ca3af",
  },
  hintsList: {
    listStyleType: "disc",
    paddingLeft: "1.25rem",
    marginBottom: "0.5rem",
    color: "#374151",
    fontSize: "0.9rem",
  },
  hintItem: {
    marginBottom: "0.25rem",
  },
  showHintBtn: {
    borderRadius: "999px",
    padding: "0.4rem 0.9rem",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  samplesPanel: {
    padding: "0.5rem 1rem 0.75rem",
    borderBottom: "1px solid #e5e7eb",
    background: "#f9fafb",
  },
  samplesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.4rem",
  },
  samplesTitle: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#111827",
  },
  samplesList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  sampleItem: {
    background: "#ffffff",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    padding: "0.5rem 0.6rem",
  },
  sampleLabel: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "0.3rem",
  },
  sampleField: {
    marginBottom: "0.25rem",
  },
  sampleFieldLabel: {
    fontSize: "0.7rem",
    color: "#6b7280",
  },
  samplePre: {
    background: "#111827",
    color: "#e5e7eb",
    borderRadius: "4px",
    padding: "0.35rem 0.45rem",
    fontSize: "0.8rem",
    marginTop: "0.15rem",
    overflow: "auto",
  },
  customInputPanel: {
    borderTop: "1px solid #e5e7eb",
    padding: "0.6rem 1rem 0.75rem",
    background: "#f9fafb",
  },
  customInputHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
    marginBottom: "0.3rem",
  },
  customInputTitle: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#111827",
  },
  customInputHint: {
    fontSize: "0.7rem",
    color: "#6b7280",
  },
  customInputTextarea: {
    width: "100%",
    minHeight: "3.5rem",
    borderRadius: "4px",
    border: "1px solid #e5e7eb",
    padding: "0.4rem 0.5rem",
    fontSize: "0.8rem",
    resize: "vertical",
    fontFamily: "monospace",
  },
  videosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
    gap: "0.75rem",
  },
  videoCard: {
    display: "flex",
    gap: "0.6rem",
    padding: "0.55rem 0.65rem",
    borderRadius: "0.75rem",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    textDecoration: "none",
    color: "inherit",
  },
  videoThumbnail: {
    width: "64px",
    height: "40px",
    borderRadius: "0.5rem",
    background:
      "linear-gradient(135deg,rgba(59,130,246,0.9),rgba(56,189,248,0.8))",
  },
  videoText: {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
  },
  videoTitle: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#111827",
  },
  videoMeta: {
    fontSize: "0.7rem",
    color: "#6b7280",
  },
};

export default ProblemDetail;
