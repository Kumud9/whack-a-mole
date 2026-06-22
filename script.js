const boxes = document.querySelectorAll('.box')
const sd= document.querySelector('#score')
const td=document.querySelector('#timer')
const startbut= document.querySelector('#start-btn')
const hammer = document.getElementById("hammer");
const hitsound= new Audio("sound.mp3");


document.addEventListener("mousemove", (e) => {
 hammer.style.left = (e.clientX - 50) + "px";
    hammer.style.top = (e.clientY - 50) + "px";
});

let score=0;
let timeleft=20;
let activebox=null;

let ratinterval= null;
let countinterval=null
function startgame(){
   hammer.style.display = "block";
    score=0;
    timeleft=20;
    sd.textContent= score;
    td.textContent= timeleft;
   startbut.disabled= true;

     clearInterval(ratinterval)
     clearInterval(countinterval)
   ratinterval=setInterval(randomrat,1000)
 countinterval=setInterval(countdown,1000)
  
}
function randomrat(){
    if (activebox) {
        activebox.classList.remove('mole');
    }

    const randomidx= Math.floor(Math.random() * boxes.length );
    activebox= boxes[randomidx];
    activebox.classList.add('mole');


}

boxes.forEach(box=>{
    box.addEventListener('click',()=>{
        if(box===activebox){
             hitsound.currentTime = 0;
            hitsound.play();

            score++;
            sd.textContent=score;
           box.classList.remove('mole')
           activebox=null

        }
    })
})

function countdown(){
    timeleft--;
    td.textContent=timeleft;
if(timeleft===0){

    clearInterval(ratinterval )
clearInterval(countinterval)

   if (activebox) {
        activebox.classList.remove('mole');
    }
    

startbut.disabled=false;

hammer.style.display = "none";

   alert(`Game Over! Your final score is: ${score}`)

   score=0;
   sd.textContent=score;
}
}
startbut.addEventListener('click',startgame)



document.addEventListener("mousedown", () => {
    hammer.classList.add("hit");
});

document.addEventListener("mouseup", () => {
    hammer.classList.remove("hit");
});