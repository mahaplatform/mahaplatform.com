import _ from 'lodash'
import Item from '../models/item'

export const addIndex = async (req, { item, map }) => {

  const values = item.get('values')

  const text = ['textfield','textarea','emailfield','phonefield']

  const fields = map[item.get('type_id')]

  const index = await Promise.mapSeries(fields, async field => {

    const type = field.get('type')

    const config = field.get('config')

    if(!values[field.get('code')]) return ''

    if(_.includes(text, type)) return values[field.get('code')]

    if(type === 'lookup') {

      const related = await Item.query(qb => {
        qb.whereIn('id', values[field.get('code')])
      }).fetchAll({
        transacting: req.trx
      })

      const title = map[config.datasource.type_id].find(field => {
        return field.get('name').token === config.datasource.text
      })

      return related.map(item => item.get('values')[title.get('code')]).join(' ')

    }

    return null

  }).then(result => result.filter(text => text !== null).join(' ').replace('\n',' ').toLowerCase())

  await item.save({ index }, {
    patch: true,
    transacting: req.trx
  })

}
