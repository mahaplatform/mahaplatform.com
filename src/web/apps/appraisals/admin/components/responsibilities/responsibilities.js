import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

class Responsibilities extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    responsibilities: PropTypes.array,
    responsibility_types: PropTypes.array,
    status: PropTypes.string,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onFetchTypes: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {}

  _handleAdd = this._handleAdd.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { responsibilities } = this.props
    return (
      <div className="responsibilities">
        <table className="ui celled unstackable compact table">
          <thead>
            <tr>
              <th>Job Responsibility</th>
              <th className="collapsing">Weight</th>
              <th className="collapsing">Rating</th>
              <th className="collapsing" />
            </tr>
          </thead>
          <tbody>
            { responsibilities.length === 0 &&
              <tr>
                <td colSpan="4">There are not yet any responsibilities for this appraisal</td>
              </tr>
            }
            { responsibilities.map((responsibility, index) => (
              <tr key={`responsibility_${index}`}>
                <td>{ responsibility.responsibility_type.text }</td>
                <td className="right aligned">{ responsibility.weight }%</td>
                <td className="center aligned">{ responsibility.rating }</td>
                <td className="center aligned" onClick={ this._handleRemove.bind(this, index) }>
                  <i className="fa fa-times" />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">
                <div className="ui fluid blue button" onClick={ this._handleNew }>
                  Add Responsibility
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetchTypes()
  }

  componentDidUpdate(prevProps) {
    const { status, onReady } = this.props
    if(status !== prevProps.status && status === 'ready') {
      onReady()
    }
  }

  _handleAdd(responsibility) {
    this.props.onAdd(responsibility)
  }

  _handleNew() {
    this.context.form.push(<New onSubmit={ this._handleAdd } />)
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default Responsibilities
