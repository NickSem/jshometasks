window.addEventListener("mousemove", func);

function func(e) {
  divv.style = `left: ${e.clientX}px; top: ${e.clientY}px`;
}
