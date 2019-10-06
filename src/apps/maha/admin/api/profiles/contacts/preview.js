import Profile from '../../../../models/profile'
import outlook from './outlook/preview'

const getPreview= (service) => {
  if(service === 'outlook') return outlook
}

const listRoute = async (req, res) => {

  const profile = await Profile.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.profile_id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const preview = getPreview(profile.related('source').get('text'))

  const previewData = await preview(req, profile)

  const data = new Buffer(previewData, 'base64')

  res.status(200).type('image/jpeg').end(data, 'binary')

}

export default listRoute
