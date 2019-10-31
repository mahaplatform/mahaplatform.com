import PropTypes from 'prop-types'
import React from 'react'

class FormDesigner extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="form-designer">
        <div className="form-designer-main">
          <div className="form-designer-canvas">
            <form className="ui form">
              <div className="field">
                <label>First Name</label>
                <input type="text" name="first_name" placeholder="First Name" />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input type="text" name="last_name" placeholder="Last Name" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="text" name="email" placeholder="Email" />
              </div>
              <div className="field">
                <div className="ui checkbox">
                  <input type="checkbox" className="hidden" />
                  <label>Have you participated before?</label>
                </div>
              </div>
              <button className="ui blue fluid button" type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="form-designer-sidebar">
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

}

export default FormDesigner
