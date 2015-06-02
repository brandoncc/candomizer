var candomizer = {
  timer: undefined,
  canvas: undefined,
  ctx: undefined,
  settings: {
    frames: 12,
    alterations: 8000
  },
  init: function() {
    this.canvas = document.querySelector('canvas'),
    this.ctx    = this.canvas.getContext('2d');
    this.bind();
  },
  clear: function(e) {
    e.preventDefault();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  start: function(e) {
    e.preventDefault();
    if (this.timer) {
      alert('Randomization is already active!');
      return;
    }

    document.querySelector('#stop').disabled = false;
    document.querySelector('#start').disabled = true;

    this.timer = setInterval(function() {
      var imageData       = candomizer.ctx.getImageData(0, 0, candomizer.canvas.width, candomizer.canvas.height),
          length          = imageData.data.length,
          randomValue     = Math.floor(Math.random() * 256),
          randomLocations = [];

      while (randomLocations.length < candomizer.settings.alterations) {
        randomLocations.push(Math.floor(Math.random() * length));
      }

      for (var i = 0, length = randomLocations.length; i < length; i++) {
        imageData.data[randomLocations[i]] = randomValue;
      }

      candomizer.ctx.putImageData(imageData, 0, 0);
    }, 1000 / this.settings.frames);
  },
  stop: function(e) {
    e.preventDefault();
    clearInterval(this.timer);
    this.timer = undefined;
    document.querySelector('#stop').disabled = true;
    document.querySelector('#start').disabled = false;
  },
  bind: function() {
    var startButton    = document.querySelector('#start'),
        stopButton     = document.querySelector('#stop'),
        clearButton    = document.querySelector('#clear'),
        dimensionsForm = document.querySelector('form#dimensions'),
        settingsForm   = document.querySelector('form#settings');

    startButton.onclick     = this.start.bind(this);
    stopButton.onclick      = this.stop.bind(this);
    clearButton.onclick     = this.clear.bind(this);
    dimensionsForm.onsubmit = this.setDimensions.bind(this);
    settingsForm.onsubmit   = this.applySettings.bind(this);
  },
  setDimensions: function(e) {
    e.preventDefault();

    var width  = +document.querySelector('#width').value,
        height = +document.querySelector('#height').value;

    this.canvas.width  = width;
    this.canvas.height = height;
  },
  applySettings: function(e) {
    e.preventDefault();

    var frames      = +document.querySelector('#frames').value,
        alterations = +document.querySelector('#alterations').value;

    if (frames > 60) {
      frames = 60;
    } else if (frames < 1) {
      frames = 1;
    };

    if (alterations < 1) {
      alterations = 1;
    }

    this.settings.frames      = frames;
    this.settings.alterations = alterations;
  }
}

document.addEventListener('DOMContentLoaded', candomizer.init.bind(candomizer));
