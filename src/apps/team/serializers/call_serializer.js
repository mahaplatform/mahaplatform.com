const CallSerializer = (req, result) => ({
  id: result.get('id'),
  to: number(result.related('to')),
  from: number(result.related('from')),
  type: result.get('type'),
  status: result.get('status'),
  price: result.get('price'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const number = (number) => {
  if(!number.id) return null
  return {
    id: number.get('id'),
    number: number.get('number'),
    formatted: number.get('formatted')
  }
}

export default CallSerializer
