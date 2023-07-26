console.log("script.js is working...");



const player1 = new Player(250, 180, "p1")
const player2 = new Player(100, 180, "p2")
const game = new Game()
const nextRoundBtn = document.getElementById("next-round-btn")
const startButton = document.getElementById("start-btn")
const platform = document.querySelector("#platform")
const title = document.getElementById("title")
const subTitle = document.getElementById("sub-title")
const fighterElements = document.getElementsByClassName("fighter")
const selectButton = document.createElement("button")
const startGameBtn = document.createElement("button")
let selectCount = 0


// SELECT HERO PART

startButton.addEventListener("click",()=>{
    let newDiv = document.createElement('div')
    newDiv.className = "fighter-container"

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
      
      i++

      fighterDiv.appendChild(imgTag)
      fighterDiv.appendChild(fighterH4)
      newDiv.appendChild(fighterDiv)

    }) 

    game.startScreen.appendChild(newDiv)

    //hide start button and change title text
    startButton.style.display = "none"
    title.innerHTML = "Player 1 select your hero"
    subTitle.innerHTML = "Choose wisely"

    const textForSelectBtn = document.createTextNode("Select")
    selectButton.appendChild(textForSelectBtn)
    
    for (let index = 0; index < fighterElements.length; index++) {
      const element = fighterElements[index];
      
      element.addEventListener("click", ()=>{
        if (selectCount === 0) {
          element.firstChild.classList.add("p1-selected")
          game.selectedFighters.push(element.firstChild.getAttribute("src"))
          console.log(game.selectedFighters[0]);
          
        } if (selectCount === 1) {
          element.firstChild.classList.add("p2-selected")
          game.selectedFighters.push(element.firstChild.getAttribute("src"))
          console.log(game.selectedFighters[1]);
        }
        selectCount++
        
        if (selectCount === 2) {
          const startGameBtnContent = document.createTextNode("START GAME")
          startGameBtn.appendChild(startGameBtnContent)
          startGameBtn.className = "start-game-btn"
          game.startScreen.appendChild(startGameBtn)
        }
      })        
    }
  })

  

  startGameBtn.addEventListener("click", ()=>{
    console.log("click");
    game.startScreen.style.display = "none"
    game.gameScreen.style.display = "block"
    player1.element.src = game.selectedFighters[0]
    player2.element.src = game.selectedFighters[1]   
    game.gameLoop()
  });
  


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

  function selectFighter () {
    let selectButton = document.createElement("button").innerHTML("SELECT")
    newDiv.appendChild(selectButton)
    console.log("button pressed!");
  }

