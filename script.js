// selectors for containers/blocks
var container = document.querySelectorAll('.container')
var block = document.querySelectorAll('.block')
// stores first block on tower & first/second clicked container
var start = null
var destination = null
// stores total moves/wins
var movesStart = 0
var moves = document.querySelector('.moves')
var winCounter = 0
// for game modes
var button = document.querySelector('.button')
// win text popup
var popup = document.querySelector('.youwin')

// starts game upon page load
document.onload = startGame()

// adds listeners to containers
function startGame () {
  container.forEach(container => container.addEventListener('click', storeElements))
}

// found bug here. Able to select block under other blocks
function storeElements (evt) {
  if (start === null && (evt.target === container[0].firstElementChild || evt.target === container[1].firstElementChild || evt.target === container[2].firstElementChild)) {
    start = evt.target
    start.style.border = '2px solid red'
  } else {
    destination = evt.target
    if (destination === container[0] || destination === container[1] || destination === container[2]) {
      compare()
    }
  }
}

// sees if destination container has blocks & compares sizes, else prepends block
function compare () {
  if (destination.firstElementChild !== null) {
    compareChildren()
  } else {
    addChildOnTop()
  }
}

// compares index values, if bigger- invalid move popup, starts game code over
function compareChildren () {
  if (start.classList[0] < destination.firstElementChild.classList[0]) {
    addChildOnTop()
  } else {
    start.style.border = 'none'
    resetVariables()
    startGame()
  }
}

// resets variables to restart game code logic
function resetVariables () {
  start = null
  destination = null
}

// adds children in container
function addChildOnTop () {
  start.remove(start)
  destination.prepend(start)
  start.style.border = 'none'
  resetVariables()
  trackMoves()
}

// increases moves counter when container adds child
function trackMoves () {
  moves.innerHTML = `Moves: ${movesStart += 1}`
  win()
}

// increases win counter when player moves all blocks to container 3
function win () {
  if (container[2].childElementCount === 3 || container[2].childElementCount === 5) {
    winText()
    button.innerHTML = `Wins: ${winCounter += 1}`
  } else {
    startGame()
  }
}

// win popup text
function winText () {
  popup.classList.toggle('show')
  setTimeout(() => { popup.innerHTML = 'Play again?' }, 1500)
  popup.addEventListener('click', () => {
    popup.innerHTML = 'You win!'
    resetGame()
  })
}

// resets blocks/move counter and restarts game
function resetGame () {
  if (container[2].childElementCount !== 0) {
    container[2].removeChild(container[2].firstChild)
    block.forEach((blocks) => container[0].appendChild(blocks))
    movesStart = 0
    moves.innerHTML = `Moves: 0`
    popup.classList.toggle('show')
  }
  startGame()
}

// switch between easy & hard mode
document.querySelector('.easy').addEventListener('click', () => {
  block[3].remove()
  block[4].remove()
})

document.querySelector('.hard').addEventListener('click', () => {
  container[0].appendChild(block[3])
  container[0].appendChild(block[4])
})



// all below is just some silly code
var header = document.querySelector('h1')
var instructions = document.querySelector('.instructions')
var rules = document.querySelector('.rules')
var body = document.querySelector('body')

// hover over header
header.addEventListener('mouseover', () => {
  header.innerHTML = `( ͡° ͜ʖ ͡°)`
  setTimeout(() => {
    header.innerHTML = 'Tower of Hanoi'
  }, 600)
})

// pressing win increases win count but ...
var popupCheat = document.querySelector('.cheating')
button.onclick = () => {
  winCounter += 1
  button.innerHTML = `Wins: ${winCounter}`
  switch (winCounter) {
    case 4:
      popupCheat.classList.toggle('show1')
      break
    case 8:
      popupCheat.innerHTML = `Really?`
      break
    case 12:
      popupCheat.innerHTML = `Stop clicking!!`
      break
    case 17:
      popupCheat.innerHTML = `Stop.`
      break
    case 20:
      popupCheat.innerHTML = `...`
      break
    case 22:
      popupCheat.innerHTML = `I'm warning you...`
      break
    case 25:
      popupCheat.innerHTML = `OK.`
      break
    case 27:
      popupCheat.innerHTML = `YOU DID THIS.`
      break
    case 29:
      body.style.visibility = 'hidden'
      popupCheat.innerHTML = `You broke the game. -_-`
      popupCheat.style.fontSize = '30px'
      popupCheat.style.background = 'rgba(255, 0, 0, 0.7)'
      popupCheat.style.padding = '10px'
      popupCheat.style.borderRadius = '20px'
      body.style.backgroundImage = "url('giphy.gif')" // from https://giphy.com/gifs/horror-static-xaMg6NGwH2fFS
      body.style.backgroundHeight = '100%'
  }
}

// meow mode- changes blocks into stacks of Nyan cats and texts to meows
var meow = document.querySelector('.meow')
meow.addEventListener('click', () => {
  for (var i = 0; i < block.length; i++) {
    block[i].classList.add('cat')
    body.style.backgroundImage = "url('https://vignette.wikia.nocookie.net/clashofclans/images/3/30/NYAN_CAT.gif/revision/latest/scale-to-width-down/640?cb=20150415221840')"
    body.style.backgroundRepeat = 'no-repeat'
    body.style.backgroundSize = '400px'
    header.innerHTML = 'Meower of Catnoi'
    rules.innerHTML = 'meow meow meow meow meow'
    instructions.innerHTML = 'meow meow meow meow meow meow meow meow meow meow mewo meow meow meow meow meow meow meow'
  }
})

// DON'T mode
var scary = document.querySelector('.scary')
scary.addEventListener('click', () => {
  document.querySelector('.button').style.visibility = 'hidden'
  body.style.backgroundImage = 'none' // makes sure if player clicks meow mode first, nyan cat won't appear in "do not click" mode
  body.style.visibility = 'hidden'
  setTimeout(() => {
    body.style.backgroundRepeat = 'no-repeat'
    body.style.backgroundSize = 'stretch'
    body.style.backgroundPosition = 'center'
    body.style.backgroundImage = "url('http://i.imgur.com/yehFBWx.jpg')"
    setTimeout(() => {
      body.style.background = 'red'
      setTimeout(() => { body.style.background = 'black' }, 100)
    }, 200)
  }, 2000)
})
