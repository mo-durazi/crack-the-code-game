/*-------------- Constants -------------*/
const startPage = document.getElementById('start-page');
const gamePage = document.getElementById('game-page');

const hintSelection = document.getElementById('hint-mode');
const lengthSelection = document.getElementById('code-length');
const maxAttemptsSelection = document.getElementById('max-guesses');

const startButton = document.getElementById('start-button');
const checkButton = document.getElementById('check-button');
const giveUpButton = document.getElementById('give-up-button');
const tryAgainButton = document.getElementById('try-again-button');

const guessInput = document.getElementById('guess-input');
const displayMode = document.getElementById('display-mode');
const displayAttempts = document.getElementById('display-attempts');
const historyList = document.getElementById('history-list');
const messageArea = document.getElementById('message-area');
const gameOverControls = document.getElementById('game-over-controls');

const notesSection = document.querySelector('.notes-section');
const notesErea = document.getElementById('notes-input');

/*---------- Variables (state) ---------*/
let generatedCode = [];//To save each number a single digit
let prevGuesses = [];//To save all the previous guesses with their hints
let selectedMode = '';
let maxAttempts = 0;
let attemptsLeft = 0;
let selectedLength = 0;
let isGameOver = false;


/*-------------- Functions -------------*/

//a function to generate a secret code 
const generateCode = function (length) {
    const code = [];
    for (let i = 0; i < length; i++) {
        code.push(Math.floor(Math.random() * 10));
    }
    return code;
};


const startGame = function () {
    selectedMode = hintSelection.value;
    selectedLength = parseInt(lengthSelection.value, 10);
    maxAttempts = parseInt(maxAttemptsSelection.value, 10);

    attemptsLeft = maxAttempts;
    generatedCode = generateCode(selectedLength);
    console.log(generatedCode);

    //to lock the input field to match the selected length
    selectedLength = parseInt(lengthSelection.value, 10);
    guessInput.maxLength = selectedLength;

    displayMode.textContent = selectedMode;
    displayAttempts.textContent = attemptsLeft;
    guessInput.maxLength = selectedLength;
    guessInput.value = '';
    guessInput.disabled = false;
    checkButton.disabled = false;

    historyList.innerHTML = '';
    messageArea.className = 'message-area hidden';
    messageArea.textContent = '';
    gameOverControls.classList.add('hidden');

    startPage.classList.add('hidden');
    gamePage.classList.remove('hidden');

    notesSection.classList.remove('hidden');

    guessInput.focus();
};



//to check what are the digit that are the exact match there is between the secret code and the guess code
const exactMatches = function (guessedDigits, secretCode) {
    const len = secretCode.length;
    const secretMatched = new Array(len).fill(false); //By defualt, all are false for each digit
    const guessMatched = new Array(len).fill(false); // By deafualt, all are false for each digit
    const exactDigits = []; //to save the matched digit at its same index

    //Change the value to true if the position of the digit matches
    for (let i = 0; i < len; i++) {
        if (guessedDigits[i] === secretCode[i]) {
            exactDigits.push(guessedDigits[i]);
            secretMatched[i] = true;
            guessMatched[i] = true;
        }
    }
    return { exactDigits, secretMatched, guessMatched };
};

//To find if there is any misplaced number
const misplacedMatches = function (guessedDigits, secretCode, secretMatched, guessMatched) {
    const len = secretCode.length;
    const misplacedDigits = []; //to save the misplaced digits

    for (let i = 0; i < len; i++) {
        if (!guessMatched[i]) {
            for (let j = 0; j < len; j++) {
                if (!secretMatched[j] && guessedDigits[i] === secretCode[j]) {
                    misplacedDigits.push(guessedDigits[i]);
                    secretMatched[j] = true;
                    break;
                }
            }
        }
    }

    return misplacedDigits;
};

//To combine the results of the exactMatches function and the misplacedMatches
const analyzeGuess = function (guesssedDigits, secretCode) {
    const exactInfo = exactMatches(guesssedDigits, secretCode); //Passing both the guessed code and the secret code to exactMatches function
    const misplacedDigits = misplacedMatches(guesssedDigits, secretCode, exactInfo.secretMatched, exactInfo.guessMatched); //passing guessedDigits, secretCode, the return functions from exactMatches by exactInfo variable

    return {
        exactDigits: exactInfo.exactDigits,
        exactCount: exactInfo.exactDigits.length,
        misplacedDigits: misplacedDigits,
        misplacedCount: misplacedDigits.length
    };
};

//to generate the hint in the easy mode
const easyHints = function (exactDigits, misplacedDigits) {
    if (exactDigits.length === 0 && misplacedDigits.length === 0) {
        return ['None of the entered number is in the code'];
    }

    const hints = [];
    exactDigits.forEach((digit) => {
        hints.push(`You have the digit ${digit} in the right spot`);
    });
    misplacedDigits.forEach((digit) => {
        hints.push(`The code contain the digit ${digit}, but not in that spot`);
    });
    return hints;
};

//to generate the hint in the med mode
const medHints = function (exactDigits, misplacedCount) {
    if (exactDigits.length === 0 && misplacedCount === 0) {
        return ['None of the entered numbers is in the code'];
    }

    const hints = [];
    exactDigits.forEach((digit) => {
        hints.push(`You have the digit ${digit} in the right spot`);
    });
    if (misplacedCount > 0) {
        hints.push(`${misplacedCount} of the entered number exist in the code, but not in the right spot`);
    }
    return hints;
};

//to generate the hint in the hard mode
const hardHints = function (exactCount) {
    if (exactCount > 0) {
        return [`You have ${exactCount} correct digit(s) in the right spot`];
    }
    return ['incorrect, try again'];
};

//to switch among hint modes
const formatHints = function (analysis, mode) {
    switch (mode) {
        case 'easy':
            return easyHints(analysis.exactDigits, analysis.misplacedDigits);
            break;
        case 'med':
            return medHints(analysis.exactDigits, analysis.misplacedCount);
            break;
        case 'hard':
            return hardHints(analysis.exactCount);
            break;
    }
    return [];
};


//passing the generated value from analyzeGuess function to formatHint function with the selected hint mode to generate the right hints
const evaluateGuess = function (guessedDigits, secretCode, mode) {
    const analysis = analyzeGuess(guessedDigits, secretCode);
    return formatHints(analysis, mode);
};


const renderHistoryEntry = function (guessString, hints) {
    const li = document.createElement('li');
    li.className = 'history-item';

    const guessTitle = document.createElement('div');
    guessTitle.className = 'history-guess';
    guessTitle.textContent = `Guess #${prevGuesses.length}: ${guessString}`;

    const hintsUl = document.createElement('ul');
    hintsUl.className = 'history-hints';

    hints.forEach((hintText) => {
        const hintLi = document.createElement('li');
        hintLi.textContent = hintText;
        hintsUl.appendChild(hintLi);
    });

    li.appendChild(guessTitle);
    li.appendChild(hintsUl);


    historyList.insertBefore(li, historyList.firstChild);
};

const handleCheckGuess = function () {
    if (isGameOver) return;

    const rawInput = guessInput.value.trim();

    //to ensure that the input is only number and match exactly the chosen length
    const numericRegex = new RegExp(`^\\d{${selectedLength}}$`);
    if (!numericRegex.test(rawInput)) {
        messageArea.className = 'message-area loss';
        messageArea.textContent = `Please enter a valid ${selectedLength}-digit numeric code.`;
        return;
    }

    const guessedDigits = Array.from(rawInput, Number);
    attemptsLeft--;
    displayAttempts.textContent = attemptsLeft;

    const hints = evaluateGuess(guessedDigits, generatedCode, selectedMode);


    prevGuesses.push([rawInput, hints]);

    renderHistoryEntry(rawInput, hints);

    guessInput.value = '';

    const secretString = generatedCode.join('');
    if (rawInput === secretString) {
        endGame(true);
    } else if (attemptsLeft === 0) {
        endGame(false);
    } else {
        guessInput.focus();
    }
};

const handleGiveUp = function () {
    if (isGameOver) return;

    isGameOver = true;
    guessInput.disabled = true;
    checkButton.disabled = true;

    const secretString = generatedCode.join('');

    messageArea.className = 'message-area loss';
    messageArea.textContent = ` You gave up! The correct code was: ${secretString}`;

    gameOverControls.classList.remove('hidden');
};

const endGame = function (isWin) {
    isGameOver = true;
    guessInput.disabled = true;
    checkButton.disabled = true;

    messageArea.classList.remove('hidden', 'win', 'loss');
    const secretString = generatedCode.join('');

    if (isWin) {
        messageArea.classList.add('win');
        messageArea.textContent = `You cracked the code (${secretString})!`;
    } else {
        messageArea.classList.add('loss');
        messageArea.textContent = `Out of attempts! The correct code was: ${secretString}`;
    }

    gameOverControls.classList.remove('hidden');
};


const resetGame = function () {
    isGameOver = false;
    prevGuesses = [];
    gamePage.classList.add('hidden');
    notesSection.classList.add('hidden');
    startPage.classList.remove('hidden');

    notesErea.value = '';
};

/*----------- Event Listeners ----------*/
startButton.addEventListener('click', startGame);
checkButton.addEventListener('click', handleCheckGuess);
giveUpButton.addEventListener('click', handleGiveUp);
tryAgainButton.addEventListener('click', resetGame);


//to use the enter key instead of pressing the check button everytime
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleCheckGuess();
});