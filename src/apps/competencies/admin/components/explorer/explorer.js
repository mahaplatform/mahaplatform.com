import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from 'maha-admin'
import Categories from './categories'
import Competencies from './competencies'
import Resources from './resources'

class Explorer extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    category: PropTypes.object,
    competency: PropTypes.object,
    selected: PropTypes.object,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  _handleChooseCategory = this._handleChooseCategory.bind(this)
  _handleChooseCompetency = this._handleChooseCompetency.bind(this)
  _handleChooseResource = this._handleChooseResource.bind(this)

  render() {
    return (
      <div className="competencies-resources">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  _getStack() {
    const { category, competency } = this.props
    const cards = [ { component: Categories, props: this._getCategories() }]
    if(category) cards.push({ component: Competencies, props: this._getCompetencies() })
    if(competency) cards.push({ component: Resources, props: this._getResources() })
    return { cards }
  }

  _getCategories() {
    return {
      onChoose: this._handleChooseCategory
    }
  }

  _getCompetencies() {
    const { category } = this.props
    return {
      category,
      onBack: this._handleBack.bind(this, 'category'),
      onChoose: this._handleChooseCompetency
    }
  }

  _getResources() {
    const { competency, selected } = this.props
    return {
      competency,
      selected,
      onBack: this._handleBack.bind(this, 'competency'),
      onChoose: this._handleChooseResource
    }
  }

  _handleBack(key) {
    this.props.onSet(key, null)
  }

  _handleChooseCategory(category) {
    this.props.onSet('category', category)
  }

  _handleChooseCompetency(competency) {
    this.props.onSet('competency', competency)
  }

  _handleChooseResource(resource) {
    this.props.onToggle(resource.id)
  }

}

export default Explorer
