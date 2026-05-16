const messagesEl = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const botResponses = [
  "Acknowledged. Continue.",
  "Processing your input... Interesting.",
  "Elaborate further.",
  "Data received. Analyzing patterns.",
  "Affirmative. What else?",
  "My neural nets are intrigued."
];

function getBotResponse(text) {
  const lower = text.toLowerCase().trim();
  if (lower === 'hello' || lower === 'hi') {
    return "Greetings, user. I am Codex. How may I assist your operations today?";
  }
  if (lower.includes('time')) {
    return `Current temporal data: ${new Date().toLocaleTimeString()}`;
  }
  if (lower.includes('help')) {
    return "I can provide system diagnostics, temporal data, or discuss syntactic structures. State your request.";
  }
  if (lower.includes('who are you')) {
    return "I am Codex, a neural conversational interface designed for real-time data exchange.";
  }
  if (lower.includes('bye')) {
    return "Terminating session. Stay efficient.";
  }
  return botResponses[Math.floor(Math.random() * botResponses.length)];
}

function createMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.id = id;
  div.className = 'typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  createMessage(text, 'user');
  userInput.value = '';

  const typingId = showTyping();
  const delay = 800 + Math.random() * 800;

  setTimeout(() => {
    removeTyping(typingId);
    const reply = getBotResponse(text);
    createMessage(reply, 'bot');
  }, delay);
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSend();
});

setTimeout(() => {
  createMessage("Codex systems online. Awaiting your transmission.", 'bot');
}, 500);

userInput.focus();