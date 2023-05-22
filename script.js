var questions = [
    {
        question: "The red-billed quelea is the world's most abundant bird. On which continent is it found?",
        possibleAnswers: [
            "Europe",
            "South America",
            "Asia",
        ],
        correctAnswer: "Africa",
    },
    {
        question: "Lundy Island is particularly known for being home to which birds?",
        possibleAnswers: [
            "Golden Eagles",
            "Snowy Owls",
            "Penguins",
        ],
        correctAnswer: "Puffins",
    },
    {
        question: "What is another name for a gnu?",
        possibleAnswers: [
            "viciousbeest",
            "Angrebeest",
            "Madebeest",
        ],
        correctAnswer: "Wildebeest",
    },
    {
        question: "Which bird's name derives from the Aboriginal for 'Good cockatoo'?",
        possibleAnswers: [
            "Sparrow",
            "Heron",
            "Cassowary",
        ],
        correctAnswer: "Budgerigar",
    },
    {
        question: "Which of these birds can fly?",
        possibleAnswers: [
            "Rhea",
            "Emu",
            "Kiwi",
        ],
        correctAnswer: "Kookaburra",
    },
    {
        question: "Confusingly, what is the predominant color of the female Black Redstart?",
        possibleAnswers: [
            "Orange",
            "Brown",
            "White",
        ],
        correctAnswer: "Grey",
    },
    {
        question: "Where do Long-eared Owls live?",
        possibleAnswers: [
            "On the river bed",
            "Underground",
            "Buildings",
        ],
        correctAnswer: "In nests stolen from other birds",
    },
    {
        question: "The black petrel, now an endangered species, is native to which country?",
        possibleAnswers: [
            "Japan",
            "Brazil",
            "India",
        ],
        correctAnswer: "New Zealand",
    },
    {
        question: "Which of these birds is NOT native to the UK?",
        possibleAnswers: [
            "Kittiwake",
            "Kestrel",
            "Kingfisher",
        ],
        correctAnswer: "Kookaburra",
    },
    {
        question: "The Goliath Bird Eater is the world's largest species of which creature?",
        possibleAnswers: [
            "Scorpion",
            "Snake",
            "Cat",
        ],
        correctAnswer: "Spider",
    },
]

var timerEl = document.querySelector("#remaining");
var start = document.querySelector("#start");
var playEl = document.querySelector("#play");
var quiz = document.querySelector("#quiz");
var question = document.querySelector("#quest-cont");
var answerOptions = document.querySelectorAll(".ans-opt");
var answerA = document.querySelector("#ans-a");
var answerB = document.querySelector("#ans-b");
var answerC = document.querySelector("#ans-c");
var answerD = document.querySelector("#ans-d");
var answer = document.querySelector("#answer");
var end = document.querySelector("#end");
var submit = document.querySelector("#submit-btn");
var finalEl = document.querySelector("#final");
var scoresPage = document.querySelector("#score-page");
var feathersEl = document.querySelector("#feathers");
var listEl = document.querySelector("#list");
var initialsInput = document.querySelector("#in-input");
var scoresEl = document.querySelector("#scores");
var back = document.querySelector("#back");
var resetEl = document.querySelector("#reset");
var isPlaying = false;
var currentQuestion = 0;
var remaining;
var time;
var quizLength;
var scoresArr; 

// Storage
var storedScores = localStorage.getItem("stor-scor");
if(storedScores === null){
    scoresArr = [];
}else{
    scoresArr = JSON.parse(storedScores);
}


// timer
function quizTimer(playTime){
    remaining = playTime;

    quizLength = setInterval(function(){
       remaining--;
        timerEl.textContent = remaining;

        if (remaining <= 0){
            // if time runs out, go to end screen
            goEndScreen();
        }

    }, 1000);
}

// show start screen, hide other screens
function startQuiz(){
    start.classList.remove("hidden");
    quiz.classList.add("hidden");
    scoresPage.classList.add("hidden");
    end.classList.add("hidden");
}

// start quiz 
function playQuiz(){

    start.classList.add("hidden");
    quiz.classList.remove("hidden");
    scoresPage.classList.add("hidden");
    end.classList.add("hidden");
    
    // set timer
    quizTimer(60);
    timerEl.textContent = remaining;
    answer.textContent = ""
    currentQuestion = 0;
    nextQuestion();
}


function nextQuestion(){
    var newAnswerArr = [];
    
    // shuffle correct answer 
    for (var i = 0; i < questions[currentQuestion].possibleAnswers.length; i++) {
        newAnswerArr.push(questions[currentQuestion].possibleAnswers[i]);
    }
    newAnswerArr.push(questions[currentQuestion].correctAnswer);
    
    shuffleAnswerArray(newAnswerArr);
    
    // shuffle placement of options
    question.textContent = questions[currentQuestion].question;
    answerA.textContent = newAnswerArr[0];
    answerB.textContent = newAnswerArr[1];
    answerC.textContent = newAnswerArr[2];
    answerD.textContent = newAnswerArr[3];

}


function shuffleAnswerArray(newAnswerArr) {
    for (var i = newAnswerArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempArray = newAnswerArr[i];
        newAnswerArr[i] = newAnswerArr[j];
        newAnswerArr[j] = tempArray;
    }
}

// submit initials 
function handleFormSubmit(event){
    // prevent default 
    event.preventDefault();

    
    // submit button will not work unless initials are entered 
    if(initialsInput.value === ""){
        return;
    }

    var scoreObj = {
        initials: initialsInput.value,
        score: time,
    };
  
    scoresArr.push(scoreObj);  

    // leaderboard
    scoresArr.sort(function(a, b){
        if(a.score === b.score){
            return 0;
        }
        if(a.score > b.score){
            return -1;
        }
        if(a.score < b.score){
            return 1;
        }
    });

    // localStorage
    localStorage.setItem("stor-scor", JSON.stringify(scoresArr));

    goScoreScreen();
}

// prints results to screen
function renderScoresToList(scores){
    listEl.innerHTML = "";

    for (var i = 0; i < scores.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = scores[i].initials + " " + scores[i].score;
        listEl.append(listItem);
    }
    
}

// score screen
function goScoreScreen(){
    start.classList.add("hidden");
    quiz.classList.add("hidden");
    scoresPage.classList.remove("hidden");
    end.classList.add("hidden");

    renderScoresToList(scoresArr);
}

function goEndScreen(){
    start.classList.add("hidden");
    quiz.classList.add("hidden");
    scoresPage.classList.add("hidden");
    end.classList.remove("hidden");

    clearInterval(quizLength);

    if(remaining < 0){
        time = 0;
    }else{
        time = remaining;
    }

    finalEl.textContent = time;
}

// start game
playEl.addEventListener("click", function(){
    playQuiz();
})

// if option x (a-d) is correct display "Correct!"
// else display "Wrong!"
// go to next question


answerA.addEventListener("click", function(){
    if(answerA.textContent === questions[currentQuestion].correctAnswer){
        answer.textContent = "Correct!";
       remaining = remaining + 10;
    }else{
        answer.textContent = "Wrong!";
      remaining = remaining - 10;
    }
    currentQuestion++;

    // go to end screen if all questions are answered
    if(currentQuestion === questions.length){
        goEndScreen();
    }else{
        nextQuestion(questions[currentQuestion]);
    }
});


answerB.addEventListener("click", function(){
    if(answerB.textContent === questions[currentQuestion].correctAnswer){
        answer.textContent = "Correct!";
        remaining = remaining + 10;
    }else{
        answer.textContent = "Wrong!";
       remaining = remaining - 10;
    }
    currentQuestion++;

    // go to end screen if all questions are answered
    if(currentQuestion === questions.length){
       goEndScreen(); 
    }else{
    nextQuestion(questions[currentQuestion]);
    }
});


answerC.addEventListener("click", function(){
    if(answerC.textContent === questions[currentQuestion].correctAnswer){
        answer.textContent = "Correct!";
        remaining = remaining + 10;
    }else{
        answer.textContent = "Wrong!";
        remaining = remaining - 10;
    }
    currentQuestion++;

    // go to end screen if all questions are answered
    if(currentQuestion === questions.length){
        goEndScreen();
    }else{
    nextQuestion(questions[currentQuestion]);
    }
});


answerD.addEventListener("click", function(){
    if(answerD.textContent === questions[currentQuestion].correctAnswer){
        answer.textContent = "Correct!";
    remaining = remaining + 10;
    }else{
        answer.textContent = "Wrong!";
       remaining = remaining - 10;
    }
    currentQuestion++;

    // go to end screen if all questions are answered
    if(currentQuestion === questions.length){
        goEndScreen();
    }else{
    nextQuestion(questions[currentQuestion]);
    }
});

// submit button when clicked adds initials and scores to score screen
submit.addEventListener("click", handleFormSubmit);

// goes to scores screen when button clicked
scoresEl.addEventListener("click", goScoreScreen);  

// goes to start screen when button clicked
back.addEventListener("click", startQuiz);

// if reset scores clicked, resets scores in localStorage
resetEl.addEventListener("click", function(){
    localStorage.removeItem("stor-scor");
    scoresArr = [];
    renderScoresToList(scoresArr);
});