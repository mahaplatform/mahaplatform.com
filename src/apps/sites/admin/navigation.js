import Site from '../models/site'

const navigation = async (req) => {

  const sites = await Site.query(qb => {
    qb.innerJoin('sites_managers', 'sites_managers.site_id','sites_sites.id')
    qb.where('sites_managers.user_id', req.user.get('id'))
    qb.orderBy('sites_sites.title', 'asc')
  }).fetchAll({
    transacting: req.trx,
    withRelated: [{
      types: qb => qb.orderBy('title', 'asc')
    }]
  })

  return {
    items: [
      { label: 'Administration', rights: ['sites:manage_sites'], items: [
        { label: 'Sites', route: '/sites' }
      ] },
      ...sites.toArray().map(site => ({
        label: site.get('title'),
        items: [
          {
            label: 'Manage',
            rights: ['sites:manage_content'],
            items: [
              { label: 'Configuration', route: `/sites/${site.get('id')}` },
              { label: 'Managers', route: `/sites/${site.get('id')}/managers` },
              { label: 'Types', route: `/sites/${site.get('id')}/types` }
            ]
          },
          ...site.related('types').map(type => (
            { label: type.get('title'), route: `/sites/${site.get('id')}/types/${type.get('id')}/items` }
          ))
        ]
      }))
    ]
  }

}

export default navigation
