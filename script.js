console.log("script.js is working...");

const player1 = new Player("./img/js-1.png", 100, 180, "p1")
const player2 = new Player("./img/js-1.png", 250, 180, "p2")

const platform = document.querySelector("#platform")

function handleKeyboardInput(key){
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
  }

game.start();

platform.addEventListener("keydown",(event)=>{
    handleKeyboardInput(event.key)
  })


// Script related functions ----------------------------------------------------

function handleKeyboardInput(key){
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
  }