export const deleteMemberships = async (req, { user_id }) => {
  await req.trx('expenses_members')
    .where('user_id', user_id)
    .del()
}
