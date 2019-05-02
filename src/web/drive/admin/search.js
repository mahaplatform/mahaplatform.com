import { search } from 'maha'
import Item from '../models/item'

const icon = (content_type) => {
  if(content_type.match(/image/)) return 'picture-o'
  if(content_type.match(/audio/)) return 'volume-up'
  if(content_type.match(/video/)) return 'play-circle'
  if(content_type.match(/pdf/)) return 'file-pdf-o'
  if(content_type.match(/excel/)) return 'file-excel-o'
  if(content_type.match(/spreadsheetml/)) return 'file-excel-o'
  if(content_type.match(/msword/)) return 'file-word-o'
  if(content_type.match(/wordprocessingml/)) return 'file-word-o'
  if(content_type.match(/powerpoint/)) return 'file-powerpoint-o'
  if(content_type.match(/presentationml/)) return 'file-powerpoint-o'
  return 'file-text-o'
}

const Search = search({
  drive: {
    fields: ['label'],
    model: Item,
    serializer: result => ({
      text: result.get('label'),
      route: result.get('type') === 'file' ? `/admin/drive/files/${result.get('code')}` : `/admin/drive/folders/${result.get('code')}`,
      extra: {
        icon: result.get('type') === 'file' ? icon(result.related('asset').get('content_type')) : 'folder'
      }
    }),
    withRelated: ['asset']
  }
})

export default Search
