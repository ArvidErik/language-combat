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

    };
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
}