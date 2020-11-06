import { Image, Message } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Chooser extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    templates: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { templates } = this.props
    return (
      <div className="templatefield-templates">
        { templates.length === 0 &&
          <Message { ...this._getEmpty() } />
        }
        { templates.length > 0 && templates.map((template, index) => (
          <div className="templatefield-template" key={`template_${index}`} onClick={ this._handleChoose.bind(this, template) }>
            <div className="templatefield-template-preview">
              <Image src={ `/${template.preview}` } transforms={{ w: 250 }} />
            </div>
            <div className="templatefield-template-label">
              { template.title }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getEmpty() {
    return {
      icon: 'envelope-o',
      title: 'No Templates',
      text: 'You have not created any templates for this program'
    }
  }

  _handleChoose(template) {
    this.props.onChoose(template)
  }

}

export default Chooser
