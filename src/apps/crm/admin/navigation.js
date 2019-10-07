import Program from '../models/program'

const navigation = async (req, trx) => {

  const programs = await Program.query(qb => {
    qb.orderBy('crm_programs.title', 'asc')
  }).fetchAll({
    transacting: req.trx
  })

  return {
    items: [
      { label: 'Admin', items: [
        { label: 'Programs', route: '/programs' },
        { label: 'Phone Numbers', route: '/numbers' }
      ] },
      { label: 'Automation', route: '/workflows' },
      { label: 'Contacts', route: '/contacts' },
      { label: 'Campaigns', route: '/campaigns' },
      { label: 'Fields', route: '/fields' },
      { label: 'Forms', route: '/forms' },
      { label: 'Lists', route: '/lists' },
      { label: 'Media', route: '/media' },
      { label: 'Organizations', route: '/organizations' },
      { label: 'Senders', route: '/senders' },
      { label: 'Templates', route: '/templates' },
      { label: 'Topics', route: '/topics' }
    ]
  }
}

export default navigation
