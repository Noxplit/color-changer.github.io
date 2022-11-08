const cols = document.querySelectorAll('.col')

// function generateRandomColor() {
// 	// RGB
// 	//FF000
// 	//00FF00
// 	//0000FF
// 	const hexColors = '0123456789ABCDEF'
// 	let col = ''

// 	for (i = 0; i < 6; i++) {
// 		col += hexColors[Math.floor(Math.random() * hexColors.length)]
// 	}
// 	return '#' + col
// } - Генерация случайного цвета

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsForHash() : []
	cols.forEach((col,index) => {
  const isLocked = col.querySelector('i').classList.contains('fa-lock')
  const text = col.querySelector('h2')
  const button = col.querySelector('button')
  const color = isInitial ? colors[index] : chroma.random()

if (isLocked) {
  colors.push(text.textContent)
  return
}

if(!isInitial) {
  colors.push(color)

}
    
    text.textContent = color
		col.style.background = color
    setTextColor(text, color)
    setTextColor(button, color)
	})
  updateColorsHash(colors)
}

function setTextColor(text,color) {
  const luninance = chroma(color).luminance()
  text.style.color = luninance > 0.5 ? 'black' : 'white'
}


document.addEventListener('keydown', event => {
  event.preventDefault()
  if(event.code.toLowerCase() === 'space') {
    setRandomColors()
  }
})

document.addEventListener('click', event =>{
  const type = event.target.dataset.type
  if(type === 'lock'){
    const node = event.target.tagName.toLowerCase() === 'i' ?
    event.target : event.target.children[0]

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy'){
    copyToClickBoard(event.target.textContent)
  }
  else if (type === 'changeCol') {
    setRandomColors()
  }



})

function updateColorsHash(color = []) {
  document.location.hash = color.map(col => {
    return col.toString().substring(1)
  }).join('-')
}

function copyToClickBoard(text) {
  return navigator.clipboard.writeText(text)
}

function getColorsForHash() {
  if(document.location.hash.length > 1 ) {
    return document.location.hash.substring(1).split('-').map(color => {
      return '#' + color
    })
  }
  return []
}

setRandomColors(true)


// document.addEventListener('click', event => {
//   const buttonChange = document.querySelector('.btnChange')
//   buttonChange = setRandomColors()
// })
