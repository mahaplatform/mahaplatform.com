import { audit } from '../../../../core/services/routes/audit'
import { deleteEmail } from '../email'
import moment from 'moment'

const deleteWorkflow = async(req, { workflow }) => {

  await workflow.load(['emails'], {
    transacting: req.trx
  })

  await workflow.save({
    deleted_at: moment()
  }, {
    transacting: req.trx,
    patch: true
  })

  await Promise.mapSeries(workflow.related('emails'), async (email) => {
    await deleteEmail(req, {
      email
    })
  })

  await audit(req, {
    story: 'deleted',
    auditable: workflow
  })

}

export default deleteWorkflow
