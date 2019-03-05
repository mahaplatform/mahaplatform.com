import { Page } from 'maha-admin'
import Explorer from '../components/explorer'
import PropTypes from 'prop-types'
import React from 'react'

class Drive extends React.Component {

  static propTypes = {
    page: PropTypes.object
  }

  render() {
    return <Explorer { ...this._getExplorer() } />
  }

  _getCode() {
    const { page } = this.props
    const match = page.pathname.match(/\/admin\/drive\/([^/]*)$/)
    if(!match) return page.params.id
    if(match[1] === 'items') return 'drive'
    return match[1]
  }

  _getExplorer() {
    return {
      code: this._getCode()
    }
  }

}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Drive',
  component: Drive
})

export default Page(null, mapPropsToPage)
