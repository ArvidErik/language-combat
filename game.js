class Game {
    constructor () {
        //DEFINING DOM ELEMENTS
        this.startScreen = document.querySelector("#start-screen")
        this.selectFighterScreen = document.querySelector("#select-fighter-screen")
        this.gameScreen = document.querySelector("#game-screen")
        this.endScreen = document.querySelector("#end-screen")
        this.platform = document.getElementById("platform")
        this.nextRoundBtn = document.getElementById("next-round-btn")
        //PLATFORM RELATED DATA NEEDED FOR PLATFORM SHRINKING
        this.platformWidth = 400
        this.platformHeight = 400
        this.platformShrinkRate = 0.1
        //EMPTY ARRAYS TO STORE THE SELECTED FIGHTER BY USER AND VISUALIZE IT LATER ON
        this.selectedFighterUrls = []
        this.selectedFighterNames = []
        //FIGHTER RELATED DATA STORED IN ARRAYS
        this.fighterTypes = ["Python", "Java", "JavaScript", "C#", "PHP", "TypeScript", "C++"]
        this.fighterImgs = [
            "./img/py.png",
            "./img/java.png",
            "./img/js-1.png",
            "./img/csharp.png",
            "./img/php.png",
            "./img/ts.png",
            "./img/cplus.png"
        ]
        //BASIC GAME RELATED DEFAULTS
        this.scoreP1 = 0
        this.scoreP2 = 0
        this.roundIsOver = false
        this.gameIsOver = false
    };

    //DEFINING METHODS ---------------------------------------------------------

    // INITIATES THE GAME
    start(){
    game.startScreen.style.display = "none"
    game.gameScreen.style.display = "block"
    player1.element.src = game.selectedFighterUrls[0]
    player2.element.src = game.selectedFighterUrls[1]   
    p1Name.innerHTML = game.selectedFighterNames[0]
    p2Name.innerHTML = game.selectedFighterNames[1]
    }

    //UPDATES THE SCORE DOM ELEMENTS
    updateScore(){
        document.getElementById("p1-score").textContent = `${this.scoreP1}`
        document.getElementById("p2-score").textContent = `${this.scoreP2}`
    }

    //RESPONSIBLE FOR RUNNING THE GAME CORE
    gameLoop(){
        // CHECKS IF A ROUND IS OVER AND RESETS THE PLATFORM
        if (this.roundIsOver){
            game.resetPlatform()
        return
        };

        window.requestAnimationFrame(()=>{
            
        game.overCheck()

        //MOVEMENT OS THE PLAYERS
        player1.move()
        player2.move()
        
        //COUNTING THE VELOCITY OF THE PLAYERS
        player1.countVelocity()
        player2.countVelocity()
        
        //CHECKING IF THERE IS A COLLISION
        game.collissionDetection()
        
        //CHECKING IF GAME IS OVER
        game.overCheck()

        //STARTS THE PLATFORM SHRINKING PROCESS AFTER 3 SECOND FROM THE ROUND START
        setTimeout (()=>{
            
        game.shrinkPlatform()

        }, 3000)

        this.gameLoop()
        });   
    };
    //UPDATES THE SCORES WHEN THE ROUND IS OVER
    scoreCheck () {
        if (player1.isEliminated) {
            this.scoreP2 += 1
            this.updateScore()
            player1.isEliminated = false
        } else if (player2.isEliminated){
            this.scoreP1 += 1
            this.updateScore()
            player2.isEliminated = false
        }
        //SHOWS THE NEXT ROUND BUTTON WHEN A ROUND IS OVER
    this.nextRoundBtn.style.display = "block"
    }
    //CHECKS IF THE GAME IS OVER OR NOT AND REMOVES THE NEXT ROUND BUTTON
    overCheck() {

        let condition1 = this.scoreP1 === 2 && this.scoreP2 === 0
        let condition2 = this.scoreP2 === 2 && this.scoreP1 === 0
        let condition3 = this.scoreP2 === 3 || this.scoreP1 === 3
        
        //IF ONE OF THE GAME OVER CONDITIONS ARE TRUE, CALLS THE END SCREEN AND REMOVES THE NEXTROUND BUTTON
        if (condition1 || condition2 || condition3) {
            this.endScreen.style.display = "block"
            this.gameIsOver = true
            this.nextRoundBtn.style.display = "none"
        }
    }
    //DETECS WHEN A COLLISION HAPPENS
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
            //UPDATING THE NEW POSITIONS OF THE PLAYERS AFTER THE BOUNCE BACK
            player1.updatePosition()
            player2.updatePosition()
        }
        else if (tRQuarter){

            if (p1Power > p2Power) {
                console.log("P1 WON");
                const diff = p1Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.top -= bounce * (1 - (multiplier/multiDivident))
                player1.left += bounce * (1 - (multiplier/multiDivident))
                player2.top += bounce * multiplier
                player2.left -= bounce * multiplier
            }
            if (p2Power > p1Power) {
                console.log("P2 WON");
                const diff = p2Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.top -= bounce * multiplier
                player1.left += bounce * multiplier
                player2.top += bounce * (1 - (multiplier/multiDivident))
                player2.left -= bounce * (1 - (multiplier/multiDivident))
            }

            player1.updatePosition()
            player2.updatePosition()

            console.log("tR happened");

        }
        else if (bLQuarter){

            if (p1Power > p2Power) {
                console.log("P1 WON");
                const diff = p1Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.top += bounce * (1 - (multiplier/multiDivident))
                player1.left -= bounce * (1 - (multiplier/multiDivident))
                player2.top -= bounce * multiplier
                player2.left += bounce * multiplier
            }
            if (p2Power > p1Power) {
                console.log("P2 WON");
                const diff = p2Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.top += bounce * multiplier
                player1.left -= bounce * multiplier
                player2.top -= bounce * (1 - (multiplier/multiDivident))
                player2.left += bounce * (1 - (multiplier/multiDivident))
            }

            player1.updatePosition()
            player2.updatePosition()
            
            console.log("bL happened");

        }
        else if (bRQuarter){

            if (p1Power > p2Power) {
                console.log("P1 WON");
                const diff = p1Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.top += bounce * (1 - (multiplier/multiDivident))
                player1.left += bounce * (1 - (multiplier/multiDivident))
                player2.top -= bounce * multiplier
                player2.left -= bounce * multiplier
            }
            if (p2Power > p1Power) {
                console.log("P2 WON");
                const diff = p2Power - p2Power
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.top += bounce * multiplier
                player1.left += bounce * multiplier
                player2.top -= bounce * (1 - (multiplier/multiDivident))
                player2.left -= bounce * (1 - (multiplier/multiDivident))
            }


            player1.updatePosition()
            player2.updatePosition()

            console.log("bR happened");

        }
        else if (tside){
            
            if (p1Power > p2Power) {
                
                console.log("P1 WON");
                const diff = p1Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);
                
                player1.top -= bounce * (1 - (multiplier/multiDivident))
                player2.top += bounce * multiplier
            }

            if (p2Power > p1Power) {
                
                console.log("P2 WON");
                const diff = p2Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);
                
                player1.top -= bounce * multiplier
                player2.top += bounce * (1 - (multiplier/multiDivident))
            }

            player1.updatePosition()
            player2.updatePosition()

            console.log("ts happened");

        }
        else if (bside){

            if (p1Power > p2Power) {

                console.log("P1 WON");
                const diff = p1Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.top += bounce * (1 - (multiplier/multiDivident))
                player2.top -= bounce * multiplier
            }

            if (p2Power > p1Power) {

                console.log("P2 WON");
                const diff = p2Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.top += bounce * multiplier
                player2.top -= bounce * (1 - (multiplier/multiDivident))
            }
            

            player1.updatePosition()
            player2.updatePosition()

            console.log("bs happened");

        }
        else if (lside){

            if (p1Power > p2Power) {

                console.log("P1 WON");
                const diff = p1Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.left -= bounce * (1 - (multiplier/multiDivident))
                player2.left += bounce * multiplier
            }

            if (p2Power > p1Power) {

                console.log("P2 WON");
                const diff = p2Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);

                player1.left -= bounce * multiplier
                player2.left += bounce * (1 - (multiplier/multiDivident))
            }

            player1.updatePosition()
            player2.updatePosition()

            console.log("ls happened");

        }
        else if (rside){

            if (p1Power > p2Power) {

            console.log("P1 WON");
            const diff = p1Stronger
            const multiplier = Math.floor(diff/diffDivident)
            console.log(multiplier);

            player1.left += bounce * (1 - (multiplier/multiDivident))
            player2.left -= bounce * multiplier
            }

            if (p2Power > p1Power) {

                console.log("P2 WON");
                const diff = p2Stronger
                const multiplier = Math.floor(diff/diffDivident)
                console.log(multiplier);
    
                player1.left += bounce * multiplier
                player2.left -= bounce * (1 - (multiplier/multiDivident))
                }

            player1.updatePosition()
            player2.updatePosition()

            console.log("RS happened");
        }
    }
    //PLATFORM SHRINKING EFFECT
    shrinkPlatform(){
        //DECREASING THE SIZE OF THE PLATFORM WITH THE SHRING RATE 
        this.platformWidth -= this.platformShrinkRate
        this.platformHeight -= this.platformShrinkRate
        //UPDATING THE DOM ELEMENT
        this.platform.style.width = `${this.platformWidth}px`
        this.platform.style.height = `${this.platformHeight}px`
             
    }
    //RESETS THE PLATFORM AFTER ROUND IS OVER
    resetPlatform(){
        //SETTING BACK BASE PLATFORM SIZE
        this.platformWidth = 400
        this.platformHeight = 400
        //UPDATING THE DOM ELEMENT
        this.platform.style.width = "400px"
        this.platform.style.height = "400px"
    }
}

