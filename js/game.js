const userScore_span = document.getElementById("user-score");
const cpuScore_span = document.getElementById("cpu-score");
const round = document.querySelector(".round");
const restart = document.getElementById("restart");
const result = document.getElementById("result")
const modal = document.querySelector(".modal");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");
const start = document.getElementById("start");
const options = document.querySelectorAll(".options button");
const userHand = document.querySelector(".user-hand");
const cpuHand = document.querySelector(".cpu-hand");
const hands = document.querySelectorAll(".hands img");
const pname = document.querySelector(".pname");
const cname = document.querySelector(".cname");

let userScore = 0;
let cpuScore = 0;
let rounds = 0;

//Defined The Path For Audio And Give The Audio Values For The Variables
function playTied() {

    const TiedAudio = new Audio("sound/beep.mp3");
    TiedAudio.play();

};

function playWin() {

    const WinAudio = new Audio("sound/win.mp3");
    WinAudio.play();

};

function playLose() {

    const LoseAudio = new Audio("sound/lose.mp3");
    LoseAudio.play();

};

//Computer Choice
function getCpuChoice() {
    //Computer Options
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    const cpuChoice = choices[randomNumber];
    return cpuChoice;

}

function win(userChoice, cpuChoice) {

    userScore++;
    //Update Things
    setTimeout(() => {
        userScore_span.innerHTML = userScore;
        cpuScore_span.innerHTML = cpuScore;
        cname.innerHTML = cpuChoice;
        pname.innerHTML = userChoice;
        start.innerHTML = 'Woohoo! You won. How about another game?';
        result.innerHTML = `<img src="img/win.png">`;
        modal.style.display = 'block';
        //Start The Win Audio
        playWin();
    }, 2500);

    //Show Up The Win Image
    setTimeout(() => {
        modal.style.display = 'none';
    }, 4500);

}

function lose(userChoice, cpuChoice) {

    cpuScore++;
    //Update Things
    setTimeout(() => {
        userScore_span.innerHTML = userScore;
        cpuScore_span.innerHTML = cpuScore;
        cname.innerHTML = cpuChoice;
        pname.innerHTML = userChoice;
        start.innerHTML = 'You lost!';
        result.innerHTML = `<img src="img/lose.png">`;
        modal.style.display = 'block';
        //Start The Lose Audio
        playLose();
    }, 2500);

    //Show Up The Lose Image
    setTimeout(() => {
        modal.style.display = 'none';
    }, 4500);

}

function tied(userChoice, cpuChoice) {
    //Update Things
    setTimeout(() => {
        userScore_span.innerHTML = userScore;
        cpuScore_span.innerHTML = cpuScore;
        cname.innerHTML = cpuChoice;
        pname.innerHTML = userChoice;
        start.innerHTML = `<p>It's a tied, Try Again?</p>`;
        //Start The Tied Audio
        playTied();
    }, 2500);

}

//Here is where we call compare hands
function play(userChoice, cpuChoice) {

    rounds++;
    round.innerHTML = rounds;

    switch (userChoice + cpuChoice) {
        case 'RockScissors':
        case 'PaperRock':
        case 'ScissorsPaper':
            win(userChoice, cpuChoice);
            console.log("win");
            break;
        case 'RockPaper':
        case 'PaperScissors':
        case 'ScissorsRock':
            lose(userChoice, cpuChoice);
            console.log("lose");
            break;
        case 'RockRock':
        case 'PaperPaper':
        case 'ScissorsScissors':
            tied(userChoice, cpuChoice);
            console.log("tied");
            break;
    }

}

//Animation
hands.forEach(hand => {

    hand.addEventListener("animationend", function () {
        this.style.animation = "";
    });

});

//Start The Match
function main() {

    options.forEach(option => {

        option.addEventListener("click", function () {
            //Get Computer Choice
            const cpuChoice = getCpuChoice();
            //Send The Values For Compare By play function
            play(this.textContent, cpuChoice);
            setTimeout(() => {
                //Update Images
                userHand.src = `img/${this.textContent}.png`;
                cpuHand.src = `img/${cpuChoice}.png`;
            }, 2000);
            //Animation
            userHand.style.animation = "shakeuser 2s ease";
            cpuHand.style.animation = "shakecpu 2s ease";

        });

    });

}

//Close The Modal
function clearModal(e) {

    if (e.target == modal) {
        modal.style.display = "none";
    }

}

window.addEventListener('click', clearModal);

//Restart The Game
function restartGame() {

    userScore = 0;
    cpuScore = 0;
    rounds = 0;
    userScore_span.innerHTML = userScore;
    cpuScore_span.innerHTML = cpuScore;
    round.innerHTML = rounds;
    cname.innerHTML = 'C';
    pname.innerHTML = 'P';
    start.innerHTML = 'Make your choice!';
    userHand.src = `img/Rock.png`;
    cpuHand.src = `img/Rock.png`;

}

restart.addEventListener('click', restartGame);

//Start The Match
main();