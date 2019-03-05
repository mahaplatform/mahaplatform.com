import { Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Recent extends React.Component {

  static propTypes = {
    cacheKey: PropTypes.string
  }

  render() {
    return <Infinite { ...this.props } />
  }

  shouldComponentUpdate(nextProps) {
    return this.props.cacheKey !== nextProps.cacheKey
  }

}

export default Recent
