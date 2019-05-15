import { Segment } from '../../../../core/backframe'
import files from './files'
import folders from './folders'
import share from './share'
import shared from './shared'
import starred from './starred'
import transfer from './transfer'

const api = new Segment({
  routes: [
    files,
    folders,
    share,
    shared,
    starred,
    transfer
  ]
})

export default api
