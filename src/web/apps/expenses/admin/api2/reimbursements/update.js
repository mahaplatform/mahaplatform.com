import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'
import Member from '../../../models/member'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  res.status(200).respond()

}

export default updateRoute
