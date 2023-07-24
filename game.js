console.log("game.js is working now...");

class Game {
    constructor () {
        this.startScreen = document.querySelector("#start-screen")
        this.selectFighterScreen = document.querySelector("#select-fighter-screen")
        this.gameScreen = document.querySelector("#game-screen")
        this.endScreen = document.querySelector("#end-screen")

        // this.player1 = new Player
        // this.player2 = new Player
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

    gameLoop(){
        if (this.gameIsOver){
            return
        };

        window.requestAnimationFrame(()=>{
        player1.move()
        player2.move()

        this.gameLoop()
        });
    };
}