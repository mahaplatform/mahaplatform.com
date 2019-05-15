import { Segment } from '../../../../core/backframe'
import files from './files'
import folders from './folders'
import shared from './shared'
import starred from './starred'

const api = new Segment({
  routes: [
    files,
    folders,
    shared,
    starred
  ]
})

export default api
