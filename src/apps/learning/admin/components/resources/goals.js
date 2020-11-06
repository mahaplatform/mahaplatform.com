import { Infinite, Message } from '@admin'
import PropTypes from 'prop-types'
import Items from './items'
import React from 'react'

class Goals extends React.Component {

  static contextTypes = {}

  static propTypes = {
    plan_id: PropTypes.number,
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
            Goals
          </div>
        </div>
        <div className="competencies-resources-panel-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { plan_id } = this.props
    const empty = {
      icon: 'star',
      title: 'No Goals',
      text: 'You have not set any goals'
    }
    const filter = {}
    return {
      endpoint: `/api/admin/learning/plans/${plan_id}/goals`,
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      filter,
      layout: (props) => <Items { ...this._getItems(props) } />
    }
  }

  _getItems(props) {
    return {
      records: props.records.map(goal => goal.competency),
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

export default Goals
