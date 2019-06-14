import { checkUploadedFile } from '../../../../services/asset'

const showRoute = async (req, res) => {

  const exists = await checkUploadedFile(req, req.trx)

  if(!exists) return res.status(204).json({
    message: 'not found'
  })

  res.status(200).json({
    message: 'found'
  })

}

export default showRoute
