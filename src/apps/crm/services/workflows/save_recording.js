import { createAssetFromUrl } from '../../../maha/services/assets'
import WorkflowAction from '../../models/workflow_action'

const save_recording = async (req, { action_id, url }) => {

  const asset = await createAssetFromUrl(req, {
    url
  })

  const action = await WorkflowAction.query(qb => {
    qb.where('id', action_id)
  }).fetch({
    transacting: req.trx
  })

  await action.save({
    recording_id: asset.get('id')
  }, {
    transacting: req.trx
  })

}

export default save_recording
