import SearchIndex from 'search-index'
import path from 'path'

const prodRoot = path.resolve(__dirname,'..','..','..','..')

const devRoot = path.join(prodRoot,'..','..')

const root =  process.env.NODE_ENV === 'production' ? prodRoot : devRoot

let searchindex = null

export const getIndex = async () => {
  if(searchindex) return searchindex
  searchindex = await new Promise((resolve, reject) => {
    SearchIndex({
      indexPath: path.join(root,'help'),
      logLevel: 'error'
    }, (err, index) => {
      if(err) reject(err)
      resolve(index)
    })
  })
  return searchindex
}
