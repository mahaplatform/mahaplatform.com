export const comparisons = [
  { value: '$eq', text: 'is', types: ['radiogroup','dropdown'] },
  { value: '$neq', text: 'is not', types: ['radiogroup','dropdown'] },
  { value: '$in', text: 'is one of', types: ['textfield','radiogroup','dropdown'] },
  { value: '$int', text: 'is one of', types: ['checkboxes'] },
  { value: '$nint', text: 'is not one of', types: ['checkboxes'] },
  { value: '$eq', text: 'is equal to', types: ['numberfield','moneyfield'] },
  { value: '$lt', text: 'is less than', types: ['numberfield','moneyfield'] },
  { value: '$lte', text: 'is less than or equal to', types: ['numberfield','moneyfield'] },
  { value: '$gt', text: 'is greater than', types: ['numberfield','moneyfield'] },
  { value: '$gte', text: 'is greater than or equal to', types: ['numberfield','moneyfield'] }
]
