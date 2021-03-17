import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const RecordToken = ({ record }) => (
  <div className="domain-record-token">
    { record.name.replace(/\.$/, '') }
    { record.records.map((record, rindex) => (
      <Fragment key={`value_${rindex}`}>
        <div>{ record.value }</div>
      </Fragment>
    )) }
  </div>
)

RecordToken.propTypes = {
  record: PropTypes.object
}

export default RecordToken
