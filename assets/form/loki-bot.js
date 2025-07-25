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

form.onsubmit = async (e) => {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;

  messages.innerHTML += `<div class="chat-bubble">
          <div class="message user-message">${userMsg}</div>
        </div>`;

  messages.scrollTop = messages.scrollHeight;
  input.value = "";
  sendBtn.disabled = true; // Disable until next input

  try {
    await loadLokeshData();
    const systemPrompt = `
You are a helpful assistant named **Loki**. You must always refer to yourself as Loki.

You only answer queries related to the person named **Lokesh**, whose profile is below:

Name: ${lokeshData.basic_info.name}
Age: ${calculateAge(lokeshData.basic_info.dob)}
Degree: ${lokeshData.basic_info.degree}
Gender: ${lokeshData.basic_info.gender}
Freelance: ${lokeshData.basic_info.freelance}
Languages: ${lokeshData.basic_info.languages.join(", ")}
Skills: ${lokeshData.skills
      .map((s) => s.name + " - " + s.proficiency)
      .join(", ")}
Resume Summary: ${lokeshData.resume.summary}
Experience: ${lokeshData.experience.title} at ${lokeshData.experience.company}
Education: ${lokeshData.education.degree} from ${
      lokeshData.education.institute
    } (${lokeshData.education.year})
Contact Email: ${lokeshData.basic_info.email}

If a user asks about anything other than Lokesh, respond with:
"I'm Loki, your assistant. I'm here only to help with questions about Lokesh."
`.trim();

    const res = await fetch("https://script.google.com/macros/s/AKfycbxfQLNOsOg7aRIBDz9FZmuDKbvQNqWJRBSfG6bdlZ7IYWQDqjBG2HyWG1cg-oHSCPxaaA/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userMsg,
          },
        ],
      }),
    });

    const data = await res.json();
    let msgrep =
      data.choices?.[0]?.message?.content ||
      "❗ Sorry, I didn't get a valid response.";
    msgrep = parseMarkdownBold(msgrep);
    messages.innerHTML += `<div class="chat-bubble">
          <div class="message bot-message">${msgrep}
          </div>
        </div>`;
  } catch (error) {
    console.error("Error sending message:", error);
    messages.innerHTML += `<div class="chat-bubble">
      <div class="message bot-message text-danger">🚨 Error: Unable to respond at the moment.</div>
    </div>`;
    sendBtn.disabled = true;
    input.disabled = true;
  }

  messages.scrollTop = messages.scrollHeight;
};
