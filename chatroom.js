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
        const timestamp = Date.now();

        // Save message to Firebase Realtime Database
        const messagesRef = ref(db, 'messages');
        push(messagesRef, {
            sender: loggedInAgent || 'User', // Default to 'User' if not logged in
            message: message,
            timestamp: timestamp
        });

        messageInput.value = ''; // Clear input field
        checkForAgent(message.toLowerCase()); // Check for agent in the message
        
    }
}


const messagesRef = ref(db, 'messages');


onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear previous messages

    for (const messageId in messages) {
        const message = messages[messageId];
        const messageContainer = document.createElement('div');

        if (message.sender === loggedInAgent) {
            messageContainer.classList.add('message', 'received');
        } else {
            messageContainer.classList.add('message', 'sent');
        }

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const username = document.createElement('span');
        username.classList.add('username');
        username.textContent = `${message.sender}: `;

        const messageText = document.createElement('span');
        messageText.textContent = message.message;

        const messageTime = document.createElement('span');
        messageTime.classList.add('message-time');
        messageTime.textContent = formatTime(message.timestamp);

        messageContent.appendChild(username);
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);

        messageContainer.appendChild(messageContent);
        messagesContainer.appendChild(messageContainer);
    }

    // Auto-scroll to the bottom when new messages are added
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});


// Logout functionality
document.getElementById("logoutButton").addEventListener("click", function() {
    // Clear both localStorage and sessionStorage to remove logged-in agent
    localStorage.removeItem('loggedInAgent');
    sessionStorage.removeItem('loggedInAgent');

    // Redirect the user back to the login page
    window.location = "index.html"; // Update the path if your login page URL differs
});


document.getElementById("joinVoiceChatBtn").addEventListener("click", function() {
    window.open("https://meet.google.com/cdg-ntnc-gyv", "_blank");
});


// Get elements
const badgeButton = document.getElementById("badgeButton");
const badgePopup = document.getElementById("badgePopup");
const closePopup = document.querySelector(".close");

// Show popup when button is clicked
badgeButton.addEventListener("click", () => {
    badgePopup.style.display = "flex";
});

// Hide popup when close button is clicked
closePopup.addEventListener("click", () => {
    badgePopup.style.display = "none";
});

// Hide popup when clicking outside the content box
window.addEventListener("click", (e) => {
    if (e.target === badgePopup) {
        badgePopup.style.display = "none";
    }
});


const themebadgeButton = document.getElementById("themebadgeButton");
const themebadgePopup = document.getElementById("themebadgePopup");
const themeclosePopup = document.querySelector(".themeclose");

// Show popup when button is clicked
themebadgeButton.addEventListener("click", () => {
    themebadgePopup.style.display = "flex";
});

// Hide popup when close button is clicked
themeclosePopup.addEventListener("click", () => {
    themebadgePopup.style.display = "none";
});

// Hide popup when clicking outside the content box
window.addEventListener("click", (e) => {
    if (e.target === themebadgePopup) {
        themebadgePopup.style.display = "none";
    }
});



const storeButton = document.getElementById("storeButton");
const storePopup = document.getElementById("storePopup");
const storeclosePopup = document.querySelector(".storeclose");

// Show popup when button is clicked
storeButton.addEventListener("click", () => {
    storePopup.style.display = "flex";
});

// Hide popup when close button is clicked
storeclosePopup.addEventListener("click", () => {
    storePopup.style.display = "none";
});

// Hide popup when clicking outside the content box
window.addEventListener("click", (e) => {
    if (e.target === storePopup) {
        storePopup.style.display = "none";
    }
});


const earnstoreButton = document.getElementById("earnstoreButton");
const earnstorePopup = document.getElementById("earnstorePopup");
const earnstoreclosePopup = document.querySelector(".earnstoreclose");

// Show popup when button is clicked
earnstoreButton.addEventListener("click", () => {
    earnstorePopup.style.display = "flex";
});

// Hide popup when close button is clicked
earnstoreclosePopup.addEventListener("click", () => {
    earnstorePopup.style.display = "none";
});

// Hide popup when clicking outside the content box
window.addEventListener("click", (e) => {
    if (e.target === earnstorePopup) {
        earnstorePopup.style.display = "none";
    }
});


const stockButton = document.getElementById("stockButton");
const stockPopup = document.getElementById("stockPopup");
const stockclosePopup = document.querySelector(".stockclose");

// Show popup when button is clicked
stockButton.addEventListener("click", () => {
    stockPopup.style.display = "flex";
});

// Hide popup when close button is clicked
stockclosePopup.addEventListener("click", () => {
    stockPopup.style.display = "none";
});

// Hide popup when clicking outside the content box
window.addEventListener("click", (e) => {
    if (e.target === stockPopup) {
        stockPopup.style.display = "none";
    }
});


// Get the buttons
const theme1Button = document.getElementById("theme1");
const theme2Button = document.getElementById("theme2");
const theme3Button = document.getElementById("theme3");
const theme4Button = document.getElementById("theme4");
const theme5Button = document.getElementById("theme5");
const theme6Button = document.getElementById("theme6");
const theme7Button = document.getElementById("theme7");
const theme8Button = document.getElementById("theme8");
const theme9Button = document.getElementById("theme9");
const theme10Button = document.getElementById("theme10");
const theme11Button = document.getElementById("theme11");
const theme12Button = document.getElementById("theme12");

theme1Button.addEventListener("click", () => {
    // Sunset Vibes
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ff4b1f, #1fddff)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #2193b0, #6dd5ed)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #ff9a9e, #fad0c4)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #36d1dc, #5b86e5)";
});

theme2Button.addEventListener("click", () => {
    // Ocean Blues
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #1e3c72, #2a5298)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #00c6ff, #0072ff)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #30cfd0, #330867)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #56ab2f, #a8e063)";
});

theme3Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ff00ff, #00ffff)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #ff512f, #dd2476)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #f12711, #f5af19)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #12c2e9, #c471ed, #f64f59)";
});


theme4Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #232526, #414345)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #434343, #000000)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #141e30, #243b55)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #485563, #29323c)";
});


theme5Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ffefba, #ffffff)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #f4c4f3, #fc67fa)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #decba4, #3e5151)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #c94b4b, #4b134f)";
});


theme6Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #fc4a1a, #f7b733)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #ff9a9e, #fecfef)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #ff7eb3, #ff758c)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #ee9ca7, #ffdde1)";
});


theme7Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #12c2e9, #c471ed, #f64f59)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #833ab4, #fd1d1d, #fcb045)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #ff6a00, #ee0979)";
});


theme8Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #11998e, #38ef7d)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #56ab2f, #a8e063)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #43cea2, #185a9d)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #67b26f, #4ca2cd)";
});


theme9Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ff9a9e, #fad0c4)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #ffb6c1, #fbc2eb)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #fcb045, #ff9a9e)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #ffdde1, #f4c4f3)";
});


theme10Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #20002c, #cbb4d4)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #ff00ff, #00ffff)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #c94b4b, #4b134f)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #00c6ff, #0072ff)";
});
theme11Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #e6e9f0, #eef1f5)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #36d1dc, #5b86e5)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #30cfd0, #330867)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #00c6ff, #0072ff)";
});
theme12Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ff512f, #dd2476)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #00c6ff, #0072ff)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #f12711, #f5af19)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #12c2e9, #c471ed, #f64f59)";
});




function sendBuyRequest(message) {
    const timestamp = Date.now();

    // Save message to Firebase Realtime Database
    const messagesRef = ref(db, 'messages');
    push(messagesRef, {
        sender: loggedInAgent || 'User', // Default to 'User' if not logged in
        message: message,
        timestamp: timestamp
    });

    // Optionally, you can handle other actions (e.g., updating the UI) after sending the request
}

// Get all the buy badge buttons
const buyButtons = document.querySelectorAll('.buybadge');

// Add click event listeners to each button
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the badge name and price from the button's data attributes
        const badge = button.getAttribute('data-badge');
        const price = button.getAttribute('data-price');
        
        // Construct the buy request message
        const storemessage = `[BUY REQUEST] - Raze, buy me ${badge} for 💰${price}`;
        
        // Send the message to the chatroom (Assuming a function `sendBuyRequest` exists to send to chat)
        sendBuyRequest(storemessage);
        storePopup.style.display = "none";
    });
});

const showbadge = document.getElementById("showbadge");

showbadge.addEventListener("click", () => {
    // Select all the agent and hide elements
    const agents = document.querySelectorAll('.agent');
    const hides = document.querySelectorAll('.hide');

    // Check if badges are already visible or hidden
    const badgesVisible = agents[0].style.height === '800px'; // Check height of the first agent to determine visibility

    if (badgesVisible) {
        // If badges are visible, hide them
        agents.forEach(agent => {
            agent.style.height = '53px'; // Collapse to original height
        });

        hides.forEach(hide => {
            hide.style.display = 'none'; // Hide the content
        });

        showbadge.textContent = "Show Badges"; // Change text to "Show Badge"
    } else {
        // If badges are hidden, show them
        agents.forEach(agent => {
            agent.style.height = '800px'; // Expand to new height
        });

        hides.forEach(hide => {
            hide.style.display = 'block'; // Show the content
        });

        showbadge.textContent = "Close Badges"; // Change text to "Close Badge"
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const messagesContainer = document.getElementById('messages');

    // Define players with their profile picture URLs, badges, styles, and animations
    const players = {
        "Clove🛠️": {
            profilePic: "clovepfp.png",
            badge: "DIAMOND 💎V",
            gradient: "linear-gradient(135deg, #12c2e9, #c471ed);",
            badgeColor: "rgb(81, 255, 0)", // Badge color
            animation: "glow 10s infinite alternate",
        },
        "Yoru⭐": {
            profilePic: "yoru.png",
            badge: "GOAT🐐🔥",
            gradient: "linear-gradient(135deg, #06beb6, #553c9a);",
            badgeColor: "rgb(81, 255, 0)",
            animation: "glow 10s infinite alternate"
        },
        "Tejo⭐": {
            badge: "Star Member⭐",
            gradient: "linear-gradient(135deg, #ff7e5f, #feb47b);",
            badgeColor: "rgb(81, 255, 0)",
        },
    };

    function stylePremiumMessages() {
        const messageElements = messagesContainer.getElementsByClassName('message-content');

        for (const element of messageElements) {
            const usernameSpan = element.querySelector('.username');
            if (!usernameSpan) continue;

            for (const player in players) {
                if (usernameSpan.textContent.startsWith(player + ":")) {
                    const parent = element.parentElement;
                    const playerClass = player.toLowerCase().replace(/[^a-z]/g, '');

                    // Add player-specific class
                    parent.classList.add('premium-message', playerClass);

                    // Add profile picture if not already added
                    if (!parent.querySelector('.profile-pic') && players[player].profilePic) {
                        const profilePic = document.createElement('img');
                        profilePic.src = players[player].profilePic;
                        profilePic.classList.add('profile-pic');
                        usernameSpan.prepend(profilePic);
                    }

                    if (!parent.querySelector('.badgen')) {
                        const badge = document.createElement('span');
                        badge.textContent = ` ${players[player].badge}`;
                        badge.classList.add('badgen', `badgen-${playerClass}`);
                        usernameSpan.appendChild(badge);

                        // Add ':' after the badge and space before the message
                        const separator = document.createElement('span');
                        separator.textContent = ": ";
                        usernameSpan.appendChild(separator);
                    }
                }
            }
        }

        scrollToBottom(); // Ensure it scrolls to the latest message
    }

    // Inject dynamic CSS styles
    function injectDynamicStyles() {
        let styles = `
        @keyframes glow {
    0%, 80% { box-shadow: 0 0 5px yellow; }
    90% { box-shadow: 0 0 20px yellow; }
    100% { box-shadow: 0 0 5px yellow; }
}

            
            .sent:hover {
                box-shadow: 0 0 15px cyan;
                text-shadow: 0 0 10px cyan, 0 0 20px cyan, 0 0 30px cyan;
            }
        `;

        for (const player in players) {
            const playerClass = player.toLowerCase().replace(/[^a-z]/g, '');
            styles += `
    .premium-message.${playerClass} {
        background: ${players[player].gradient};
        border-color: ${players[player].badgeColor};
        ${players[player].animation ? `animation: ${players[player].animation};` : ""}
    }
    .badgen-${playerClass} {
        background-color: ${players[player].badgeColor};
    }
`;

        }

        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Scroll to the latest message
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    injectDynamicStyles(); // Apply styles dynamically
    const observer = new MutationObserver(stylePremiumMessages);
    observer.observe(messagesContainer, { childList: true });

    scrollToBottom(); // Ensure it scrolls on initial load
});



document.getElementById("recruitBtn").addEventListener("click", function() {
    document.getElementById("recruitBox").style.display = "block";
});

document.querySelector(".closerec").addEventListener("click", function() {
    document.getElementById("recruitBox").style.display = "none";
});

document.getElementById("confirmAgent").addEventListener("click", function() {
    let agent = document.getElementById("agentSelect").value;
    const storrec = `Hey ${agent} Lets play Valorant right now!`;
    
    sendBuyRequest(storrec);
    document.getElementById("recruitBox").style.display = "none";
});


