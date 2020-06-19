import braintree from 'braintree'

const { Production } = braintree.Environment

const gateway = braintree.connect({
  environment: Production,
  merchantId: 'v7s2p72z2gc432v3',
  publicKey: 'p6xmmq56ndd4hqq5',
  privateKey: '91fd45f3d13b31118815f827f5fde67b'
})

const getTransactions = async(ids) => {
  return await new Promise((resolve, reject) => {
    gateway.transaction.search(search => {
      search.ids().in(ids)
    }, (err, result) => {
      if(err) return reject(err)
      const length = result.length()
      const data = []
      result.each((err, item) => {
        data.push(item)
        if(data.length === length) resolve(data)
      })
    })
  }).then(results => results.reduce((transactions, transaction) => ({
    ...transactions,
    [transaction.id]: transaction
  }), {}))
}

const processor = async() => {

  const transactions = await getTransactions(['e1s4wmyc'])

  console.log('transactions', transactions.e1s4wmyc.paypal.authorizationId)

}

processor().then(process.exit).catch(console.log)
