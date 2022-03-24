const bcrypt = require('bcrypt')
const saltRounds = 10;

passwords = {
  encrypt: async (password) => {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  },
  compare: async (password, hash) => { return await bcrypt.compare(password, hash) }
}

module.exports = passwords