import { Segment } from '../../../../core/backframe'
import access from './access'
import files from './files'
import fileVersions from './versions'
import folders from './folders'
import items from './items'
import share from './share'
import shared from './shared'
import starred from './starred'
import transfer from './transfer'
import trash from './trash'

const api = new Segment({
  routes: [
    access,
    files,
    fileVersions,
    folders,
    items,
    share,
    shared,
    starred,
    transfer,
    trash
  ]
})

export default api
