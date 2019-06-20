const bcrypt = require('bcryptjs')

function encrypt(text) {
    return bcrypt.hashSync(text, 8);
}
 
  module.exports = {
      encrypt
  }