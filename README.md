[![Generate-new-logo-Crack-code-20260806012625.jpg](https://i.postimg.cc/MGDvjkNn/Generate-new-logo-Crack-code-20260806012625.jpg)](https://postimg.cc/8F71qY1G)
# Crack The Code Game
**Core idea:** is a game where the player has to guess the generated numeric combination based on the provided hints after each guess. The player can costumize each round by selecting the hint mode, the length of the code, and the amount of possible guesses. 

The hint mode has 3 level.
1. Easy: The game will give the player a hint whether they have a correct number at the wrong position and what is the number.
2. Mid: The game will give the player a hint if they have a number at the correct position and what is the number.
3. Hard: The game will give the player a hint if they have a number at the correct position without telling which number.

The possible length of the code are:
1. 4 digit code
2. 5 digit code
3. 6 digit code

The possible amount of guesses are:
1. 10 guesses
2. 15 guesses
3. 20 guesses
4. 25 guesses


## User Story:
- As a user, I want to see a landing page when I arrive at the website to know I'm in the right place.
- As a user, I want to see clearly labeled options for "Easy", "Med", and "Hard", on the landing page, so I instantly know my options for the difficulty of the round.
- As a user, I want to see clearly labeled options for "4 digit code", "5 digit code", and "6 digit code" on the landing page, so I instantly know my options for the length of the code. 
- As a user, I want to see clearly labeled options for "10 guesses", "15 guesses", "20 guesses", and "25 guesses" on the landing page, so I instantly know my options for how many guesses I can enter before I loose.
- As a user, I want to be able to select one of "Easy", "Med", or "Hard", options making it easy to select my game mode.
- As a user, I want to be able to select one of "4 digit code", "5 digit code", or "6 digit code", options making it easy to select the length of the generated code.
- As a user, I want to be able to select one of "10 guesses", "15 guesses", "20 guesses", or "25 guesses", options making it easy to select the amount of guesses that I can make.
- As a user, I want to be able to click on the start button after selecting my prefernces to start the game.
- As a user, I want to be able to enter a combinattion of numbers as a guess and check whether it's correct or not
- As a user, I want to see some hints after entering my guesses.
- As a user, I want to see my previous guesses the related hints.
- As a user, I want to see a counter for the left attempts.
- As a user, I want to be able to give up and end the game at any time.
- As a user, I want the option to play another round.


## Game Pseudocode:
Below are the pseudocodes for all function in the game. It breaks down the generation of the code, the analysis of a guess, and the transition in the UI state

---
**generateCode(length):** To generate an array of random single-digit nubmers based on the user's chosen code length.
```pseudocode
FUNCTION generateCode(length):
    create an empty array called 'code'

    FOR i from 0 to length - 1 do:
        generate random integer between 0 and 9
        insert the random integer to 'code'
    END FOR LOOP
    return 'code'
END FUNCTION
```

<br>

------
**startGame():** To read the player's settings, initializes game variables, clears previous state, and transitions the UI to the active game screen
```pseudocode
FUNCTION startGame():
    //Read user selection from the DOM
    set selectedMode to value from hintSelection dropdown
    set selectedlength to integer from lengthSelection dropdown
    set maxAttempts tointeger parsed from maxAttemptsSelection dropdown
    
    // Initialize state
    set attemptsLeft tomaxAttempts
    set generatedCode toRESULT OF generateCode(selectedLength)
    set isGameOver tofalse
    
    // Update UI controls
    set guessInput max length toselectedLength
    DisPLAY selectedMode in displayMode element
    DisPLAY attemptsLeft in displayAttempts element
    CLEAR guessInput value
    ENABLE guessInput
    ENABLE checkButton
    
    // Clear previous game screens and messages
    CLEAR historyList inner HTML
    set messageArea class to'message-area hidden'
    CLEAR messageArea text
    HIDE gameOverControls
    
    // Switch views
    HIDE startPage
    SHOW gamePage
    SHOW notesSection
    
    set focus to guessInput
END FUNCTION
```
<br>

-----
**exactMatches (guessedDigits, secretCode):** To compare the guess with the secret code to identify digits that match both in value and exact position.
```setpseudocode
FUNCTION exactMatches(guessedDigits, secretCode)
    set len tolength of secretCode
    CREATE array 'secretMatched' of size len, FILLED WITH false
    CREATE array 'guessMatched' of size len, FILLED WITH false
    CREATE empty array 'exactDigits'
    
    FOR i FROM 0 tolen - 1 DO
        IF guessedDigits[i] EQUALS secretCode[i] THEN
            APPEND guessedDigits[i] toexactDigits
            set secretMatched[i] totrue
            set guessMatched[i] totrue
        END IF
    END FOR
    
    RETURN object containing { exactDigits, secretMatched, guessMatched }
END FUNCTION
```
<br>

-----
**misplacedMatches (guessedDigits, secretCode, secretMatched, guessMatched):** To identify the digits in the guess that exist within the secret code but are located in the wrong position.
```pseudocode
FUNCTION misplacedMatches(guessedDigits, secretCode, secretMatched, guessMatched)
    set len tolength of secretCode
    CREATE empty array 'misplacedDigits'
    
    FOR i FROM 0 tolen - 1 DO
        IF guessMatched[i] is false THEN
            FOR j FROM 0 tolen - 1 DO
                IF secretMatched[j] is false AND guessedDigits[i] = secretCode[j] THEN
                    APPEND guessedDigits[i] tomisplacedDigits
                    set secretMatched[j] totrue
                    BREAK loop j
                END IF
            END FOR
        END IF
    END FOR
    
    RETURN misplacedDigits
END FUNCTION
```
<br>

----
**analyzeGuess (guessedDigits, secretCode):** To combine  exact and misplaced match evaluations to return a comprehensive analysis of the player's guess.
```pseudocode
FUNCTION analyzeGuess(guessedDigits, secretCode)
    set exactInfo toRESULT OF exactMatches(guessedDigits, secretCode)
    set misplacedDigits toRESULT OF misplacedMatches(
        guessedDigits, 
        secretCode, 
        exactInfo.secretMatched, 
        exactInfo.guessMatched
    )
    
    RETURN object containing {
        exactDigits: exactInfo.exactDigits,
        exactCount: length of exactInfo.exactDigits,
        misplacedDigits: misplacedDigits,
        misplacedCount: length of misplacedDigits
    }
END FUNCTION
```
<br>

---
**easyHints(exactDigits, misplacedDigits):** To generate an explicit, detailed feedback for Easy Mode by specifying exactly which digits are correctly placed or misplaced.

```pseudocode
FUNCTION easyHints(exactDigits, misplacedDigits)
    IF exactDigits is EMPTY AND misplacedDigits is EMPTY THEN
        RETURN ['None of the entered number is in the code']
    END IF
    
    CREATE empty array 'hints'
    
    FOR EACH digit in exactDigits DO
        APPEND "You have the digit {digit} in the right spot" tohints
    END FOR
    
    FOR EACH digit in misplacedDigits DO
        APPEND "The code contain the digit {digit}, but not in that spot" tohints
    END FOR
    
    RETURN hints
END FUNCTION
```
<br>

-----
**medHints (exactDigits, misplacedCount):** To generate Medium Mode feedback by specifying exact correctly placed digits alongside a count of misplaced digits.
```pseudocode
FUNCTION medHints(exactDigits, misplacedCount)
    IF exactDigits is EMPTY AND misplacedCount EQUALS 0 THEN
        RETURN ['None of the entered numbers is in the code']
    END IF
    
    CREATE empty array 'hints'
    
    FOR EACH digit in exactDigits DO
        APPEND "You have the digit {digit} in the right spot" tohints
    END FOR
    
    IF misplacedCount > 0 THEN
        APPEND "{misplacedCount} of the entered number exist in the code, but not in the right spot" tohints
    END IF
    
    RETURN hints
END FUNCTION
```
<br>

---
**hardHints(exactCount):** To generate minimal Hard Mode feedback by reporting only the total count of correctly placed digits.

```pseudocode
FUNCTION hardHints(exactCount)
    IF exactCount > 0 THEN
        RETURN ["You have {exactCount} correct digit(s) in the right spot"]
    ELSE
        RETURN ['incorrect, try again']
    END IF
END FUNCTION
```

<br>

---
**formatHints (analysis, mode):** To route the guess analysis to the appropriate hint generator function based on the selected difficulty mode.

```pseudocode
FUNCTION formatHints(analysis, mode)
    SWITCH mode DO
        CASE 'easy':
            RETURN RESULT OF easyHints(analysis.exactDigits, analysis.misplacedDigits)
        CASE 'med':
            RETURN RESULT OF medHints(analysis.exactDigits, analysis.misplacedCount)
        CASE 'hard':
            RETURN RESULT OF hardHints(analysis.exactCount)
    END SWITCH
    
    RETURN empty array
END FUNCTION
```

<br>

---

**evaluateGuess(guessedDigits, secretCode, mode):** Serves as the main pipeline function that analyzes the guess and formats the resulting hint messages.
```pseudocode
FUNCTION evaluateGuess(guessedDigits, secretCode, mode)
    SET analysis toRESULT OF analyzeGuess(guessedDigits, secretCode)
    RETURN RESULT OF formatHints(analysis, mode)
END FUNCTION
```

<br>

---

**renderHistoryEntry(guessString, hints):** To create and prepends a new UI element to the history list displaying the player's guess and its corresponding hints.
```pseudocode
FUNCTION renderHistoryEntry(guessString, hints)
    CREATE DOM element 'li' FOR item
    CREATE DOM element 'div' FOR title
    CREATE DOM element 'ul' FOR hints list
    
    set title text to"Guess #{length of prevGuesses}: {guessString}"
    
    FOR EACH hintText in hints DO
        CREATE DOM element 'li' FOR hint item
        set hint item text tohintText
        APPEND hint item tohints list
    END FOR
    
    APPEND title toitem
    APPEND hints list toitem
    
    insert item at the beginning of historyList DOM container
END FUNCTION
```

<br>

---
**handleCheckGuess():** To validate user input, processes a guess attempt, updates remaining attempts, logs history, and checks for win or loss conditions.
```pseudocode
FUNCTION handleCheckGuess()
    IF isGameOver is true THEN RETURN
    
    GET and TRIM text from guessInput as 'rawInput'
    
    // Input validation
    IF rawInput DOES NOT MATCH numeric pattern of length 'selectedLength' THEN
        set messageArea class to'message-area loss'
        set messageArea text toerror message
        RETURN
    END IF
    
    CONVERT rawInput characters toarray of numbers 'guessedDigits'
    DECREMENT attemptsLeft BY 1
    UPDATE displayAttempts element text WITH attemptsLeft
    
    set hints toRESULT OF evaluateGuess(guessedDigits, generatedCode, selectedMode)
    
    APPEND [rawInput, hints] toprevGuesses array
    CALL renderHistoryEntry(rawInput, hints)
    
    CLEAR guessInput value
    
    CONVERT generatedCode array tostring 'secretString'
    
    IF rawInput EQUALS secretString THEN
        CALL endGame(true)
    ELSE IF attemptsLeft EQUALS 0 THEN
        CALL endGame(false)
    ELSE
        set focus to guessInput
    END IF
END FUNCTION
```

<br>

---
**handleGiveUp():** Ends the current game immediately, locks inputs, reveals the secret code, and displays the game-over controls.
```pseudocode
FUNCTION handleGiveUp()
    IF isGameOver is true THEN RETURN
    
    set isGameOver totrue
    disable guessInput
    disable checkButton
    
    CONVERT generatedCode array tostring 'secretString'
    
    set messageArea class to'message-area loss'
    set messageArea text to"You gave up! The correct code was: {secretString}"
    
    SHOW gameOverControls
END FUNCTION
```

<br>

---
**endGame(isWin):** Handles the final game state by disabling input controls, displaying the final win/loss message, and revealing restart options.

```pseudocode
FUNCTION endGame(isWin)
    set isGameOver totrue
    disable guessInput
    disable checkButton
    
    REMOVE 'hidden', 'win', 'loss' classes FROM messageArea
    CONVERT generatedCode array tostring 'secretString'
    
    IF isWin is true THEN
        ADD 'win' class tomessageArea
        set messageArea text to"You cracked the code ({secretString})!"
    ELSE
        ADD 'loss' class tomessageArea
        set messageArea text to"Out of attempts! The correct code was: {secretString}"
    END IF
    
    SHOW gameOverControls
END FUNCTION
```

<br>

---
**resetGame():** Resets the game state and UI views back to the start page for a new session
```pseudocode
FUNCTION resetGame()
    set isGameOver tofalse
    set prevGuesses toempty array
    
    HIDE gamePage
    HIDE notesSection
    SHOW startPage
    
    CLEAR notesArea value
END FUNCTION
```
<br>

---

<br>

## Flow Chart Diagram of the Game
The flow chart diagram below illustrate the control flow, state transitions, and decision logic governing the game loop.

[![Game-Input-Flow-and-Outcome-2026-08-06-060249.png](https://i.postimg.cc/VNDBC9sw/Game-Input-Flow-and-Outcome-2026-08-06-060249.png)](https://postimg.cc/xkNzrzbp)