import PropTypes from 'prop-types'
import React from 'react'
import New from './new'
import _ from 'lodash'

class Options extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    options: PropTypes.array,
    trainings: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onEdit: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {}

  _handleNew = this._handleNew.bind(this)
  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { options } = this.props
    return (
      <div className="training-options">
        { options.map((option, index) => (
          <div className="training-options-option" key={`option_${index}`}>
            <div className="training-options-option-label">
              { option.trainings.map((training, index2) => (
                <div className="training-options-option-token" key={`training_${index2}`}>
                  { training.title }
                </div>
              )) }
            </div>
            <div className="training-options-option-extra" onClick={ this._handleRemove.bind(this, index) }>
              <i className="fa fa-fw fa-times" />
            </div>
          </div>
        )) }
        <div className="training-options-footer">
          <div className="ui blue fluid button" onClick={ this._handleNew }>
            Add Training Option
          </div>
        </div>

      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { options } = this.props
    if(!_.isEqual(options, prevProps.options)) {
      this.props.onChange(options.map(option => ({
        training_ids: option.trainings.map(training => training.id)
      })))
    }
  }

  _getNew() {
    const { trainings } = this.props
    return {
      trainings,
      onSubmit: this._handleAdd
    }
  }

  _handleAdd(training_ids) {
    this.props.onAdd(training_ids)
  }

  _handleNew() {
    this.context.form.push(New, this._getNew.bind(this))
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default Options
