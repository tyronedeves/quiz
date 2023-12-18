'use strcict';
const questions = [
    {
        questions: "which is the largest land animal?",
        answers: [
            {text: "whale", correct:false},
            {text: "rhino", correct:false},
            {text: "elephant", correct:true},
            {text: "tiger", correct:false}
        ]
    },
    {
        questions: "which is the smallest continet?",
        answers: [
            {text: "Europe", correct:false},
            {text: "africa", correct:false},
            {text: "Australia", correct:true},
            {text: "Asia", correct:false}
        ]  
    },
    {
        questions: "which is the fastest land animal?",
        answers: [
            {text: "lion", correct:false},
            {text: "chetaah", correct:true},
            {text: "deer", correct:false},
            {text: "tiger", correct:false}
        ]  
    },
    {
        questions: "which country has the most nuclear bombs?",
        answers: [
            {text: "Russia", correct:true},
            {text: "Usa", correct:false},
            {text: "israel", correct:false},
            {text: "china", correct:false}
        ]  
    },
    {
        questions: "which has the largest population?",
        answers: [
            {text: "Nigeria", correct:false},
            {text: "USA", correct:false},
            {text: "china", correct:false},
            {text: "india", correct:true}
        ]  
    },

       
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.questions; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerBtn.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)

    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block"
}
function showScore() {
    resetState();
    questionElement.innerHTML = ` You scored ${score} out of ${questions.length}!`
    nextBtn.innerHTML = "play again?";
    nextBtn.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}
nextBtn.addEventListener("click" ,()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else{
        startQuiz();
    }
    
})
startQuiz();