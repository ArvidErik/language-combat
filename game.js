console.log("game.js is working now...");

class Game {
    constructor () {
        this.startScreen = document.querySelector("#start-screen")
        this.selectFighterScreen = document.querySelector("#select-fighter-screen")
        this.gameScreen = document.querySelector("#game-screen")
        this.endScreen = document.querySelector("#end-screen")
        this.platform = document.getElementById("platform")
        this.platformWidth = 400
        this.platformHeight = 400
        this.platformShrinkRate = 0.1
        this.selectedFighters = []

        this.scoreP1 = 0
        this.scoreP2 = 0
        this.gameIsOver = false
        this.fighterTypes = ["Python", "Java", "JavaScript", "C#", "PHP", "TypeScript", "C++"]
        this.fighterImg = [
            "./img/py.png",
            "./img/java.png",
            "./img/js-1.png",
            "./img/csharp.png",
            "./img/php.png",
            "./img/ts.png",
            "./img/cplus.png"
        ]
    };

    

    start(){
        this.selectFighterScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        this.gameLoop();

    }
    //This function updates the score element on the screen
    updateScore(){
        document.getElementById("p1-score").textContent = `${this.scoreP1}`
        document.getElementById("p2-score").textContent = `${this.scoreP2}`
    }

    gameLoop(){
        if (this.gameIsOver){
            console.log("Game Over");
            game.resetPlatform()

        return
        };

        window.requestAnimationFrame(()=>{
        
        player1.move()
        player2.move()
        
        player1.countVelocity()
        player2.countVelocity()
        
        // console.log("p2 xvel: "+ player2.velocityX);
        // console.log("p2 yvel: "+ player2.velocityY);
        
        game.collissionDetection()
        
        game.overCheck()

        setTimeout (()=>{
            game.shrinkPlatform()

        }, 3000)

        this.gameLoop()
        });
        
    };
    
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
    document.getElementById("next-round-btn").style.display = "block"
    }

    overCheck() {

        let condition1 = this.scoreP1 === 2 && this.scoreP2 === 0
        let condition2 = this.scoreP2 === 2 && this.scoreP1 === 0
        let condition3 = this.scoreP2 === 3 || this.scoreP1 === 3
        
        if (condition1 || condition2 || condition3) {
            this.endScreen.style.display = "block"
        }
    }

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
    
        // If the distance is less than the minimum distance, a collision is detected
        if (distance <= minDistance) {
            console.log('Collision detected!');
            this.bounceBack()
        }
     
    }

    bounceBack() {
        const p1Left = player1.left
        const p1Top = player1.top
        const p2Left = player2.left
        const p2Top = player2.top

        let p1Power = Math.abs(player1.velocityX) + Math.abs(player1.velocityY)
        let p2Power = Math.abs(player2.velocityX) + Math.abs(player2.velocityY)

        const velocity = 10

        //conditions
        const tLQuarter = (p1Left < p2Left && p1Top < p2Top)
        const tRQuarter = (p1Left > p2Left && p1Top < p2Top)
        const bLQuarter = (p1Left < p2Left && p1Top > p2Top)
        const bRQuarter = (p1Left > p2Left && p1Top > p2Top)
        const tside = (p1Left === p2Left && p1Top > p2Top)
        const bside = (p1Left === p2Left && p1Top < p2Top)
        const lside = (p1Left < p2Left && p1Top === p2Top)
        const rside = (p1Left > p2Left && p1Top === p2Top)
         

        if (tLQuarter) {

            if (p1Power > p2Power) {
            console.log("P1 WON");
            const diff = p1Power - p2Power
            const multiplier = Math.floor(diff/50)
            console.log(multiplier);

            player1.top -= velocity * (1 - (multiplier/100))
            player1.left -= velocity * (1 - (multiplier/100))
            player2.top += velocity * multiplier
            player2.left += velocity * multiplier
            }

            if (p2Power > p1Power) {
                console.log("P2 WON");
                const diff = p2Power - p1Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);
    
                player1.top -= velocity * multiplier
                player1.left -= velocity * multiplier
                player2.top += velocity * (1 - (multiplier/100))
                player2.left += velocity * (1 - (multiplier/100))
                }

            player1.updatePosition()
            player2.updatePosition()
            
            console.log("tL happened");

        }
        else if (tRQuarter){

            if (p1Power > p2Power) {
                console.log("P1 WON");
                const diff = p1Power - p2Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.top -= velocity * (1 - (multiplier/100))
                player1.left += velocity * (1 - (multiplier/100))
                player2.top += velocity * multiplier
                player2.left -= velocity * multiplier
            }
            if (p2Power > p1Power) {
                console.log("P2 WON");
                const diff = p2Power - p1Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.top -= velocity * multiplier
                player1.left += velocity * multiplier
                player2.top += velocity * (1 - (multiplier/100))
                player2.left -= velocity * (1 - (multiplier/100))
            }

            player1.updatePosition()
            player2.updatePosition()

            console.log("tR happened");

        }
        else if (bLQuarter){

            if (p1Power > p2Power) {
                console.log("P1 WON");
                const diff = p1Power - p2Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.top += velocity * (1 - (multiplier/100))
                player1.left -= velocity * (1 - (multiplier/100))
                player2.top -= velocity * multiplier
                player2.left += velocity * multiplier
            }
            if (p2Power > p1Power) {
                console.log("P2 WON");
                const diff = p2Power - p1Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.top += velocity * multiplier
                player1.left -= velocity * multiplier
                player2.top -= velocity * (1 - (multiplier/100))
                player2.left += velocity * (1 - (multiplier/100))
            }

            player1.updatePosition()
            player2.updatePosition()
            
            console.log("bL happened");

        }
        else if (bRQuarter){

            if (p1Power > p2Power) {
                console.log("P1 WON");
                const diff = p1Power - p2Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.top += velocity * (1 - (multiplier/100))
                player1.left += velocity * (1 - (multiplier/100))
                player2.top -= velocity * multiplier
                player2.left -= velocity * multiplier
            }
            if (p2Power > p1Power) {
                console.log("P2 WON");
                const diff = p2Power - p2Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.top += velocity * multiplier
                player1.left += velocity * multiplier
                player2.top -= velocity * (1 - (multiplier/100))
                player2.left -= velocity * (1 - (multiplier/100))
            }


            player1.updatePosition()
            player2.updatePosition()

            console.log("bR happened");

        }
        else if (tside){
            
            if (p1Power > p2Power) {
                
                console.log("P1 WON");
                const diff = p1Power - p2Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);
                
                player1.top -= velocity * (1 - (multiplier/100))
                player2.top += velocity * multiplier
            }

            if (p2Power > p1Power) {
                
                console.log("P2 WON");
                const diff = p2Power - p1Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);
                
                player1.top -= velocity * multiplier
                player2.top += velocity * (1 - (multiplier/100))
            }

            player1.updatePosition()
            player2.updatePosition()

            console.log("ts happened");

        }
        else if (bside){

            if (p1Power > p2Power) {

                console.log("P1 WON");
                const diff = p1Power - p2Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.top += velocity * (1 - (multiplier/100))
                player2.top -= velocity * multiplier
            }

            if (p2Power > p1Power) {

                console.log("P2 WON");
                const diff = p2Power - p1Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.top += velocity * multiplier
                player2.top -= velocity * (1 - (multiplier/100))
            }
            

            player1.updatePosition()
            player2.updatePosition()

            console.log("bs happened");

        }
        else if (lside){

            if (p1Power > p2Power) {

                console.log("P1 WON");
                const diff = p1Power - p2Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.left -= velocity * (1 - (multiplier/100))
                player2.left += velocity * multiplier
            }

            if (p2Power > p1Power) {

                console.log("P2 WON");
                const diff = p2Power - p1Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);

                player1.left -= velocity * multiplier
                player2.left += velocity * (1 - (multiplier/100))
            }

            player1.updatePosition()
            player2.updatePosition()

            console.log("ls happened");

        }
        else if (rside){

            if (p1Power > p2Power) {

            console.log("P1 WON");
            const diff = p1Power - p2Power
            const multiplier = Math.floor(diff/50)
            console.log(multiplier);

            player1.left += velocity * (1 - (multiplier/100))
            player2.left -= velocity * multiplier
            }

            if (p2Power > p1Power) {

                console.log("P2 WON");
                const diff = p2Power - p1Power
                const multiplier = Math.floor(diff/50)
                console.log(multiplier);
    
                player1.left += velocity * multiplier
                player2.left -= velocity * (1 - (multiplier/100))
                }

            player1.updatePosition()
            player2.updatePosition()

            console.log("RS happened");
        }
    }

    shrinkPlatform(){

            
            this.platformWidth -= this.platformShrinkRate
            this.platformHeight -= this.platformShrinkRate

            this.platform.style.width = `${this.platformWidth}px`
            this.platform.style.height = `${this.platformHeight}px`
             
    }

    resetPlatform(){

        this.platformWidth = 400
        this.platformHeight = 400

        this.platform.style.width = "400px"
        this.platform.style.height = "400px"
    }

}

