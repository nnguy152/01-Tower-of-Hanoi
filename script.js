var block1 = document.querySelector('.first')
var block2 = document.querySelector('.second')
var block3 = document.querySelector('.third')
var container1 = document.querySelector('.one')
var container2 = document.querySelector('.two')
var container3 = document.querySelector('.three')
var selected = null
var destination = null
var start = null
var clicked = true
var clicked2 = true
var movesStart = 0
var moves = document.querySelector('.moves')

// user clicks on starting container
// stores container as start variable
// stores firstChild in container as selected
// turns clicked false so start won't be changed
// calls selectDestination function
document.onload = startGame()
// @@@@@@@@ Why won't it keep clicked as false-> it changes
// click back to true before executing the rest of the code
function startGame () {
  if (clicked === true) {
    container1.addEventListener('click', () => {
      selected = container1.firstElementChild
      console.log(container1.firstElementChild)
      start = container1
      console.log('selected start 1')
      clicked = false
      selectDestination()
    })
  }
}
function startPart2 () {
 if (clicked) {
  container2.addEventListener('click', () => {
    selected = container2.firstElementChild
      console.log(container2.firstElementChild)
    start = container2
      console.log('selected start 2')
    clicked = false
    selectDestination()
  })
  container3.addEventListener('click', () => {
    selected = container3.firstElementChild
      console.log(container3.firstElementChild)
    start = container3
      console.log('selected start 3')
    clicked = false
    selectDestination()
  })
 }
}

// @@@@@@@@@@@@@@@@@@@@@ can't execute other click start
// possibilities without restarting entire operation

// user picks 2nd container
// stores as destination variable
// changes clicked2 to false so destination won't be changed
// calls compare function
function selectDestination () {
  if (start === container1) {
    if (clicked2 === true) {
      container2.addEventListener('click', () => {
        destination = container2
        compare()
        clicked2 = false
      })
      container3.addEventListener('click', () => {
        destination = container3
        compare()
        clicked2 = false
      })
    }
  } else if (start === container2) {
    container1.addEventListener('click', () => {
      destination = container1
      compare()
      clicked2 = false
    })
    container3.addEventListener('click', () => {
      destination = container3
      console.log('selected destination 3')
      compare()
      clicked2 = false
    })
  } else if (start === container3) {
    container1.addEventListener('click', () => {
      destination = container1
      console.log('selected destination 1')
      compare()
      clicked2 = false
    })
    container2.addEventListener('click', () => {
      destination = container2
      console.log('selected destination 2')
      compare()
      clicked2 = false
    })
  }
}

// remove Child doesn't work if not original parent container
// says child node does not exist even though it is
// visible in new container
// Plus selected stays as last block clicked from original container
function compare () {
  if (destination.hasChildNodes() === true) {
    if (selected.offsetWidth < destination.firstChild.offsetWidth) {
      addChild()
      startPart2()
    } else {
      startGame()
        console.log('no')
        console.log(selected) //why it only saves the last child from original parent container
    }
  } else {
    addChildFirst()
    startPart2()
  }
}

function addChild () {
  start.removeChild(selected)
  destination.prepend(selected)
  console.log('Yay it worked >_>')
  clicked = true
  clicked2 = true
  console.log(selected)
  trackMoves()
}

function addChildFirst () {
  start.removeChild(selected)
      console.log(start)
      console.log(selected)
  destination.appendChild(selected)
      console.log(destination)
      console.log('Yay it worked without children >_>')
  clicked = true
  clicked2 = true
  trackMoves()
}

function trackMoves () {
  movesStart++
  moves.innerHTML = `${movesStart}`
}


// @@@@ WON'T ALLOW CONTAINER ONE TO BE CHOSEN