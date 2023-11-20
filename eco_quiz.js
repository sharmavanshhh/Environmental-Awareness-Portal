const quizData = [
    {
        question: 'Q.1 What is an ecosystem?',
        options: [
            ' A single organism',
            ' A community of living organisms and their physical environment',
            ' The largest landform on Earth',
            ' The study of outer space'],
        answer: ' A community of living organisms and their physical environment',
    },
    {
        question: 'Q.2 Which of the following is an abiotic factor in an ecosystem?',
        options: [
            ' Plants',
            ' Animals',
            ' Temperature',
            ' Fungi'],
        answer: ' Temperature',
    },
    {
        question: 'Q.3 What is the primary source of energy in most terrestrial ecosystems?',
        options: [
            ' Wind',
            ' Soil',
            ' Sunlight',
            ' Rocks'],
        answer: ' Sunlight',
    },
    {
        question: 'Q.4 Which trophic level in an ecosystem is responsible for converting sunlight into chemical energy through photosynthesis?',
        options: [
            ' Producers',
            ' Herbivores',
            ' Carnivores',
            ' Decomposers'],
        answer: ' Producers',
    },
    {
        question: 'Q.5 Which of the following best describes a decomposer in an ecosystem?',
        options: [
            ' An organism that consumes dead plant and animal matter',
            ' An organism that preys on other organisms',
            ' A plant that produces energy through photosynthesis',
            ' An organism that competes for resources with other species'],
        answer: '  An organism that consumes dead plant and animal matter',
    },
    {
        question: 'Q.6 In the food web of an ecosystem, which group of organisms primarily relies on consuming other organisms for energy?',
        options: [
            ' Producers',
            ' Herbivores',
            ' Carnivores',
            ' Decomposers'],
        answer: ' Carnivores',
    },
    {
        question: 'Q.7 What is the term for the complex, interconnected feeding relationships within an ecosystem?',
        options: [
            ' Ecosystem cycle',
            ' Ecological succession',
            ' Food web',
            ' Trophic cascade',
        ],
        answer: ' Food web',
    },
    {
        question: 'Q.8 What is the process by which nutrients and energy flow through an ecosystem, typically in a one-way direction?',
        options: [
            ' Nutrient cycling',
            ' Energy pyramid',
            ' Succession',
            ' Trophic transfer'],
        answer: ' Energy pyramid',
    },
    {
        question: 'Q.9 Which of the following best describes a keystone species in an ecosystem?',
        options: [
            ' A species that is at the top of the food chain',
            ' A species that is rare and endangered',
            ' A species whose presence or absence significantly affects the ecosystem',
            ' A species that is the most abundant in the ecosystem'
        ],
        answer: '  A species whose presence or absence significantly affects the ecosystem',
    },
    {
        question: 'Q.10 What is the term for the process by which a community of organisms gradually changes over time in response to environmental factors?',
        options: [
            ' Ecosystem balance',
            ' Biodiversity loss',
            ' Ecological succession',
            ' Trophic interaction'],
        answer: ' Ecological succession',
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