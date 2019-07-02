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
      { label: 'Admin', rights: ['sites:manage_sites'], route: '/sites' },
      ...sites.toArray().map(site => ({
        label: site.get('title'),
        items: [
          {
            label: 'Admin',
            rights: ['sites:manage_content'],
            items: [
              {
                label: 'Configuration',
                rights: ['sites:manage_content'],
                route: `/sites/${site.get('id')}`
              },
              {
                label: 'Emails',
                rights: ['sites:manage_content'],
                route: `/sites/${site.get('id')}/emails`
              },
              {
                label: 'Managers',
                rights: ['sites:manage_content'],
                route: `/sites/${site.get('id')}/managers`
              },
              {
                label: 'Members',
                rights: ['sites:manage_content'],
                route: `/sites/${site.get('id')}/members`
              },
              {
                label: 'Types',
                rights: ['sites:manage_content'],
                route: `/sites/${site.get('id')}/types`
              }
            ]
          },
          ...site.related('types').map(type => ({
            label: type.get('title'),
            rights: ['sites:manage_content'],
            route: `/sites/${site.get('id')}/types/${type.get('id')}/items`
          }))
        ]
      }))
    ]
  }

}

export default navigation
