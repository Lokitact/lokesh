import { calculateAge } from "../js/ageCalculator.js";

(() => {
  "use strict";
  let lokiData = null;

  // Load Lokesh Profile
  async function loadLokiData() {
    if (!lokiData) {
      const res = await fetch("assets/data/loki.json");
      lokiData = await res.json();
    }
    return lokiData;
  }

  function parseMarkdownBold(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  }

  function showLoader() {
    const loader = document.createElement("div");
    loader.className = "chat-bubble bot-loader";
    loader.id = "loki-loader";
    loader.innerHTML = `
    <div class="message bot-message">
      <span class="typing-dots">
        <span>.</span><span>.</span><span>.</span>
      </span>
    </div>`;
    document.getElementById("chatbot-messages").appendChild(loader);
    loader.scrollIntoView({ behavior: "smooth" });
  }

  function hideLoader() {
    const loader = document.getElementById("loki-loader");
    if (loader) loader.remove();
  }

  // Show Message in UI
  function addMessage(content, sender = "user") {
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-bubble";

    // Parse markdown if bot message
    const messageHTML = sender === "bot" ? parseMarkdownBold(content) : content;

    msgDiv.innerHTML = `<div class="message ${
      sender === "user" ? "user-message" : "bot-message"
    }">${messageHTML}</div>`;
    document.getElementById("chatbot-messages").appendChild(msgDiv);
    msgDiv.scrollIntoView({ behavior: "smooth" });
  }

  // Build and Send to API
  async function sendToLoki(message) {
    const data = await loadLokiData();

    const systemPrompt = `
You are a helpful assistant named **Loki**. You must always refer to yourself as Loki.

You only answer queries related to the person named **Lokesh**, whose profile is below:

Name: ${data.basic_info.name}
Age: ${calculateAge(data.basic_info.dob)}
Degree: ${data.basic_info.degree}
Gender: ${data.basic_info.gender}
Freelance: ${data.basic_info.freelance}
Languages: ${data.basic_info.languages.join(", ")}
Skills: ${data.skills.map((s) => `${s.name} (${s.proficiency})`).join(", ")}
Resume Summary: ${data.resume.summary}
Experience: ${data.experience.title} at ${data.experience.company}
Education: ${data.education.degree} from ${data.education.institute} (${
      data.education.year
    })
Contact Email: ${data.basic_info.email}

If a user asks about anything other than Lokesh, respond with:
"I'm Loki, your assistant. I'm here only to help with questions about Lokesh."
`.trim();

    const formBody = new URLSearchParams({
      messages: JSON.stringify([
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ]),
    }).toString();

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbw3O6APFzzGB_VKT67VODheLzYy7yTBs3gQi4Vwn-WChykKc62U9bLlgrN2YbFbVrtlRg/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formBody,
        }
      );

      const json = await res.json();
      return (
        json.choices?.[0]?.message?.content ||
        `Sorry, I'm Loki, and I couldn't understand that.`
      );
    } catch (err) {
      return `Loki ran into an error: ${err.message}`;
    }
  }

  // On DOM Ready
  document.addEventListener("DOMContentLoaded", async () => {
    await loadLokiData();
    addMessage(
      "👋 Hello Lokesh! I'm <strong>Loki</strong>, your assistant. How can I help you regarding your profile?",
      "bot"
    );
  });

  // Form Handler
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const sendBtn = form.querySelector('button[type="submit"]');
  sendBtn.disabled = true;

  input.addEventListener("input", () => {
    sendBtn.disabled = input.value.trim() === "";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userInput = input.value.trim();
    if (!userInput) return;

    addMessage(userInput, "user");
    input.value = "";
    sendBtn.disabled = true;
    showLoader(); // ✅ Show loader

    const reply = await sendToLoki(userInput);
    hideLoader(); // ✅ Remove loader
    addMessage(reply, "bot");
  });
})();
