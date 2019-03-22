import SearchIndex from 'search-index'
import path from 'path'

let searchindex = null

export const getIndex = async () => {

  if(searchindex) return searchindex

  searchindex = await new Promise((resolve, reject) => {

    SearchIndex({
      indexPath: path.join('help'),
      logLevel: 'debug'
    }, (err, index) => {

      if(err) reject(err)

      resolve(index)

    })

  })

  return searchindex

}
