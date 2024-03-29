const pickers = document.querySelectorAll('main input[type="range"]');
const music = document.querySelector("#music");
const audio = document.querySelector("audio");
const volume = document.querySelector("#volume");
const octi = document.querySelectorAll(".🫙");

let mouse = { x: 0, y: 0 };
let target = { x: 0, y: 0, e: null };

// let down = (e, t) => {
//   mouse.x = e.pageX;
//   mouse.y = e.pageY;
//   target.x = e.offsetX;
//   target.y = e.offsetY;
//   target.e = t;
//   console.log('down', e, mouse, target);
// }

octi.forEach((octo) => {
  octo.addEventListener("mousedown", (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    target.x = e.offsetX;
    target.y = e.offsetY;
    target.e = octo;
    console.log("down", e, mouse, target);
    if (e.target.nodeName !== "INPUT") {
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }
  });
  octo.addEventListener("touchstart", (e) => {
    let t = e.touches[0];
    mouse.x = t.pageX;
    mouse.y = t.pageY;
    target.x = t.target.offsetX;
    target.y = t.target.offsetY;
    target.e = octo;
    if (e.target.nodeName !== "INPUT") {
      window.addEventListener("touchmove", move);
      window.addEventListener("touchend", up);
    }
  });
});

let move = (e) => {
  let t = e.touches?.[0]; 
  const moveX = (t ? t.pageX : e.pageX) - mouse.x;
  const moveY = (t ? t.pageY : e.pageY) - mouse.y;
  target.x = moveX;
  target.y = moveY;
  target.e.style.transform = `translate(${target.x}px, ${target.y}px)`;
};

let up = (e) => {
  let t = e.touches?.[0];
  const moveX = (t ? t.pageX : e.pageX) - mouse.x;
  const moveY = (t ? t.pageY : e.pageY) - mouse.y;
  target.x = moveX;
  target.y = moveY;
   window.removeEventListener("mousemove", move);
   window.removeEventListener("mouseup", up);
   window.removeEventListener("touchmove", move);
   window.removeEventListener("touchend", up);
};

pickers.forEach((picker, i) => {
  picker.addEventListener("keydown", (e) => {
    e.target.setAttribute("step", 6);
  });
  picker.addEventListener("mousedown", (e) => {
    e.target.setAttribute("step", 1);
  });
  picker.addEventListener("input", (e) => {
    document.documentElement.style.setProperty(
      `--oct-${i + 1}`,
      `${e.target.value}deg`
    );
  });
});
audio.addEventListener("load", (e) => {
  volume.value = e.target.volume;
});
music.addEventListener("change", () => {
  music.checked ? audio.play() : audio.pause();
});
volume.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});
