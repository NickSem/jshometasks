const divs = document.querySelectorAll("div");

divs.forEach((e, i) => {
  e.addEventListener("mouseover", event => {
    event.target.style.backgroundColor = "red";
  });

  e.addEventListener("mouseout", event => {
    setTimeout(() => {
      event.target.style.backgroundColor = "";
    }, 1000 * (i + 1));
  });
});

// const div = document.querySelectorAll("div");

// div.forEach((_, i) => {
//   _.addEventListener("mouseover", event => {

//     event.target.style.backgroundColor = "red";
//   })
//   _.addEventListener("mouseout", event =>{
//     setTimeout(() => {
//     event.target.style.backgroundColor = "";
//     event.target.remove();
//   }, 3000*(i+1));
//   })
//   })
