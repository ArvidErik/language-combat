console.log("script.js is working...");



const player1 = new Player("./img/js-1.png", 250, 180, "p1")
const player2 = new Player("./img/js-1.png", 100, 180, "p2")
const game = new Game()
const nextRoundBtn = document.getElementById("next-round-btn")
const startButton = document.getElementById("start-btn")
const platform = document.querySelector("#platform")
const title = document.getElementById("title")
const subTitle = document.getElementById("sub-title")
const fighterElements = document.getElementsByClassName("fighter")

game.gameLoop()


startButton.addEventListener("click",()=>{
    let newDiv = document.createElement('div')
    let imgDiv = document.createElement('div')
    newDiv.className = "fighter-container"
    imgDiv.className = "fighter-container"

    let i = 0
    game.fighterTypes.forEach((fighter)=>{
      let fighterDiv = document.createElement('div')
      fighterDiv.className = "fighter"
      let fighterH4 = document.createElement('h4')
      let figtherContent = document.createTextNode(fighter)
      fighterH4.appendChild(figtherContent)

      let imgTag = document.createElement('img')
      imgTag.className = "fighter-img"
      let imageContent =`${game.fighterImg[i]}`
      imgTag.src += imageContent

      console.log(game.fighterImg[i]);
      
      i++

      fighterDiv.appendChild(imgTag)
      fighterDiv.appendChild(fighterH4)
      newDiv.appendChild(fighterDiv)

      console.log(i);

    }) 
    game.startScreen.appendChild(newDiv)

    //hide start button and change title text
    startButton.style.display = "none"
    title.innerHTML = "Player 1 select your hero"
    subTitle.innerHTML = "Choose wisely"

})




window.addEventListener("keydown",(event)=>{
    handleKeyboardInput(event.key)
  })

nextRoundBtn.addEventListener("click", ()=>{
    player1.resetPosition()
    player2.resetPosition()
    game.gameIsOver = false
    nextRoundBtn.style.display = "none"
    countBack();
    setTimeout(() => {
    game.gameLoop() 
    }, 3000);
})









// Script related functions ----------------------------------------------------

function handleKeyboardInput(key){

    // player1 movement
    if(key === "ArrowUp"){
      player1.y = -1;
      player1.velocityY = 0
      
    }
    else if(key === "ArrowDown"){
      player1.y = 1;
      player1.velocityY = 0
    }
    else if(key === "ArrowLeft"){
      player1.x = -1;
      player1.velocityX = 0
    }
    else if(key === "ArrowRight"){
      player1.x = 1;
      player1.velocityX = 0
    }

    //player2 movement
    if(key === "w"){
        player2.y = -1;
        player2.velocityY = 0
      }
      else if(key === "s"){
        player2.y = 1;
        player2.velocityY = 0
      }
      else if(key === "a"){
        player2.x = -1;
        player2.velocityX = 0
      }
      else if(key === "d"){
        player2.x = 1;
        player2.velocityX = 0
      }
  }

  function countBack () {
    let i = 3

    setInterval(() => {
        if (i > 0) {
            console.log(i--);
        } else {
            clearInterval()
        }     
    }, 1000);
  }

