import Image from '../../image'
import PropTypes from 'prop-types'
import React from 'react'

class Text extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    image: PropTypes.string,
    status: PropTypes.string,
    text: PropTypes.string,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    const { image, text } = this.props
    return (
      <div className="maha-text">
        { image &&
          <Image src={ image } transforms={{ width: 770 }} />
        }
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

}

export default Text
