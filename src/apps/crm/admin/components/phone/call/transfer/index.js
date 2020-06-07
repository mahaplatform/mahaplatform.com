import { Infinite, ModalPanel, Searchbox } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Transfer extends React.Component {

  static propTypes = {
    onChoose: PropTypes.func,
    onPop: PropTypes.func
  }

  state = {
    q: ''
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleQuery = this._handleQuery.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-search">
          <div className="maha-phone-search-header">
            <Searchbox { ...this._getSearchBox() } />
          </div>
          <div className="maha-phone-search-body">
            <Infinite { ...this._getInfinite() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getInfinite() {
    const { q } = this.state
    return {
      endpoint: '/api/admin/users',
      filter: {
        ...q.length > 0 ? { q } : {},
        is_active: {
          $eq: true
        }
      },
      layout: Results,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _getPanel() {
    return {
      title: 'Transfer To',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getSearchBox() {
    return {
      onChange: this._handleQuery
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleChoose(user) {
    this.props.onChoose(user)
    this.props.onPop()
  }

  _handleQuery(q) {
    this.setState({ q })
  }

}

export default Transfer
