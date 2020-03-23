import { Infinite, ModalPanel } from 'maha-admin'
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

  _handleAdd = this._handleAdd.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="news-feed-groups">
          <Infinite { ...this._getInfinite() } />
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Groups',
      color: 'blue',
      rightItems: [
        { icon: 'plus', handler: this._handleAdd }
      ]
    }
  }

  _getInfinite() {
    const { group_id, onChoose } = this.props
    return {
      endpoint: '/api/admin/news/groups',
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

}

export default Groups
