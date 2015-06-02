var candomizer = {
  init: function() {
    var canvas = $('canvas')[0],
        ctx = canvas.getContext('2d'),
        blankImage = ctx.createImageData(canvas.width, canvas.height);

    ctx.putImageData(blankImage, canvas.width, canvas.height);
    this.randomize();
  },
  randomize: function() {
    var canvas = $('canvas')[0],
        ctx = canvas.getContext('2d');

    setInterval(function() {
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
          length = imageData.data.length,
          randomValue = Math.floor(Math.random() * 256),
          randomLocations = [];

      while (randomLocations.length < 8000) {
        randomLocations.push(Math.floor(Math.random() * length));
      }

      for (var i = 0, length = randomLocations.length; i < length; i++) {
        imageData.data[randomLocations[i]] = randomValue;
      }

      ctx.putImageData(imageData, 0, 0);
    }, 80);
  }
}

$(candomizer.init.bind(candomizer));
