import { Infinite, Message } from 'maha-admin'
import PropTypes from 'prop-types'
import Options from './options'
import React from 'react'

class Competencies extends React.Component {

  static contextTypes = {}

  static propTypes = {
    category: PropTypes.object,
    classification: PropTypes.object,
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { category, classification } = this.props
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-header" onClick={ this._handleBack }>
          <div className="competencies-resources-panel-header-back">
            <i className="fa fa-chevron-left" />
          </div>
          <div className="competencies-resources-panel-header-label">
            { category && category.title }
            { classification && classification.title }
            { !classification && !category && 'Competencies' }
          </div>
        </div>
        <div className="competencies-resources-panel-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { category, classification } = this.props
    const empty = {
      icon: 'trophy',
      title: 'No Competencies',
      text: classification ? 'There are no competencies for this classification' : 'There are no competencies for this category'
    }
    const filter = {}
    if(classification) filter['competencies_expectations.classification_id'] =  { $eq: classification.id }
    if(category) filter.category_id =  { $eq: category.id }
    return {
      endpoint: '/api/admin/learning/competencies',
      empty: <Message { ...empty } />,
      notFound: <Message { ...empty } />,
      filter,
      layout: Options,
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

export default Competencies
