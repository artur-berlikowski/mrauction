const bcrypt = require('bcrypt')
const saltRounds = 10;

passwords = {
  encrypt: async (password) => {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  },
  compare: async (password, hash) => {
    const match = await bcrypt.compare(password, hash)
    return match
  }
}

module.exports = passwords