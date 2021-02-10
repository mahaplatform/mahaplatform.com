import Asset from '@apps/maha/models/asset'

const message = async (req, { steps, step }) => {

  const { asset_ids, message } = step.config

  const assets = asset_ids ? await Promise.mapSeries(asset_ids, async(asset_id) => {

    const asset = await Asset.query(qb => {
      qb.where('id', asset_id)
    }).fetch({
      transacting: req.trx
    })

    return {
      key: asset.get('key')
    }

  }) : null

  return {
    verb: 'message',
    message,
    assets
  }

}

export default message
