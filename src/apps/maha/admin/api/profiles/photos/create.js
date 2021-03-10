import AssetSerializer from '@apps/maha/serializers/asset_serializer'
import Profile from '@apps/maha/models/profile'
import googlephotos from './googlephotos/create'
import Asset from '@apps/maha/models/asset'
import instagram from './instagram/create'
import facebook from './facebook/create'

const getCreate = (service) => {
  if(service === 'facebook') return facebook
  if(service === 'googlephotos') return googlephotos
  if(service === 'instagram') return instagram
}

const filesRoute = async (req, res) => {

  const profile = await Profile.query(qb => {
    qb.where('account_id', req.account.get('id'))
    qb.where('id', req.params.profile_id )
  }).fetch({
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const asset = await Asset.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('source', profile.get('source'))
    qb.where('source_identifier', req.body.id)
  }).fetch({
    transacting: req.trx,
    withRelated: ['source']
  })

  if(asset) res.status(200).respond(asset, AssetSerializer)

  const create = getCreate(profile.get('source'))

  const newasset = await create(req, profile)

  await newasset.load(['source'], {
    transacting: req.trx
  })

  await res.status(200).respond(newasset, AssetSerializer)

}

export default filesRoute
