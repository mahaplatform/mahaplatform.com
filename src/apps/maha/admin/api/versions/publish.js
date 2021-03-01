import VersionSerializer from '@apps/maha/serializers/version_serializer'
import { publishVersion } from '@apps/maha/services/versions'
import socket from '@core/services/routes/emitter'

const publishRoute = async (req, res) => {

  const { versionable_type, versionable_id, key } = req.params

  const version = await publishVersion(req, {
    versionable_type,
    versionable_id,
    key,
    id: req.body.publish_id
  })

  await socket.refresh(req, [
    `/admin/${versionable_type}/${versionable_id}/${key}/versions`
  ])

  res.status(200).respond(version, VersionSerializer)

}

export default publishRoute
