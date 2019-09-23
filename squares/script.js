let html = document.body;
let colors = [];

for (let i = 0; i < 128; i++) {
  function rgb() {
    return Math.round(Math.random() * 255);
  }
  let r = rgb();
  let g = rgb();
  let b = rgb();
  let color = r + "," + g + "," + b;
  if (
    colors.some(function(e) {
      return e == color;
    }) == false
  ) {
    colors[i] = color;
    html.innerHTML += `<div style="background-color: rgb(${color})"></div>`;
  } else {
    break;
  }
}

let sortedColors = colors.sort();
