import braintree from '../../../../../core/services/braintree'

const testRoute = async (req, res) => {

  const data = await braintree.transaction.find(req.params.id)

  // const data = await new Promise((resolve, reject) => {
  //   gateway.transaction.search(search => {
  //     search.disbursementDate().is('2019-10-03')
  //   }, (err, result) => {
  //     if(err) return reject(err)
  //     const length = result.length()
  //     const data = []
  //     result.each((err, item) => {
  //       data.push(item.id)
  //       if(data.length === length) resolve(data)
  //     })
  //   })
  // })

  res.status(200).respond(data)

}

export default testRoute
