function rgb() {
  let color = "";
  for (let i = 0; i < 3; i++) {
    color += `${Math.round(Math.random() * 255)},`;
  }
  return color.slice(0, color.length - 2);
}

const colors = [];
for (let i = 0; i < 128; i++) {
  let color = rgb();
  if (!colors.some(e => e == color)) {
    colors.push(color);
    document.body.innerHTML += `<div style="background-color: rgb(${color})"></div>`;
  } else {
    break;
  }
}

let sortedColors = colors.sort();
