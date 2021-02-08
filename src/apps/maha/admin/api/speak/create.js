import polly from '@core/vendor/aws/polly'

const createRoute = async (req, res) => {

  const result = await polly.synthesizeSpeech({
    OutputFormat: 'mp3',
    Text: req.body.text,
    TextType: 'text',
    VoiceId: req.body.voice
  }).promise()

  res.status(200).type('audio/mp3').send(result.AudioStream)

}
export default createRoute
