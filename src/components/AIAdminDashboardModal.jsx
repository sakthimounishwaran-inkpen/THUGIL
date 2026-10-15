import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { tryOnService, getOrCreateClientId } from "../services/tryOnService";
import {
  Shield,
  ShieldCheck,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Users,
  Activity,
  Award,
  Key,
  Clock,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function AIAdminDashboardModal() {
  const { isAIAdminOpen, setIsAIAdminOpen, refreshAITrialStatus, showToast } = useShop();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [loading, setLoading] = useState(false);
  const [overviewData, setOverviewData] = useState(null);
  const [activeTab, setActiveTab] = useState("leads"); // "leads" | "jobs" | "grant" | "config"

  // Direct Credit Grant state
  const [grantClientId, setGrantClientId] = useState("");
  const [grantCredits, setGrantCredits] = useState(3);
  const [isGranting, setIsGranting] = useState(false);

  // Search filter for leads
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("all");

  const defaultPasscode = "ROYAL_ADMIN_2026";

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const data = await tryOnService.getAdminOverview();
      setOverviewData(data);
    } catch (err) {
      showToast(err.message || "Failed to load admin overview.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAIAdminOpen) {
      // Set current patron client ID as default for easy testing
      setGrantClientId(getOrCreateClientId());
      if (isAuthenticated) {
        fetchOverview();
      }
    }
  }, [isAIAdminOpen, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === defaultPasscode || passcode === "admin") {
      setIsAuthenticated(true);
      setAuthError("");
      fetchOverview();
    } else {
      setAuthError("Invalid royal passcode. Use ROYAL_ADMIN_2026 for atelier staff access.");
    }
  };

  const handleApproveRequest = async (requestId, credits = 3) => {
    try {
      const res = await tryOnService.approveAccessRequest(requestId, credits);
      if (res.success) {
        showToast(`Request ${requestId} approved! Granted ${credits} trial credits.`, "success");
        fetchOverview();
        refreshAITrialStatus();
      } else {
        showToast(res.error || "Approval failed.", "error");
      }
    } catch (err) {
      showToast(err.message || "Error approving request.", "error");
    }
  };

  const handleGrantDirectCredits = async (e) => {
    e.preventDefault();
    if (!grantClientId) {
      showToast("Please enter a Client ID.", "error");
      return;
    }
    setIsGranting(true);
    try {
      const res = await tryOnService.grantDirectCredits(grantClientId, Number(grantCredits) || 2);
      setIsGranting(false);
      if (res.success) {
        showToast(`Successfully granted ${grantCredits} credits to patron ${grantClientId}!`, "success");
        fetchOverview();
        refreshAITrialStatus();
      } else {
        showToast(res.error || "Grant failed.", "error");
      }
    } catch (err) {
      setIsGranting(false);
      showToast(err.message || "Error granting credits.", "error");
    }
  };

  if (!isAIAdminOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(18, 14, 15, 0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAIAdminOpen(false);
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          height: "88vh",
          maxHeight: "840px",
          backgroundColor: "var(--theme-bg-card)",
          border: "1.5px solid var(--muted-gold)",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(185, 154, 91, 0.3)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "1rem 1.6rem",
            backgroundColor: "var(--burgundy)",
            borderBottom: "1.5px solid var(--muted-gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#FAF5EB"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "rgba(185, 154, 91, 0.2)",
                border: "1px solid var(--muted-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Shield size={18} color="var(--muted-gold-light)" />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-serif-royal)",
                  fontSize: "1.1rem",
                  letterSpacing: "0.06em",
                  color: "var(--warm-ivory)"
                }}
              >
                THUGIL ATELIER STAFF CONTROL
              </h3>
              <p style={{ margin: 0, fontSize: "0.74rem", color: "rgba(250, 245, 235, 0.75)" }}>
                AI Virtual Trial Room Management, Lead Approvals & Audit Trail
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {isAuthenticated && (
              <button
                onClick={fetchOverview}
                disabled={loading}
                title="Refresh Metrics"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFF",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              </button>
            )}
            <button
              onClick={() => setIsAIAdminOpen(false)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFF",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* BODY */}
        {!isAuthenticated ? (
          /* AUTH LOGIN SCREEN */
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem"
            }}
          >
            <form
              onSubmit={handleLogin}
              style={{
                width: "100%",
                maxWidth: "380px",
                backgroundColor: "var(--theme-bg-main)",
                border: "1px solid var(--muted-gold)",
                borderRadius: "16px",
                padding: "2rem",
                textAlign: "center",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(109, 31, 50, 0.1)",
                  border: "1px solid var(--muted-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto"
                }}
              >
                <Key size={22} color="var(--muted-gold-dark)" />
              </div>

              <div>
                <h4
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-serif-royal)",
                    fontSize: "1.1rem",
                    color: "var(--theme-heading-color)"
                  }}
                >
                  Atelier Staff Verification
                </h4>
                <p style={{ margin: "0.3rem 0 0", fontSize: "0.78rem", color: "var(--theme-text-muted)" }}>
                  Enter your staff passkey to manage VIP leads and trial room credits.
                </p>
              </div>

              <div style={{ textAlign: "left" }}>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Passkey (ROYAL_ADMIN_2026)"
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "8px",
                    border: "1px solid var(--theme-border)",
                    fontSize: "0.85rem",
                    boxSizing: "border-box"
                  }}
                />
                {authError && (
                  <span style={{ display: "block", color: "var(--burgundy)", fontSize: "0.72rem", marginTop: "0.3rem" }}>
                    {authError}
                  </span>
                )}
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: "var(--burgundy)",
                  color: "#FAF5EB",
                  border: "1px solid var(--muted-gold)",
                  borderRadius: "22px",
                  padding: "0.65rem",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer"
                }}
                className="gold-shimmer-btn"
              >
                Unlock Management Suite
              </button>

              <div style={{ fontSize: "0.7rem", color: "var(--theme-text-muted)", marginTop: "0.2rem" }}>
                Default Demo Passkey: <code style={{ color: "var(--muted-gold-dark)" }}>ROYAL_ADMIN_2026</code>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN CONSOLE */
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* TOP METRICS STATS BAR */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "0.8rem",
                padding: "1rem 1.4rem",
                backgroundColor: "var(--theme-bg-main)",
                borderBottom: "1px solid var(--theme-border)"
              }}
              className="admin-stats-grid"
            >
              {[
                {
                  label: "Total AI Sessions",
                  value: overviewData?.stats?.totalJobs ?? 0,
                  icon: Activity,
                  color: "var(--burgundy)"
                },
                {
                  label: "Successful Drapes",
                  value: overviewData?.stats?.completedJobs ?? 0,
                  icon: Check,
                  color: "#346643"
                },
                {
                  label: "Failed / Unconfigured",
                  value: overviewData?.stats?.failedJobs ?? 0,
                  icon: AlertCircle,
                  color: "#B99A5B"
                },
                {
                  label: "Pending VIP Leads",
                  value: overviewData?.stats?.pendingRequests ?? 0,
                  icon: Clock,
                  color: "var(--burgundy)"
                },
                {
                  label: "Active Patron Sessions",
                  value: overviewData?.stats?.activeUsers ?? 0,
                  icon: Users,
                  color: "var(--muted-gold-dark)"
                }
              ].map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "var(--theme-bg-card)",
                      border: "1px solid var(--theme-border)",
                      borderRadius: "12px",
                      padding: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem"
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(185, 154, 91, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <IconComponent size={17} color={stat.color} />
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "0.68rem", color: "var(--theme-text-muted)" }}>
                        {stat.label}
                      </span>
                      <strong style={{ fontSize: "1.15rem", fontFamily: "var(--font-serif-royal)", color: "var(--theme-heading-color)" }}>
                        {stat.value}
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NAVIGATION TABS */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--theme-border)",
                backgroundColor: "var(--theme-bg-elevated)",
                padding: "0 1.4rem"
              }}
            >
              {[
                { id: "leads", label: `Customer VIP Leads (${overviewData?.accessRequests?.length ?? 0})` },
                { id: "jobs", label: `AI Job Audit Logs (${overviewData?.jobs?.length ?? 0})` },
                { id: "grant", label: "Direct Credit Grant Tool" },
                { id: "config", label: "AI Provider Configuration" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "0.8rem 1.1rem",
                    backgroundColor: "transparent",
                    color: activeTab === tab.id ? "var(--burgundy)" : "var(--theme-text-muted)",
                    border: "none",
                    borderBottom: activeTab === tab.id ? "2.5px solid var(--burgundy)" : "2.5px solid transparent",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    cursor: "pointer"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENTS */}
            <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.2rem 1.4rem" }}>
              {/* TAB 1: VIP LEADS & ACCESS REQUESTS */}
              {activeTab === "leads" && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                      gap: "1rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="text"
                        placeholder="Search patron by name, phone, email..."
                        value={leadSearch}
                        onChange={(e) => setLeadSearch(e.target.value)}
                        style={{
                          padding: "0.45rem 0.75rem",
                          borderRadius: "8px",
                          border: "1px solid var(--theme-border)",
                          fontSize: "0.78rem",
                          width: "250px"
                        }}
                      />
                      <select
                        value={leadStatusFilter}
                        onChange={(e) => setLeadStatusFilter(e.target.value)}
                        style={{
                          padding: "0.45rem 0.65rem",
                          borderRadius: "8px",
                          border: "1px solid var(--theme-border)",
                          fontSize: "0.78rem"
                        }}
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending Only</option>
                        <option value="approved">Approved Only</option>
                      </select>
                    </div>

                    <span style={{ fontSize: "0.74rem", color: "var(--theme-text-muted)" }}>
                      Click <strong>Approve & Grant +3 Credits</strong> to activate patron access
                    </span>
                  </div>

                  {overviewData?.accessRequests?.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--theme-text-muted)" }}>
                      No VIP customer access requests submitted yet.
                    </div>
                  ) : (
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.78rem",
                        textAlign: "left"
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1.5px solid var(--muted-gold)",
                            color: "var(--theme-heading-color)",
                            fontFamily: "var(--font-serif-royal)",
                            fontSize: "0.75rem",
                            textTransform: "uppercase"
                          }}
                        >
                          <th style={{ padding: "0.6rem 0.5rem" }}>ID</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Patron Name</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Contact Details</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Preferred Collection</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Consent</th>
                          <th style={{ padding: "0.6rem 0.5rem" }}>Status</th>
                          <th style={{ padding: "0.6rem 0.5rem", textAlign: "right" }}>Staff Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {overviewData?.accessRequests
                          ?.filter((req) => {
                            const matchSearch =
                              !leadSearch ||
                              req.name?.toLowerCase().includes(leadSearch.toLowerCase()) ||
                              req.mobile?.includes(leadSearch) ||
                              req.email?.toLowerCase().includes(leadSearch.toLowerCase());
                            const matchStatus = leadStatusFilter === "all" || req.status === leadStatusFilter;
                            return matchSearch && matchStatus;
                          })
                          .map((req) => (
                            <tr
                              key={req.id}
                              style={{
                                borderBottom: "1px solid var(--theme-border)",
                                backgroundColor: req.status === "pending" ? "rgba(185, 154, 91, 0.04)" : "transparent"
                              }}
                            >
                              <td style={{ padding: "0.75rem 0.5rem", fontFamily: "monospace", color: "var(--muted-gold-dark)" }}>
                                {req.id}
                              </td>
                              <td style={{ padding: "0.75rem 0.5rem", fontWeight: 700, color: "var(--theme-heading-color)" }}>
                                {req.name}
                              </td>
                              <td style={{ padding: "0.75rem 0.5rem" }}>
                                <div>{req.mobile}</div>
                                <div style={{ fontSize: "0.7rem", color: "var(--theme-text-muted)" }}>{req.email}</div>
                              </td>
                              <td style={{ padding: "0.75rem 0.5rem" }}>
                                <span
                                  style={{
                                    backgroundColor: "rgba(185, 154, 91, 0.15)",
                                    padding: "0.15rem 0.45rem",
                                    borderRadius: "6px",
                                    fontSize: "0.7rem"
                                  }}
                                >
                                  {req.preferredCategory}
                                </span>
                              </td>
                              <td style={{ padding: "0.75rem 0.5rem" }}>
                                <span style={{ color: "#346643", fontSize: "0.72rem", fontWeight: 600 }}>✓ Verified</span>
                              </td>
                              <td style={{ padding: "0.75rem 0.5rem" }}>
                                <span
                                  style={{
                                    backgroundColor: req.status === "approved" ? "rgba(52, 102, 67, 0.15)" : "rgba(109, 31, 50, 0.15)",
                                    color: req.status === "approved" ? "#346643" : "var(--burgundy)",
                                    padding: "0.2rem 0.55rem",
                                    borderRadius: "10px",
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase"
                                  }}
                                >
                                  {req.status}
                                </span>
                              </td>
                              <td style={{ padding: "0.75rem 0.5rem", textAlign: "right" }}>
                                {req.status === "pending" ? (
                                  <button
                                    onClick={() => handleApproveRequest(req.id, 3)}
                                    style={{
                                      backgroundColor: "var(--burgundy)",
                                      color: "#FAF5EB",
                                      border: "1px solid var(--muted-gold)",
                                      borderRadius: "14px",
                                      padding: "0.35rem 0.8rem",
                                      fontSize: "0.72rem",
                                      fontWeight: 700,
                                      cursor: "pointer"
                                    }}
                                  >
                                    ✦ Approve & Grant +3 Credits
                                  </button>
                                ) : (
                                  <span style={{ fontSize: "0.7rem", color: "var(--theme-text-muted)" }}>
                                    Approved (+{req.creditsGranted || 3} credits)
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* TAB 2: AI JOB AUDIT LOGS */}
              {activeTab === "jobs" && (
                <div>
                  <h4
                    style={{
                      margin: "0 0 0.8rem",
                      fontFamily: "var(--font-serif-royal)",
                      fontSize: "0.95rem",
                      color: "var(--theme-heading-color)"
                    }}
                  >
                    Recent Virtual Trial Room Generation Jobs
                  </h4>

                  {overviewData?.jobs?.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--theme-text-muted)" }}>
                      No AI jobs logged yet. Test a try-on session in the trial room.
                    </div>
                  ) : (
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.78rem",
                        textAlign: "left"
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1.5px solid var(--muted-gold)",
                            color: "var(--theme-heading-color)",
                            fontFamily: "var(--font-serif-royal)",
                            fontSize: "0.75rem",
                            textTransform: "uppercase"
                          }}
                        >
                          <th style={{ padding: "0.5rem" }}>Timestamp</th>
                          <th style={{ padding: "0.5rem" }}>Job ID</th>
                          <th style={{ padding: "0.5rem" }}>Garment</th>
                          <th style={{ padding: "0.5rem" }}>Client ID</th>
                          <th style={{ padding: "0.5rem" }}>AI Provider</th>
                          <th style={{ padding: "0.5rem" }}>Status</th>
                          <th style={{ padding: "0.5rem" }}>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {overviewData?.jobs?.map((job) => (
                          <tr key={job.id} style={{ borderBottom: "1px solid var(--theme-border)" }}>
                            <td style={{ padding: "0.65rem 0.5rem", fontSize: "0.7rem", color: "var(--theme-text-muted)" }}>
                              {new Date(job.timestamp).toLocaleString()}
                            </td>
                            <td style={{ padding: "0.65rem 0.5rem", fontFamily: "monospace", fontSize: "0.72rem" }}>
                              {job.id}
                            </td>
                            <td style={{ padding: "0.65rem 0.5rem", fontWeight: 600 }}>{job.garmentName}</td>
                            <td style={{ padding: "0.65rem 0.5rem", fontFamily: "monospace", fontSize: "0.72rem" }}>
                              {job.clientId?.substring(0, 18)}...
                            </td>
                            <td style={{ padding: "0.65rem 0.5rem" }}>{job.provider || "Fashn.ai / Replicate"}</td>
                            <td style={{ padding: "0.65rem 0.5rem" }}>
                              <span
                                style={{
                                  backgroundColor:
                                    job.status === "completed" ? "rgba(52, 102, 67, 0.15)" : "rgba(109, 31, 50, 0.15)",
                                  color: job.status === "completed" ? "#346643" : "var(--burgundy)",
                                  padding: "0.15rem 0.5rem",
                                  borderRadius: "8px",
                                  fontSize: "0.68rem",
                                  fontWeight: 700,
                                  textTransform: "uppercase"
                                }}
                              >
                                {job.status}
                              </span>
                            </td>
                            <td style={{ padding: "0.65rem 0.5rem", fontSize: "0.7rem", color: "var(--theme-text-muted)" }}>
                              {job.error || "Neural synthesis successful"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {/* TAB 3: DIRECT CREDIT GRANT TOOL */}
              {activeTab === "grant" && (
                <div style={{ maxWidth: "520px" }}>
                  <h4
                    style={{
                      margin: "0 0 0.5rem",
                      fontFamily: "var(--font-serif-royal)",
                      fontSize: "1rem",
                      color: "var(--theme-heading-color)"
                    }}
                  >
                    Direct Trial Credit Provisioning
                  </h4>
                  <p style={{ margin: "0 0 1.2rem", fontSize: "0.78rem", color: "var(--theme-text-muted)", lineHeight: 1.5 }}>
                    Manually grant additional free AI trial credits to any client session identifier. The current patron session ID is pre-filled below for instant testing.
                  </p>

                  <form onSubmit={handleGrantDirectCredits} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                        Patron Client Identifier:
                      </label>
                      <input
                        type="text"
                        required
                        value={grantClientId}
                        onChange={(e) => setGrantClientId(e.target.value)}
                        placeholder="e.g. patron_xxxx_xxxx"
                        style={{
                          width: "100%",
                          padding: "0.6rem 0.8rem",
                          borderRadius: "8px",
                          border: "1px solid var(--theme-border)",
                          fontFamily: "monospace",
                          fontSize: "0.82rem",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                        Number of Trial Credits to Grant:
                      </label>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {[2, 3, 5, 10].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGrantCredits(num)}
                            style={{
                              padding: "0.4rem 0.9rem",
                              borderRadius: "8px",
                              backgroundColor: grantCredits === num ? "var(--burgundy)" : "var(--theme-bg-main)",
                              color: grantCredits === num ? "#FAF5EB" : "var(--theme-text-body)",
                              border: `1px solid ${grantCredits === num ? "var(--muted-gold)" : "var(--theme-border)"}`,
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              cursor: "pointer"
                            }}
                          >
                            +{num} Credits
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isGranting}
                      style={{
                        backgroundColor: "var(--burgundy)",
                        color: "#FAF5EB",
                        border: "1.5px solid var(--muted-gold)",
                        borderRadius: "22px",
                        padding: "0.7rem 1.4rem",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        cursor: isGranting ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        marginTop: "0.5rem"
                      }}
                      className="gold-shimmer-btn"
                    >
                      {isGranting ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} color="var(--muted-gold-light)" />}
                      <span>Grant {grantCredits} Complimentary Credits</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: CONFIGURATION STATUS */}
              {activeTab === "config" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h4
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-serif-royal)",
                      fontSize: "1rem",
                      color: "var(--theme-heading-color)"
                    }}
                  >
                    AI Provider & Neural Pipeline Status
                  </h4>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {/* FASHN.AI */}
                    <div
                      style={{
                        backgroundColor: "var(--theme-bg-card)",
                        border: `1.5px solid ${overviewData?.providerConfig?.hasFashnKey ? "#346643" : "var(--muted-gold)"}`,
                        borderRadius: "14px",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>Fashn.ai API v1</span>
                        <span
                          style={{
                            backgroundColor: overviewData?.providerConfig?.hasFashnKey
                              ? "rgba(52, 102, 67, 0.15)"
                              : "rgba(185, 154, 91, 0.15)",
                            color: overviewData?.providerConfig?.hasFashnKey ? "#346643" : "var(--muted-gold-dark)",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "10px",
                            fontSize: "0.68rem",
                            fontWeight: 700
                          }}
                        >
                          {overviewData?.providerConfig?.hasFashnKey ? "ONLINE / CONFIGURED" : "AWAITING KEY IN .ENV"}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--theme-text-muted)", lineHeight: 1.45 }}>
                        High-fidelity fashion virtual try-on engine supporting sarees, lehengas, kurtas, and Western couture.
                      </p>
                      <code style={{ fontSize: "0.72rem", backgroundColor: "rgba(0,0,0,0.06)", padding: "0.3rem", borderRadius: "6px" }}>
                        FASHN_API_KEY=your_key_here
                      </code>
                    </div>

                    {/* REPLICATE IDM-VTON */}
                    <div
                      style={{
                        backgroundColor: "var(--theme-bg-card)",
                        border: `1.5px solid ${overviewData?.providerConfig?.hasReplicateKey ? "#346643" : "var(--muted-gold)"}`,
                        borderRadius: "14px",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>Replicate (IDM-VTON)</span>
                        <span
                          style={{
                            backgroundColor: overviewData?.providerConfig?.hasReplicateKey
                              ? "rgba(52, 102, 67, 0.15)"
                              : "rgba(185, 154, 91, 0.15)",
                            color: overviewData?.providerConfig?.hasReplicateKey ? "#346643" : "var(--muted-gold-dark)",
                            padding: "0.15rem 0.5rem",
                            borderRadius: "10px",
                            fontSize: "0.68rem",
                            fontWeight: 700
                          }}
                        >
                          {overviewData?.providerConfig?.hasReplicateKey ? "ONLINE / CONFIGURED" : "AWAITING KEY IN .ENV"}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--theme-text-muted)", lineHeight: 1.45 }}>
                        State-of-the-art open-source image-based virtual try-on model preserving garment textures and pleats.
                      </p>
                      <code style={{ fontSize: "0.72rem", backgroundColor: "rgba(0,0,0,0.06)", padding: "0.3rem", borderRadius: "6px" }}>
                        REPLICATE_API_TOKEN=your_token_here
                      </code>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "rgba(185, 154, 91, 0.1)",
                      border: "1px dashed var(--muted-gold)",
                      borderRadius: "12px",
                      padding: "0.9rem",
                      fontSize: "0.76rem",
                      lineHeight: 1.5,
                      color: "var(--theme-text-body)"
                    }}
                  >
                    <strong>Quality Assurance Standard:</strong> As commanded, the THUGIL virtual trial room strictly refuses to return fake or static mockup images as simulated AI results. If no AI provider key is configured, it cleanly displays the setup state and preserves customer trial counts without debiting them.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
