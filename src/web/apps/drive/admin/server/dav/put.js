import { createFile } from '../../../services/files'

const route = async (req, res) => {

  const lock_token = req.headers['If'].match(/\(<(.*)>\)/)

  if(lock_token !== null) {
    if(req.item.get('lock_token') !== lock_token[1]) return res.status(403).send(null)
  }

  //todo: check if user has write permissions

  //todo: create_asset

  await createFile(req, {
    asset_id: 1,
    folder_id: 2
  })

  res.status(200).send(null)

}

export default route
