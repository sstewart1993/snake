document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector("span")
    const startBtn = document.querySelector(".start")

    const width = 10
    let currentIndex = 0 //first div in grid
    let appleIndex = 0 //first div in grid
    let currentSnake = [2,1,0] //so the div in our grid is 2 (the HEAD) 
    // and 0 being the tail with all 1's being the body
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    // to start/restart the game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


    // function that deals with All the outcomes of the Snake 
    function moveOutcomes(){
    
        // deals with the snake hitting the border and itself
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits the bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits the right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits the left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') // if snake hits itself
        ){
            return clearInterval(interval) //this will clear the interval if any of the above happens
        }
        const tail = currentSnake.pop() //removes last ite of the arrayand shows it
        squares[tail].classList.remove('snake') // removes the class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

        // deals with the snake getting an apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    // generate a random apple once apple is eaten
    function randomApple() {
        do{
            appleIndex =  Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) //makes sure the apple doesnt land on a snake piece
        squares[appleIndex].classList.add('apple')
    }

    // assign the keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake') // we are removing the class of snake from all squares

        if(e.keyCode === 39){
            direction = 1 //if we press the right arrow key it will go right
        } else if(e.keyCode === 38){
            direction = -width //if we press the up arrow key it will go back 10 divs appearing to go up
        } else if(e.keyCode ===37){
            direction = -1 //if we press the left arrow key it will go left
        } else if(e.keyCode === 40){
            direction = +width //if we press the down arrow key it will appear 10 divs from where it is now
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
     
})