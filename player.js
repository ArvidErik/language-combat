class Player {
    constructor (imgSrc, left, top, type) {
        this.x = 0
        this.y = 0
        this.xValues = []
        this.left = left
        this.top = top
        this.type = type
        this.width = 50
        this.height = 50
        this.isEliminated = false
        this.velocityX = 0
        this.velocityY = 0
        this.element = document.createElement("img")
        this.platform = document.querySelector("#platform")
        this.element.src = imgSrc
        this.element.style.position = "absolute"
        this.element.style.width = "50px"
        this.element.style.height = "50px"
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
        this.element.style.borderRadius = "50%"

        this.element.id = `${this.type}`

        this.platform.appendChild(this.element)
    }

    move() {
        this.left += this.x;
        this.top += this.y;

        this.checkLimit()
     
        this.updatePosition();
        
    }

    checkLimit () {
        if(this.left <0){
            this.isEliminated = true;
            this.element.style.opacity = "0.2";
            game.gameIsOver = true;
            game.scoreCheck()
        }
        
        if(this.top <0){
            this.isEliminated = true;
            this.element.style.opacity = "0.2";
            game.gameIsOver = true;
            game.scoreCheck()
        }

        if (this.left > this.platform.offsetWidth - this.width) {
            this.isEliminated = true;
            this.element.style.opacity = "0.2";
            game.gameIsOver = true;
            game.scoreCheck()
        }

        if (this.top > this.platform.offsetHeight - this.height) {
            this.isEliminated = true;
            this.element.style.opacity = "0.2";
            game.gameIsOver = true;
            game.scoreCheck()
        }
    }

    updatePosition(){
            this.element.style.left = `${this.left}px`
            this.element.style.top = `${this.top}px`
    }

    //resets the players position to the starting point
    resetPosition(){
        if (this.type === "p1") {
            this.element.style.left = "250px"
            this.element.style.top = "180px"
            this.left = 250
            this.top = 180
            this.x = 0
            this.y = 0
            this.element.style.opacity = "1"
            this.isEliminated = false

        } else {
            this.element.style.left = "100px"
            this.element.style.top = "180px"
            this.left = 100
            this.top = 180
            this.x = 0
            this.y = 0
            this.element.style.opacity = "1"
            this.isEliminated = false           
        }
    };

    countVelocity () {

        this.velocityX += this.x;
        this.velocityY += this.y;

    }

    power(){

    }

    




}
