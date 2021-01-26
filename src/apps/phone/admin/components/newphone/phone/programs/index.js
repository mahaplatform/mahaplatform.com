import PropTypes from 'prop-types'
import Program from './program'
import React from 'react'
import _ from 'lodash'

class Programs extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    programs: PropTypes.array,
    status: PropTypes.string,
    onChange: PropTypes.func
  }

  state = {
    program: null,
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
            { program &&
              <Program program={ program } />
            }
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

  componentDidMount() {
    const { program } = this.props
    this.setState({ program })
  }

  componentDidUpdate(prevProps, prevState) {
    const { program } = this.state
    if(!_.isEqual(program, prevState.program)) {
      this._handleChange()
    }
  }

  _handleChange() {
    const { program } = this.state
    this.props.onChange(program)
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
