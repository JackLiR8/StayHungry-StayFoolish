const detector = new google_myanmar_tools.ZawgyiDetector()
const converter = new google_myanmar_tools.ZawgyiConverter()

const btn = document.querySelector('.trigger')
const p = document.querySelector('.output')
const input = document.querySelector('.input')

input.addEventListener('input', toUnicode)
btn.addEventListener('click', toUnicode)

function toUnicode() {
  const inputTxt = document.querySelector('.input').value
  if (!inputTxt) {
    p.innerHTML = ''
    return
  }

  const score = detector.getZawgyiProbability(inputTxt)
  if (score > 0.95) {
    const output = converter.zawgyiToUnicode(inputTxt)
    p.innerHTML = output
    return
  }
  p.innerHTML = '非Zawgy编码字体'
}