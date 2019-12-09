import React from 'react'

class Target extends React.Component {

  static propTypes = {}

  render() {
    return (
      <div className="dropzone-target">
        <table className="row">
          <tbody>
            <tr>
              <td className="large-12 first last columns">
                Drop Block Here
              </td>
              <td className="expander"></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

}

export default Target
