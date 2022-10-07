const container = document.getElementById('grid')
const btnClear = document.getElementById('btnClear')
const btnColor = document.getElementById('btnColor')
const btnEraser = document.getElementById('btnEraser')
const colorPicker = document.getElementById('colorPicker')
const sizeSlider = document.getElementById('sizeRange')
const sizeV = document.getElementById('sizeValue')

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

btnClear.onclick = () => reloadGrid()
btnColor.onclick = () => setMode('color')
btnEraser.onclick = () => setMode('eraser')
colorPicker.oninput = (e) => setColor(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)
sizeSlider.onmousemove = (e) => updateSize(e.target.value)

const defMode = 'color'
const defCol = 'black'
const defSize = 16

let currentColor = defCol
let currentMode = defMode
let currentSize = defSize

function setMode(mode){
    currentMode = mode
}

function updateSize(size) {
    sizeValue.innerHTML = `${size} x ${size}`
}

function setSize(size) {
    currentSize = size
}

function setColor(color){
    currentColor = color
}

function reloadGrid() {
    clearGrid()
    createGrid(currentSize)
}

function changeSize(size){
    setSize(size)
    reloadGrid()
}

function clearGrid(){
    grid.innerHTML = ''
}

function createGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.addEventListener('mouseover', changeColor)
        cell.addEventListener('mousedown', changeColor)
        container.appendChild(cell)
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && mouseDown === false) return
    if(currentMode === 'eraser'){
        e.target.style.backgroundColor = 'white'
    } else if(currentMode === 'color'){
        e.target.style.backgroundColor = currentColor
    }
}

createGrid(currentSize);


