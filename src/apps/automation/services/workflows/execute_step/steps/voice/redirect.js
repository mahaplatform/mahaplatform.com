import _ from 'lodash'

const keys = ['recipients','options','extensions','timeblocks','steps','hash.steps','star.steps','noinput.steps','noanswer.steps']

const getNext = (config, destination, path = 'steps') => {
  return _.get(config, path).reduce((newpath, segment, index) => {
    if(newpath) return newpath
    const candidate = `${path}.${index}`
    const found = keys.reduce((found, key) => {
      if(found) return found
      if(segment[key]) {
        const result = getNext(config, destination, `${candidate}.${key}`)
        if(result) return result
      }
    }, null)
    if(found) return found
    if(_.get(config, candidate).code === destination) return candidate
  }, null)
}

const redirectStep = (req, { config, state, step, twiml }) => {

  const { destination } = step

  return {
    action: {},
    next: getNext(config, destination),
    twiml
  }

}

export default redirectStep
