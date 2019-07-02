import _ from 'lodash'

const generateCode = (length = 10) => {

  return Array(Math.ceil(length / 10)).fill().map(i => {
    return _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
  }).join('').substr(0, length)

}

export default generateCode
