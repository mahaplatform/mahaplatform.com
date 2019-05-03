import Folder from '../../../models/folder'
import File from '../../../models/file'
import Item from '../../../models/item'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const items = await Item.query(qb => {

    qb.whereNull('deleted_at')

  }).fetchAll({ transacting: trx })


  await Promise.map(items.toArray(), async(item) => {

    if(item.get('type') === 'folder') {

      const folder = await Folder.where({
        code: item.get('code')
      }).fetch({
        transacting: trx
      })

      await folder.delete({ transacting: trx })

    } else {

      const file = await File.where({
        code: item.get('code')
      }).fetch({
        withRelated: ['versions'],
        transacting: trx
      })

      await Promise.map(file.related('versions').toArray(), async (version) => {

        await version.delete({ transacting: trx })

      })

      await file.delete({ transacting: trx })

    }

  })

}

const emptyRoute = new Route({
  method: 'post',
  path: '/empty',
  processor
})

export default emptyRoute
