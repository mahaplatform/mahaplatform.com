import { getGateway } from './utils'

const testRoute = async (req, res) => {

  const gateway = getGateway()

  const data = await gateway.transaction.find(req.params.id)

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
