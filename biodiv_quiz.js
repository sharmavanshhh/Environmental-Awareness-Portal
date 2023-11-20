const quizData = [
    {
        question: 'Q.1 What does the term "biodiversity" refer to?',
        options: [
            ' The number of animals in a particular region',
            ' The variety and variability of life on Earth',
            ' The total biomass of living organisms',
            ' The geographical distribution of species'],
        answer: ' The variety and variability of life on Earth',
    },
    {
        question: 'Q.2 Which of the following biomes is characterized by extreme cold, a short growing season',
        options: [
            ' Grassland',
            ' Desert',
            ' Tundra',
            ' Rainforest',],
        answer: ' Tundra',
    },
    {
        question: 'Q.3 Which international day is dedicated to raising awareness about biodiversity and the need to protect it?',
        options: [
            ' Earth Day',
            ' Arbor Day',
            ' International Day for Biological Diversity',
            ' World Environment Day'],
        answer: ' International Day for Biological Diversity',
    },
    {
        question: 'Q.4 What is the term for the variety of genes within a species?',
        options: [
            ' Ecosystem diversity',
            ' Genetic diversity',
            ' Species diversity',
            ' Ecological diversity'],
        answer: ' Genetic diversity',
    },
    {
        question: 'Q.5 What is the primary factor responsible for habitat destruction and the resulting decline in biodiversity?',
        options: [
            ' Climate change',
            ' Invasive species',
            ' Pollution',
            ' Human activities',
        ],
        answer: ' Human activities',
    },
    {
        question: 'Q.6 Which of the following is an example of an invasive species?',
        options: [
            ' The bald eagle in North America',
            ' The monarch butterfly in Mexico',
            ' The zebra mussel in the Great Lakes',
            ' The giant panda in China'],
        answer: ' The zebra mussel in the Great Lakes',
    },
    {
        question: 'Q.7 Who is known for his work on the theory of evolution and natural selection, which has significant implications for biodiversity?',
        options: [
            ' Louis Pasteur',
            ' Albert Einstein',
            ' Isaac Newton',
            ' Charles Darwin'
        ],
        answer: ' Charles Darwin',
    },
    {
        question: 'Q.8 In what year was the Convention on Biological Diversity (CBD) adopted as an international treaty?',
        options: [
            ' 1972',
            ' 1992',
            ' 2002',
            ' 2012'],
        answer: ' 1922',
    },
    {
        question: 'Q.9 What type of conservation strategy focuses on preserving species and habitats within their natural environment?',
        options: [
            ' Ex-situ conservation',
            ' In-situ conservation',
            ' Habitat destruction',
            ' Biodiversity decline'
        ],
        answer: ' In-situ conservation',
    },
    {
        question: 'Q.10 Which organization is known for maintaining the Red List of threatened species and assessing the conservation status of various species worldwide?',
        options: [
            ' World Health Organization (WHO)',
            ' United Nations Educational, Scientific and Cultural Organization (UNESCO)',
            ' International Union for Conservation of Nature (IUCN)',
            ' Greenpeace'],
        answer: ' International Union for Conservation of Nature (IUCN)',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
      <p>
        ${incorrectAnswers[i].question}<br>
        Your Answer:${incorrectAnswers[i].incorrectAnswer}<br>
        Correct Answer:${incorrectAnswers[i].correctAnswer}
      </p>
    `;
    }

    resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();