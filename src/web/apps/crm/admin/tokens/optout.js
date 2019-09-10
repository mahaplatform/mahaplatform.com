import React from 'react'

const reasons = {
  done: 'I no longer want to receive these emails',
  never: 'I never signed up for this mailing list',
  inappropriate: 'The emails are inappropriate',
  spam: 'The emails are spam and should be reported',
  other: 'Other (fill in reason below)'
}

const OptOutToken = ({ value }) => {
  const reason = reasons[value]
  return (
    <div className="type-token">
      { reason }
    </div>
  )
}

export default OptOutToken
