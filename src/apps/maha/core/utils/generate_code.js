import _ from 'lodash'

const generateCode = () => {

  return _.random(Math.pow(36,9).toString(36), Math.pow(36, 10) - 1).toString(36)

}

export default generateCode
