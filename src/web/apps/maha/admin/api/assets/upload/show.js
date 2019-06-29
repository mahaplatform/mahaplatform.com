import { checkUploadedFile } from '../../../../services/assets'

const showRoute = async (req, res) => {

  const exists = await checkUploadedFile(req)

  if(!exists) return res.status(204).json({
    message: 'not found'
  })

  res.status(200).json({
    message: 'found'
  })

}

export default showRoute
