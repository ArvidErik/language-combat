# Language Combat

The Language Combat is a multiplayer "sumo" game where the players finally can prove that their favorite programming language is the best and rules them all. In Language combat players can select a "fighter" (programming language) and go fight for the TITLE.

## Goal and mechanics of the game

The main goal of the game is to push the opponent out of the track limits two times in a row, or the first reaching 3 points is the winner.

The game consits of 4 main sections:

- **Start screen**: A start screen showing the title and waiting for the user to press the start button to jump to the next fighter selection section.

- **Fighter selection**: In this section the Player1 and Player2 can select a programming language from the following list respectively: "Python, Java, JavaScript, C#, PHP, TypeScript, C++". After the selection the players can progress to the fight.

- **Fight**: The players find themselves with their selected fighters in a fighting ring. The fight starts with a count back from 3 to GO. During this time the players can prepare mentally but cannot move. As soon as the "GO" text dissapear they can start the fight. The winner of the round is who can push the other down of the ring. The player winning 2 times in a row or reaching 3 points is the winner. Meanwhile the ring below them is continuasly shrinking causing and extra challenge to take into account.

- **Game over window**: When somebody wins the game, a game over window appears and the players will know which is the best language.

## Techical documentation

This section presents the technical aspects of this project focusing on the main challenges such as the movement and collision that also takes velocity into account.

### Files

The project cointains 6 files, 3 JavaScript, 1 HTML, 1 CSS and 1 README file. The index.html file is the sceleton of the project which elements are manipulated using the .js files. CSS file is for the design where the tags, ids and class design properties are grouped and separated.

- **script.js**: The script.js file is the core of my project, responsible for calling all the necessary functions/methods based on different events. It contains all my event listeners and functions that are not class related. 

- **game.js**: This file holds my game class including the constructors and methods. 

- **player.js**: THis file contains the player class.

### Game Loop

One of the lessons learned of this project was the usage of the game loop. I am using my gameLoop() method a lot to call different methods and functions. On the computer I had been developing, everything was running smoothly, but when I checked the game on a more powerful system, the game was faster and not as enjoyable as on the other device. So if you find the game a bit quicker than expected, you probably have a lot of FPS. 


### Movement

The fighters/circles are moving to a direction automaticaly. There's no need to hold the keys pressed down. This is a decision made to make the game a bit more difficult. Player1 can navigat with arrow keys while Player2 needs to use "WASD". The players can move verticaly and horizontaly at the beggining of the game but once you apply both directions, they can only proceed diagonally as the program takes keys as pressed down until you press the opposite direction.

### Collision

The players can collide 8 ways. Diagonally they can collide in the four quarter. Horizontally and vertically again four different ways. 

As the players are circles, the collision is a little bit more difficult as in case of a rectangle. Due to The circle shape the collision is calculated the following way:

```javascript
collissionDetection() {
     
        // Calculate the center coordinates of the player1 circle
        const player1XCenter = player1.element.offsetLeft + player1.element.offsetWidth / 2;
        const player1YCenter = player1.element.offsetTop + player1.element.offsetHeight / 2;
    
        // Calculate the center coordinates of the player2 circle
        const player2XCenter = player2.element.offsetLeft + player2.element.offsetWidth / 2;
        const player2YCenter = player2.element.offsetTop + player2.element.offsetHeight / 2;
    
        // Calculate the distance between the two circles centers
        const distance = Math.sqrt((player1XCenter - player2XCenter) ** 2 + (player1YCenter - player2YCenter) ** 2);
    
        // Calculate the minimum distance needed for a collision (sum of the radii)
        const minDistance = player1.element.offsetWidth / 2 + player2.element.offsetWidth / 2;
    
        // If the distance is less than the minimum distance, a collision is detected and bounceBack() is applied
        if (distance <= minDistance) {
            this.bounceBack()
        }
    }
```
As you can see in the last row, when the players collide a bounce back effect is applied that pushes back the two players. The default push back is set to 10px but the program also considers the velocity of the players. 

The velocity is calculated based on how much did a player move to one direction. As soon as the player changes direction, the velocity is set to 0 and starts to add up again. By summing the absolute values of horizontal and vertical velocity we can get an overall player Power value. Comparing this Power value of the two player, the stronger and weaker can be identified and a multiplier is applied to the bounce back effect as it can be seen in the code that shows only one collision scenario, when Player1 is colliding the top left corner of Player2.

```javascript
//APPLIES A BOUNCE BACK EFFECT INCLUDING A VELOCITY MULTIPLIER
    bounceBack() {
        
        const p1Left = player1.left
        const p1Top = player1.top
        const p2Left = player2.left
        const p2Top = player2.top
        //PARAMETERS TO CONTROL THE RATE OF BOUNCE BACK
        const diffDivident = 50
        const multiDivident = 100
        //THE VELOCITY POWER IS CALCULETED BY SUMMING X AND Y VELOCITY OF A PLAYER
        //THE VELOCITY KEEPS ADDING UP UNLESS THE PLAYER CHANGES DIRECTION
        let p1Power = Math.abs(player1.velocityX) + Math.abs(player1.velocityY)
        let p2Power = Math.abs(player2.velocityX) + Math.abs(player2.velocityY)
        //CALCULATING THE POWER DIFFERENCE AVOIDING NEGATIVE NUMBERS
        const p1Stronger = p1Power - p2Power
        const p2Stronger = p2Power - p1Power
        //BASE BOUNCE. THE PLAYERS BOUNCE BACK 10PX IF THE POWER IS 0. 
        const bounce = 10

        //CONDITIONS ARE COVERING ALL THE POSITIONS WHERE THE PLAYERS CAN COLLIDE
        const tLQuarter = (p1Left < p2Left && p1Top < p2Top)
        const tRQuarter = (p1Left > p2Left && p1Top < p2Top)
        const bLQuarter = (p1Left < p2Left && p1Top > p2Top)
        const bRQuarter = (p1Left > p2Left && p1Top > p2Top)
        const tside = (p1Left === p2Left && p1Top > p2Top)
        const bside = (p1Left === p2Left && p1Top < p2Top)
        const lside = (p1Left < p2Left && p1Top === p2Top)
        const rside = (p1Left > p2Left && p1Top === p2Top)
         
        //APLYING THE EFFECT OF THE BOUNCE BACK FOR EVERY POSSIBLE CASES
        if (tLQuarter) {
            //IN CASE PLAYER1 HAD MORE POWER
            if (p1Power > p2Power) {
            //THE DIFFERENCE BETWEEN THE TWO POWERS
            const diff = p1Stronger
            //THE MULTIPLIER FOR THE BOUNCE BACK 
            const multiplier = Math.floor(diff/diffDivident)
            //APPLYING THE MULTIPLIERS CONSIDERING WHO HAD MORE POWER
            player1.top -= bounce * (1 - (multiplier/multiDivident))
            player1.left -= bounce * (1 - (multiplier/multiDivident))
            player2.top += bounce * multiplier
            player2.left += bounce * multiplier
            }
            //IN CASE PLAYER2 HAD MORE POWER
            if (p2Power > p1Power) {
                const diff = p2Stronger
                const multiplier = Math.floor(diff/diffDivident)
    
                player1.top -= bounce * multiplier
                player1.left -= bounce * multiplier
                player2.top += bounce * (1 - (multiplier/multiDivident))
                player2.left += bounce * (1 - (multiplier/multiDivident))
                }
```


