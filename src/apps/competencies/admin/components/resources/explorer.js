import Classifications from './classifications'
import Competencies from './competencies'
import Strategies from './strategies'
import Categories from './categories'
import Resources from './resources'
import PropTypes from 'prop-types'
import { Stack } from 'maha-admin'
import React from 'react'

class Explorer extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    category: PropTypes.object,
    classification: PropTypes.object,
    competency: PropTypes.object,
    strategy: PropTypes.string,
    onSet: PropTypes.func
  }

  _handleChooseCategory = this._handleChooseCategory.bind(this)
  _handleChooseClassification = this._handleChooseClassification.bind(this)
  _handleChooseCompetency = this._handleChooseCompetency.bind(this)
  _handleChooseResource = this._handleChooseResource.bind(this)
  _handleChooseStrategy = this._handleChooseStrategy.bind(this)

  render() {
    return (
      <div className="competencies-resources">
        <div className="competencies-resources-body">
          <Stack { ...this._getStack() } />
        </div>
      </div>
    )
  }

  _getStack() {
    const { category, classification, competency, strategy } = this.props
    const cards = [ { component: Strategies, props: this._getStrategies() }]
    if(strategy === 'category') cards.push({ component: Categories, props: this._getCategories() })
    if(strategy === 'classification') cards.push({ component: Classifications, props: this._getClassifications() })
    if(category || classification) cards.push({ component: Competencies, props: this._getCompetencies() })
    if(competency) cards.push({ component: Resources, props: this._getResources() })
    return { cards }
  }

  _getStrategies() {
    return {
      onChoose: this._handleChooseStrategy
    }
  }

  _getClassifications() {
    return {
      onBack: this._handleBack.bind(this, 'strategy'),
      onChoose: this._handleChooseClassification
    }
  }

  _getCategories() {
    return {
      onBack: this._handleBack.bind(this, 'strategy'),
      onChoose: this._handleChooseCategory
    }
  }

  _getCompetencies() {
    const { category, classification } = this.props
    const back = category ? 'category' : 'classification'
    return {
      category,
      classification,
      onBack: this._handleBack.bind(this, back),
      onChoose: this._handleChooseCompetency
    }
  }

  _getResources() {
    const { competency } = this.props
    return {
      competency,
      onBack: this._handleBack.bind(this, 'competency'),
      onChoose: this._handleChooseResource
    }
  }

  _handleBack(key) {
    this.props.onSet(key, null)
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChooseCategory(category) {
    this.props.onSet('category', category)
  }

  _handleChooseClassification(classification) {
    this.props.onSet('classification', classification)
  }

  _handleChooseCompetency(competency) {
    this.props.onSet('competency', competency)
  }

  _handleChooseResource(resource) {
    this.context.router.push(`/admin/competencies/resources/${resource.id}`)
  }

  _handleChooseStrategy(strategy) {
    this.props.onSet('strategy', strategy)
  }

}

export default Explorer
