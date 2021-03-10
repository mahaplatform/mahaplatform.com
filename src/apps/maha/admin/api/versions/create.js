import VersionSerializer from '@apps/maha/serializers/version_serializer'
import { createVersion } from '@apps/maha/services/versions'
import socket from '@core/services/routes/emitter'

const createRoute = async (req, res) => {

  const { versionable_type, versionable_id, key } = req.params

  const { value } = req.body

  const version = await createVersion(req, {
    versionable_type,
    versionable_id,
    key,
    value
  })

  await socket.refresh(req, [
    `/admin/${versionable_type}/${versionable_id}/${key}/versions`
  ])

  await res.status(200).respond(version, VersionSerializer)

}

export default createRoute
