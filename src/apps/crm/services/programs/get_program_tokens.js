const getProgramTokens = async(req, { contact_id, program_id }) => {

  const tokens = await req.trx('crm_program_tokens').where(qb => {
    qb.where('contact_id', contact_id)
    qb.where('program_id', program_id)
  }).then(results => results[0])

  return tokens.tokens

}

export default getProgramTokens
