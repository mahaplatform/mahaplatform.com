import { Image } from 'maha-admin'
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
        { templates.map((template, index) => (
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

  _handleChoose(template) {
    this.props.onChoose(template)
  }

}

export default Chooser
