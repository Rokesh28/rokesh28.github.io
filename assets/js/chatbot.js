let data = {};

async function sendMessage() {
    const userMessage = document.getElementById("userInput").value;
     // Clear input field
    document.getElementById("userInput").value = "";
    if (!userMessage.trim()) return; // Prevent empty messages
    
    // Append user message to chatbox
    const messagesDiv = document.getElementById("messages");
    const userLabel = document.createElement("div");
    userLabel.textContent = "You: ";
    userLabel.style.fontWeight = "bold";
    userLabel.style.color = "lightgreen";

    const userMsgElement = document.createElement("p");
    messagesDiv.appendChild(userLabel);
    userMsgElement.textContent = userMessage;

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
    const botLabel = document.createElement("div");
    botLabel.textContent = "Jarvis: ";
    botLabel.style.fontWeight = "bold";
    botLabel.style.color = "#fe5858";
    const botMsgElement = document.createElement("p");
    botMsgElement.textContent = data.reply;
    messagesDiv.appendChild(botLabel);
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

document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const chatHeader = document.getElementById("chat-header");
    // Create the top-left resize handle
    const resizer = document.createElement("div");
    resizer.id = "top-left-resizer";
    chatbox.appendChild(resizer);

    let isResizing = false;
    let startX, startY, startWidth, startHeight, startTop, startLeft;
    let offsetX, offsetY, isDragging = false;

    resizer.addEventListener("mousedown", function (e) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = chatbox.offsetWidth;
        startHeight = chatbox.offsetHeight;
        startTop = chatbox.offsetTop;
        startLeft = chatbox.offsetLeft;
        isDragging = true;
        
        e.preventDefault();
    });
    

    document.addEventListener("mousemove", function (e) {
        if (!isResizing) return;

        let widthDiff = startX - e.clientX;
        let heightDiff = startY - e.clientY;
        // console.log(widthDiff, heightDiff, startWidth, startHeight, startTop, startLeft);
        // **Adjust the size & position dynamically**
        if(startWidth + widthDiff >250){
            chatbox.style.width = `${startWidth + widthDiff}px`;
            chatbox.style.left = `${startLeft - widthDiff}px`;
        }
        if(startHeight + heightDiff >250){
            chatbox.style.height = `${startHeight + heightDiff}px`;
            chatbox.style.top = `${startTop - heightDiff}px`;
        }

        if (isDragging) {
            chatbox.style.left = `${e.clientX - offsetX}px`;
            chatbox.style.top = `${e.clientY - offsetY}px`;
        }
        // chatbox.style.width = `${startWidth + widthDiff}px`;
        // chatbox.style.height = `${startHeight + heightDiff}px`;
        // chatbox.style.left = `${startLeft - widthDiff}px`;
        // chatbox.style.top = `${startTop - heightDiff}px`;

        // Prevent shrinking beyond a minimum size
        // if (chatbox.offsetWidth < 250) chatbox.style.width = "250px";
        // if (chatbox.offsetHeight < 300) chatbox.style.height = "300px";
    });

    document.addEventListener("mouseup", function () {
        isResizing = false;
        isDragging = false;
    });
});


// function handleKeyPress(event) {
//     if (event.key === "Enter") sendMessage();
// }

window.onload = function () {
    document.getElementById("chatbox").style.display = "none";
};




