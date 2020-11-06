import { Infinite, Message } from '@admin'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Classifications extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-header" onClick={ this._handleBack }>
          <div className="competencies-resources-panel-header-back">
            <i className="fa fa-chevron-left" />
          </div>
          <div className="competencies-resources-panel-header-label">
            Classifications
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
      icon: 'briefcase',
      title: 'No Classifications',
      text: 'There are no classifications'
    }
    return {
      endpoint: '/api/admin/learning/classifications',
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      layout: Items,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(item) {
    this.props.onChoose(item)
  }


}

export default Classifications
