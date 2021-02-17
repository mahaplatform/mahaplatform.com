import polly from '@core/vendor/aws/polly'

const showRoute = async (req, res) => {

  const result = await polly.synthesizeSpeech({
    OutputFormat: 'mp3',
    Text: req.query.text,
    TextType: 'ssml',
    VoiceId: req.query.voice
  }).promise()

  res.status(200).type('audio/mp3').send(result.AudioStream)

}
export default showRoute
