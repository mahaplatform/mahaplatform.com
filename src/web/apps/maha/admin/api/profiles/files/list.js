import Profile from '../../../../models/profile'
import instagram from './instagram/list'
import microsoft from './microsoft/list'
import facebook from './facebook/list'
import dropbox from './dropbox/list'
import google from './google/list'
import box from './box/list'

const list = async (req, profile) => {
  const network = profile.related('source').get('text')
  if(network === 'facebook') return facebook(req, profile)
  if(network === 'google') return await google(req, profile)
  if(network === 'microsoft') return await microsoft(req, profile)
  if(network === 'instagram') return await instagram(req, profile)
  if(network === 'dropbox') return await dropbox(req, profile)
  if(network === 'box') return await box(req, profile)
}

const filesRoute = async (req, res) => {

  const profile = await Profile.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const records = await list(req, profile)

  res.status(200).respond(records)

}

export default filesRoute
