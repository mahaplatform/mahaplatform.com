import Program from '../../../models/program'

const editRoute = async (req, res) => {

  const program = await Program.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  res.status(200).respond({
    id: program.get('id'),
    title: program.get('title'),
    logo_id: program.get('logo_id'),
    channels: [
      ...program.get('has_email_channel') ? ['email'] : [],
      ...program.get('has_sms_channel') ? ['sms'] : [],
      ...program.get('has_voice_channel') ? ['voice'] : [],
      ...program.get('has_mail_channel') ? ['mail'] : []
    ],
    is_private: program.get('is_private')
  })

}

export default editRoute
