const navigation = async (req, trx) => ({
  items: [
    { label: 'Email', route: '/email' },
    { label: 'Inbound SMS', route: '/sms/inbound' },
    { label: 'Inbound Voice', route: '/voice/inbound' },
    { label: 'Outbound SMS', route: '/sms/outbound' },
    { label: 'Outbound Voice', route: '/voice/outbound' }
  ]
})

export default navigation
