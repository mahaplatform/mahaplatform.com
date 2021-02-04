import VersionSerializer from '@apps/maha/serializers/version_serializer'
import { updateVersion } from '@apps/maha/services/versions'
import socket from '@core/services/routes/emitter'

const updateRoute = async (req, res) => {

  const { versionable_type, versionable_id, key } = req.params

  const { value, publish } = req.body

  const version = await updateVersion(req, {
    versionable_type,
    versionable_id,
    key,
    value,
    publish
  })

  await socket.refresh(req, [
    `/admin/${versionable_type}/${versionable_id}/versions`
  ])

  res.status(200).respond(version, VersionSerializer)

}

export default updateRoute
