const minText = document.querySelector("#min-slider")
const maxText = document.querySelector("#max-slider")

console.log(minText);

let max = 0
let min = 0

window.addEventListener('range-changed', (e) => {

    max = e.detail.maxRangeValue
    min = e.detail.minRangeValue
    

    minText.textContent = `${min}`
    maxText.textContent = `${max}`



})





