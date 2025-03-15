const agentPreviews = {
    "Jett🌸": "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/94d795777116652279c4de73ba19976639c12f5d-1920x1080.jpg?auto=format&fit=fill&q=80&w=1082", // Jett image
    "Phoenix": "https://www.esports.net/wp-content/uploads/2022/07/valorant-phoenix-agent-e1727691652663.jpg", // Phoenix image URL (fill this in)
    "Sage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXqcQQYESkQEZL-XmoBBBz7_-4XJIcj3QMKQ&s", // Sage image URL (fill this in)
    "Reyna🌸": "https://www.exitlag.com/blog/wp-content/uploads/2024/08/Mastering-Reyna-In-Valorant.webp", // Reyna image URL (fill this in)
    "Omen": "https://images.alphacoders.com/114/1149362.jpg", // Omen image URL (fill this in)
    "Raze": "https://staticg.sportskeeda.com/editor/2023/06/4ca3b-16858121505852-1920.jpg", // Raze image URL (fill this in)
    "Brimstone📱": "https://www.zleague.gg/theportal/wp-content/uploads/2023/04/Valorant-Brimstone-title-card-aspect-ratio-2-1.jpg", // Brimstone image URL (fill this in)
    "Killjoy": "https://i.ytimg.com/vi/ua-iIRQDY8g/maxresdefault.jpg", // Killjoy image URL (fill this in)
    "Viper": "https://img.redbull.com/images/c_limit,w_1500,h_1000/f_auto,q_auto/redbullcom/2021/5/31/zxwpi7hkm1up0nd0p8lg/valorant-agent-viper", // Viper image URL (fill this in)
    "Sova": "https://img.redbull.com/images/c_crop,w_3840,h_1920,x_0,y_0/c_auto,w_1200,h_600/f_auto,q_auto/redbullcom/2021/4/14/lyuguphp3zyhcxdvyfat/valorant-sova", // Sova image URL (fill this in)
    "Cypher🌎": "https://staticg.sportskeeda.com/editor/2023/05/50e4c-16851909040301-1920.jpg", // Cypher image URL (fill this in)
    "Yoru⭐": "https://cdn-wp.thesportsrush.com/2023/06/7dea8bd2-untitled-design-2023-06-05t224213.403.jpg?format=auto&w=3840&q=75", // Yoru image URL (fill this in)
    "Clove🛠️": "https://imageio.forbes.com/specials-images/imageserve/65ff3fefa4d4cfc35a9fc1fe/The-key-art-for-Valorant-agent-Clove/960x0.jpg?format=jpg&width=960", // KAY/O image URL (fill this in)
    "Tejo⭐": "https://xxboxnews.blob.core.windows.net/prod/sites/2/2024/12/VAL_XB_A27_XboxWireTejoKeyArt_3840x2160-91fcae4fd9539e78bca7.jpg", // Skye image URL (fill this in)
    "Neon": "https://cdn.mos.cms.futurecdn.net/sXdZCSF4UiwhsaJxLQ76xY-1200-80.png", // Neon image URL (fill this in)
    "Viper💻": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrNfRiJ-oTZuSXs9qqcB9gjvH9j3TmsW5gw&s"
};

function showAgentPreview() {
    const agent = document.getElementById("agent").value;
    const previewDiv = document.getElementById("agentPreview");

    if (agent) {
        previewDiv.innerHTML = `<img src="${agentPreviews[agent]}" alt="${agent} Preview">`;
    } else {
        previewDiv.innerHTML = '';
    }
}

// Define a dictionary for agent-password pairs
const agentPasswords = {
    "Jett🌸": "blade45", // Jett password
    "Phoenix": "fire64", // Phoenix password
    "Sage": "heal78", // Sage password
    "Reyna🌸": "empress53", // Reyna password
    "Omen": "teleport69", // Omen password
    "Raze": "blast22", // Raze password
    "Brimstone📱": "smoke99", // Brimstone password
    "Killjoy": "supress21", // Killjoy password
    "Viper": "toxic90", // Viper password
    "Sova": "bow88", // Sova password
    "Cypher🌎": "position17", // Cypher password
    "Yoru⭐": "drift55", // Updated password for Yoru (please ensure it's correct)
    "Clove🛠️": "revive23", // Clove password
    "Tejo⭐": "missile55", // Tejo password
    "Neon": "sprint34", // Neon password
    "Viper💻": "toxic47"
};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the form from submitting and reloading the page

    const agent = document.getElementById("agent").value;
    const password = document.getElementById("password").value;

    console.log(`Agent: ${agent}, Password: ${password}`); // Debugging

    // Check if the agent and password are valid
    if (!agent || !password) {
        alert("Please select an agent and enter a password.");
        return;
    }

    // Compare the entered password with the stored password
    if (agentPasswords[agent] === password) {
        // Store the logged-in agent's name in sessionStorage
        sessionStorage.setItem('loggedInAgent', agent);
        localStorage.setItem('loggedInAgent', agent); // This stores the agent in localStorage

        alert(`Successfully logged in as ${agent}! Redirecting to chatroom...`);

        // Redirect to the chatroom (you can change the URL as needed)
        window.location.href = "chatroom.html"; // replace with the actual chatroom URL
    } else {
        alert("Wrong password. Please try again.");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is already logged in by looking for loggedInAgent in localStorage
    const loggedInAgent = localStorage.getItem('loggedInAgent');
    console.log("Logged-in agent:", loggedInAgent);  // Debugging: Check what is stored

    if (loggedInAgent) {
        // If the agent is found in localStorage, redirect to the chatroom
        sessionStorage.setItem('loggedInAgent', loggedInAgent);  // Set the agent for the session
        window.location.href = "chatroom.html"; // Redirect to the chatroom
    }
});
