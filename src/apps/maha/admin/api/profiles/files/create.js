import AssetSerializer from '@apps/maha/serializers/asset_serializer'
import Profile from '@apps/maha/models/profile'
import googledrive from './googledrive/create'
import Asset from '@apps/maha/models/asset'
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
