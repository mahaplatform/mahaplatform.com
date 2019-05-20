import TripSerializer from '../../../serializers/trip_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Trip from '../../../models/trip'

const destroyRoute = async (req, res) => {

  res.status(200).respond()

}

export default destroyRoute
