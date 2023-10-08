const pickers = document.querySelectorAll('main input[type="range"]');
const music = document.querySelector("#music");
const audio = document.querySelector("audio");
const volume = document.querySelector("#volume");
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
