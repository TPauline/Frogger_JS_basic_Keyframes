document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.querySelector('.gameArea')
    const playButton = document.querySelector('#play')
    const pauseButton = document.querySelector('#pause')
    const resetButton = document.querySelector('#reset')
    const soundButton = document.querySelector('#sound')
    const car1s = document.querySelectorAll('.car1')
    const car2s = document.querySelectorAll('.car2')
    const car3s = document.querySelectorAll('.car3')
    const car4s = document.querySelectorAll('.car4')
    const lorrys = document.querySelectorAll('.lorry')
    const frogger = document.querySelector('.frogger')




    froggerObj = {
        initialX: 307.5,
        initialY: 605,
        lives: 0,
        livesY: 84
    }

    carsLeft = 0

    for (let i = 0; i < 3; i++) {
        if (i < 2) {
            clone = document.querySelector(".turtles2").cloneNode(true)
            clone.className = "turtles2"
            gameArea.appendChild(clone)

            clone = document.querySelector(".logs1").cloneNode(true)
            clone.className = "logs1"
            gameArea.appendChild(clone)


            clone = document.querySelector(".logs2").cloneNode(true)
            clone.className = "logs2"
            gameArea.appendChild(clone)

            clone = document.querySelector(".logs3").cloneNode(true)
            clone.className = "logs3"
            gameArea.appendChild(clone)
        }
        clone = document.querySelector(".turtles1").cloneNode(true)
        clone.className = "turtles1"
        gameArea.appendChild(clone)

        clone = document.querySelector(".turtles2").cloneNode(true)
        clone.className = "turtles2"
        gameArea.appendChild(clone)


    }

    const turtles1 = document.querySelectorAll('.turtles1')
    const turtles2 = document.querySelectorAll('.turtles2')

    const logs1 = document.querySelectorAll('.logs1')
    const logs2 = document.querySelectorAll('.logs2')
    const logs3 = document.querySelectorAll('.logs3')

    for (let i = 0; i < car1s.length; i++) {
        car1s[i].style.left = carsLeft + "px"
        car3s[i].style.left = carsLeft + "px"
        car2s[i].style.left = carsLeft + 20 + "px"
        car4s[i].style.left = carsLeft + 20 + "px"
        lorrys[i].style.left = carsLeft + "px"

        turtles1[i].style.left = carsLeft + "px"
        turtles2[i].style.left = carsLeft + "px"

        if (i < 3) {
            logs1[i].style.left = carsLeft + 55 + "px"
            logs2[i].style.left = carsLeft + 100 + "px"
            logs3[i].style.left = carsLeft + "px"

        }
        carsLeft += 200
    }



    var myMusic = new Audio(),
        win = new Audio(),
        lose = new Audio(),
        popMusic = new Audio();
    myMusic.src = 'sounds/heckincrows.ogg',
        lose.src = 'sounds/machinePowerOff.ogg',
        popMusic.src = 'sounds/pop.ogg';

    let play = false;

    function musicMode() {
        if (myMusic.paused || myMusic.ended)
            myMusic.play();
        else
            myMusic.pause();
    }

    function startGame() {
        if (play == false) {
            play = true;
            document.getElementsByClassName('title')[0].style.visibility = "hidden";
        }
    }

    speed = -10

    function movecars(lst, speed, dir) {
        lst.forEach(car => {
            // console.log(car.offsetLeft)
            n = car.offsetLeft + speed
            car.style.left = n + "px";
            if (n > 660) {
                car.style.left = -10 + "px";
            }
            if (n < -20) {
                car.style.left = 660 + "px";
            }
        })
    }


    function moveFrogger(e) {
        switch (e.code) {
            case 'ArrowUp':
                frogger.src = "images/player-up.png"
                if (frogger.offsetTop == 425)
                    frogger.style.top = frogger.offsetTop - 35 + "px"
                else
                    frogger.style.top = frogger.offsetTop - 45 + "px"
                break;
            case 'ArrowDown':
                frogger.src = "images/player-down.png"
                if (frogger.offsetTop == 390)
                frogger.style.top = frogger.offsetTop + 35 + "px"
                else
                frogger.style.top = frogger.offsetTop + 45 + "px"
                break;
            case 'ArrowLeft':
                frogger.src = "images/player-left.png"
                frogger.style.left = frogger.offsetLeft - 45 + "px"
                break;
            case 'ArrowRight':
                frogger.src = "images/player-right.png"
                frogger.style.left = frogger.offsetLeft + 45 + "px"
                break;
            default:
                break;
        }

    }
    setInterval(() => {
        movecars(car1s, speed, "left");
    }, 200)
    setInterval(() => {
        movecars(car2s, -speed, "right");
    }, 200)
    setInterval(() => {
        movecars(car3s, speed, "left");
    }, 200)
    setInterval(() => {
        movecars(car4s, -speed, "left");
    }, 200)
    setInterval(() => {
        movecars(lorrys, speed, "left");
    }, 200)




    pauseButton.addEventListener('click', () => {
        if (play == true) {
            play = false;
            alert("Game pause");
            musicMode();
            endGame();
        }
    });

    resetButton.addEventListener('click', () => {
        document.location.reload()
    });
    soundButton.addEventListener('click', musicMode);
    playButton.addEventListener('click', startGame);
    playButton.addEventListener('click', musicMode);

    document.addEventListener('keyup', moveFrogger);

})