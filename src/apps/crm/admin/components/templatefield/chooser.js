import { Image, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    templates: PropTypes.array
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    const { templates } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="templatefield-templates">
          { templates.map((template, index) => (
            <div className="templatefield-template" key={`template_${index}`}>
              <div className="templatefield-template-preview">
                <Image src={ template.preview } transforms={{ w: 250 }} />
              </div>
              <div className="templatefield-template-label">
                { template.title }
              </div>
            </div>
          ))}
        </div>
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

  _handleBack() {
    this.context.form.pop()
  }

}

export default Chooser
