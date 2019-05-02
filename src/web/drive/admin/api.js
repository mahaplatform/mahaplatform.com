import { Segment } from 'maha'
import access from './api/access'
import files from './api/files'
import fileVersions from './api/versions'
import folders from './api/folders'
import items from './api/items'
import share from './api/share'
import shared from './api/shared'
import starred from './api/starred'
import transfer from './api/transfer'
import trash from './api/trash'

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
