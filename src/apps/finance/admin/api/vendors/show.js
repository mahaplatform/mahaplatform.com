import VendorSerializer from '@apps/finance/serializers/vendor_serializer'
import Vendor from '@apps/finance/models/vendor'

const showRoute = async (req, res) => {

  const vendor = await Vendor.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!vendor) return res.status(404).respond({
    code: 404,
    message: 'Unable to load vendor'
  })

  res.status(200).respond(vendor, VendorSerializer)

}

export default showRoute
