import { CSSTransition } from 'react-transition-group'
import Classifications from './classifications'
import { ModalPanel, Stack } from 'maha-admin'
import Competencies from './competencies'
import Strategies from './strategies'
import Categories from './categories'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Custom from './custom'
import Goals from './goals'
import React from 'react'

class Explorer extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    category: PropTypes.object,
    classification: PropTypes.object,
    competency: PropTypes.object,
    goals: PropTypes.array,
    plan: PropTypes.object,
    review: PropTypes.bool,
    selected: PropTypes.array,
    status: PropTypes.string,
    strategy: PropTypes.string,
    onAdd: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func,
    onToggleReview: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChooseCategory = this._handleChooseCategory.bind(this)
  _handleChooseClassification = this._handleChooseClassification.bind(this)
  _handleChooseCompetency = this._handleChooseCompetency.bind(this)
  _handleChooseStrategy = this._handleChooseStrategy.bind(this)
  _handleReview = this._handleReview.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { review, selected } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="competencies-resources">
          <div className="competencies-resources-body">
            <Stack { ...this._getStack() } />
          </div>
          <CSSTransition in={ selected.length > 0 } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="competencies-resources-footer" onClick={ this._handleReview }>
              View { pluralize('commitment', selected.length, true) }
            </div>
          </CSSTransition>
        </div>
        <CSSTransition in={ review } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="competencies-resources-review">
            <Goals { ...this._getGoals() } />
          </div>
        </CSSTransition>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { goals, onSet } = this.props
    if(goals) onSet('selected', goals)
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    const { modal } = this.context
    if(status !== prevProps.status) {
      if(status === 'saved') modal.close()
    }
  }

  _getPanel() {
    return {
      title: 'Goals',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleSave}
      ]
    }
  }

  _getStack() {
    const { category, classification, strategy } = this.props
    const cards = [ { component: Strategies, props: this._getStrategies() }]
    if(strategy === 'category') cards.push({ component: Categories, props: this._getCategories() })
    if(strategy === 'classification') cards.push({ component: Classifications, props: this._getClassifications() })
    if(strategy === 'custom') cards.push({ component: Custom, props: this._getCustom() })
    if(strategy === 'competencies') cards.push({ component: Competencies, props: this._getCompetencies() })
    if(category || classification) cards.push({ component: Competencies, props: this._getCompetencies() })
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

  _getCustom() {
    return {
      onAdd: this._handleAdd,
      onBack: this._handleBack.bind(this, 'strategy')
    }
  }

  _getCompetencies() {
    const { category, classification } = this.props
    const back = category ? 'category' : (classification ? 'classification' : 'strategy')
    return {
      category,
      classification,
      onBack: this._handleBack.bind(this, back),
      onChoose: this._handleChooseCompetency
    }
  }

  _getGoals() {
    return {
      onBack: this._handleReview,
      onRemove: this._handleChooseCompetency,
      onUpdate: this._handleUpdate
    }
  }

  _handleAdd(value) {
    this.props.onAdd(value)
  }
  
  _handleBack(key) {
    this.props.onSet(key, null)
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChooseStrategy(strategy) {
    this.props.onSet('strategy', strategy)
  }

  _handleChooseCategory(category) {
    this.props.onSet('category', category)
  }

  _handleChooseClassification(classification) {
    this.props.onSet('classification', classification)
  }

  _handleChooseCompetency(competency) {
    this.props.onToggle(competency)
  }

  _handleReview() {
    this.props.onToggleReview()
  }

  _handleSave() {
    const { plan, selected } = this.props
    const goals = selected.map(item => ({
      competency_id: item.competency ? item.competency.id : null,
      description: item.description

    }))
    this.props.onSave(plan.id, goals)
  }

  _handleUpdate(index, description) {
    this.props.onUpdate(index, description)
  }

}

export default Explorer
