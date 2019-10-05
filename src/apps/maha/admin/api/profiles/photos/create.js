import AssetSerializer from '../../../../serializers/asset_serializer'
import facebookphotos from './facebookphotos/create'
import Profile from '../../../../models/profile'
import googlephotos from './googlephotos/create'
import Asset from '../../../../models/asset'
import instagram from './instagram/create'

const getCreate = (service) => {
  if(service === 'facebookphotos') return facebookphotos
  if(service === 'googlephotos') return googlephotos
  if(service === 'instagram') return instagram
}

const filesRoute = async (req, res) => {

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

  const asset = await Asset.scope({
    team: req.team
  }).query(qb => {
    qb.where('source_id', profile.get('source_id'))
    qb.where('source_identifier', req.body.id)
  }).fetch({
    transacting: req.trx,
    withRelated: ['source']
  })

  if(asset) res.status(200).respond(asset, AssetSerializer)

  const create = getCreate(profile.related('source').get('text'))

  const newasset = await create(req, profile)

  await newasset.load(['source'], {
    transacting: req.trx
  })

  res.status(200).respond(newasset, AssetSerializer)

}

export default filesRoute
