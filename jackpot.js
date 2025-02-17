// Jackpot Challenge Game Logic

document.getElementById('submitBtn').addEventListener('click', function() {
    let answer = document.getElementById('riddleAnswer').value.toLowerCase();
    let result = document.getElementById('result');
    
    // Check answer
    if (answer === 'piano') {  // The answer to the riddle is "piano"
        result.textContent = "Correct! 🎉 Let's see your pin!";
        result.style.color = 'green';
        
        // Show the pin section after correct answer
        document.getElementById('pin-section').classList.remove('hidden');
        
        // Hide the riddle question and input
        document.querySelector('.riddle').style.display = 'none';
        document.getElementById('riddleAnswer').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'none';
    } else {
        result.textContent = "Wrong answer! Try again.";
        result.style.color = 'red';
    }
});

function claimPrize() {
    alert("Congratulations! You've won 1000 Credits! 🎉");
    // You can add your logic here to actually update the user's credit balance
    window.location.href = "chatroom.html";  // Redirect to the main chat room or home page
}
