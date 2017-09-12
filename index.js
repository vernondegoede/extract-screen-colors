const robot = require("robotjs");
const getColors = require("get-image-colors");
const Jimp = require("jimp");

const extractScreenColors = () =>
  new Promise((resolve, reject) => {
    try {
      const picture = robot.screen.capture();
      const image = new Jimp(picture.width, picture.height, (error, image) => {
        image.bitmap.data = picture.image;
        image.getBuffer(Jimp.MIME_PNG, (err, pngBuffer) => {
          getColors(pngBuffer, "image/png").then(colors => resolve(colors));
        });
      });
    } catch (e) {
      reject(e);
    }
  });

module.exports = extractScreenColors;
