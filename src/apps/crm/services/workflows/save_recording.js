import { createAssetFromUrl } from '../../../maha/services/assets'
import WorkflowRecording from '../../models/workflow_recording'

const save_recording = async (req, { action_id, url }) => {

  const asset = await createAssetFromUrl(req, {
    url
  })

  await WorkflowRecording.forge({
    team_id: req.team.get('id'),
    action_id,
    asset_id: asset.get('id')
  }).save(null, {
    transacting: req.trx
  })

}

export default save_recording
