import React from 'react'

class Selectable extends React.Component {

  render() {
    return (
      <div className="maha-selectable">
        { this.props.children }
      </div>
    )
  }
}

export default Selectable
