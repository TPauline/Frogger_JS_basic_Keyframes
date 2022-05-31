document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.querySelector('.gameArea')
    const playButton = document.querySelector('#play')
    const pauseButton = document.querySelector('#pause')
    const resetButton = document.querySelector('#reset')
    const soundButton = document.querySelector('#sound')
    const cars1 = document.querySelectorAll('.cars1')
    const cars2 = document.querySelectorAll('.cars2')
    const cars3 = document.querySelectorAll('.cars3')
    const cars4 = document.querySelectorAll('.cars4')
    const lorrys = document.querySelectorAll('.lorry')
    const frogger = document.querySelector('.frogger')
    timmers= []

    var myMusic = new Audio(),
        win = new Audio(),
        lose = new Audio(),
        popMusic = new Audio();
    myMusic.src = 'sounds/heckincrows.ogg',
        lose.src = 'sounds/machinePowerOff.ogg',
        popMusic.src = 'sounds/pop.ogg';

    let play = false;

    froggerObj = {
        initialX: 307.5,
        initialY: 603,
        lives: 0,
        livesY: 84
    }

    carsLeft = 0

    function cloneNodes(node, num) {
        for (let i = 0; i < num; i++) {
            clone = document.querySelector("." + node).cloneNode(true)
            clone.className = node
            gameArea.appendChild(clone)
        }
    }

    cloneNodes("turtles1", 4)
    cloneNodes("turtles2", 3)
    cloneNodes("logs1", 2)
    cloneNodes("logs2", 2)
    cloneNodes("logs3", 2)

    const turtles1 = document.querySelectorAll('.turtles1')
    const turtles2 = document.querySelectorAll('.turtles2')
    const logs1 = document.querySelectorAll('.logs1')
    const logs2 = document.querySelectorAll('.logs2')
    const logs3 = document.querySelectorAll('.logs3')

    console.log(turtles1)
    function spaceNodes(nodeList, num) {
        space = 0
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].style.left = space + "px"
            space += num
        }
    }

    spaceNodes(cars1, 200)
    spaceNodes(cars2, 200)
    spaceNodes(cars3, 200)
    spaceNodes(cars4, 200)
    spaceNodes(lorrys, 200)
    spaceNodes(logs1, 200)
    spaceNodes(logs2, 500)
    spaceNodes(logs3, 250)
    spaceNodes(turtles1, 190)
    spaceNodes(turtles2, 190)

    function movecars(lst, speed, space) {
        lst.forEach(car => {
            // console.log(car.offsetLeft)
            n = car.offsetLeft + speed
            car.style.left = n + "px";
            if (n > (658 + space)) {
                car.style.left = -space + "px";
            }
            if (n < -space) {
                car.style.left = (658 + space) + "px";
            }
        })
    }
 let f = false
    // console.log(logs2[0].height)
    // console.log(turtles1[0].getElementsByTagName('img')[0].height)  
    function moveFrogger(e) {
        // console.log(frogger.offsetLeft)
        f = true
        switch (e.code) {
            
            case 'ArrowUp':
                frogger.src = "images/player-up.png"
                if (frogger.offsetTop == 378 && frogger.offsetTop > froggerObj.livesY)
                    frogger.style.top =  "345px"
                else if (frogger.offsetTop > froggerObj.livesY)
                    frogger.style.top = frogger.offsetTop - 45 + "px"
                break;
            case 'ArrowDown':
                frogger.src = "images/player-down.png"
                if (frogger.offsetTop == 300 && frogger.offsetTop < froggerObj.initialY)
                    frogger.style.top =  "345px"
                else if (frogger.offsetTop < froggerObj.initialY)
                    frogger.style.top = frogger.offsetTop + 45 + "px"
                break;
            case 'ArrowLeft':
                frogger.src = "images/player-left.png"
                if (frogger.offsetLeft > 0)
                    frogger.style.left = frogger.offsetLeft - 45 + "px"
                break;
            case 'ArrowRight':
                frogger.src = "images/player-right.png"
                if (frogger.offsetLeft < 656 - 55)
                    frogger.style.left = frogger.offsetLeft + 45 + "px"
                break;
            default:
                break;
        }
  
    }
    // console.log(logs2[0].width)
    // console.log(turtles1[0].getElementsByTagName('img')[0].width)
function hitObstacle(){
    

    cars2.forEach(elem => {
     if(f){
            console.log(f);
         
        }
        
        f = false
    x = ( frogger.x < elem.x + elem.width && frogger.x + frogger.width >= elem.x)
    y =(frogger.y < elem.y + elem.width && frogger.y + frogger.width > elem.y)

    if((frogger.x < elem.x + elem.width-45 &&
        frogger.x + frogger.width > elem.x &&
        frogger.y < elem.y + elem.height -45 &&
        frogger.y + frogger.height > elem.y 
       )){
            clearInterval(    timmers )  
         
            console.log("frogger =" +frogger.x + "," + frogger.y + ":: " +frogger.width + "," + frogger.height+" (" +frogger.offsetLeft + "," + frogger.offsetTop+")" )
            console.log("car     =" +cars1[2].x + ","+ cars1[2].y+ ":: " +cars1[2].width + "," + cars1[2].height)
           
        }
    });
}

function hitObstacle( frogger,obstacle, offset ){
    obstacle.forEach(elem => {    
        f = false
    x = ( frogger.x < elem.x + elem.width && frogger.x + frogger.width >= elem.x)
    y =(frogger.y < elem.y + elem.width && frogger.y + frogger.width > elem.y)

    if((frogger.x < elem.x + elem.width &&
        frogger.x + frogger.width > elem.x &&
        frogger.y < elem.y + elem.height -45 &&
        frogger.y + frogger.height > elem.y 
       )){
           timmers.forEach(t => {clearInterval(t) });
            console.log("frogger =" +frogger.x + "," + frogger.y + ":: " +frogger.width + "," + frogger.height+" (" +frogger.offsetLeft + "," + frogger.offsetTop+")" )
            console.log("car     =" +obstacle[2].x + ","+ obstacle[2].y+ ":: " +obstacle[2].width + "," + obstacle[2].height)
           
        }
    });
}

setInterval(()=>{
    // console.log("frogger =" +frogger.x + "," + frogger.y + ":: " +frogger.width + "," + frogger.height+" (" +frogger.offsetLeft + "," + frogger.offsetTop+")" )
   } ,1000)

    function musicMode() {
        if (myMusic.paused || myMusic.ended)
            myMusic.play();
        else
            myMusic.pause();
    }

    function startIntervals(){
        timmers.push(setInterval(() => { movecars(turtles1, -10, 165) }, 2000))
        timmers.push(setInterval(() => { movecars(logs1, 10, 120) }, 2000))
        timmers.push(setInterval(() => { movecars(logs2, -10, 337) }, 2000))
        timmers.push(setInterval(() => { movecars(logs3, 10, 195) }, 2000))
        timmers.push(setInterval(() => { movecars(turtles2, -10, 110) }, 2000))
        timmers.push(  setInterval(() => { movecars(cars1, -45, 55) }, 2000))
        timmers.push(setInterval(() => { movecars(cars2, 10, 55) }, 2000))
        timmers.push (setInterval(() => { movecars(cars3, -10, 55) }, 2000))
        timmers.push (setInterval(() => { movecars(cars4, 10, 55) }, 2000))
        timmers.push (setInterval(() => { movecars(lorrys, -10, 84) }, 2000))
        timmers.push(setInterval(()=>{
              hitObstacle(frogger,cars1,45)
              hitObstacle(frogger,cars2,45)
              hitObstacle(frogger,cars3,45)
              hitObstacle(frogger,cars4,45)
            hitObstacle(frogger,lorrys,45)

              hitObstacle(frogger,turtles1,45)

          },500))
    }

    function startGame() {
        if (play == false) {
            play = true;
            musicMode();
                        // document.getElementsByClassName('title')[0].style.visibility = "hidden";

        startIntervals()
        }
    }


    pauseButton.addEventListener('click', () => {
        if (play == true) {
            play = false;
            myMusic.pause();
        }
    });

    resetButton.addEventListener('click', () => {
        document.location.reload()
    });
    soundButton.addEventListener('click', musicMode);
    playButton.addEventListener('click', startGame);
    document.addEventListener('keyup', moveFrogger);

})