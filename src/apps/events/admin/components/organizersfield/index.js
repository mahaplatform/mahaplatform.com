import OrganizerToken from '../../tokens/organizer'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class OrganizersField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    organizers: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleBack = this._handleBack.bind(this)
  _handleLookup = this._handleLookup.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { organizers } = this.state
    return (
      <div className="organizersfield">
        <div className="organizersfield-organizers">
          { organizers.map((organizer, index) => (
            <div className="organizersfield-organizer" key={`organizer_${index}`}>
              <div className="organizersfield-organizer-token">
                <OrganizerToken { ...organizer } />
              </div>
              <div className="organizersfield-organizer-action" onClick={ this._handleRemove.bind(this, index )}>
                <i className="fa fa-times" />
              </div>
            </div>
          )) }
        </div>
        <div className="organizersfield-add">
          <Button { ...this._getAddButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleFetch()
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { organizers } = this.state
    if(!_.isEqual(organizers, prevState.organizers)) {
      this._handleChange()
    }
  }

  _getAddButton() {
    return {
      label: 'Add an organizer',
      className: 'link',
      handler: this._handleLookup
    }
  }

  _getChooser() {
    return {
      onChoose: this._handleAdd
    }
  }

  _handleAdd(organizer) {
    this.setState({
      organizers: [
        ...this.state.organizers,
        organizer
      ]
    })
    this.context.form.pop()
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange() {
    const { organizers } = this.state
    const organizer_ids = organizers.map(organizer => {
      return organizer.id
    })
    this.props.onChange(organizer_ids)
  }

  _handleFetch() {
    const { defaultValue } = this.props
    this.context.network.request({
      endpoint: '/api/admin/events/organizers',
      query: {
        $filter: {
          ids: {
            $in: defaultValue
          }
        }
      },
      onSuccess: this._handleSuccess
    })
  }

  _handleLookup() {
    this.context.form.push(<Chooser { ...this._getChooser() } />)
  }

  _handleRemove(index) {
    this.setState({
      organizers: [
        ...this.state.organizers.filter((organizer, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      organizers: data
    })
  }

}


export default OrganizersField
