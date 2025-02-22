const FORGOT_PASSWORD_API = "https://v2.api.noroff.dev/auth/reset-password";

document
  .getElementById("forgotPasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    try {
      const response = await fetch(FORGOT_PASSWORD_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        document.getElementById("forgotMessage").innerText =
          "Reset link sent to your email.";
      } else {
        document.getElementById("forgotMessage").innerText =
          "Failed to send reset link.";
      }
    } catch (error) {
      document.getElementById("forgotMessage").innerText =
        "Error: Could not connect to server.";
    }
  });
