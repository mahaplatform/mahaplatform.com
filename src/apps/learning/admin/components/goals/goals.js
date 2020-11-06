import { Message, TextArea } from '@admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Goals extends React.Component {

  static propTypes = {
    selected: PropTypes.array,
    onBack: PropTypes.func,
    onChoose: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const { selected } = this.props
    return (
      <div className="competencies-resources-panel">
        <div className="competencies-resources-panel-header" onClick={ this._handleBack }>
          <div className="competencies-resources-panel-header-close">
            Close
          </div>
        </div>
        <div className="competencies-resources-panel-body">
          <div className="ui form">
            { selected.length > 0 ?
              <div className="competencies-resources-items">
                { selected.map((goal, index) => (
                  <div className="competencies-resources-item" key={`goal_${index}`}>
                    <div className="competencies-resources-item-detail">
                      { goal.competency === null ?
                        <div className="commitment-token-resource">
                          <strong>Custom Goal</strong>
                        </div> :
                        <div className="commitment-token-resource">
                          <strong>{ goal.competency.title }</strong><br />
                          { goal.competency.description }
                        </div>
                      }
                      <div className="ui field">
                        <TextArea { ...this._getTextArea(goal, index) } />
                      </div>
                    </div>
                    <div className="competencies-resources-item-proceed">
                      <i className="fa fa-fw fa-remove" onClick={ this._handleRemove.bind(this, index) } />
                    </div>
                  </div>
                ))}
              </div> :
              <Message { ...this._getEmpty() } />
            }
          </div>
        </div>
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'trophy',
      title: 'No goals',
      text: 'There are no goals for this plan'
    }
  }

  _getTextArea(goal, index) {
    return {
      placeholder: 'Add instructions',
      rows: 1,
      onChange: this._handleUpdate.bind(this, index),
      defaultValue: goal.description
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleUpdate(index, description) {
    this.props.onUpdate(index, description)
  }

}

const mapStateToProps = (state, props) => ({
  selected: state.learning.goals.selected
})

export default connect(mapStateToProps)(Goals)
