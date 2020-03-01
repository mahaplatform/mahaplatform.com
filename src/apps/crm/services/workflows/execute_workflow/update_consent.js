export const updateConsent = async (req, params) => {

  const { contact, channel } = params

  if(!channel) return {}

  console.log('updateConsent', channel)

  return {}

}
