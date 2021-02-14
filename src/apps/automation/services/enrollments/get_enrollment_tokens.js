const getContactTokens = async(req, { contact }) => {
  const tokens = await req.trx('crm_contact_tokens').where(qb => {
    qb.where('contact_id', contact.get('id'))
  }).then(results => results[0])
  return {
    contact: tokens.tokens
  }
}

const getProgramTokens = async(req, { contact, program }) => {
  const tokens = await req.trx('crm_program_tokens').where(qb => {
    qb.where('contact_id', contact.get('id'))
    qb.where('program_id', program.get('id'))
  }).then(results => results[0])
  return {
    program: tokens.tokens
  }
}

const getRegistrationTokens = async (req, { enrollment }) => {
  const tokens = await req.trx('events_registration_tokens').where(qb => {
    qb.where('registration_id', enrollment.get('registration_id'))
  }).then(results => results[0])
  return {
    registration: tokens.tokens
  }
}

const getResponseTokens = async (req, { enrollment }) => {
  const tokens = await req.trx('crm_response_tokens').where(qb => {
    qb.where('reponse_id', enrollment.get('reponse_id'))
  }).then(results => results[0])
  return {
    response: tokens.tokens
  }
}

const getOrderTokens = async (req, { enrollment }) => {
  const tokens = await req.trx('stores_order_tokens').where(qb => {
    qb.where('order_id', enrollment.get('order_id'))
  }).then(results => results[0])
  return {
    order: tokens.tokens
  }
}

const getRelatedTokens = async (req, { enrollment}) => {
  if(enrollment.get('response_id')) {
    return await getResponseTokens(req, {
      enrollment
    })
  }
  if(enrollment.get('registration_id')) {
    return await getRegistrationTokens(req, {
      enrollment
    })
  }
  if(enrollment.get('order_id')) {
    return await getOrderTokens(req, {
      enrollment
    })
  }
  return {}
}


const getEnrollmentTokens = async (req, { contact, enrollment, program }) => {
  return {
    ...await getContactTokens(req, {
      contact
    }),
    ...await getProgramTokens(req, {
      contact,
      program
    }),
    ...await getRelatedTokens(req, {
      enrollment
    })
  }
}

export default getEnrollmentTokens
