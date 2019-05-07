import SearchIndex from 'search-index'
import path from 'path'

let searchindex = null

export const getIndex = async () => {
  if(searchindex) return searchindex
  searchindex = await new Promise((resolve, reject) => {
    SearchIndex({
      indexPath: process.env.NODE_ENV === 'production' ? path.join('dist','help') : path.join('help'),
      logLevel: 'error'
    }, (err, index) => {
      if(err) reject(err)
      resolve(index)
    })
  })
  return searchindex
}
