import Site from '../models/site'
import Navigation from '../../../core/objects/navigation'

const navigation = new Navigation(async (req, trx) => {

  const sites = await Site.query(qb => {
    qb.innerJoin('sites_managers', 'sites_managers.site_id','sites_sites.id')
    qb.where('sites_managers.user_id', req.user.get('id'))
  }).fetchAll({
    transacting: trx,
    withRelated: ['types']
  })

  return {
    items: [
      { label: 'Admin', rights: ['sites:manage_sites'], route: '/sites' },
      ...sites.toArray().map(site => ({
        label: site.get('title'),
        items: [
          {
            label: 'Members',
            rights: ['sites:manage_content'],
            route: `/sites/${site.get('id')}/members`
          },
          {
            label: 'Menus',
            rights: ['sites:manage_content'],
            route: `/sites/${site.get('id')}/menus`
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

})

export default navigation
