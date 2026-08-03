
/*-------------- Constants -------------*/
const startButton = document.querySelector('#start');
const hintSelection = document.getElementById('hint');
const guessesSelection = document.getElementById('guesses');
const lengthSelection = document.getElementById('codeLengthMenu');
const boardSection = document.getElementById("board");
const checkButton = document.getElementById("check");
const guessedCodeValue = document.getElementById('guessing-field');
const codeLength = 5;



/*---------- Variables (state) ---------*/
let generatedCode = [5, 8, 5, 5];
let guessedCode = [];
let prevGuesses = [];
let hardLevelCount = 0;
let selectedMode = ''; //to save the selected hint mode
let selectedGuesses = ''; //to save the selected amount of guesses
let selectedLength = ''; //to save teh selected code length


/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/

//Generateing the code based on the chosen length
// const generateCode =  function (codeLength) {
//  for (let index = 0; index < codeLength; index++) {
//     generatedCode[index] = Math.floor(Math.random() * 9);
//  }
// };
// generateCode(codeLength);
// console.log(generatedCode);


//checks if the combination conatain the number or not
const hasNum = guessedCode.some((guessedNum) => {
    return generatedCode.includes(guessedNum);
});
console.log(hasNum);




//The easy level function
const easyLevel = function () {
    if (hasNum) {
        for (const num of guessedCode) {
            if (generatedCode.indexOf(num) === guessedCode.indexOf(num)) {
                console.log(`Easy level: The Code contains ${num}, and it's in the right position`);
            }
            else if (generatedCode.indexOf(num) !== guessedCode.indexOf(num) && num === generatedCode[generatedCode.indexOf(num)]) {
                console.log(`Easy level: the code contains ${num}, just not in this position`);
            }
        }
    } else {
        console.log('Easy level: No number is right');
    }
}
//easyLevel();

const midLevel = function () {
    for (let i = 0; i <= selectedGuesses; i++) {
        if (hasNum) {
            for (const num of guessedCode) {
                if (generatedCode.indexOf(num) === guessedCode.indexOf(num)) {
                    console.log(`Mid level: ${num} is in the right spot`);
                }
                else if (generatedCode.indexOf(num) !== guessedCode.indexOf(num) && num === generatedCode[generatedCode.indexOf(num)]) {
                    console.log(`Mid level: ${num} Nothing no the right spot`);
                }
            }
        } else {
            console.log('Mid level: No number is right');
        }
    }
}
//midLevel();

//Converting the value of the input field from string to number and saving it in an array
const converStringToNum = function () {
    guessedCode = Array.from(guessedCodeValue.value, Number);
    prevGuesses.push(guessedCode);
    console.log(guessedCode);
    console.log(prevGuesses);
}


//hard level function
const hardLevel = function () {
    if (hasNum) {
        guessedCode.forEach((num) => {
            if (generatedCode.indexOf(num) === guessedCode.indexOf(num)) {
                hardLevelCount++;
            }
        });
        console.log(`hard level: ${hardLevelCount} numbers in the right spot`)
    } else {
        console.log('hard levle: Nothing in the right spot');
    }
}
//hardLevel();


//The hints based on the difficulty of the game
const givenHint = function (difficulty) {
        switch (difficulty) {
            case 'easy':
                easyLevel();
                break;
            case 'med':
                midLevel();
                console.log('Check');
                break;
            case 'hard':
                hardLevel();
                console.log('Check');
                break;
        }
};

// const startRendering = function () {
//     // const startContent = `
//     //     <div id="guessing-section">
//     //         <input type="text" name="guessing-field" id="guessing-field">
//     //         <button id="check">Check</button>
//     //     </div>
//     //     <div id="prev-guesses-list">
//     //         <h5>Previous Guesses and Hints</h5>
//     //         <ul>

//     //         </ul>
//     //     </div>
//     // `;
//     // boardSection.innerHTML = startContent;
// }



/*----------- Event Listeners ----------*/

//The start up button that will push the values of the dropdown menus to the js code
startButton.addEventListener('click', () => {
    console.log('Working');
    selectedMode = hintSelection.value;
    selectedGuesses = guessesSelection.value;
    selectedLength = lengthSelection.value;
    console.log(selectedMode);
    console.log(selectedGuesses);
    console.log(selectedLength);
    startRendering();
    //generatedCode(selectedLength); //Passing the selected code length to generate a code based on it
});

checkButton.addEventListener('click', () => {
        converStringToNum();
        givenHint(selectedMode);
})