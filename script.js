const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".current-player");
const Button = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6], [1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    //UI par bhi empty karna padega
    boxes.forEach((box,index)=>{
    box.innerText="";
    boxes[index].style.pointerEvents="all";

     //Initialize boxes with css properties again
     box.classList = `box box${index+1}`;

    })

   


    Button.classList.remove("active");
    gameInfo.innerText = `Current Player-${currentPlayer}`; 
}
initGame();


function swapTurn(){
    if(currentPlayer=="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    //UI Update
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "" //mujhe nhi pta abhi kon jeeta

    winningPosition.forEach((position)=>{
        //all 3 boxes should be non-empty and exaxtly same in value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
        && ((gameGrid[position[0]] === gameGrid[position[1]] && 
            gameGrid[position[1]] === gameGrid[position[2]])
           )){
            
            //check if winner is X or )
            if(gameGrid[position[0]]==="X")
                answer="X";
            else
                answer="0";

            //disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

                //now we know X/0 is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
    
        }
    
})
if(answer!==""){
    gameInfo.innerText= `Winner Player - ${answer}`;
    Button.classList.add("active");
    return;
}
//lets checking tie condition
 let fillCount = 0;
 gameGrid.forEach((box)=>{
    if(box!=="")
        fillCount++;
 });
 if(fillCount ===9){
    gameInfo.innerText = "Game Tied !";
    Button.classList.add("active");
 }
}




boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index); //index isliye pass kiya kyu ki pta lage konse box ke upar click kiya
    })
})


 function handleClick(index){
    if(gameGrid[index]==""){
        boxes[index].innerHTML = currentPlayer; //UI ko darshati h
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //swap karo
        swapTurn();
        checkGameOver();

    }
}

Button.addEventListener("click",initGame);