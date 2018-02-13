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
  startGame()
}
