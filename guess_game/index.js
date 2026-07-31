const max = 20;
let zeroTotwenty = Math.floor(Math.random() * max); 
let guessCount = 0
let failCount = 0

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const message = document.getElementById('message');
const countSpan = document.getElementById('count');
const failCountSpan = document.getElementById('failCount');

guessBtn.addEventListener("click", function(){
    const userGuess = Number(guessInput.value)
    
    if(guessInput.value > 20){
        message.innerText = "Input number under 20!"
        return
    }

    failCount++
    failCountSpan.innerText = failCount;

    if(userGuess === zeroTotwenty){
        message.innerText = "Correct!"
        guessCount++
        countSpan.innerText = guessCount
        failCount = "0"
        failCountSpan.innerText = failCount 
        zeroTotwenty = Math.floor(Math.random() * max);
    }
    else if(userGuess < zeroTotwenty){
        message.innerText = "Too low!"
    }
    else{
        message.innerText = "Too high!"
    }
    guessInput = ""
})