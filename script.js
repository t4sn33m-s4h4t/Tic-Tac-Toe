const gameBox = document.getElementsByClassName('game-box')[0]
let tacNum = 1
let rcount = 0 
let ccount = 0 
gameBox.addEventListener("click", (e) => {

  isRounded = e.target.classList.contains("round")
  isCrossed = e.target.classList.contains("cross")
  isGameBox = e.target.classList.contains("game-box")
  if (!isRounded && !isCrossed && !isGameBox) {
    if (tacNum % 2 == 1) {

      e.target.classList.add("round")
      checkWinner(e, 'round')

    } else if (tacNum % 2 == 0) {

      e.target.classList.add("cross")
      checkWinner(e, 'cross')

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
  
  if(!cm15 && drawNumber === 9) {
    showWinner('draw')

  }else if (cm15) {
    showWinner(winnerClass)
  }


}

function showWinner(winner) {
  if (winner==='cross') {
    ccount = ccount+1
    document.getElementById('ccount').innerText = ccount
    document.getElementById('draw').innerText = 'Won The Game!';
    document.getElementById('result-img').style.display = 'block'
    document.getElementById('result-img').src = `./${winner}.png`
  } else if(winner === 'round'){
    rcount = rcount+1
    document.getElementById('rcount').innerText = rcount
    document.getElementById('draw').innerText = 'Won The Game!';
    document.getElementById('result-img').style.display = 'block'
    document.getElementById('result-img').src = `./${winner}.png`
  }
  else{
    document.getElementById('draw').innerText = 'DRAW!';
    document.getElementById('result-img').style.display = 'none'
  }
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
