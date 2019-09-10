import Program from '../../maha/models/program'

const navigation = async (req, trx) => {

  const programs = await Program.query(qb => {
    qb.orderBy('maha_programs.title', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

  return {
    items: [
      { label: 'Programs', items: [
        // { label: 'Programs', route: '/programs' },
        ...programs.map(program => ({
          label: program.get('title'), items: [
            { label: 'Automation', route: `/programs/${program.id}/workflows` },
            { label: 'Campaigns', route: `/programs/${program.id}/campaigns` },
            { label: 'Fields', route: `/programs/${program.id}/fields` },
            { label: 'Forms', route: `/programs/${program.id}/forms` },
            { label: 'Lists', route: `/programs/${program.id}/lists` },
            { label: 'Media', route: `/programs/${program.id}/media` },
            { label: 'Phone Numbers', route: `/programs/${program.id}/numbers` },
            { label: 'Senders', route: `/programs/${program.id}/senders` },
            { label: 'Templates', route: `/programs/${program.id}/templates` },
            { label: 'Topics', route: `/programs/${program.id}/topics` }
          ]
        }))
      ] },
      { label: 'Contacts', route: '/contacts' },
      { label: 'Organizations', route: '/organizations' }
    ]
  }
}

export default navigation
