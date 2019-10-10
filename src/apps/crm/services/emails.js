import Email from '../models/email'

export const sendEmail = async (req, { id }) => {

  const email = await Email.query(qb => {
    qb.where('id', id)
  }).fetch({
    withRelated: [],
    transacting: req.trx
  })

  try {


  } catch(err) {

  }


}
