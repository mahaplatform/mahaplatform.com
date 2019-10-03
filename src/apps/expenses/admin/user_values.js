const userValues = (user, context) => [
  {
    title: 'ACCPAC Details',
    items: [
      { label: 'Employee ID', content: user.values.employee_id, empty: 'NONE' },
      { label: 'Vendor ID', content: user.values.vendor_id, empty: 'NONE' }
    ]
  }
]

export default userValues
