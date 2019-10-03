const CreateLinks = {

  up: async (knex) => {

    await knex.schema.dropTable('maha_links')

    await knex.schema.createTable('maha_links', (table) => {
      table.increments('id').primary()
      table.string('url')
      table.integer('image_width')
      table.integer('image_height')
      table.string('image_url')
      table.string('video_url')
      table.integer('video_width')
      table.integer('video_height')
      table.integer('service_id').unsigned()
      table.foreign('service_id').references('maha_services.id')
      table.string('title')
      table.string('text')
      table.string('link')
      table.timestamps()
    })

    await knex.schema.table('maha_comments', (table) => {
      table.integer('link_id').unsigned()
      table.foreign('link_id').references('maha_links.id')
    })

    await knex.schema.table('chat_messages', (table) => {
      table.integer('link_id').unsigned()
      table.foreign('link_id').references('maha_links.id')
    })

    await knex('maha_attachments').where('type', 'local').delete()

    const attachments = await knex('maha_attachments').whereIn('type', ['link','video'])

    const getLink = async (attachment) => {

      const link = await knex('maha_links').where({
        url: attachment.from_url
      })

      if(link.length > 0) return link[0]

      const newlink = await knex('maha_links').insert({
        url: attachment.from_url,
        image_width: attachment.image_width,
        image_height: attachment.image_height,
        image_url: attachment.image_url,
        video_width: attachment.video_width,
        video_height: attachment.video_height,
        video_url: attachment.video_url,
        service_id: attachment.service_id,
        title: attachment.title,
        text: attachment.text,
        link: attachment.title_link,
        created_at: attachment.created_at,
        updated_at: attachment.updated_at
      }).returning('*')

      return newlink[0]

    }

    await Promise.mapSeries(attachments, async attachment => {

      if(attachment.from_url.length > 0) {

        const link = await getLink(attachment)

        await knex(attachment.attachable_type).where({
          id: attachment.attachable_id
        }).update({
          link_id: link.id
        })

      }

      return await knex('maha_attachments').where({
        id: attachment.id
      }).delete()

    })

    await knex.schema.table('maha_attachments', (table) => {
      table.dropColumn('image_bytes')
      table.dropColumn('image_width')
      table.dropColumn('image_height')
      table.dropColumn('image_url')
      table.dropColumn('thumb_width')
      table.dropColumn('thumb_height')
      table.dropColumn('thumb_url')
      table.dropColumn('video_width')
      table.dropColumn('video_height')
      table.dropColumn('video_url')
      table.dropColumn('text')
      table.dropColumn('title')
      table.dropColumn('author_link')
      table.dropColumn('author_name')
      table.dropColumn('service_id')
    })

  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_links')
  }

}

export default CreateLinks
