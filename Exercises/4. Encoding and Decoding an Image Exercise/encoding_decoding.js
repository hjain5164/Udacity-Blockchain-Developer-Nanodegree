// Access File System
fs = require('fs');

// Read Image File
imgBuffer = fs.readFileSync('list_1.png');

// Encode it
imgHexEncode = new Buffer(imgBuffer).toString('hex');

// Output the Encoded data
console.log(imgHexEncode);

// Decode Hex
let imgHexDecode = new Buffer(imgHexEncode, 'hex');

// Save Decoded file
fs.writeFileSync('decodedHexImage.png',imgHexDecode);