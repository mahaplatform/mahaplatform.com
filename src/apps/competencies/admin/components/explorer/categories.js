import { Infinite, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Categories extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onChoose: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-header">
          <div className="competencies-resources-panel-header-label">
            Categories
          </div>
        </div>
        <div className="competencies-resources-panel-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const empty = {
      icon: 'folder-open-o',
      title: 'Empty Folder',
      text: 'There are no folders in this folder'
    }
    return {
      endpoint: '/api/admin/competencies/categories',
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: (props) => <Items { ...props } { ...this._getItem(props) } />
    }
  }

  _getItem() {
    return {
      onChoose: this._handleChoose
    }
  }

  _handleChoose(item) {
    this.props.onChoose(item)
  }

}

export default Categories
