const multer = require('multer');
const path = require('path');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'tmp'));
    },
    filename: async (request, file, callback) => {
      const random = await promisify(randomBytes)(16);
      callback(null, `${random.toString('hex')}-${file.originalname}`);
    },
  }),
};
