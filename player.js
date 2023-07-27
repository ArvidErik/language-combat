class Player {
    constructor (left, top, type) {
        /*THE CONSTRUCTOR REQUIRES 3 ARGUMENTS THAT ARE DIFFERENT FOR P1 AND P2. THESE ARGUMENTS
        ARE PROVIDED WHEN THE PLAYER OBJECTS ARE CREATED IN THE script.js file*/
        this.x = 0
        this.y = 0
        this.left = left
        this.top = top
        this.type = type
        this.width = 50
        this.height = 50
        this.isEliminated = false
        this.velocityX = 0
        this.velocityY = 0

        //DEFINING DOM ELEMENTS
        this.element = document.createElement("img")
        this.platform = document.querySelector("#platform")
        this.element.classList.add("element")
        
        //UPDATING POSITIONS / DYNAMIC THINGS
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
        this.element.id = `${this.type}`
        this.platform.appendChild(this.element)
    }

    //DEFINING METHODS ---------------------------------------------------------

    //PLAYERS MOVEMENT
    move() {
        //UPDATEING LEFT AND TOP POSITIONS BASED ON THE USER INPUT
        this.left += this.x;
        this.top += this.y;

        //CALLING METHOD TO CHECK THE LIMITS OF THE TRACK
        this.checkLimit()
        //CALLING METHOD TO CONTINOUSLY UPDATE DOM ELEMENT
        this.updatePosition();      
    }

    //CHECKS IF PLAYER IS OUT OF TRACK, STOPS THE GAME AND ADDS SCORES
    checkLimit () {

        /*IF A PLAYER IS OUT OF TRACK, THE scoreCheck() METHOD GIVES A POINT TO THE OTHER,
        WINNER PLAYER*/
        
        //CHECKS LEFT BORDER
        if(this.left <0){
            this.isEliminated = true;
            this.element.style.opacity = "0.2";
            game.roundIsOver = true;
            game.scoreCheck()
        }
        //CHECKS TOP BORDER
        if(this.top <0){
            this.isEliminated = true;
            this.element.style.opacity = "0.2";
            game.roundIsOver = true;
            game.scoreCheck()
        }
        //CHECKS RIGHT BORER
        if (this.left > this.platform.offsetWidth - this.width) {
            this.isEliminated = true;
            this.element.style.opacity = "0.2";
            game.roundIsOver = true;
            game.scoreCheck()
        }
        //CHECKS BOTTOM BORDER
        if (this.top > this.platform.offsetHeight - this.height) {
            this.isEliminated = true;
            this.element.style.opacity = "0.2";
            game.roundIsOver = true;
            game.scoreCheck()
        }
    }

    //UPDATES THE PLAYER POSITIONS DYNAMICALLY
    updatePosition(){
            this.element.style.left = `${this.left}px`
            this.element.style.top = `${this.top}px`
    }

    //RESETS THE PLAYERS POSITION TO THE STARTING POINT
    resetPosition(){
        //PLAYER1 DEFAULT POSITION
        if (this.type === "p1") {
            this.element.style.left = "250px"
            this.element.style.top = "180px"
            this.left = 250
            this.top = 180
            this.x = 0
            this.y = 0
            this.element.style.opacity = "1"
            this.isEliminated = false
        //PLAYER2 DEFAULT POSITION
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

    //CALCULATES THE VELOCITY OF THE PLAYERS
    countVelocity () {
        /*THE FUNCTION IN game.js CALLED handleKeyboardInput() RESETS THE VELOCITY TO ZERO
        WHEN A USER CHANGES DIRECTION*/
        this.velocityX += this.x;
        this.velocityY += this.y;
    }

  
}
