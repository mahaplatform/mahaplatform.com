import React from 'react'

const grounds = {
  'consent': {
    title: 'Consent',
    description: 'Contact has given consent'
  },
  'contract': {
    title: 'Contract',
    description: 'Processing is necessary for the performance of a contract with the data subject or to take steps to enter into a contract'
  },
  'legal obligation': {
    title: 'Legal Obligation',
    description: 'Processing is necessary for compliance with a legal obligation'
  },
  'vital interests': {
    title: 'Vital Interests',
    description: 'Processing is necessary to protect the vital interests of a data subject or another person'
  },
  'public interest': {
    title: 'Public Interest',
    description: 'Processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller'
  },
  'legitimate interest': {
    title: 'Legitimate Interest',
    description: 'Necessary for the purposes of legitimate interests pursued by the controller or a third party, except where such interests are overridden by the interests, rights or freedoms of the data subject.'
  }
}

const OptInToken = ({ value }) => {
  const ground = grounds[value]
  return (
    <div className="type-token">
      <strong>{ ground.title }</strong><br />
      { ground.description }
    </div>
  )
}

export default OptInToken
