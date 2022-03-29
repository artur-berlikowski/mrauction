const bcrypt = require('bcrypt')

const Utility = {
  encryptPassword: async (password) => {
    const hash = await bcrypt.hash(password, 10)
    return hash
  },
  comparePassword: async (password, hash) => {
    return await bcrypt.compare(password, hash)
  },
  validateString: (s, minLength, maxLength, pattern) => {
    if (s && typeof s === 'string' && s !== '' && s.length >= minLength && s.length <= maxLength && pattern.test(s)) {
      return true
    }
    return false
  },
  validateStringLength: (s, minLength, maxLength) => {
    if (s && typeof s === 'string' && s !== '' && s.length >= minLength && s.length <= maxLength) {
      return true
    }
    return false
  },
  validateEmail: (s) => {
    let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (s && typeof s === 'string' && s !== '' && pattern.test(s)) {
      return true
    }
    return false
  }
}

module.exports = Utility