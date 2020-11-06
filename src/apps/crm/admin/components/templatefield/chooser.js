import { ModalPanel, Tabs } from '@admin'
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
        { label: 'Layouts', component: <Custom { ...this._getLayouts() } /> },
        { label: 'Custom', component: <Custom { ...this._getCustom() } /> }
      ]
    }
  }

  _getCustom() {
    const { templates, onChoose } = this.props
    return {
      templates: templates.filter(template => {
        return template.program !== undefined
      }),
      onChoose
    }
  }

  _getLayouts() {
    const { templates, onChoose } = this.props
    return {
      templates: templates.filter(template => {
        return template.program === undefined
      }),
      onChoose
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

}

export default Chooser
