let symmetrySlider;
let symmetryValueLabel;
let hueValue = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');

  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 1.0);
  background(0);

  symmetrySlider = document.getElementById('symmetrySlider');
  symmetryValueLabel = document.getElementById('symmetryValue');
  const clearButton = document.getElementById('clearButton');
  const saveButton = document.getElementById('saveButton');

  symmetrySlider.addEventListener('input', () => {
    symmetryValueLabel.textContent = symmetrySlider.value;
  });

  clearButton.addEventListener('click', () => background(0));
  saveButton.addEventListener('click', () => saveCanvas('kaleidoscope_pattern', 'png'));
}

function draw() {
  const symmetry = parseInt(symmetrySlider.value);
  const angle = 360 / symmetry;
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    const mx = mouseX - width / 2;
    const my = mouseY - height / 2;
    const pmx = pmouseX - width / 2;
    const pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      hueValue = (hueValue + 0.8) % 360;
      const speed = dist(mouseX, mouseY, pmouseX, pmouseY);
      const sw = map(speed, 0, 20, 1, 10, true);

      stroke(hueValue, 90, 100, 0.8);
      strokeWeight(sw);

      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        line(mx, my, pmx, pmy);

        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}