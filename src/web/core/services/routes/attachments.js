import Attachment from '../../../../apps/maha/models/attachment'

export const attachments = async (req, attachments) => {

  await Promise.mapSeries(attachments.asset_ids, async (asset_id, index) => {

    await Attachment.forge({
      team_id: attachments.team_id,
      type: 'asset',
      attachable_type: attachments.attachable_type,
      attachable_id: attachments.attachable_id,
      delta: index,
      asset_id
    }).save(null, {
      transacting: req.trx
    })

  })

}
