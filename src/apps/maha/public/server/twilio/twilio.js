import request from 'request-promise'

const twilio = async (req, res, next) => {

  if(!req.body.TopicArn) return next()

  if(req.body.Type === 'SubscriptionConfirmation') {

    await request.get({
      url: req.body.SubscribeURL
    })

    return res.status(200).respond(true)
    
  }

  req.body = JSON.parse(req.body.Message)

  next()

}


export default twilio
