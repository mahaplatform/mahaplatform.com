import AssetSerializer from '../../../../serializers/asset_serializer'
import Profile from '../../../../models/profile'
import googledrive from './googledrive/create'
import Asset from '../../../../models/asset'
import onedrive from './onedrive/create'
import dropbox from './dropbox/create'
import box from './box/create'

const getCreate = (service) => {
  if(service === 'googledrive') return googledrive
  if(service === 'onedrive') return onedrive
  if(service === 'dropbox') return dropbox
  if(service === 'box') return box
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
