import _ from 'lodash'

export const addToOrganizations = async (req, { contact, organization_ids }) => {
  await Promise.mapSeries(organization_ids, async (organization_id) => {
    await req.trx('crm_contacts_organizations').insert({
      contact_id: contact.get('id'),
      organization_id
    })
  })
}

export const removeFromOrganizations = async (req, { contact, organization_ids }) => {
  await Promise.mapSeries(organization_ids, async(organization_id) => {
    await req.trx('crm_contacts_organizations').where({
      contact_id: contact.get('id'),
      organization_id
    }).delete()
  })
}

export const updateOrganizations = async (req, params) => {

  const { contact, removing } = params

  const organization_ids = params.organization_ids || []

  await contact.load('organizations', {
    transacting: req.trx
  })

  const existing_ids = contact.related('organizations').toArray().map(item => {
    return item.id
  })

  const add_ids = params.add_ids || organization_ids.filter(id => {
    return !_.includes(existing_ids, id)
  })

  if(add_ids.length > 0) {
    await addToOrganizations(req, {
      organization_ids: add_ids,
      contact
    })
  }

  const remove_ids = removing !== false ? params.remove_ids || existing_ids.filter(id => {
    return !_.includes(organization_ids, id)
  }) : []

  if(remove_ids.length > 0) {
    await removeFromOrganizations(req, {
      organization_ids: remove_ids,
      contact
    })
  }

}
