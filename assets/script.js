const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")


let shuffledQuestions, currentQuestionIdex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIdex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIdex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}


function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIdex])



}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIdex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    nextButton.classList.remove('hide')
}
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}



const questions = [
    {
        question: "What does Naruto refer to as the food of the Gods in Naruto?",
        answers: [
            { text: "Ramen", correct: true },
            { text: "Veggies", correct: false },
            { text: "Meatloaf", correct: false },
            { text: "Fruit", correct: false },
        ]
    },
    {
        question: "The 4th Shinobi war starts in the Land of Iron?",
        answers: [
            { text: "True", correct: true },
            { text: "Fals", correct: false },
        ]
    },
    {
    question: "How many Tailed-Beasts are there in the world of Naruto?",
    answers: [
        { text: "25", correct: false },
        { text: "9", correct: true },
        { text: "15", correct: false },
        { text: "3", correct: false },
    ]
    }
]
