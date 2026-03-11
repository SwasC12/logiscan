const sharp = require('sharp');
const fs = require('fs');

const svg = fs.readFileSync('./assets/icon.svg');

sharp(svg)
  .resize(1024, 1024)
  .png()
  .toFile('./assets/icon.png')
  .then(() => console.log('Done: assets/icon.png'))
  .catch(err => console.error(err));
