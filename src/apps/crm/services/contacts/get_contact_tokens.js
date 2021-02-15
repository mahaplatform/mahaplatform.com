const getContactTokens = async(req, { contact_id }) => {

  const tokens = await req.trx('crm_contact_tokens').where(qb => {
    qb.where('contact_id', contact_id)
  }).then(results => results[0])

  return tokens.tokens

}


export default getContactTokens
