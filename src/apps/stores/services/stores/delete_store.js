import { deleteWorkflow } from '../../../automation/services/workflows'
import { audit } from '@core/services/routes/audit'
import moment from 'moment'

const deleteStore = async(req, { store }) => {

  await store.load(['workflows'], {
    transacting: req.trx
  })

  await store.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await Promise.mapSeries(store.related('workflows'), async (workflow) => {
    await deleteWorkflow(req, {
      workflow
    })
  })

  await audit(req, {
    story: 'deleted',
    auditable: store
  })

}

export default deleteStore
