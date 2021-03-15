import Dependencies from '../../dependencies'
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

  quill = null

  _handleChange = _.throttle(this._handleChange.bind(this), 150)
  _handlePaste = this._handlePaste.bind(this)
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
    this.quill.getEditor().clipboard.addMatcher(Node.ELEMENT_NODE, this._handlePaste)
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getEditor() {
    const { defaultValue, headers } = this.props
    return {
      defaultValue,
      ref: node => this.quill= node,
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
    const sanitized = this._getSanitized()
    const value = sanitized === '<p><br></p>' ? '' : sanitized
    this.props.onChange(value)
  }

  _handlePaste (node, delta) {
    let ops = []
    delta.ops.forEach(op => {
      if (op.insert && typeof op.insert === 'string') {
        ops.push({
          insert: op.insert
        })
      }
    })
    delta.ops = ops
    return delta
  }

  _handleUpdate(value) {
    this.setState({ value })
  }

}

const dependencies = {
  styles: [
    { url: `${process.env.ASSET_CDN_HOST}/css/quill.snow.css` }
  ]
}

HtmlField = Dependencies(dependencies)(HtmlField)

export default HtmlField
