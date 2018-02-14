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

// removes Listeners to prevent starting JS from beginning
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
    addChild()
  }
}

function compareChildren () {
  if (selected.width < destination.firstChild.width) {
    addChildOnTop()
  } else {
    startGame()
  }
}

function addChildOnTop () {
  start.removeChild(selected)
  destination.prepend(selected)
  start = null
  destination = null
  selected = null
  trackMoves()
}
function addChild () {
  start.removeChild(selected)
  destination.appendChild(selected)
  start = null
  destination = null
  selected = null
  trackMoves()
}

function trackMoves () {
  movesStart++
  moves.innerHTML = `Moves: ${movesStart}`
  win()
}
function win () {
  if (container3.childElementCount === 5) {
    winText()
    winCounter += 1
    button.innerHTML = `Wins: ${winCounter}`
  } else {
    startGame()
  }
}

function winText () {
  var popup = document.querySelector('.youwin')
  popup.classList.toggle('show')
  popup.addEventListener('click', () => {
    popup.classList.toggle('show')
    resetGame()
  })
}

// resets game/move counter
var block1 = document.querySelector('#first')
var block2 = document.querySelector('#second')
var block3 = document.querySelector('#third')
var block4 = document.querySelector('#fourth')
var block5 = document.querySelector('#fifth')
function resetGame () {
  if (container3.childElementCount !== 0) {
    container3.removeChild(container3.firstChild)
    container1.appendChild(block1)
    container1.appendChild(block2)
    container1.appendChild(block3)
    container1.appendChild(block4)
    container1.appendChild(block5)
    movesStart = 0
    moves.innerHTML = `Moves: 0`
  }
  startGame()
}

// all below is just some silly code
button.onclick = () => {
  winCounter += 1
  button.innerHTML = `Wins: ${winCounter}`
  if (winCounter === 10) {
    alert(`...you're not just clicking the button for fun, are you?`)
  }
  if (winCounter === 20) {
    alert(`Yeah, you definitely a cheater. Who else would play this many times??`)
  }
}

var h1 = document.querySelector('h1')
var instructions = document.querySelector('.instructions')
var rules = document.querySelector('.rules')
var blocks = document.querySelectorAll('.block')
var meow = document.querySelector('.meow')
meow.addEventListener('click', () => {
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].classList.add('cat')
    h1.innerHTML = 'Meower of Catnoi'
    rules.innerHTML = 'meow meow meow meow meow'
    instructions.innerHTML = 'meow meow meow meow meow meow meow meow meow meow mewo meow meow meow meow meow meow meow'
  }
})

var hardMode = document.querySelector('.hardmode')
hardMode.addEventListener('click', () => {
  for (var i = 0; i < blocks.length; i++) {
    document.querySelectorAll('.bg')[i].style.visibility = 'hidden'
  }
  h1.innerHTML = 'Cower in Hardnoi'
  instructions.innerHTML = 'Objectives: Suffer. Rules: See objective.'
  rules.innerHTML = 'Once you go black...'
  document.querySelector('.button').style.visibility = 'hidden'
})

var scary = document.querySelector('.scary')
scary.addEventListener('click', () => {
  document.body.style.visibility = 'hidden'
  document.body.style.backgroundImage = "url('https://i.ytimg.com/vi/pHGj9ZYhUv8/maxresdefault.jpg')"
})
