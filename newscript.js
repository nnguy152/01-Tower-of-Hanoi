// selectors for containers
var container1 = document.querySelector('.one')
var container2 = document.querySelector('.two')
var container3 = document.querySelector('.three')
// stores first block on tower & first/second clicked container
var selected = null
var destination = null
var start = null
// stores total moves
var movesStart = 0
var moves = document.querySelector('.moves')
// some silly code
var winCounter = 0
var button = document.querySelector('.button')

// starts game upon page load
document.onload = startGame()

function startGame () {
  addListeners()
}

// adds listeners to containers
function addListeners () {
  container1.addEventListener('click', containerOneClicked)
  container2.addEventListener('click', containerTwoClicked)
  container3.addEventListener('click', containerThreeClicked)
}

// when specific container clicked, goes to specific function
// containerClicked function stores container/firstChild in variables declared at beginning
// changes listener event functions to selectDestination
function containerOneClicked () {
  selected = container1.firstElementChild
  start = container1
  if (start.childElementCount === 0) {
    startGame()
  } else {
    removeListener()
    container2.addEventListener('click', selectDestination2)
    container3.addEventListener('click', selectDestination3)
  }
}
function containerTwoClicked () {
  selected = container2.firstElementChild
  start = container2
  if (start.childElementCount === 0) {
    startGame()
  } else {
    removeListener()
    container1.addEventListener('click', selectDestination1)
    container3.addEventListener('click', selectDestination3)
  }
}
function containerThreeClicked () {
  selected = container3.firstElementChild
  start = container3
  if (start.childElementCount === 0) {
    startGame()
  } else {
    removeListener()
    container1.addEventListener('click', selectDestination1)
    container2.addEventListener('click', selectDestination2)
  }
}

// removes Listeners to prevent restarting from beginning
function removeListener () {
  container1.removeEventListener('click', containerOneClicked)
  container2.removeEventListener('click', containerTwoClicked)
  container3.removeEventListener('click', containerThreeClicked)
}

// when second container clicked, stores destination in variables declared at beginning
// removes event listeners to prevent JS restarting
function selectDestination1 () {
  destination = container1
  container1.removeEventListener('click', selectDestination1)
  container3.removeEventListener('click', selectDestination3)
  compare()
}
function selectDestination2 () {
  destination = container2
  container2.removeEventListener('click', selectDestination2)
  container3.removeEventListener('click', selectDestination3)
  compare()
}
function selectDestination3 () {
  destination = container3
  container1.removeEventListener('click', selectDestination1)
  container2.removeEventListener('click', selectDestination2)
  compare()
}

// sees if destination container has blocks
// if container has blocks, compares sizes
function compare () {
  if (destination.hasChildNodes() === true) {
    console.log(destination.hasChildNodes())
    compareChildren()
    addChildOnTop()
  } else {
    console.log(destination.hasChildNodes())
    console.log('at compare else')
    addChildOnTop()
  }
}

function compareChildren () {
  if (selected.width < destination.firstChild.width) {
    addChildOnTop()
  } else {
    startGame()
  }
}

// adds children in container
function addChildOnTop () {
  start.removeChild(selected)
  destination.prepend(selected)
  start = null
  destination = null
  selected = null
  trackMoves()
}

// increases moves counter when container adds child
function trackMoves () {
  movesStart++
  moves.innerHTML = `Moves: ${movesStart}`
  win()
}

// increases win counter when player moves all blocks to container 3
function win () {
  if (container3.childElementCount === 5) {
    winText()
    winCounter += 1
    button.innerHTML = `Wins: ${winCounter}`
  } else {
    startGame()
  }
}

// win popup text
var popup = document.querySelector('.youwin')
function winText () {
  popup.classList.toggle('show')
  setTimeout(() => {
    popup.innerHTML = 'Play again?'
  }, 1500)
  popup.addEventListener('click', () => {
    resetGame()
  })
}

// resets game/move counter and restarts game
var block = document.querySelectorAll('.block')
function resetGame () {
  if (container3.childElementCount !== 0) {
    container3.removeChild(container3.firstChild)
    container1.appendChild(block[0])
    container1.appendChild(block[1])
    container1.appendChild(block[2])
    container1.appendChild(block[3])
    container1.appendChild(block[4])
    movesStart = 0
    moves.innerHTML = `Moves: 0`
  }
  startGame()
}







// all below is just some silly code
// pressing win ups win count but window alerts asking if they cheating
var popupCheat = document.querySelector('.cheating')
button.onclick = () => {
  winCounter += 1
  button.innerHTML = `Wins: ${winCounter}`
  if (winCounter === 10) {
    // alert(`...you're not just clicking the button for fun, are you?`)
    popupCheat.classList.toggle('show1')
  }
  if (winCounter === 20) {
    popupCheat.innerHTML = `Really? You're still here?`
  }
  if (winCounter === 30) {
    popupCheat.innerHTML = `Stop clicking!!`
  }
  if (winCounter === 35) {
    popupCheat.innerHTML = `Seriously?`
  }
  if (winCounter === 38) {
    popupCheat.innerHTML = `Stop!!`
  }
  if (winCounter === 45) {
    popupCheat.innerHTML = `...`
  }
  if (winCounter === 55) {
    popupCheat.innerHTML = `I'm warning you...`
  }
  if (winCounter === 70) {
    popupCheat.innerHTML = `OK.`
  }
  if (winCounter === 75) {
    popupCheat.innerHTML = `YOU DID THIS.`
  }
  if (winCounter === 80) {
    document.body.style.visibility = 'hidden'
    popupCheat.innerHTML = `You broke the game. -_-`
    document.body.style.backgroundImage = "url('http://78.media.tumblr.com/tumblr_mab652PAHK1rf18ygo1_400.gif')"
  }
}

var h1 = document.querySelector('h1')
var instructions = document.querySelector('.instructions')
var rules = document.querySelector('.rules')
var blocks = document.querySelectorAll('.block')

// meow mode
var meow = document.querySelector('.meow')
meow.addEventListener('click', () => {
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].classList.add('cat')
    document.body.style.backgroundImage = "url('https://vignette.wikia.nocookie.net/clashofclans/images/3/30/NYAN_CAT.gif/revision/latest/scale-to-width-down/640?cb=20150415221840')"
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = '400px'
    h1.innerHTML = 'Meower of Catnoi'
    rules.innerHTML = 'meow meow meow meow meow'
    instructions.innerHTML = 'meow meow meow meow meow meow meow meow meow meow mewo meow meow meow meow meow meow meow'
  }
})
// hard mode
var hardMode = document.querySelector('.hardmode')
hardMode.addEventListener('click', () => {
  for (var i = 0; i < blocks.length; i++) {
    document.querySelectorAll('.bg')[i].style.visibility = 'hidden'
  }
  h1.innerHTML = 'Cower in Hardnoi'
  instructions.innerHTML = 'Objectives: Suffer. Rules: See objective.'
  document.body.style.backgroundImage = 'none'
  rules.innerHTML = 'Once you go black...'
  document.body.style.backgroundImage = 'hidden'
  setInterval(() => {
    movesStart++
    moves.innerHTML = `Moves: ${movesStart}`
  }, 300)
  setTimeout(() => {
    winCounter++
    document.querySelector('.button').style.visibility = 'visible'
    document.querySelector('.button').innerHTML = `Loss: ${winCounter}`
  }, 900)
})

var scary = document.querySelector('.scary')
scary.addEventListener('click', () => {
  document.querySelector('.button').style.visibility = 'hidden'
  document.body.style.visibility = 'hidden'
  setTimeout(() => {
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'stretch'
    document.body.style.backgroundPosition = 'center'
    document.body.style.backgroundImage = "url('https://i.ytimg.com/vi/pHGj9ZYhUv8/maxresdefault.jpg')"
    setTimeout(() => {
      document.body.style.backgroundImage = 'none'
    }, 200)
  }, 2000)
})
