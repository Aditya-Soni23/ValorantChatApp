document.getElementById('riddle-answer').addEventListener('input', function() {
    let answer = document.getElementById('riddle-answer').value;
    if (answer === '9876') {
        alert('Correct! You cracked the code! Take a screenshot of this and DM CLOVE to recieve your 💰1000');
        // Here you can add code for whatever happens when they get it right.
    }
});
