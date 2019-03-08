import { Infinite, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Competencies extends React.Component {

  static contextTypes = {}

  static propTypes = {
    category: PropTypes.object,
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { category } = this.props
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-header" onClick={ this._handleBack }>
          <div className="competencies-resources-panel-header-back">
            <i className="fa fa-chevron-left" />
          </div>
          <div className="competencies-resources-panel-header-label">
            { category.title }
          </div>
        </div>
        <div className="competencies-resources-panel-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { category } = this.props
    const empty = {
      icon: 'folder-open-o',
      title: 'Empty Folder',
      text: 'There are no folders in this folder'
    }
    return {
      endpoint: '/api/admin/competencies/competencies',
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      filter: {
        category_id: { $eq: category.id }
      },
      layout: (props) => <Items { ...props } { ...this._getItem(props) } />
    }
  }

  _getItem() {
    return {
      onChoose: this._handleChoose
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(item) {
    this.props.onChoose(item)
  }

}

export default Competencies
