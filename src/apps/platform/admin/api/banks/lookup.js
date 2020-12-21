import braintree from '@core/vendor/braintree'

const lookupRoute = async (req, res) => {

  const data = await new Promise((resolve, reject) => {
    braintree.merchantAccount.all((err, merchants) => {
      resolve(merchants.filter(merchant => {
        return merchant.status === 'active'
      }).map(merchant => ({
        id: merchant.id
      })))
    })
  })

  data.pagination = {
    all: data.length,
    total: data.length,
    skip: 0,
    limit: data.length
  }

  res.status(200).respond(data)

}

export default lookupRoute
