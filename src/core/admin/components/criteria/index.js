import Criteria from './criteria'
import React from 'react'

class CriteriaWrapper extends React.Component {

  render() {
    return <Criteria { ...this.props} />
  }

}

export default CriteriaWrapper
