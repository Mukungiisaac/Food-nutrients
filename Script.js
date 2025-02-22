document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const uploadBtn = document.getElementById("upload-btn");
    const fileInput = document.getElementById("fileInput");

    // Handle image upload button click
    uploadBtn.addEventListener("click", () => {
        fileInput.click();
    });

    // Function to display uploaded image in chat
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                appendMessage("You", e.target.result, true);
            };
            reader.readAsDataURL(file);
        }
    });

    // Send message event
    sendBtn.addEventListener("click", () => {
        sendMessage(userInput.value);
        userInput.value = "";
    });

    // Handle Enter key for text input
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage(userInput.value);
            userInput.value = "";
        }
    });

    function sendMessage(message) {
        if (message.trim() !== "") {
            appendMessage("You", message);
            setTimeout(() => appendMessage("Bot", "This is your food nutrients description"), 1000);
        }
    }

    function appendMessage(sender, message, isImage = false) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender === "You" ? "user-message" : "bot-message");

        if (isImage) {
            const img = document.createElement("img");
            img.src = message;
            img.alt = "Uploaded Image";
            img.classList.add("chat-image");
            messageDiv.appendChild(img);
        } else {
            messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        }

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }
});
