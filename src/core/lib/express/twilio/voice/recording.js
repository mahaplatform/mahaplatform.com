import { getObject } from '@core/services/aws/s3'

const recordingRoute = async (req, res) => {

  const recording = await getObject(req, {
    key: req.params.key
  })

  res.set('Cache-Control', 'immutable,max-age=100000000,public')

  res.status(200).type(recording.ContentType).send(recording.Body)

}

export default recordingRoute
