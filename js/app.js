let num1
let num2
let mathSigh = '+'

let rightRes
let randomRes1
let randomRes2

let currentMaxRes = 20
let maxPlus = 10
let maxMinus = 20
let maxMultiply = 100
let maxDivide = 10

let settingsMenuShown = false

const imgArr = [
  'barbara.png',
  'blue_globax.png',
  'frog.png',
  'goblin.png',
  'green_globax.png',
  'mage.webp',
  'minimus.png',
  'moskito.png',
  'naked_rayman.png',
  'rabbiteen.png',
  'rayman.png',
  'skeleton.png',
  'toad.png',
  'wizard.webp'
]

const currentNum1 = document.querySelector('.num1')
const currentNum2 = document.querySelector('.num2')
const currentMathSign = document.querySelector('.operator')
const result = document.querySelector('.num3')
const setPlus = document.querySelector('.plus')
const setMinus = document.querySelector('.minus')
const setMultiply = document.querySelector('.multiply')
const setDivide = document.querySelector('.divide')
const res1 = document.querySelector('.res1')
const res2 = document.querySelector('.res2')
const res3 = document.querySelector('.res3')
const block1 = document.querySelector('.block1')
const block2 = document.querySelector('.block2')
const block3 = document.querySelector('.block3')
const resAll = document.querySelectorAll('.res1, .res2, .res3')
const imageOnGuess = document.querySelector('.rayman')
const guessedSound = document.querySelectorAll('.ray1, .ray2, .ray3')
const settingsIcon = document.querySelector('.icon')
const settingsMenu = document.querySelector('.menu')
const plusInput = document.querySelector('.max-plus')
const minusInput = document.querySelector('.max-minus')
const multiplyInput = document.querySelector('.max-multiply')
const divideInput = document.querySelector('.max-divide')
const saveButton = document.querySelector('.button-save')
const refreshButton = document.querySelector('.button-refresh')

const getRandomInt = (int) => {
  return Math.floor(Math.random() * (int + 1));
}

const changeMathSign = sign => {
  mathSigh = sign
  currentMathSign.textContent = sign
}

const changeMaxRes = () => {
  if (mathSigh === '+') {
    currentMaxRes = maxPlus
  } else if (mathSigh === '-') {
    currentMaxRes = maxMinus
  } else if (mathSigh === '×') {
    currentMaxRes = maxMultiply
  } else  currentMaxRes = maxDivide
}

const shuffle = arr => {
  let newArray = []
  while(newArray.length < arr.length) {
    let index = getRandomInt(arr.length - 1)
    if(!newArray.includes(arr[index])) {
      newArray.push(arr[index])
    }
  } return newArray
}

const getRndPlusTask = () => {
  let summ = currentMaxRes + 1
  while(summ > currentMaxRes) {
    num1 = getRandomInt(currentMaxRes)
    num2 = getRandomInt(currentMaxRes)
    summ = num1 + num2
  }
  rightRes = summ
}

const getRndMinusTask = ()  => {
  let min = -1
  while(min < 0) {
    num1 = getRandomInt(currentMaxRes)
    num2 = getRandomInt(currentMaxRes)
    min = num1 - num2
  }
  rightRes = min
}

// currentMaxRes is divided by 5 to prevent multiplied numbers to be to high
const getRndMultiplyTask = ()  => {
  let multy = currentMaxRes + 1
  while(multy > currentMaxRes) {
    num1 = getRandomInt(currentMaxRes / 5)
    num2 = getRandomInt(currentMaxRes / 5)
    multy = num1 * num2
  }
  rightRes = multy
}

// if want to get rid of lots tasks with zero as the first num,
// add while condition '|| mum2 > num1'
const getRndDivideTask = ()  => {
  let div = currentMaxRes + 1
  while (div > currentMaxRes || div !== Math.trunc(div)) {
    num1 = getRandomInt(currentMaxRes)
    num2 = getRandomInt(currentMaxRes + 1)
    div = num1 / num2
  }
  rightRes = div
}

const getRandomResArr = () => {
  arr = [rightRes]
  let a = getRandomInt(currentMaxRes)
  let b = getRandomInt(currentMaxRes)
  while (a === b || a === rightRes || b === rightRes) {
    a = getRandomInt(currentMaxRes)
    b = getRandomInt(currentMaxRes)
  }
  arr.push(a)
  arr.push(b)
  return arr  
}

const checkIfGuessedRight = str => Number(str) === rightRes ? true : false

const setNewTask = () => {
  currentNum1.textContent = num1
  currentNum2.textContent = num2
}

const setNewResults = arr => {
  res1.textContent = arr[0]
  res2.textContent = arr[1]
  res3.textContent = arr[2]
}

const resetResColor = () => {
  for (let e of resAll) {
    e.style.color = '#fff'
  }
}

const generateTask = () => {
  resetResColor()
  changeMaxRes()
  if (mathSigh === '+') {
    getRndPlusTask()
  } else if (mathSigh === '-') {
    getRndMinusTask()
  } else if (mathSigh === '×') {
    getRndMultiplyTask()
  } else getRndDivideTask()
  setNewTask()
  setNewResults(shuffle(getRandomResArr()))
}

const showImage = (image, wait) => {
  image.src = `img/${imgArr[getRandomInt(imgArr.length - 1)]}`
  image.style.display = 'inline'
  image.style.top = `${getRandomInt(60)}%`
  image.style.left = `${getRandomInt(80)}%`
  setTimeout(() => {
    image.style.display = 'none'
    }, wait)
  }

const playRndSound = arr => {
  arr[getRandomInt(arr.length - 1)].play()
}

const showMenu = () => {
  if (settingsMenuShown === false) {
    settingsMenu.style.display = 'block'
    settingsMenuShown = true
  } else {
    settingsMenu.style.display = 'none'
    settingsMenuShown = false
  }
}

const changeMaxValues = () => {
  maxPlus = Number(plusInput.value)
  maxMinus = Number(minusInput.value)
  maxMultiply = Number(multiplyInput.value)
  maxDivide = Number(divideInput.value)
}

const setInputValue = () => {
  plusInput.value = maxPlus.toString()
  minusInput.value = maxMinus.toString()
  multiplyInput.value = maxMultiply.toString()
  divideInput.value = maxDivide.toString()
}

const refreshInputValue = () => {
  currentMaxRes = 10
  maxPlus = 10
  maxMinus = 20
  maxMultiply = 100
  maxDivide = 10
}

setPlus.addEventListener('click', () => {
  changeMathSign('+')
  generateTask()
})

setMinus.addEventListener('click', () => {
  changeMathSign('-')
  generateTask()
}) 

setMultiply.addEventListener('click', () => {
  changeMathSign('×')
  generateTask()
})
setDivide.addEventListener('click', () => {
  changeMathSign('÷')
  generateTask()
})

block1.addEventListener('click', () => {
  const str = res1.textContent
  if (checkIfGuessedRight(str)) {
    generateTask()
    showImage(imageOnGuess, 2000)
    playRndSound(guessedSound)
  } else document.querySelector('.res1').style.color = '#FE4A49'
})

block2.addEventListener('click', () => {
  const str = res2.textContent
  if (checkIfGuessedRight(str)) {
    generateTask()
    showImage(imageOnGuess, 2000)
    playRndSound(guessedSound)
  } else document.querySelector('.res2').style.color = '#2AB7CA'
})

block3.addEventListener('click', () => {
  const str = res3.textContent
  if (checkIfGuessedRight(str)) {
    generateTask()
    showImage(imageOnGuess, 2000)
    playRndSound(guessedSound)
  } else document.querySelector('.res3').style.color = '#FED766'
})

settingsIcon.addEventListener('click', () => {
  setInputValue()
  showMenu()
})

saveButton.addEventListener('click', () => {
  changeMaxValues()
  changeMaxRes()
  generateTask()
  showMenu()
})

refreshButton.addEventListener('click', () => {
  refreshInputValue()
  setInputValue()
  generateTask()
  showMenu()
})

generateTask()