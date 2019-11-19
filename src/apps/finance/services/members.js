export const deleteMemberships = async (req, { user_id }) => {
  await req.trx('finance_members')
    .where('user_id', user_id)
    .del()
}
