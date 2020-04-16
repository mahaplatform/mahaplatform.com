import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'

class TemplateField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    program_id: PropTypes.number,
    templates: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {}

  state = {
    template: null
  }

  _handleBegin = this._handleBegin.bind(this)

  render() {
    return (
      <div className="templatefield" onClick={ this._handleBegin }>
        template
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) {
      this.setState({
        template: defaultValue
      })
    }
    onReady()
  }

  _getChooser() {
    const { templates } = this.props
    return {
      templates
    }
  }

  _handleBegin() {
    this.context.form.push(Chooser, this._getChooser())
  }

}

const mapResources = (props, context) => ({
  templates: `/api/admin/crm/programs/${props.program_id}/templates`
})

export default Container(mapResources)(TemplateField)
