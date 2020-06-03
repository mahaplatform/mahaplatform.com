import PropTypes from 'prop-types'
import Program from './program'
import React from 'react'

class Programs extends React.Component {

  static propTypes = {
    programs: PropTypes.array,
    status: PropTypes.string,
    onClose: PropTypes.func
  }

  state = {
    program: { id: 1, title: 'Primitive Pursuits', logo: '/assets/9331/primitivepursuits.jpg', phone_number: { number: '+16072248981', formatted: '(607) 224-8981' } },
    open: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { programs } = this.props
    const { open, program } = this.state
    return (
      <div className="maha-phone-programs">
        <div className="maha-phone-programs-header" onClick={ this._handleToggle }>
          <div className="maha-phone-programs-header-token">
            <Program program={ program } />
          </div>
          <div className="maha-phone-programs-header-icon">
            <i className="fa fa-caret-down" />
          </div>
        </div>
        { open &&
          <div className="maha-phone-programs-chooser">
            { programs.map((program, index) => (
              <div className="maha-phone-programs-chooser-item" key={`program_${index}`} onClick={ this._handleChoose.bind(this, program) }>
                <Program program={ program } />
              </div>
            ))}
          </div>
        }
      </div>
    )
  }

  _handleChoose(program) {
    this.setState({
      open: false,
      program
    })
  }

  _handleToggle() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

}

export default Programs
