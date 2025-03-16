let data = {};

async function sendMessage() {
    const userMessage = document.getElementById("userInput").value;
    if (!userMessage.trim()) return; // Prevent empty messages
    
    // Append user message to chatbox
    const messagesDiv = document.getElementById("messages");
    const userMsgElement = document.createElement("p");
    userMsgElement.textContent = "You: " + userMessage;
    messagesDiv.appendChild(userMsgElement);
    
    // Send message to API
    const response = await fetch("https://chatbot-api-pied.vercel.app/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    console.log(data);
    
    // Append bot response to chatbox
    const botMsgElement = document.createElement("p");
    botMsgElement.textContent = "Bot: " + data.reply;
    messagesDiv.appendChild(botMsgElement);

    // Clear input field
    document.getElementById("userInput").value = "";
}

document.getElementById("sendButton").addEventListener("click", sendMessage);

// Allow "Enter" key to send messages
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});


function addMessage(text, sender) {
    let messages = document.getElementById("messages");
    let messageDiv = document.createElement("div");
    messageDiv.textContent = text;
    messageDiv.classList.add(sender);
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

function getResponse(query) {
    // Respond based on query
    if (query.includes("name")) return `My name is ${data.info.name}.`;
    if (query.includes("who are you")) return `I'm ${data.info.title}.`;

    // Skills
    if (query.includes("skills") || query.includes("know")) 
        return `I am proficient in ${data.skills.languages.join(", ")}, using frameworks like ${data.skills.frameworks.join(", ")}.`;

    // Projects
    if (query.includes("projects")) {
        return `Here are some projects I've worked on:\n` + 
               data.projects.map(p => `${p.name} - ${p.description}. [See More](${p.url})`).join("\n");
    }

    // Portfolio
    if (query.includes("portfolio")) return `Check out my portfolio: ${data.info.portfolio}`;
    
    return "I'm not sure, but you can check my portfolio for more details.";
}
function toggleChat() {
    let chatbox = document.getElementById("chatbox");
    let chatIcon = document.getElementById("chat-icon");

    if (chatbox.style.display === "none" || chatbox.style.display === "") {
        chatbox.style.display = "flex";
        chatIcon.style.display = "none";
    } else {
        chatbox.style.display = "none";
        chatIcon.style.display = "block";
    }
}

// function handleKeyPress(event) {
//     if (event.key === "Enter") sendMessage();
// }

window.onload = function () {
    document.getElementById("chatbox").style.display = "none";
};




