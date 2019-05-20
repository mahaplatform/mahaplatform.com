import { activity } from '../../../../../core/services/routes/activities'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Advance from '../../../models/advance'
import _ from 'lodash'

const statusRoute = async (req, res) => {

  res.status(200).respond()

}

export default statusRoute
