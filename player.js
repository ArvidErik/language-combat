class Player {
    constructor (imgSrc, left, top, type) {
        this.x = 0
        this.y = 0
        this.left = left
        this.top = top
        this.type = type
        this.width = 50
        this.height = 50
        // this.velocityX
        // this.velocityY
        this.element = document.createElement("img")
        this.platform = document.querySelector("#platform")
        
        this.element.src = imgSrc
        this.element.style.position = "absolute"
        this.element.style.width = "50px"
        this.element.style.height = "50px"
        this.element.style.left = `${left}px`
        this.element.style.top = `${top}px`
        this.element.style.borderRadius = "50%"

        this.platform.appendChild(this.element)
    }

    move() {
        this.left += this.x;
        this.top += this.y;
           
     
        if(this.left <0){
            this.left = 0;
        }
        
        if(this.top <0){
            this.top = 0;
        }

        if (this.left > this.platform.offsetWidth - this.width) {
            this.left = this.platform.offsetWidth - this.width;
        }

        if (this.top > this.platform.offsetHeight - this.height) {
            this.top = this.platform.offsetHeight - this.height;
        }
        // this.updatePosition();
    }

    updatePosition(type){
        if (type === "p1") {
            this.element.style.left = `${this.left}px`
            this.element.style.top = `${this.top}px`
        } else if (type === "p2") {
            this.element.style.left = `${this.left + 50}px`
            this.element.style.top = `${this.top}px`
    }
    }
}