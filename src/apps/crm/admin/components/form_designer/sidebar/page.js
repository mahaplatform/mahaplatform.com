import { Designer } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Page extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return <Designer { ...this._getDesigner() } />
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

}

export default Page
