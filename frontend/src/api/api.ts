const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const processAudit = async (tools) => {
  try {
    const response = await fetch(`${API_URL}/api/audit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tools }),
    });

    if (!response.ok) {
      throw new Error("Failed to process audit");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const captureLeadAndEmail = async (
  email,
  company,
  role,
  teamSize,
  auditData
) => {
  try {
    const response = await fetch(`${API_URL}/api/report/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        company,
        role,
        teamSize,
        auditData,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};