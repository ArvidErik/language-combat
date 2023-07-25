console.log("game.js is working now...");

class Game {
    constructor () {
        this.startScreen = document.querySelector("#start-screen")
        this.selectFighterScreen = document.querySelector("#select-fighter-screen")
        this.gameScreen = document.querySelector("#game-screen")
        this.endScreen = document.querySelector("#end-screen")


        this.scoreP1 = 0
        this.scoreP2 = 0
        this.gameIsOver = false
        this.fighterTypes = ["Python", "Java", "JavaScript", "C#", "PHP", "TypeScript", "C++"]
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
        return
        };

        window.requestAnimationFrame(()=>{
        player1.move()
        player2.move()

        console.log("p1 xvel: "+ player1.velocityX);
        console.log("p1 yvel: "+ player1.velocityY);

        this.collissionDetection()
        

        this.overCheck()
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



        const velocity = 20

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
            player1.top += velocity
            player1.left -= velocity
            player2.top -= velocity
            player2.left += velocity

            player1.updatePosition()
            player2.updatePosition()
            
            console.log("tL happened");

        }
        else if (tRQuarter){
            player1.top -= velocity
            player1.left += velocity
            player2.top += velocity
            player2.left -= velocity

            player1.updatePosition()
            player2.updatePosition()

            console.log("tR happened");

        }
        else if (bLQuarter){
            player1.top -= velocity
            player1.left -= velocity
            player2.top += velocity
            player2.left += velocity

            player1.updatePosition()
            player2.updatePosition()
            
            console.log("bL happened");

        }
        else if (bRQuarter){
            player1.top += velocity
            player1.left -= velocity
            player2.top -= velocity
            player2.left += velocity

            player1.updatePosition()
            player2.updatePosition()

            console.log("bR happened");

        }
        else if (tside){
            player1.top += velocity
            player2.top -= velocity

            player1.updatePosition()
            player2.updatePosition()

            console.log("ts happened");

        }
        else if (bside){
            player1.top -= velocity
            player2.top += velocity

            player1.updatePosition()
            player2.updatePosition()

            console.log("bs happened");

        }
        else if (lside){
            player1.left -= velocity
            player2.left += velocity

            player1.updatePosition()
            player2.updatePosition()

            console.log("ls happened");

        }
        else if (rside){
            player1.left += velocity
            player2.left -= velocity

            player1.updatePosition()
            player2.updatePosition()

            console.log("RS happened");
        }
    }

    

}

