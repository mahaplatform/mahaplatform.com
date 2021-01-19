import Edit from '../categories/edit'
import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'

class Categories extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    categories: PropTypes.array,
    store: PropTypes.object
  }

  render() {
    const { categories } = this.props
    return (
      <div className="maha-table">
        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td />
            </tr>
          </thead>
          <tbody>
            { categories.map((category, index) => (
              <tr key={`category_${index}`}>
                <td>
                  { category.title }
                </td>
                <td className="action">
                  <Button { ...this._getEdit(category) } />
                </td>
              </tr>
            )) }
            { categories.length === 0 &&
              <tr>
                <td colSpan="2" className="center">
                  This store doesnt yet have any categories
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }

  _getEdit(category) {
    const { store } = this.props
    return {
      icon: 'ellipsis-v',
      className: '',
      tasks: [
        { label: 'Edit Category', modal: <Edit store={ store } category={ category } /> },
        {
          label: 'Delete Category',
          confirm: 'Are you sure you want to delete this category?',
          request: {
            endpoint: `/api/admin/stores/stores/${store.id}/categories/${category.id}`,
            method: 'delete',
            onFailure: () => {
              this.context.flash.set('error', 'The category was unable to be deleted')
            },
            onSuccess: () => {
              this.context.flash.set('success', 'The category was successfully deleted')
            }
          }
        },
      ]
    }
  }

}

export default Categories
