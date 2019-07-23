import { RadioGroup, TextArea } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'
import _ from 'lodash'

class Responsibilities extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    responsibilities: PropTypes.array,
    responsibility_types: PropTypes.array,
    status: PropTypes.string,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onFetchTypes: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleAdd = this._handleAdd.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { responsibilities, status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="responsibilities">
        { responsibilities.length === 0 &&
          <div className="responsibilities-responsibility">
            There are not yet any responsibilities for this appraisal
          </div>
        }
        { responsibilities.map((responsibility, index) => (
          <div className="responsibilities-responsibility" key={`responsibility_${index}`}>
            <div className="responsibilities-responsibility-label">
              <strong>{ responsibility.responsibility_type.text }</strong> ({ responsibility.weight }%)
              <div className="responsibilities-responsibility-remove" onClick={ this._handleRemove.bind(this, index) }>
                Remove Responsibility
              </div>
            </div>
            <RadioGroup { ...this._getRadioGroup(responsibility, index) } />
            <TextArea { ...this._getTextArea(responsibility, index) } />
          </div>
        ))}
        <div className="link" onClick={ this._handleNew }>
          Add Responsibility
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetchTypes()
  }

  componentDidUpdate(prevProps) {
    const { defaultValue, responsibilities, status, onReady, onSet } = this.props
    if(status !== prevProps.status && status === 'ready') {
      onReady()
      if(defaultValue) onSet(defaultValue)
    }
    if(!_.isEqual(responsibilities, prevProps.responsibilities)) {
      this._handleChange()
    }
  }

  _getRadioGroup(responsibility, index) {
    return {
      options: [
        { value: 1, text: 'Exceeds Expectations' },
        { value: 2, text: 'Meets Expectations' },
        { value: 3, text: 'Does Not Meet Expectations' }
      ],
      onChange: this._handleUpdate.bind(this, index, 'rating'),
      defaultValue: responsibility.rating
    }
  }

  _getTextArea(responsibility, index) {
    return {
      placeholder: 'Enter any comments for development',
      onChange: this._handleUpdate.bind(this, index, 'comments'),
      defaultValue: responsibility.comments
    }
  }

  _handleAdd(responsibility) {
    this.props.onAdd(responsibility)
  }

  _handleChange() {
    const { responsibilities, onChange } = this.props
    onChange(responsibilities.map(responsibility => ({
      id: responsibility.id,
      responsibility_type_id: responsibility.responsibility_type.id,
      weight: responsibility.weight,
      rating: responsibility.rating,
      comments: responsibility.comments
    })))
  }

  _handleNew() {
    this.context.form.push(<New onSubmit={ this._handleAdd } />)
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleUpdate(index, key, value) {
    this.props.onUpdate(index, key, value)
  }

}

export default Responsibilities
