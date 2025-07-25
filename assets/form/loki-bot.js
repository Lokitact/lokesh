import { calculateAge } from "../js/ageCalculator.js";

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

document.addEventListener("DOMContentLoaded", () => {
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
  try {
    await loadLokeshData();
    // content: "You are a helpful assistant named JP.",
    // content:"You are a helpful assistant. The user’s name is Alex. Always address the user as Alex.",

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

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        "HTTP-Referer": "https://lokitact.github.io/lokesh/", // Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "LOKI Website Assistant", // Optional. Site title for rankings on openrouter.ai.
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
      data.choices[0].message.content || "Sorry, I didn't understand that.";
    msgrep = parseMarkdownBold(msgrep);
    messages.innerHTML += `<div class="chat-bubble">
          <div class="message bot-message">${msgrep}
          </div>
        </div>`;
  } catch (error) {
    console.error("Error sending message:", error);
  }

  messages.scrollTop = messages.scrollHeight;
};
