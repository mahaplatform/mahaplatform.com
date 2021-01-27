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
    program_id: 0,
    open: false
  }

  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { programs } = this.props
    const program = this._getProgram()
    const { open } = this.state
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
          <div className="maha-phone-programs-overlay" />
        }
        { open &&
          <div className="maha-phone-programs-chooser">
            { programs.map((program, index) => (
              <div className="maha-phone-programs-chooser-item" key={`program_${index}`} onClick={ this._handleChoose.bind(this, program.id) }>
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
    this.setState({
      program_id: program.id
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { program } = this.props
    const { program_id } = this.state
    if(program_id !== prevState.program_id) {
      this._handleChange()
    }
    if(!_.isEqual(program, prevProps.program)) {
      this._handleChoose(program.id)
    }
  }

  _getProgram() {
    const { program_id } = this.state
    const { programs } = this.props
    return programs.find(program => {
      return program.id === program_id
    })
  }

  _handleChange() {
    const { program_id } = this.state
    this.props.onChange(program_id)
  }

  _handleChoose(program_id) {
    this.setState({
      open: false,
      program_id
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
