import { Infinite, ModalPanel, Searchbox } from '@admin'
import GroupToken from '../../tokens/group'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="news-form-list">
        { records.map((group, index) => (
          <div className="news-form-list-item" key={`group_${index}`} onClick={ this._handleChoose.bind(this, group) }>
            <div className="news-form-list-item-token">
              <GroupToken { ...group } />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleChoose(group) {
    this.props.onChoose(group)
  }

}


class Groups extends React.Component {

  static propTypes = {
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  state = {
    q: ''
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel()}>
        <div className="news-form-scope">
          <div className="news-form-scope-header">
            <Searchbox { ...this._getSearchbox() } />
          </div>
          <div className="news-form-scope-body">
            <Infinite { ...this._getInfinite() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getInfinite() {
    const { q } = this.state
    return {
      endpoint: '/api/admin/news/groups',
      filter: { q },
      layout: Results,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _getPanel() {
    return {
      title: 'Choose Group',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getSearchbox() {
    return {
      prompt: 'Find a group...',
      onChange: this._handleType
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(group) {
    this.props.onChoose({ group })
    this.props.onBack(-2)
  }

  _handleType(q) {
    this.setState({ q })
  }

}

export default Groups
