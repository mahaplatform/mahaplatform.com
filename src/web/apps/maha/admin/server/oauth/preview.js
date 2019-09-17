import dropboxPreview from './dropbox/preview'
import boxPreview from './box/preview'

const preview = async (req, res) => {
  if(req.params.source === 'box') await boxPreview(req, res)
  if(req.params.source === 'dropbox') await dropboxPreview(req, res)
}

export default preview
