import VendorSerializer from '../../../serializers/vendor_serializer'
import Vendor from '../../../models/vendor'

const showRoute = async (req, res) => {

  const vendor = await Vendor.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!vendor) return req.status(404).respond({
    code: 404,
    message: 'Unable to load vendor'
  })

  res.status(200).respond(vendor, (vendor) => {
    return VendorSerializer(req, req.trx, vendor)
  })

}

export default showRoute
