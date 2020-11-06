import { Infinite, Message } from '@admin'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Resources extends React.Component {

  static contextTypes = {}

  static propTypes = {
    competency: PropTypes.object,
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { competency } = this.props
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-header" onClick={ this._handleBack }>
          <div className="competencies-resources-panel-header-back">
            <i className="fa fa-chevron-left" />
          </div>
          <div className="competencies-resources-panel-header-label">
            { competency ? competency.title : 'Resources' }
          </div>
        </div>
        <div className="competencies-resources-panel-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { competency } = this.props
    const empty = {
      icon: 'cube',
      title: 'No resources',
      text: 'There are no resources for this competency'
    }
    return {
      endpoint: '/api/admin/learning/resources',
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      filter: competency ? {
        'competencies_competencies.id': { $eq: competency.id }
      } : null,
      layout: Items,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _getItems(props) {
    return
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(item) {
    this.props.onChoose(item)
  }

}

export default Resources
