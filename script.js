// selectors for containers/blocks
var container = document.querySelectorAll('.container')
var block = document.querySelectorAll('.block')
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
  container[0].addEventListener('click', containerOneClicked)
  container[1].addEventListener('click', containerTwoClicked)
  container[2].addEventListener('click', containerThreeClicked)
}

// when specific container clicked, goes to specific function
// containerClicked function stores container/firstChild in variables declared at beginning
// changes listener event functions to selectDestination
function containerOneClicked () {
  selected = container[0].firstElementChild
  selected.style.border = '2px solid red'
  start = container[0]
  if (start.childElementCount === 0) {
    startGame()
  } else {
    removeListener()
    container[1].addEventListener('click', selectDestination2)
    container[2].addEventListener('click', selectDestination3)
  }
}
function containerTwoClicked () {
  selected = container[1].firstElementChild
  selected.style.border = '2px solid red'
  start = container[1]
  if (start.childElementCount === 0) {
    startGame()
  } else {
    removeListener()
    container[0].addEventListener('click', selectDestination1)
    container[2].addEventListener('click', selectDestination3)
  }
}
function containerThreeClicked () {
  selected = container[2].firstElementChild
  selected.style.border = '2px solid red'
  start = container[2]
  if (start.childElementCount === 0) {
    startGame()
  } else {
    removeListener()
    container[0].addEventListener('click', selectDestination1)
    container[1].addEventListener('click', selectDestination2)
  }
}

// removes Listeners to prevent restarting from beginning
function removeListener () {
  container[0].removeEventListener('click', containerOneClicked)
  container[1].removeEventListener('click', containerTwoClicked)
  container[2].removeEventListener('click', containerThreeClicked)
}

// when second container clicked, stores destination in variables declared at beginning
// removes event listeners to prevent JS restarting
function selectDestination1 () {
  destination = container[0]
  container[0].removeEventListener('click', selectDestination1)
  container[2].removeEventListener('click', selectDestination3)
  compare()
}
function selectDestination2 () {
  destination = container[1]
  container[1].removeEventListener('click', selectDestination2)
  container[2].removeEventListener('click', selectDestination3)
  compare()
}
function selectDestination3 () {
  destination = container[2]
  container[0].removeEventListener('click', selectDestination1)
  container[1].removeEventListener('click', selectDestination2)
  compare()
}

// sees if destination container has blocks
// if container has blocks, compares sizes
function compare () {
  if (destination.hasChildNodes() === true) {
    compareChildren()
    // addChildOnTop()
  } else {
    addChildOnTop()
  }
}



function compareChildren () {
  if (selected === block[0]) {
    addChildOnTop()
  } else if (selected === block[1]) {
    if (destination.firstChild === block[0]) {
      startGame()
    } else {
      addChildOnTop()
    }
  } else if (selected === block[2]) {
    if (destination.firstChild === block[0] || destination.firstChild === block[1]) {
      startGame()
    } else {
      addChildOnTop()
    }
  } else if (selected === block[3]) {
    if (destination.firstChild === block[0] || destination.firstChild === block[1] || destination.firstChild === block[2]) {
      startGame()
    } else {
      addChildOnTop()
    }
  } else if (selected === block[4]) {
    if (destination.firstChild === block[0] || destination.firstChild === block[1] || destination.firstChild === block[2] || destination.firstChild === block[3]) {
      startGame()
    } else {
      addChildOnTop()
    }
  } else if (selected === block[5]) {
    if (destination.firstChild === block[0] || destination.firstChild === block[1] || destination.firstChild === block[2] || destination.firstChild === block[3] || destination.firstChild === block[4]) {
      startGame()
    } else {
      addChildOnTop()
    }
  }
}

// adds children in container
function addChildOnTop () {
  start.removeChild(selected)
  destination.prepend(selected)
  selected.style.border = 'none'
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
  if (container[0].childElementCount === 0 && container[1].childElementCount === 0) {
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
function resetGame () {
  if (container[2].childElementCount !== 0) {
    container[2].removeChild(container[2].firstChild)
    container[0].appendChild(block[0], block[1], block[2], block[3], block[4])
    movesStart = 0
    moves.innerHTML = `Moves: 0`
  }
  popup.classList.toggle('show')
  startGame()
}

// switch between easy & hard mode
document.querySelector('.easy').addEventListener('click', () => {
  container[0].removeChild(block[3])
  container[0].removeChild(block[4])
})

document.querySelector('.hard').addEventListener('click', () => {
  container[0].appendChild(block[3])
  container[0].appendChild(block[4])
})






























// all below is just some silly code
var h1 = document.querySelector('h1')
var instructions = document.querySelector('.instructions')
var rules = document.querySelector('.rules')

// hover over header
h1.addEventListener('mouseover', () => {
  h1.innerHTML = `( ͡° ͜ʖ ͡°)`
  setTimeout(() => {
    h1.innerHTML = 'Tower of Hanoi'
  }, 600)
})
// pressing win increases win count but ...
var popupCheat = document.querySelector('.cheating')
button.onclick = () => {
  winCounter += 1
  button.innerHTML = `Wins: ${winCounter}`
  if (winCounter === 4) {
    popupCheat.classList.toggle('show1')
  }
  if (winCounter === 8) {
    popupCheat.innerHTML = `Really?`
  }
  if (winCounter === 12) {
    popupCheat.innerHTML = `Stop clicking!!`
  }
  if (winCounter === 17) {
    popupCheat.innerHTML = `Seriously?`
  }
  if (winCounter === 20) {
    popupCheat.innerHTML = `Stop.`
  }
  if (winCounter === 22) {
    popupCheat.innerHTML = `...`
  }
  if (winCounter === 24) {
    popupCheat.innerHTML = `I'm warning you...`
  }
  if (winCounter === 28) {
    popupCheat.innerHTML = `OK.`
  }
  if (winCounter === 30) {
    popupCheat.innerHTML = `YOU DID THIS.`
  }
  if (winCounter === 32) {
    document.body.style.visibility = 'hidden'
    popupCheat.innerHTML = `You broke the game. -_-`
    document.body.style.backgroundImage = "url('http://78.media.tumblr.com/tumblr_mab652PAHK1rf18ygo1_400.gif')"
  }
}

// meow mode
// changes blocks into stacks of Nyan cats and texts to meows
var meow = document.querySelector('.meow')
meow.addEventListener('click', () => {
  for (var i = 0; i < block.length; i++) {
    block[i].classList.add('cat')
    document.body.style.backgroundImage = "url('https://vignette.wikia.nocookie.net/clashofclans/images/3/30/NYAN_CAT.gif/revision/latest/scale-to-width-down/640?cb=20150415221840')"
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = '400px'
    h1.innerHTML = 'Meower of Catnoi'
    rules.innerHTML = 'meow meow meow meow meow'
    instructions.innerHTML = 'meow meow meow meow meow meow meow meow meow meow mewo meow meow meow meow meow meow meow'
  }
})

// makes blocks "hidden," changes text, and automatically increases move counter
var hardest = document.querySelector('.hardest')
hardest.addEventListener('click', () => {
  for (var i = 0; i < block.length; i++) {
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

// DON'T mode
var scary = document.querySelector('.scary')
scary.addEventListener('click', () => {
  document.querySelector('.button').style.visibility = 'hidden'
  document.body.style.visibility = 'hidden'
  setTimeout(() => {
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'stretch'
    document.body.style.backgroundPosition = 'center'
    document.body.style.backgroundImage = "url('http://i.imgur.com/yehFBWx.jpg')"
    setTimeout(() => {
      document.body.style.background = 'red'
      setTimeout(() => {
        document.body.style.background = 'black'
      }, 100)
    }, 200)
  }, 2000)
})
