//CREATEIN THE PLAYERS
const player1 = new Player(250, 180, "p1")
const player2 = new Player(100, 180, "p2")
const game = new Game()

//DOM ELEMENTS
const nextRoundBtn = document.getElementById("next-round-btn")
const startButton = document.getElementById("start-btn")
const platform = document.querySelector("#platform")
const title = document.getElementById("title")
const subTitle = document.getElementById("sub-title")
const fighterElements = document.getElementsByClassName("fighter")
const selectButton = document.createElement("button")
const startGameBtn = document.createElement("button")
const p1Name = document.getElementById("p1-name")
const p2Name = document.getElementById("p2-name")

//COUNTER USED IN SELECTION COUNT
let selectCount = 0

// EVENT LISTENERS ----------------------------------------------------------------------------

// SELECT HERO PART: WHEN START BUTTON IS PRESSED IT INITIATES THE FIGHTER SELECTION
startButton.addEventListener("click",()=>{
    createFighterElements()
    //HIDE START BUTTON AND CHANGES THE CONTENT OF THE PAGE
    updateContent()
    //CHECKS IS P2 IS READY WITH SELECTION AND SHOWS THE "START GAME" BUTTON
    selectionCount()
  })

  startGameBtn.addEventListener("click", ()=>{
    console.log("click");
    //STARTS THE GAME
    game.start()
    //COUNTS BACK FROM 3 BEFORE THE ROUND
    countBack();
    //WAITS FOR THE COUNT BACK WITH THE START
    setTimeout(() => {
      removeCounter()
      game.gameLoop() 
      }, 5000);
  });
  
window.addEventListener("keydown",(event)=>{
    //HANDLES THE KAYBOARD INPUTS
    handleKeyboardInput(event.key)
  })

nextRoundBtn.addEventListener("click", ()=>{
    //CONTAINS THE NEXTROUND BUTTON BEHAVIOUR
    nextRoundBtnBehav()
  });


// Script related functions ----------------------------------------------------

  //STORES THE USER INPUTS AND RESTORES THE VELOCITY
  function handleKeyboardInput(key){

    // PLAYER1 MOVEMENT
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

    //PLAYER2 MOVEMENT
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
  //COUNTS BACK BEFORE THE START OF A ROUND AND UPDATES THE DOM ELEMENT
  function countBack () {
    const countNum = document.getElementById("count-back")
    countNum.textContent = " "
    countNum.style.display = "Block"
    let j = 3

    const int = setInterval(() => {
        if (j > 0) {
            countNum.textContent = `${j}`;
            j--

        } else if (j === 0) {
            countNum.textContent = `GO!`;
            clearInterval(int)
        }     
    }, 1000);

    
  }
  //REMOVES THE COUNTER DOM FROM THE SCREEN
  function removeCounter () {
    const countNum = document.getElementById("count-back")
    countNum.style.display = "none"

  }
  // GIVES THE CONTENT OF THE FIGHTER SELECTION PAGE
  function createFighterElements() {
    
    let newDiv = document.createElement('div')
    newDiv.className = "fighter-container"

    let i = 0
    game.fighterTypes.forEach((fighter)=>{
      //CREATES THE FIGHTER NAMES
      let fighterDiv = document.createElement('div')
      fighterDiv.className = "fighter"
      let fighterH4 = document.createElement('h4')
      let figtherContent = document.createTextNode(fighter)
      fighterH4.appendChild(figtherContent)

      //CREATES THE FIGHTER IMAGES
      let imgTag = document.createElement('img')
      imgTag.className = "fighter-img"
      let imageContent =`${game.fighterImgs[i]}`
      imgTag.src += imageContent
      
      i++

      //ADDS THE CONTENT TO THE DOM
      fighterDiv.appendChild(imgTag)
      fighterDiv.appendChild(fighterH4)
      newDiv.appendChild(fighterDiv)
    }) 
    //PUTS EVERYTHING TO THE SCREEN
    game.startScreen.appendChild(newDiv)
  }
  //UPDATATES THE DOM ELEMENTS WITH THE FIGHTER SELECTION RELATED DATA
  function updateContent() {
    startButton.style.display = "none"
    title.innerHTML = "<b class='p1'>Player 1</b> select your hero"
    subTitle.innerHTML = "Choose wisely"
  }
  //SHOWS THE "START GAME BUTTON WHEN PLAYER2 IS ALSO SELECTED A FIGHTER"
  function selectionCount () {

    for (let index = 0; index < fighterElements.length; index++) {
      const element = fighterElements[index];
      
      element.addEventListener("click", ()=>{
        //TAKES P1 INPUT DATA AND STORES IT
        if (selectCount === 0) {
          element.firstChild.classList.add("p1-selected")
          game.selectedFighterUrls.push(element.firstChild.getAttribute("src"))
          game.selectedFighterNames.push(element.lastChild.innerHTML)
          title.innerHTML = "<b class='p2'>Player 2</b> select your hero"
        
          //TAKES P2 INPUT DATA AND STORES IT
        } if (selectCount === 1) {
          element.firstChild.classList.add("p2-selected")
          game.selectedFighterUrls.push(element.firstChild.getAttribute("src"))
          game.selectedFighterNames.push(element.lastChild.innerHTML)
        }
        selectCount++
        
        if (selectCount === 2) {
          //WHEN BOTH PLAYERS ARE DONE WITH SELECTION SHOW THE START GAME BUTTON
          const startGameBtnContent = document.createTextNode("START GAME")
          startGameBtn.appendChild(startGameBtnContent)
          startGameBtn.className = "start-game-btn"
          startGameBtn.classList.add("btn")
          game.startScreen.appendChild(startGameBtn)
        }
      }) 
             
    }

   
  }
  //RESETS THE POSITIONS OF THE PLAYERS AND STARTS A NEW ROUND
  function nextRoundBtnBehav() {
    player1.resetPosition()
    player2.resetPosition()
    game.roundIsOver = false
    nextRoundBtn.style.display = "none"
    countBack();
    setTimeout(() => {
      removeCounter()
      game.gameLoop() 
      }, 5000);
  }

