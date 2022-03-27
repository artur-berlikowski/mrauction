const utility = {
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

export default utility