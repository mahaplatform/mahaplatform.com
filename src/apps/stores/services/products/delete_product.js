import { audit } from '../../../../core/services/routes/audit'
import moment from 'moment'

const deleteProduct = async(req, { product }) => {

  await product.load(['variants'], {
    transacting: req.trx
  })

  await product.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await Promise.mapSeries(product.related('variants'), async (variant) => {
  })

  await audit(req, {
    story: 'deleted',
    auditable: product
  })

}

export default deleteProduct
