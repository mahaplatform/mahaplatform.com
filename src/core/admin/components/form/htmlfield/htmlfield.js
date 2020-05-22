import ReactQuill from 'react-quill'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class HtmlField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    headers: PropTypes.bool,
    state: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    defaultValue: '',
    headers: true,
    onChange: (value) => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleChange = _.throttle(this._handleChange.bind(this), 150)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <div className="maha-htmlfield">
        <ReactQuill { ...this._getEditor() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this._handleUpdate(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getEditor() {
    const { headers } = this.props
    const { value } = this.state
    return {
      value,
      onChange: this._handleUpdate,
      modules: {
        toolbar: [
          [
            ...headers ? [{ header: 1 },{ header: 2 }] : [],
            'bold', 'italic', 'underline'
          ],
          [{ list: 'ordered' },{ list: 'bullet' },'align'],
          ['link']
        ]
      }
    }
  }

  _getSanitized() {
    let { value } = this.state
    return value.replace(/&nbsp;/g, ' ')
  }

  _handleChange() {
    const value = this._getSanitized()
    if(value === '<p><br></p>') return
    this.props.onChange(value)
  }

  _handleUpdate(value) {
    this.setState({ value })
  }

}

export default HtmlField
