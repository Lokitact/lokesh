import { calculateAge } from "../js/ageCalculator.js";

/** Check OpenRouter Credit Availability */
/*async function checkOpenRouterCredits() {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            { role: "system", content: "You are checking credits." },
            { role: "user", content: "Say OK if available." },
          ],
        }),
      }
    );

    if (!response.ok) return false;

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.toLowerCase() || "";
    return reply.includes("ok");
  } catch (e) {
    console.error("Credit check failed:", e);
    return false;
  }
}*/

/**  * Chatbot  */
const form = document.getElementById("chatbot-form");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");
const sendBtn = form.querySelector('button[type="submit"]');
input.addEventListener("input", () => {
  sendBtn.disabled = input.value.trim() === "";
});
sendBtn.disabled = true; // Initial state

let lokeshData = null;

async function loadLokeshData() {
  if (!lokeshData) {
    const response = await fetch("assets/data/loki.json");
    lokeshData = await response.json();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
 /* const hasCredits = await checkOpenRouterCredits();

  if (!hasCredits) {
    messages.innerHTML += `<div class="chat-bubble">
      <div class="message bot-message text-danger">⚠️ Sorry, no API credits available. Loki is currently offline.</div>
    </div>`;
    sendBtn.disabled = true;
    input.disabled = true;
    return;
  }*/

  if (messages.children.length === 0) {
    messages.innerHTML += `<div class="chat-bubble">
      <div class="message bot-message">👋 Hello Lokesh! I'm <strong>Loki</strong>, your assistant. How can I help you regarding your profile?</div>
    </div>`;
  }
});

function parseMarkdownBold(text) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}


