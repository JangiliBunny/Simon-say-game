let gameseq=[];
let userseq=[];

let colors=["yellow","red","purple","green"];

let gamestarted=false;
let level=0;
let highScore=0;

let h2=document.querySelector("h2");
let h3=document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(gamestarted==false){
        console.log("game satrted");
        gamestarted=true;
       levelUp();
    }
})

function btnFlash(btn){
   btn.classList.add("flash");
   setTimeout(function()  {
    btn.classList.remove("flash");
     }, 250);
}

function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let radIdx=Math.floor(Math.random()*3);
    let radcol=colors[radIdx];
    let radbtn=document.querySelector(`.${radcol}`);
    gameseq.push(radcol);
    console.log(gameseq);
    btnFlash(radbtn);
}

function UpdateHighScore(currScore){
   
    if(currScore > highScore){
        highScore=currScore;
       h3.innerText=`Highest Score ${highScore}`;
    }

}

function checkAns(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        let currScore=level;
        h2.innerHTML=`game over! Your score was <b>${currScore}</b>.<br> Press any key to restart the game`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
             document.querySelector("body").style.backgroundColor="white";
        },150);
        Reset();
         UpdateHighScore(currScore);
    }
}

function btnpress(){
    let btn=this;
    btnFlash(btn);
    let usercol=btn.getAttribute("id");
    userseq.push(usercol);
   
    checkAns(userseq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function Reset(){
    gamestarted=false;
        level=0;
        gameseq=[];
        userseq=[];
       
}