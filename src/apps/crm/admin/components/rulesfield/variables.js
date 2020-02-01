export const actions = [
  { value: 'hide', text: 'hide' },
  { value: 'show', text: 'show' }
]

export const comparisons = [
  { value: '$eq', text: 'equals', types: ['textfield','textarea','emailfield','phonefield'] },
  { value: '$neq', text: 'does not equal', types: ['textfield','textarea','emailfield','phonefield'] },
  { value: '$ct', text: 'contains', types: ['textfield','textarea','emailfield','phonefield'] },
  { value: '$nct', text: 'does not contain', types: ['textfield','textarea','emailfield','phonefield'] },
  { value: '$eq', text: 'is', types: ['radiogroup','dropdown'] },
  { value: '$neq', text: 'is not', types: ['radiogroup','dropdown'] },
  { value: '$in', text: 'is one of', types: ['radiogroup','dropdown'] },
  { value: '$nin', text: 'is not one of', types: ['radiogroup','dropdown'] },
  { value: '$ck', text: 'is checked', types: ['checkbox'] },
  { value: '$nck', text: 'is not checked', types: ['checkbox'] },
  { value: '$nl', text: 'has been uploaded', types: ['filefield'] },
  { value: '$nnl', text: 'has not been uploaded', types: ['filefield'] },
  { value: '$in', text: 'is one of', types: ['checkboxes'] },
  { value: '$nin', text: 'is not one of', types: ['checkboxes'] },
  { value: '$eq', text: 'is equal to', types: ['numberfield','moneyfield'] },
  { value: '$lt', text: 'is less than', types: ['numberfield','moneyfield'] },
  { value: '$lte', text: 'is less than or equal to', types: ['numberfield','moneyfield'] },
  { value: '$gt', text: 'is greater than', types: ['numberfield','moneyfield'] },
  { value: '$gte', text: 'is greater than or equal to', types: ['numberfield','moneyfield'] }
]
