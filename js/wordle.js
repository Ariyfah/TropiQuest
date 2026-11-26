const gameBoard = document.getElementById("gameBoard");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");
const wordLength = 5;
const maxAttempts = 6;
const rewards = [100, 80, 60, 40, 20, 10];
let currentRow = 0;
let words = [];
let validWords =[];
let secretWord = "";
let gameOver = false;
guessBtn.disabled = true;
restartBtn.disabled = true;

fetch("data/answer.json").then(response => response.json()).then(data => {
    words = data;
    secretWord = words[Math.floor(Math.random() * words.length)];

    return fetch("data/validWords.json");
}).then(response => response.json()).then(data => {
    validWords = data;
    guessBtn.disabled = false;
    restartBtn.disabled = false;
}).catch(error=>console.error("Cannot load words:",error));


for(let i=0; i < wordLength * maxAttempts;i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);

}


guessBtn.addEventListener("click",function(){

    if (gameOver || currentRow >= maxAttempts){
        return;
    }

    const guess = guessInput.value.toUpperCase().trim();
    if(guess.length !== wordLength){
        alert("Please enter a five-letter word!");
        return;
    }

    if(!validWords.includes(guess)&& !words.includes(guess)){
        alert("Not a valid word!");
        return;
    }

    const cells = document.querySelectorAll(".cell");
    const remainingLetters = secretWord.split("");

    for(let i = 0; i < wordLength; i++){
        const cellIndex = currentRow * wordLength + i;
        cells[cellIndex].textContent = guess[i];
        if (guess[i] === secretWord[i]){
            cells[cellIndex].classList.add("correct");
            remainingLetters[i] = null;
        }

    }

    for(let i = 0;i < wordLength; i++){
        const cellIndex = currentRow * wordLength + i;
        if(guess[i] === secretWord[i]){
            continue;
        }

        const letterIndex = remainingLetters.indexOf(guess[i]);
        if (letterIndex != -1){
            cells[cellIndex].classList.add("semi-correct");
            remainingLetters[letterIndex] = null;
        }else{
            cells[cellIndex].classList.add("incorrect");
        }
    }

    currentRow++;
    guessInput.value = "";

    if(guess === secretWord){
        gameOver = true;
        const reward =rewards[currentRow - 1];
        
        changeCoins(reward);
        

        alert("Congratulations! You won " +reward+" coins!");
    } else if(currentRow >= maxAttempts){
        alert("Game Over! The word was " + secretWord);
        gameOver = true;
    }
});

restartBtn.addEventListener("click",function(){
    currentRow = 0;
    gameOver = false;
    secretWord = words[Math.floor(Math.random() * words.length)];
    guessInput.value = "";
    const cells = gameBoard.querySelectorAll(".cell");
    cells.forEach(function(cell){
        cell.textContent = "";
        cell.classList.remove("correct","semi-correct","incorrect");
    });

});

