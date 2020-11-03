import { createAssetFromUrl } from '../../../maha/services/assets'
import WorkflowRecording from '../../models/workflow_recording'
import WorkflowAction from '../../models/workflow_action'

const save_recording = async (req, { action_id, recording_id, url }) => {

  const asset = await createAssetFromUrl(req, {
    url
  })

  const recording = await WorkflowRecording.query(qb => {
    qb.where('id', recording_id)
  }).fetch({
    transacting: req.trx
  })

  await recording.save({
    asset_id: asset.get('id')
  }, {
    transacting: req.trx,
    patch: true
  })

  const action = await WorkflowAction.query(qb => {
    qb.where('id', action_id)
  }).fetch({
    transacting: req.trx
  })

  await action.save({
    recording_id: recording.get('id')
  }, {
    transacting: req.trx,
    patch: true
  })

}

export default save_recording
