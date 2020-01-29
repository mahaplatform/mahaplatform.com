import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Form extends React.PureComponent {

  static propTypes = {
    activity: PropTypes.object,
    program: PropTypes.object
  }

  render() {
    const { activity } = this.props
    const { program } = activity
    return (
      <div className="crm-timeline-item-form-note">
        <strong>Program:</strong> { program.title }<br />
        <strong>Form:</strong> <Button { ...this._getForm() } /><br />
        <Button { ...this._getResponse() } />
      </div>
    )
  }

  _getForm() {
    const { activity } = this.props
    const { data } = activity
    return {
      label: data.form.title,
      className: 'link',
      route: `/admin/crm/forms/${data.form.id}`
    }
  }

  _getResponse() {
    const { activity } = this.props
    const { data } = activity
    return {
      label: 'View Response',
      className: 'link',
      route: `/admin/crm/forms/${data.form.id}/responses/${data.response.id}`
    }
  }

}

export default Form
