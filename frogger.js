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
    const frogger = document.querySelector('.frogger');
    const points = document.querySelector('#points');
    const hi_score = document.querySelector('#hi-score');


    timmers = [];
    froggerObj = { initialX: 307.5, initialY: 603, points:0, lives: 0, livesY: 84 }
    backgroundMusic = new Audio();  win = new Audio(); lose = new Audio(); popMusic = new Audio();
    backgroundMusic.src = 'sounds/heckincrows.ogg'; lose.src = 'sounds/machinePowerOff.ogg'; popMusic.src = 'sounds/pop.ogg';
    play = false;  carsLeft = 0;
    xDown = null;
    var yDown = null;

function points_scores(div, num ){
    const fivetBits =  num.toString().padStart(5, '0')
    div.innerHTML =fivetBits;
}

    function musicMode() {
        if (backgroundMusic.paused || backgroundMusic.ended) backgroundMusic.play();
        else backgroundMusic.pause();
    }

    function cloneNodes(node, num) {
        for (let i = 0; i < num; i++) {
            clone = document.querySelector("." + node).cloneNode(true)
            clone.className = node
            gameArea.appendChild(clone)
        }
    }

    cloneNodes("turtles1", 9)
    cloneNodes("turtles2", 6)
    cloneNodes("logs1", 2)
    cloneNodes("logs2", 2)
    cloneNodes("logs3", 2)

    const turtles1 = document.querySelectorAll('.turtles1')
    const turtles2 = document.querySelectorAll('.turtles2')
    const logs1 = document.querySelectorAll('.logs1')
    const logs2 = document.querySelectorAll('.logs2')
    const logs3 = document.querySelectorAll('.logs3')

    function spaceNodes(nodeList, num = 45, n = 1) {
        space = 0;
        for (let i = 0; i < nodeList.length; i++) {
            if (i % n == 0) {
                nodeList[i].style.left = space + "px";
                space += num;
            } else {
                nodeList[i].style.left = nodeList[i - 1].offsetLeft + 45 + "px"
            }
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
    spaceNodes(turtles1, 190, 3)
    spaceNodes(turtles2, 190, 2)

    function hitObstacle(frogger, elem) {
        if (((frogger.x < elem.x + elem.width && frogger.x + frogger.width > elem.x) &&
            (frogger.y < elem.y + elem.height && frogger.y + frogger.height > elem.y)
        )) {
            if (frogger.offsetTop >345) {
                return true
            } else {
                frogger.style.left = elem.offsetLeft + "px";
            }
        }
        return false
    }

    function clearTimmers(){
         timmers.forEach(t => {
        clearInterval(t)
        backgroundMusic.pause()
    });}

    function movecars(lst, speed, space) {
        lst.forEach(car => {
            if (hitObstacle(frogger, car) ) {
                clearTimmers()
                return
            }

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
  
    function moveFrogger(direction) {
        switch (direction) {
            case 'ArrowUp':
                frogger.src = "images/player-up.png"
                if (frogger.offsetTop == 378 && frogger.offsetTop > froggerObj.livesY)
                    frogger.style.top = "345px"
                else if (frogger.offsetTop > froggerObj.livesY)
                    frogger.style.top = frogger.offsetTop - 45 + "px"
                break;
            case 'ArrowDown':
                frogger.src = "images/player-down.png"
                if (frogger.offsetTop == 345 && frogger.offsetTop < froggerObj.initialY)
                    frogger.style.top = "378px"
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
                if (frogger.offsetLeft < 656 - 45)
                    frogger.style.left = frogger.offsetLeft + 45 + "px"
                break;
            default:
                break;
                
        }

        
        froggerObj.points +=10
        points_scores(points, froggerObj.points )
    }

    function startIntervals() {
        timmers.push(setInterval(() => { movecars(turtles1, -10, 45) }, 500))
        timmers.push(setInterval(() => { movecars(logs1, 10, 120) }, 500))
        timmers.push(setInterval(() => { movecars(logs2, -10, 337) }, 500))
        timmers.push(setInterval(() => { movecars(logs3, 10, 195) }, 500))
        timmers.push(setInterval(() => { movecars(turtles2, -10, 45) }, 500))
        timmers.push(setInterval(() => { movecars(cars1, -10, 45) }, 500))
        timmers.push(setInterval(() => { movecars(cars2, 10, 45) }, 500))
        timmers.push(setInterval(() => { movecars(cars3, -10, 45) }, 500))
        timmers.push(setInterval(() => { movecars(cars4, 10, 45) }, 500))
        timmers.push(setInterval(() => { movecars(lorrys, -10, 84) }, 500))
    }

    function startGame() {
        if (play == false) {
            play = true;
            musicMode();
            // document.getElementsByClassName('title')[0].style.visibility = "hidden";
            startIntervals()
        }
    }

    function getTouches(evt) {
        return evt.touches ||             // browser API
               evt.originalEvent.touches; // jQuery
      }   
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {  return; }
        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;                                                                  
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) { moveFrogger("ArrowLeft") } else {    moveFrogger("ArrowRight") }                       
        } else {
            if ( yDiff > 0 ) { moveFrogger("ArrowUp") } else {    moveFrogger("ArrowDown") }                                                                 
        }
        xDown = null;
        yDown = null;                                             
    };
    
    pauseButton.addEventListener('click', () => {
        if (play == true) {
            play = false;
            backgroundMusic.pause();
        }
    });

    resetButton.addEventListener('click', () => { document.location.reload() });
    soundButton.addEventListener('click', musicMode);
    playButton.addEventListener('click', startGame);
    document.addEventListener('keyup', (e)=>{moveFrogger(e.code)});
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);
})