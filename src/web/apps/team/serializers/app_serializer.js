const appSerializer = (req, trx, result) => ({

  id: result.get('id'),

  ...result.get('data'),

  installed: result.get('installed')

})

export default appSerializer
