import AgreementSerializer from '@apps/maha/serializers/agreement_serializer'
import { createAgreement } from '@apps/maha/services/adobesign'
import Profile from '@apps/maha/models/profile'
import Asset from '@apps/maha/models/asset'

const createRoute = async (req, res) => {

  const profile = await Profile.query(qb => {
    qb.where('id', req.body.profile_id)
  }).fetch({
    transacting: req.trx
  })

  if(!profile) return res.status(404).respond({
    code: 404,
    message: 'Unable to load profile'
  })

  const asset = await Asset.query(qb => {
    qb.where('id', req.body.asset_id)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  if(!asset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load asset'
  })

  req.team = asset.related('team')

  const agreement = await createAgreement(req, {
    name: req.body.name,
    email: req.body.email,
    profile,
    asset
  })

  res.status(200).respond(agreement, AgreementSerializer)

}

export default createRoute
