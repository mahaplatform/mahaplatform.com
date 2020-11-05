import { deleteWorkflow } from '../../../automation/services/workflows'
import { audit } from '@core/services/routes/audit'
import moment from 'moment'

const deleteForm = async(req, { form }) => {

  await form.load(['workflows'], {
    transacting: req.trx
  })

  await form.save({
    deleted_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await Promise.mapSeries(form.related('workflows'), async (workflow) => {
    await deleteWorkflow(req, {
      workflow
    })
  })

  await audit(req, {
    story: 'deleted',
    auditable: form
  })

}

export default deleteForm
