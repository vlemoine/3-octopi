const pickers = document.querySelectorAll('input[type="range"]');
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
