let cells=document.querySelectorAll(".cell");
let resetBtn=document.querySelector(".reset-btn");
let Game=document.querySelector(".game");
let Heading=document.querySelector("#heading");

let message=document.createElement("p");
message.style.color="rgb(235, 18, 18)";
message.style.fontSize="3rem";
message.style.fontFamily = "baloo-2-font,cursive";
Game.append(message);

let playerTurn=document.createElement("p");
playerTurn.style.color="rgb(235, 18, 18)";
playerTurn.style.fontSize="2rem";
playerTurn.style.fontFamily= "baloo-2-font,cursive";
playerTurn.style.marginTop="0rem";
playerTurn.style.marginBottom="1.5rem";
Heading.insertAdjacentElement("afterend",playerTurn);
/*
Let’s read it in English:
“Insert playerTurn after the end of the heading element.”
*/

/*
Alternatively we can also use :-
Game.insertBefore(playerTurn,Heading.nextSibling);
It means,in Game -insert playerTurn before next sibling of Heading(here container class)...
so add playerTurn before .container and after Heading
*/ 


const winningPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let turnX=true;
playerTurn.innerText="Player X Turn";

cells.forEach(cell => {
    cell.addEventListener("click",() => {

        if(cell.innerText !== ""){
          return;
        }

        if(turnX){
          cell.innerText="X";
          cell.style.color="rgb(235, 18, 18)";
          turnX=false;
          playerTurn.innerText="Player O Turn";

       }
       else{
          cell.innerText="O";
          cell.style.color="black";
          turnX=true;
          playerTurn.innerText="Player X Turn";
       }

       checkWinner();

    });
});


const checkWinner = () => {
    for(let pattern of winningPatterns){
        let pos1Value=cells[pattern[0]].innerText;
        let pos2Value=cells[pattern[1]].innerText;
        let pos3Value=cells[pattern[2]].innerText;

        if(pos1Value !== "" && pos2Value !=="" && pos3Value !==""){
            if(pos1Value === pos2Value && pos2Value === pos3Value){
                message.innerText="Player "+pos1Value+" Won !";
                playerTurn.innerText="";
                disableCells();

                confetti({
                  particleCount: 150,    // number of confetti pieces
                  spread: 70,            // how wide the burst spreads
                  origin: { y: 0.6 },    // where it starts (0 = top, 1 = bottom)
                  colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd']
                });

                return;

            }
        }
    }
    //Check for Draw
    let isallFilled=true;
    cells.forEach(cell => {
        if(cell.innerText === ""){
            isallFilled=false;
        }
    });
    if(isallFilled){
        message.innerText="It's A Draw !";
        playerTurn.innerText="";
        disableCells();
    }
};
resetBtn.onclick = () => {
    cells.forEach(cell => {
        cell.innerText="";
        cell.disabled=false;
    });
    message.innerText="";
    turnX=true;
    playerTurn.innerText="Player X Turn";
};

const disableCells = () => {
    cells.forEach(cell => {
        cell.disabled=true;
    });
};

/* The upper disableCells() function can also be written as :-
const disableCells = () => {
    for(let cell of cells){
        cell.disabled=true;
    }
} 
This is a traditional practise and old method,modern js use upper method...
Also .forEach is used for NodeLists like "cells" here and for Arrays but not for strings
*/

