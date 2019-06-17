import path from 'path'

const previewRoute = async (req, res) => {

  const filepath = path.join('uploads', req.params.id)

  res.sendFile(filepath)

}

export default previewRoute
