import Site from '../models/site'

const navigation = async (req, trx) => {

  const sites = await Site.query(qb => {
    qb.innerJoin('sites_managers', 'sites_managers.site_id','sites_sites.id')
    qb.where('sites_managers.user_id', req.user.get('id'))
    qb.orderBy('sites_sites.title', 'asc')
  }).fetchAll({
    transacting: trx,
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
                label: 'Manage',
                rights: ['sites:manage_sites'],
                route: `/sites/${site.get('id')}`
              },
              {
                label: 'Members',
                rights: ['sites:manage_content'],
                route: `/sites/${site.get('id')}/members`
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
