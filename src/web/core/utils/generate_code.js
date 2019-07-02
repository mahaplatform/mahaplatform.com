import _ from 'lodash'

const generateCode = (length = 10) => {

  return _.random(Math.pow(36, length - 1).toString(36), Math.pow(36, length) - 1).toString(36)

}

export default generateCode
