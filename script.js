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

// user clicks on starting container
// stores container as start variable
// stores firstChild in container as selected
// turns clicked false so start won't be changed
// calls selectDestination function
if (clicked) {
  container1.addEventListener('click', () => {
    selected = container1.firstElementChild
    console.log(container1.firstElementChild)
    start = container1
    console.log('selected start 1')
    selectDestination()
    clicked = false
  })
} else if (clicked) {
  container2.addEventListener('click', () => {
    selected = container2.firstElementChild
    console.log(container2.firstElementChild)
    start = container2
    console.log('selected start 2')
    selectDestination()
    clicked = false
  })
} else if (clicked) {
  container3.addEventListener('click', () => {
    selected = container3.firstElementChild
    console.log(container3.firstElementChild)
    start = container3
    console.log('selected start 3')
    selectDestination()
    clicked = false
  })
}

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
      console.log('selected destination')
      compare()
    })
    container3.addEventListener('click', () => {
      destination = container3
      console.log('selected destination')
      compare()
    })
  } else if (start === container3) {
    container1.addEventListener('click', () => {
      destination = container1
      console.log('selected destination')
      compare()
    })
    container2.addEventListener('click', () => {
      destination = container2
      console.log('selected destination')
      compare()
    })
  }
}

// event prevent default?
function compare () {
  if (destination.hasChildNodes() === true) {
    if (selected.offsetWidth < destination.firstChild.offsetWidth) {
      start.removeChild(selected)
      destination.insertBefore(selected, destination.firstChild)
      console.log('Yay it worked >_>')
    }
  } else {
    start.removeChild(selected)
    console.log(start)
    console.log(selected)
    destination.appendChild(selected)
    console.log(destination)
    console.log('Yay it worked without children >_>')
  }
}

// container1.addEventListener('click', () => {
//   selected = document.querySelector('.container').firstChild
//   selectDestination()
// })

// container2.addEventListener('click', () => {
//   selected = document.querySelector('.container').firstChild
//   selectDestination()
// })
// container3.addEventListener('click', () => {
//   selected = document.querySelector('.container').firstChild
//   selectDestination()
// })














// function checkContainer(thisBlock) {
//   if (container.contains(block1 || block2 || block3)) {
//     if (thisblock )
//   }
// }
// function checkWidth () {
//   if 
// }
// function checkBlock () {
//   if (container.contains(block) ) {
//     console.log('hi')
//   }
// }
// So basically.
// Have container listen for dragover
// when block dragged over
// call check container function

// function CHECK CONTAINER for what blocks it has => node.contain(othernode)
// check for true or false
// if container has small block, do not let mid or bottom block in on top
// if container has middle block, only allow top block in on top
// if container has bottom block, allow middle block in, allow top in
// so if all conditions are true, allow MOVE function

// function MOVE
// move function -> allow whatever block clicked to insert itself on top

// right now, these containers only allow top block to be dragged around

// container[1].addEventListener('dragover', releaseBlock)

// function releaseBlock (blockNum) {
//   block[0].addEventListener('click', () => {
//     bNum = blockNum
//     console.log(bNum)
//   })
// }
    // if (event.target.className === 'container') {
    //   block[bNum].parentNode.removeChild(block[bNum])
    //   container[bNum].insertBefore(block[bNum], container[cNum].firstChild)
    // }

  // container[1].addEventListener('dragover', (event) => {
  //   event.preventDefault()
  //   if (event.target.className === 'container two') {
  //     block[0].parentNode.removeChild(block[0])
  //     container[1].appendChild(block[0])
  //   }
  // })
  // container[2].addEventListener('dragover', (event) => {
  //   event.preventDefault()
  //   if (event.target.className === 'container three') {
  //     block[0].parentNode.removeChild(block[0])
  //     container[2].appendChild(block[0])
  //   }
  // })

// click and placing

//To Do!
//1. For each container - add event Listener, 'dragover'
//2. 'dragover' calls function 'releaseBlock' with arguments for currentBlock and event
//3. when block is clicked, store block num in global variable
//4. when block released, pass in global block, and event.  