import { Infinite, ModalPanel, Searchbox } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'
import New from './new'

class Groups extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    group_id: PropTypes.number,
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  state = {
    q: ''
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleQuery = this._handleQuery.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="news-feed-groups">
          <div className="news-feed-groups-header">
            <Searchbox { ...this._getSearchbox() } />
          </div>
          <div className="news-feed-groups-body">
            <Infinite { ...this._getInfinite() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Group',
      color: 'blue',
      rightItems: [
        { icon: 'plus', handler: this._handleAdd }
      ]
    }
  }

  _getSearchbox() {
    return {
      prompt: 'Find a group',
      onChange: this._handleQuery
    }
  }

  _getInfinite() {
    const { group_id, onChoose } = this.props
    const { q } = this.state
    return {
      endpoint: '/api/admin/news/groups',
      filter: {
        q
      },
      layout: Results,
      refresh: '/admin/news/groups',
      props: {
        group_id,
        onChoose
      }
    }
  }

  _handleAdd() {
    this.context.modal.open(<New />)
  }

  _handleQuery(q) {
    this.setState({ q })
  }


}

export default Groups
