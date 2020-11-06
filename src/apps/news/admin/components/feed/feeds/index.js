import { Infinite, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'
import New from './new'

class Feeds extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    group_id: PropTypes.number,
    records: PropTypes.array,
    user_id: PropTypes.number,
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
      title: 'Feeds',
      color: 'blue',
      rightItems: [
        { icon: 'plus', handler: this._handleAdd }
      ]
    }
  }

  _getInfinite() {
    const { group_id, user_id, onChoose } = this.props
    return {
      endpoint: '/api/admin/news/groups',
      layout: Results,
      refresh: '/admin/news/groups',
      props: {
        group_id,
        user_id,
        onChoose
      }
    }
  }

  _handleAdd() {
    this.context.modal.open(<New />)
  }

}

export default Feeds
