import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  res.status(200).respond()

}

export default updateRoute
