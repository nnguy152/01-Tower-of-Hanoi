var container1 = document.querySelector('.one')
var container2 = document.querySelector('.two')
var container3 = document.querySelector('.three')
var selected = null
var destination = null
var start = null
var movesStart = 0
var moves = document.querySelector('.moves')

document.onload = startGame()

function startGame () {
  addListeners()
}

function addListeners () {
  container1.addEventListener('click', containerOneClicked)
  container2.addEventListener('click', containerTwoClicked)
  container3.addEventListener('click', containerThreeClicked)
}

function containerOneClicked () {
  selected = container1.firstElementChild
  start = container1
  removeListener()
  container2.addEventListener('click', selectDestination2)
  container3.addEventListener('click', selectDestination3)
}
function containerTwoClicked () {
  selected = container2.firstElementChild
  start = container2
  removeListener()
  container1.addEventListener('click', selectDestination1)
  container3.addEventListener('click', selectDestination3)
}
function containerThreeClicked () {
  selected = container3.firstElementChild
  start = container3
  removeListener()
  container1.addEventListener('click', selectDestination1)
  container2.addEventListener('click', selectDestination2)
}

function removeListener () {
  container1.removeEventListener('click', containerOneClicked)
  container2.removeEventListener('click', containerTwoClicked)
  container3.removeEventListener('click', containerThreeClicked)
}

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

function compare () {
  if (destination.hasChildNodes() === true) {
    console.log(destination.hasChildNodes())
    // compareChildren()
    addChildOnTop()
  } else {
    console.log(destination.hasChildNodes())
    console.log('at compare else')
    addChild()
  }
}

// function compareChildren () {
//   if (selected.offsetWidth < destination.firstChild.offsetWidth) {
//     console.log(destination.firstChild.offsetWidth)
//     console.log('checking offset Width')
//     addChildOnTop()
//   } else {
//     alert('no')
//     startGame()
//   }
// }
function addChildOnTop () {
  start.removeChild(selected)
  destination.prepend(selected)
  start = null
  destination = null
  selected = null
  trackMoves()
  startGame()
}
function addChild () {
  start.removeChild(selected)
  destination.appendChild(selected)
  start = null
  destination = null
  selected = null
  trackMoves()
  startGame()
}

function trackMoves () {
  movesStart++
  moves.innerHTML = `${movesStart}`
}
