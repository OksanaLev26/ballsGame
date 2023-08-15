Pop the Ball Game/ Project 1

Game Overview:

Welcome to the exciting world of "Pop the Ball"! This game consists of 5 thrilling levels where your objective is to pop all the balls
as swiftly as possible. To kick off your gaming adventure, simply hit the start button. Balls will promptly materialize on your screen,
each positioned randomly and moving in unpredictable directions. These balls come in two colors: green and pink. Interact with the green
balls to pop them and earn points. However, be prepared for a twist with the pink balls – clicking on them will spawn two additional balls
of varying colors. Should you need a breather, the pause button is at your disposal. When you're ready to dive back in, hit continue and
the game will seamlessly pick up where you left off. Successfully pop all the balls to complete the level, and your performance will be 
summarized in terms of balls popped and total time taken. 

Link to live site: https://oksanalev26.github.io/ballsGame

Gameplay:

1. Game Levels: The game comprises 5 progressively challenging levels, each with a unique arrangement of balls.
2. Objective: Your main goal is to pop all the balls on the screen as fast as you can.
3. Starting the Game: Push the start button to initiate the game. Balls will start appearing randomly on the screen.
4. Ball Colors: Balls come in two colors: green and pink.
5. Interactions:
   - Click on a green ball to pop it and earn points.
   - Click on a pink ball to trigger a surprise – it will spawn two additional balls of random colors.
   - When only pink balls remain, they will turn to green, allowing you to pop them too.
6. Pause and Continue: Hit the pause button to temporarily halt the game. Resume the action by pressing the continue button.
7. Completing Levels: Successfully pop all balls to complete the level and advance to the next one.
8. End of Level:
   - After clearing all the balls, your total popped ball count and time taken will be displayed.
   - Choose to continue or exit the game based on your preference.
   - Typing 'N' in the pop-up window will end the game.
   - Typing 'Y' in the pop-up window will allow you to proceed to the next level.
9. Advancing Levels: Each subsequent level increases in difficulty, introducing more balls for you to pop.
10. Game Completion: After conquering all five levels, a summary of your overall performance – including the total number of popped
    balls and cumulative playtime – will be shown in a pop-up window.
11. Starting Anew: At this point, you can choose to start the game again from the beginning by typing 'Y' or exit by typing 'N'.

Built with:

The "Pop the Ball" game was crafted using a combination of HTML, CSS, and JavaScript technologies.

How the Game Was Built:

Design Phase:

1. Conceptualization: The process began with a sketch on paper, outlining how the game would appear in the browser. Defining the game's
   structure, elements, and interactions was the initial step towards turning the idea into reality.
2. Markup: The foundational structure of the game was built using HTML. Div elements were carefully crafted to form the playing field,
   house buttons for starting and pausing the game, and display critical game information such as the current level, score, and total time.
3. Styling: CSS was employed to inject life and vibrancy into the game's appearance. Colors were chosen to enhance the game's visual appeal,
   and animations were applied using keyframes and various CSS styles, injecting dynamic movement and energy into the gameplay.
4. Typography: To elevate the game's aesthetics, Google Fonts were integrated into the project by adding a link tag to the HTML head.
   This simple addition transformed the game's text into a visual delight, enhancing the overall presentation.

Functionality Phase:

1. Ball Class: Central to the game's functionality was the concept of balls. Each ball needed consistent properties, behaviors, and
   interactions. A Ball class was created to encapsulate these attributes, allowing each ball to be instantiated with its own unique
   qualities.

2. Collision Detection: Balls needed to react intelligently to their environment. Functions were implemented to manage ball direction
   changes when they collided with the playing field's edges or each other.

3. Game Logic: Clicking on a green ball triggered its "popping," with the ball being removed from the game. Functions were created to
   enable this action, maintaining the game's internal state and score.

4. Movement Mechanism: The core functionality of balls moving dynamically across the playing field was implemented using JavaScript.
   A function was crafted to ensure each ball's movement and animation remained synchronized.

5. Game Control: Buttons for starting, pausing, and continuing the game were integrated using JavaScript event listeners. These
   interactions allowed players to engage with the game seamlessly.

6. Game Completion: A function was devised to determine if the game had reached its conclusion. This enabled the game to detect when
   all balls had been popped, leading to level completion and result display.

