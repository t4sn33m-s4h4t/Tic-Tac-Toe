const gameBox = document.getElementsByClassName('game-box')[0]
let tacNum = 1
let rcount = 0
let ccount = 0

// play with computer 
const computerBtn = document.getElementById("computerBtn");
let clicked = false;

computerBtn.addEventListener("click", () => {
  if (!clicked) {
    computerBtn.classList.add("clicked");
    clicked = true;
  } else {
    computerBtn.classList.remove("clicked");
    clicked = false;
  }
  rcount = 0
  ccount = 0

  document.getElementById('rcount').innerText = rcount
  document.getElementById('ccount').innerText = ccount
  reStart()

});

// play with computer 

gameBox.addEventListener("click", (e) => {

  isRounded = e.target.classList.contains("round")
  isCrossed = e.target.classList.contains("cross")
  isGameBox = e.target.classList.contains("game-box")

  // play with robot////////////////////////////////////////////////////////
  let randomBox
  function playWithComputer() {
    allbox = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    allBoxes = [...document.getElementsByClassName('round'), ...document.getElementsByClassName('cross')]
    allBoxId = []
    for (let i = 0; i < allBoxes.length; i++) {
      const id = parseInt(allBoxes[i].getAttribute('id')); // get the id attribute value
      allBoxId.push(id); // add the id to the array
    }

    filteredBoxIds = allbox.filter(num => !allBoxId.includes(num));

    randomBoxId = filteredBoxIds[Math.floor(Math.random() * filteredBoxIds.length)];
    randomBox = document.getElementById(randomBoxId)
  }
  // play with robot////////////////////////////////////////////////////////

  if (!isRounded && !isCrossed && !isGameBox) {
    if (tacNum % 2 == 1) {
      e.target.classList.add("round")
      iswon = checkWinner(e, 'round')

      //////////////////////////////////////////////////////////
      if (!iswon && clicked) {
        playWithComputer()
        setTimeout(() => {
          randomBox.classList.add('cross')
          tacNum += 1
          checkWinner(e, 'cross')
        }, 400);
      } 
      ///////////////////////////////////////////////////////////



    } else if (tacNum % 2 == 0) {

      e.target.classList.add("cross")
      iswon = checkWinner(e, 'cross')


      //////////////////////////////////////////////////////////
      if (!iswon && clicked) {
        playWithComputer()
        setTimeout(() => {
          randomBox.classList.add('round')
          tacNum += 1
          checkWinner(e, 'round')
        }, 400);
      } 
      ///////////////////////////////////////////////////////////
    }

    tacNum = tacNum + 1
  } else {
    return
  }
})
function checkWinner(e, winnerClass) {

  winnerClasses = document.getElementsByClassName(winnerClass)
  drawNumber = [...document.getElementsByClassName('round'), ...document.getElementsByClassName('cross')].length
  numbers = [];
  for (let i = 0; i < winnerClasses.length; i++) {
    const element = winnerClasses[i];
    numbers.push(parseInt(element.id))
  }

  length = numbers.length;
  cm15 = canMake15(numbers, length)

  if (!cm15 && drawNumber === 9) {
    showWinner('draw')
    return true

  } else if (cm15) {
    showWinner(winnerClass)
    return true
  }
  else{
    return false
  }


}

function showWinner(winner) {
  if (winner === 'cross') {
    ccount = ccount + 1
    document.getElementById('draw').innerText = 'Won The Game!';
    document.getElementById('result-img').style.display = 'block'
    document.getElementById('result-img').src = `./${winner}.png`
  } else if (winner === 'round') {
    rcount = rcount + 1
    document.getElementById('draw').innerText = 'Won The Game!';
    document.getElementById('result-img').style.display = 'block'
    document.getElementById('result-img').src = `./${winner}.png`
  }
  else {
    document.getElementById('draw').innerText = 'DRAW!';
    document.getElementById('result-img').style.display = 'none'
  }
  document.getElementById('rcount').innerText = rcount
  document.getElementById('ccount').innerText = ccount
  document.getElementsByClassName('result-container')[0].classList.add("showResult")
  document.getElementsByClassName('overlay')[0].classList.add('show-overlay')
}



function canMake15(numbers, length) {
  for (let i = 0; i < length - 2; i++) {
    for (let j = i + 1; j < length - 1; j++) {
      for (let k = j + 1; k < length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === 15) {
          return true;
        }
      }
    }
  }
  return false;
}
function hideOverlay() {

  document.getElementsByClassName('result-container')[0].classList.remove('showResult')
  document.getElementsByClassName('overlay')[0].classList.remove('show-overlay')
  reStart()
}
document.getElementsByClassName('cancel')[0].addEventListener('click', hideOverlay)
document.getElementsByClassName('overlay')[0].addEventListener('click', hideOverlay)

document.getElementById('btn').addEventListener("click", reStart)

function reStart() {
  const boxes = document.getElementsByClassName("box")
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
    box.classList.remove('round')
    box.classList.remove('cross')

  }
}


