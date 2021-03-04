import React from 'react'
import PropTypes from 'prop-types'

const strategies = {
  ignore: {
    title: 'Ignore',
    description: 'Ignore duplicate records'
  },
  overwrite: {
    title: 'Merge & Overwrite',
    description: 'Merge duplicates, overwriting existing fields with data from import'
  },
  discard: {
    title: 'Merge & Discard',
    description: 'Merge duplicates, discarding data that conflicts with existing fields'
  }
}

const ImportStrategyToken = ({ value }) =>{
  const strategy = strategies[value]
  return (
    <div className="token">
      <strong>{ strategy.title }</strong><br />
      { strategy.description }
    </div>
  )
}

ImportStrategyToken.propTypes = {
  value: PropTypes.string
}

export default ImportStrategyToken
