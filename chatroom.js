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

// Fetch agent description from Firebase and send the response
function fetchAgentDescription(agentName) {
    const agentRef = ref(db, `agents/${agentName}`);

    onValue(agentRef, (snapshot) => {
        const agent = snapshot.val();

        if (agent && agent.description) {
            sendAgentDescription(agentName, agent.description);
        } else {
            console.log(`No description found for ${agentName}.`);
        }
    });
}

// Send the agent description message to the chat and save it to Firebase
function sendAgentDescription(agentName, description) {
    const audio = new Audio('gekko.mp3');
    audio.play()
    const botMessage = ` ${agentName}: ${description}`;

    // Push the bot's response to Firebase
    const messagesRef = ref(db, 'messages');
    push(messagesRef, {
        sender: 'Gekko', // Bot's name
        message: botMessage,
        timestamp: Date.now() // Current timestamp
    });
}

// Check if any agent name is mentioned in the message
function checkForAgent(messageText) {
    const agentNames = [
        "jett",
        "phoenix",
        "yoru",
        "self", // Gekko
        "brimstone",
        "sage",
        "sova",
        "viper",
        "cypher",
        "reyna",
        "killjoy",
        "raze",
        "omen",
        "breach",
        "skye",
        "astra",
        "kay/o",
        "chamber",
        "neon",
        "fade",
        "harbor",
        "deadlock",
        "clove",
        "tejo",
        "hi",
        "wrud",
        "play",
"help",
"scout",
"win",
"favorite",
"ready",
"chaos",
"control",
"hello", "team", "push",
 "defend", "enemy", "attack", "flash", "cover",
  "hold", "move", "smoke", "clear", "watch", "rotate",
   "plant", "defuse", "clutch", "nice", "boost", "peek",
   "lunch", "chill", "work", "study", "movie", "plans", "hangout", "text", "coffee", "weekend"


    ];
     // Add more agents as needed
    console.log(`Checking message: ${messageText}`); // Debugging

    agentNames.forEach(agentName => {
        if (messageText.includes(agentName)) {
            console.log(`Found agent: ${agentName}`); // Debugging
            fetchAgentDescription(agentName); // Fetch and show agent description
        }
    });
}

// Fetch messages from Firebase and display in chat
const messagesRef = ref(db, 'messages');
onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear previous messages

    for (const messageId in messages) {
        const message = messages[messageId];
        const messageContainer = document.createElement('div');





        if (message.sender === 'Gekko') {
            messageContainer.classList.add('message', 'gekko-message'); // Only Gekko's messages get this extra class
        
            // Create an img element for Gekko's icon
            const gekkoIcon = document.createElement('img'); // Use a descriptive name like `gekkoIcon`
            gekkoIcon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDLwtTIc20YCHrG4LXpngr_oZP-ueLH_yjCg&s'; // Replace with the actual path to your Gekko icon
            gekkoIcon.alt = 'Gekko';
            gekkoIcon.classList.add('gekko-icon'); // Add a class for Gekko's icon styling
        
            // Prepend the icon to Gekko's message
            messageContainer.prepend(gekkoIcon); // Use the variable `gekkoIcon` correctly
        } else if (message.sender === loggedInAgent) {
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
        messageTime.textContent = formatTime(message.timestamp); // Format timestamp

        messageContent.appendChild(username);
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime); // Append time to message

        messageContainer.appendChild(messageContent);
        messagesContainer.appendChild(messageContainer);
    }

    // Auto-scroll to the bottom when new messages are added
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Reference to the Firebase Realtime Database where agent data will be stored
const agentRef = ref(db, 'agents/');

// Add agent descriptions
set(agentRef, {
    jett: {
        description: "Jett is a duelist agent known for her mobility and high damage output."
    },
    phoenix: {
        description: "Phoenix is a duelist who specializes in self-sustain and area denial."
    },
    yoru: {
        description: "Yoru is a duelist who can teleport and create decoys to confuse enemies."
    },
    self: {
        description: "Gekko is a controller who can use his abilities to disrupt and control the battlefield."
    },
    brimstone: {
        description: "Joining from the U.S.A., Brimstone's orbital arsenal ensures his squad always has the advantage. His ability to deliver utility precisely and safely make him the unmatched boots-on-the-ground commander."
    },
    sage: {
        description: "Sage creates safety for herself and her team wherever she goes. Able to revive fallen friends and stave off forceful assaults, she provides a calm center to a hellish battlefield."
    },
    sova: {
        description: "Born from the eternal winter of Russia's tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision. His custom bow and incredible scouting abilities ensure that even if you run, you cannot hide."
    },
    viper: {
        description: "The American chemist, Viper, deploys an array of poisonous chemical devices to control the battlefield and cripple the enemy's vision. If the toxins don't kill her prey, her mind games surely will."
    },
    cypher: {
        description: "Cypher is a one-man surveillance network who keeps tabs on the enemy's every move. No secret is safe. No maneuver goes unseen. Cypher is always watching."
    },
    reyna: {
        description: "Forged in the heart of Mexico, Reyna dominates single combat, popping off with each kill she scores. Her capability is only limited by her raw skill, making her highly dependent on performance."
    },
    killjoy: {
        description: "The genius from Germany, Killjoy secures the battlefield with ease using her arsenal of inventions. If the damage from her gear doesn’t stop her enemies, the debuff her robots deliver will help her crush them."
    },
    raze: {
        description: "Raze explodes out of Brazil with her big personality and even bigger guns. With her blunt-force-trauma playstyle, she excels at flushing entrenched enemies and clearing tight spaces with a generous dose of boom."
    },
    omen: {
        description: "A phantom of a memory, Omen hunts in the shadows. He renders enemies blind, teleports across the field, then lets paranoia take hold as his foe scrambles to uncover where he might strike next."
    },
    breach: {
        description: "Breach, the bionic Swede, fires powerful, targeted kinetic blasts to aggressively clear a path through enemy ground. The damage and disruption he inflicts ensures no fight is ever fair."
    },
    skye: {
        description: "Hailing from Australia, Skye and her band of beasts trail-blaze the way through hostile territory. With her creations hampering the enemy and her power to heal others, the team is strongest and safest by Skye’s side."
    },
    astra: {
        description: "Ghanaian agent Astra harnesses the energies of the cosmos to reshape battlefields to her whim. With full command of her astral form and a talent for deep strategic foresight, she always eviscerates her enemies’ plans."
    },
    kayo: {
        description: "KAY/O is a machine of war built for a single purpose: neutralizing radiants. His power to suppress enemy abilities cripples his opponents' capacity to fight back, securing him and his allies the ultimate edge."
    },
    chamber: {
        description: "Well-dressed and well-armed, French weapons designer Chamber deploys deadly precision to take out targets from afar. With a contingency built for every plan, he outmaneuvers any play his enemies make."
    },
    neon: {
        description: "Hailing from Manila in the Philippines, Neon surges forward at shocking speeds, discharging bursts of bioelectric radiance as fast as her body generates it. She races ahead to catch enemies off guard, then strikes them down quicker than lightning."
    },
    fade: {
        description: "Turkish bounty hunter Fade unleashes the power of raw nightmare to seize enemy secrets. Revealing their deepest fears, she stalks down targets and finishes them off in the dark."
    },
    harbor: {
        description: "Hailing from India’s coast, Harbor storms the field wielding ancient technology with dominion over water. He unleashes frothing rapids and crushing waves to shield his allies and pummel those that oppose him."
    },
    deadlock: {
        description:"Deadlock is a Sentinel agent from Norway who uses advanced technology to control the battlefield. Her abilities include blocking enemy advances and protecting her team with strategic gadgets."
    },
    clove: {
        description:"Clove is a young Scottish agent possessing unprecedented powers among Radiants, specifically the ability to control the essences of life and immortality. This unique skill set makes Clove a formidable presence on the battlefield."
    },
    tejo: {
        description:"Tejo, hailing from Colombia, is an Initiator agent introduced in January 2025. His kit emphasizes flushing out enemies using a top-down approach, requiring proactive and strategic thinking to clear paths for his team."
    },
    hi: {
        description:"hello my guy!"
    },
    wrud: {
        description:"planting the spike!"
    },
    play: {
        description: "Ready to go! Let's win this round!"
    },
    help: {
        description: "I'm always ready to assist. Let me know what you need!"
    },
    scout: {
        description: "I'm out scouting for enemies, stay close!"
    },
    win: {
        description: "Let's win this round, team!"
    },
    favorite: {
        description: "I love every map, but Icebox is where I really shine!"
    },
    ready: {
        description: "I'm always ready, let's do this!"
    },
    chaos: {
        description: "Born from chaos, I'm ready for anything!"
    },
    control: {
        description: "I disrupt the battlefield and control the chaos!"
    },
    hello: {
        description: "What's up? Ready to dominate!"
    },
    team: {
        description: "Let's stick together and win this!"
    },
    push: {
        description: "Let's push forward and make some noise!"
    },
    defend: {
        description: "I'm holding the line, no one gets through!"
    },
    enemy: {
        description: "Enemies spotted, watch out!"
    },
    attack: {
        description: "Time to attack, let's do it!"
    },
    flash: {
        description: "Flashing, eyes on the target!"
    },
    cover: {
        description: "Covering you, go for the kill!"
    },
    hold: {
        description: "Hold your position, don't let them push!"
    },
    move: {
        description: "Moving out, stay close!"
    },
    smoke: {
        description: "Smoking the area, stay behind!"
    },
    clear: {
        description: "All clear, move forward!"
    },
    watch: {
        description: "Watch your back, they might be sneaking!"
    },
    rotate: {
        description: "Rotating to another site, follow me!"
    },
    plant: {
        description: "I'm planting the spike, cover me!"
    },
    defuse: {
        description: "I'm defusing, protect me!"
    },
    clutch: {
        description: "Clutch play, I got this!"
    },
    nice: {
        description: "Nice job, team! Let's keep it up!"
    },
    boost: {
        description: "Boosting, get ready for the advantage!"
    },
    peek: {
        description: "Peeking, get ready to strike!"
    },
    lunch: {
        description: "Let's grab some lunch, I'm starving!"
    },
    chill: {
        description: "Just chilling, what about you?"
    },
    work: {
        description: "Got some work to do, but I'll take a break soon."
    },
    study: {
        description: "Studying hard, gotta pass that test!"
    },
    movie: {
        description: "Let's watch a movie later, got any suggestions?"
    },
    plans: {
        description: "Got any plans for the day?"
    },
    hangout: {
        description: "Let's hang out sometime this weekend!"
    },
    text: {
        description: "I'll text you later, need to finish this first."
    },
    coffee: {
        description: "I could really use a coffee right now!"
    },
    weekend: {
        description: "Weekend vibes! What are you up to?"
    }
    
    
    
});

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", function() {
    // Clear both localStorage and sessionStorage to remove logged-in agent
    localStorage.removeItem('loggedInAgent');
    sessionStorage.removeItem('loggedInAgent');

    // Redirect the user back to the login page
    window.location = "index.html"; // Update the path if your login page URL differs
});






















