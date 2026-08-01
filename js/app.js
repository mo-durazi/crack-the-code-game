
/*-------------- Constants -------------*/
const codeLength = 5;



/*---------- Variables (state) ---------*/
let generatedCode = [5, 9, 8, 7];
let guessedCode = [1, 9, 4, 0];
let hardLevelCount = 0;

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


//Function that checks if the combination conatain the number or not
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
easyLevel();

const midLevel = function () {
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
midLevel();


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
hardLevel();


//The hints based on the difficulty of the game
const givenHint = function (difficulty) {
    switch (difficulty) {
        case 'easy':
            easyLevel();
            break;
        case 'mid':
            midLevel();
            break;
        case 'hard':
            hardLevel();
            break;
    }
}



/*----------- Event Listeners ----------*/
