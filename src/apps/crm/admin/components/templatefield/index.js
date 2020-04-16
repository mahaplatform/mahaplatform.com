import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class TemplateField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    program_id: PropTypes.number,
    tabIndex: PropTypes.number,
    templates: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {}

  state = {
    template: null
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { tabIndex } = this.props
    const { template } = this.state
    return (
      <div className="maha-input" tabIndex={ tabIndex }>
        <div className="maha-input-field" onClick={ this._handleBegin }>
          { template ?
            <div className="maha-input-token">
              { template.title }
            </div> :
            <div className="maha-input-placeholder">
              Choose a template
            </div>
          }

        </div>
        { template &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this._handleDefault()
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { template } = this.state
    if(!_.isEqual(template, prevState.template)) {
      this._handleChange()
    }
  }

  _getChooser() {
    const { templates } = this.props
    return {
      templates,
      onChoose: this._handleChoose
    }
  }

  _handleBegin() {
    this.context.form.push(Chooser, this._getChooser())
  }

  _handleChange() {
    const { template } = this.state
    this.props.onChange(template.id)
  }

  _handleChoose(template) {
    this.setState({ template })
    this.context.form.pop()
  }

  _handleClear() {
    this.setState({
      template: null
    })
  }

  _handleDefault() {
    const id = this.props.defaultValue
    const { templates } = this.props
    const template = _.find(templates, { id })
    this.setState({ template })
  }

}

const mapResources = (props, context) => ({
  templates: '/api/admin/crm/templates'
})

export default Container(mapResources)(TemplateField)
