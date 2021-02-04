const navigation = async (req) => ({
  items: [
    { label: 'Call Logs', route: '/calls' },
    { label: 'Numbers', route: '/phone_numbers' }
  ]
})

export default navigation
