import categories from '../../admin/components/emojis/categories'
import Migration from '../../../../../../../core/objects/migration'
import _ from 'lodash'

const ReplaceEmojis = new Migration({

  up: async (knex) => {

    const emoji = categories.reduce((emojis, category) => ({
      ...emojis,
      ...category.emojis.reduce((emojis, emoji) => ({
        ...emojis,
        [emoji.name]: emoji.code,
        ...emoji.aliases.reduce((emojis, alias) => ({
          ...emojis,
          [alias]: emoji.code
        }), {})
      }), {})
    }), {})

    const tables = ['chat_messages', 'maha_comments']

    await Promise.mapSeries(tables, async table => {

      const items = await knex(table)

      await Promise.mapSeries(items, async item => {

        const matches = item.text.match(/:([\w]+):/g)

        if(!matches || _.includes([546, 547], item.id)) return

        const text = matches.reduce((text, name) => {

          return text.replace(name, String.fromCodePoint(`0x${emoji[name.replace(/:/g, '')]}`))

        }, item.text)

        await knex(table).where({
          id: item.id
        }).update({
          text
        })

      })

    })

  },

  down: async (knex) => {}

})

export default ReplaceEmojis
