// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDV4bvtKPrbcCtKm1mDtaOoPl8p0lY7-Os",
    authDomain: "valorant-chat.firebaseapp.com",
    projectId: "valorant-chat",
    storageBucket: "valorant-chat.firebasestorage.app",
    messagingSenderId: "254033261139",
    appId: "1:254033261139:web:909356c48c3fe43b3a0ca6",
    measurementId: "G-9Z72JP1GG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Save the agent's username in sessionStorage upon successful login
const loggedInAgent = sessionStorage.getItem('loggedInAgent'); // Fetch agent's name

if (loggedInAgent) {
    document.getElementById('agent-username').textContent = loggedInAgent;
}

// Send message when clicked
document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function formatTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Adjust hours for 12-hour format

    return `${hours}:${minutes} ${period}`;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message');

        let senderName = 'User';  // Default is 'User'
        let messageClass = 'sent'; // Default class for user messages

        if (loggedInAgent) {
            senderName = loggedInAgent;  // Set to agent name if logged in
            messageClass = 'received';  // Set class to 'received' for agent messages
        }

        // Get current time and format it
        const timestamp = Date.now();
        const formattedTime = formatTime(timestamp);

        // Create the content with the username, message, and time
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const username = document.createElement('span');
        username.classList.add('username');
        username.textContent = `${senderName}: `;

        const messageText = document.createElement('span');
        messageText.textContent = message;

        const messageTime = document.createElement('span');
        messageTime.classList.add('message-time');
        messageTime.textContent = formattedTime;  // Add time

        messageContent.appendChild(username);
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);  // Append time

        messageContainer.classList.add(messageClass);  // Add class based on sender
        messageContainer.appendChild(messageContent);

        const messages = document.getElementById('messages');
        messages.appendChild(messageContainer);

        // Save message to Firebase Realtime Database
        const messagesRef = ref(db, 'messages');
        push(messagesRef, {
            sender: senderName,
            message: message,
            timestamp: timestamp
        });

        messageInput.value = '';  // Clear input field
        messages.scrollTop = messages.scrollHeight;  // Auto-scroll to the bottom
    }
}

// Fetch messages from Firebase and display in chat
const messagesRef = ref(db, 'messages');
onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';  // Clear previous messages

    for (const messageId in messages) {
        const message = messages[messageId];
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message', message.sender === loggedInAgent ? 'received' : 'sent');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const username = document.createElement('span');
        username.classList.add('username');
        username.textContent = `${message.sender}: `;

        const messageText = document.createElement('span');
        messageText.textContent = message.message;

        // Get the formatted time for each message
        const messageTime = document.createElement('span');
        messageTime.classList.add('message-time');
        messageTime.textContent = formatTime(message.timestamp);  // Format timestamp

        messageContent.appendChild(username);
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);  // Append time to message

        messageContainer.appendChild(messageContent);
        messagesContainer.appendChild(messageContainer);
    }

    // Auto-scroll to the bottom when new messages are added
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
