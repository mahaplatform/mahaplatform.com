const navigation = async (req) => ({
  items: [
    { label: 'Products', route: '/products' },
    { label: 'Stores', route: '/stores' }
  ]
})

export default navigation
