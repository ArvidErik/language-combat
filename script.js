console.log("script.js is working...");



const player1 = new Player("./img/js-1.png", 250, 180, "p1")
const player2 = new Player("./img/js-1.png", 100, 180, "p2")
const game = new Game()
const nextRoundBtn = document.getElementById("next-round-bt")
const platform = document.querySelector("#platform")

game.gameLoop()



window.addEventListener("keydown",(event)=>{
    handleKeyboardInput(event.key)
  })

nextRoundBtn.addEventListener("click", ()=>{
    game.gameLoop()
})





// Script related functions ----------------------------------------------------

function handleKeyboardInput(key){

    // player1 movement
    if(key === "ArrowUp"){
      player1.y = -1;
    }
    else if(key === "ArrowDown"){
      player1.y = 1;
    }
    else if(key === "ArrowLeft"){
      player1.x = -1;
    }
    else if(key === "ArrowRight"){
      player1.x = 1;
    }

    //player2 movement
    if(key === "w"){
        player2.y = -1;
      }
      else if(key === "s"){
        player2.y = 1;
      }
      else if(key === "a"){
        player2.x = -1;
      }
      else if(key === "d"){
        player2.x = 1;
      }
  }