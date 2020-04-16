import { ModalPanel, Tabs } from 'maha-admin'
import PropTypes from 'prop-types'
import Custom from './custom'
import React from 'react'

class Chooser extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    templates: PropTypes.array,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Tabs { ...this._getTabs() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Template',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getTabs() {
    return {
      items: [
        { label: 'Layouts', component: <Custom { ...this._getTemplates() } /> },
        { label: 'Custom', component: <Custom { ...this._getTemplates() } /> }
      ]
    }
  }

  _getTemplates() {
    const { templates, onChoose } = this.props
    return {
      templates,
      onChoose
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

}

export default Chooser
