import isbot from 'isbot'

const robotValidation = async(req, data) => {

  if(!data.ua) return event

  if(isbot(data.useragent)) throw new Error('useragent robot')

}

export default robotValidation
