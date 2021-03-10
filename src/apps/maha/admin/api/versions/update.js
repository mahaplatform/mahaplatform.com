import VersionSerializer from '@apps/maha/serializers/version_serializer'
import { createVersion, getCurrent, updateVersion } from '@apps/maha/services/versions'
import socket from '@core/services/routes/emitter'

const updateRoute = async (req, res) => {

  const { versionable_type, versionable_id, key } = req.params

  const current = await getCurrent(req, {
    versionable_type,
    versionable_id,
    key
  })

  const operation = current.published_at ? createVersion : updateVersion

  const version = await operation(req, {
    versionable_type,
    versionable_id,
    key,
    value: req.body.value
  })

  await socket.refresh(req, [
    `/admin/${versionable_type}/${versionable_id}/${key}/versions`
  ])

  await res.status(200).respond(version, VersionSerializer)

}

export default updateRoute
