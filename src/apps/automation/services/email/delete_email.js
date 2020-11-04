import { audit } from '../../../../core/services/routes/audit'
import moment from 'moment'

const deleteEmail = async(req, { email }) => {

  await email.save({
    deleted_at: moment()
  }, {
    transacting: req.trx,
    patch: true
  })

  await audit(req, {
    story: 'deleted',
    auditable: email
  })

}

export default deleteEmail
