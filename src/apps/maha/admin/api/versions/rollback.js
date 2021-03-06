import VersionSerializer from '@apps/maha/serializers/version_serializer'
import { rollbackVersion } from '@apps/maha/services/versions'
import socket from '@core/services/routes/emitter'

const rollbackRoute = async (req, res) => {

  const { versionable_type, versionable_id, key } = req.params

  const version = await rollbackVersion(req, {
    versionable_type,
    versionable_id,
    key,
    rollback_id: req.body.rollback_id
  })

  await socket.refresh(req, [
    `/admin/${versionable_type}/${versionable_id}/${key}/versions`
  ])

  await res.status(200).respond(version, VersionSerializer)

}

export default rollbackRoute
