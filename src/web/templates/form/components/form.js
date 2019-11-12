import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import Fields from './fields'
import React from 'react'

class Form extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <div className="maha-form">
        <Header { ...this._getHeader() } />
        <Fields { ...this._getFields() } />
        <Footer { ...this._getFooter() } />
      </div>
    )
  }

  _getFields() {
    const { fields } = this.props.config
    return { fields }
  }

  _getFooter() {
    return this.props.config.footer
  }

  _getHeader() {
    return this.props.config.header
  }

}

export default Form
