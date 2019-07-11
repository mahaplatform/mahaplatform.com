const navigation = (req, trx) => ({
  items: [
    { label: 'Appraisals', route: '/appraisals' },
    { label: 'Employees', route: '/appraisals/employees' },
    { label: 'Reports', route: '/appraisals/reports' }
  ]
})

export default navigation
