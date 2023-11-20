const quizData = [
    {
        question: 'Q.1 What is the term for the presence of harmful or unwanted substances in the environment that can have a detrimental impact on living organisms?',
        options: [
            ' Contamination',
            ' Pollution',
            ' Erosion',
            ' Habitat destruction'],
        answer: ' Pollution',
    },
    {
        question: 'Q.2 Which type of pollution is caused by excessive noise and can lead to various health problems?',
        options: [
            ' Air pollution',
            ' Water pollution',
            ' Noise pollution',
            ' Light pollution'],
        answer: ' Noise pollution',
    },
    {
        question: 'Q.3 What is the primary greenhouse gas responsible for global warming and climate change?',
        options: [
            ' Carbon monoxide',
            ' Methane',
            ' Carbon dioxide',
            ' Sulfur dioxide'],
        answer: ' Carbon dioxide',
    },
    {
        question: 'Q.4 Which of the following is a major source of water pollution and can lead to the eutrophication of water bodies?',
        options: [
            ' Industrial waste',
            ' Oil spills',
            ' Nutrient runoff',
            ' Noise pollution'],
        answer: ' Nutrient runoff',
    },
    {
        question: 'Q.5 What term is used to describe the contamination of the Earth atmosphere with harmful substances, such as particulate matter and toxic gases?',
        options: [
            ' Air pollution',
            ' Land pollution',
            ' Water pollution',
            ' Light pollution',
        ],
        answer: ' Air pollution',
    },
    {
        question: 'Q.6 Which of the following is not a primary source of indoor air pollution?',
        options: [
            ' Tobacco smoke',
            ' Radon gas',
            ' Outdoor air pollution',
            ' Mold and mildew'],
        answer: ' Outdoor air pollution',
    },
    {
        question: 'Q.7 What is the name of the process by which pollutants are removed or neutralized from wastewater before it is released into the environment?',
        options: [
            ' Filtration',
            ' Desalination',
            ' Water purification',
            ' Water treatment'
        ],
        answer: ' Water treatment',
    },
    {
        question: 'Q.8 Acid rain is primarily caused by the release of which two pollutants into the atmosphere?',
        options: [
            ' Carbon dioxide and methane',
            ' Nitrogen oxides and sulfur dioxide',
            ' Lead and mercury',
            ' Ozone and carbon monoxide'],
        answer: ' Nitrogen oxides and sulfur dioxide',
    },
    {
        question: 'Q.9 What is the term for the contamination of land and soil with hazardous chemicals and waste materials?',
        options: [
            ' Water pollution',
            ' Air pollution',
            ' Land pollution',
            ' Noise pollution'
        ],
        answer: ' Land pollution',
    },
    {
        question: 'Q.10 Which international agreement aims to reduce the production and consumption of substances that deplete the ozone layer, such as chlorofluorocarbons (CFCs)?',
        options: [
            ' Kyoto Protocol',
            ' Montreal Protocol',
            ' Paris Agreement', 
            ' Rio Declaration'],
        answer: ' Montreal Protocol',
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