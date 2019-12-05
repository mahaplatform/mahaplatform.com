import OfferingToken from '../../tokens/offering'
import CategoryToken from '../../tokens/category'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class New extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    return {
      title: 'New Attraction',
      method: 'post',
      action: '/api/admin/eatfresh/attractions',
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess,
      sections: [
        {
          fields: [
            { label: 'Title', name: 'title', type: 'textfield', required: true },
            { label: 'Categories', name: 'category_ids', type: 'lookup2', required: true, multiple: true, endpoint: '/api/admin/eatfresh/categories', value: 'id', text: 'title', format: CategoryToken },
            { label: 'Offerings', name: 'offering_ids', type: 'lookup2', required: true, multiple: true, endpoint: '/api/admin/eatfresh/offerings', value: 'id', text: 'title', format: OfferingToken },
            { label: 'Photo', name: 'photo_id', type: 'filefield', required: true, prompt: 'Choose Photo', multiple: false },
            { label: 'Address 1', name: 'address_1', type: 'textfield', required: true },
            { label: 'Address 2', name: 'address_2', type: 'textfield' },
            { label: 'City', name: 'city', type: 'textfield', required: true },
            { label: 'State', name: 'state', type: 'textfield', required: true },
            { label: 'Zip', name: 'zip', type: 'textfield', required: true },
            { label: 'County', name: 'county_id', type: 'lookup', required: true, endpoint: '/api/admin/eatfresh/counties', value: 'id', text: 'name' },
            { label: 'Phone', name: 'phone', type: 'textfield', required: true },
            { label: 'Hours of Operation', name: 'hours_of_operation', type: 'textfield', required: true },
            { label: 'Website', name: 'website', type: 'textfield' },
            { label: 'Facebook', name: 'facebook', type: 'textfield' },
            { label: 'Cage Free / Pasture Raised', name: 'is_free_range', type: 'checkbox' },
            { label: 'Family Friendly', name: 'is_family_friendly', type: 'checkbox' },
            { label: 'Family Owned', name: 'is_family_owned', type: 'checkbox' },
            { label: 'Handicap Accessible', name: 'is_accessible', type: 'checkbox' },
            { label: 'Military Discount', name: 'is_military', type: 'checkbox' },
            { label: 'Organic / USDA Organic', name: 'is_organic', type: 'checkbox' },
            { label: 'Senior Discount', name: 'is_senior', type: 'checkbox' },
            { label: 'Vegetarian / Vegan', name: 'is_vegetarian', type: 'checkbox' },
            { label: 'Photos', name: 'photo_ids', type: 'filefield', multiple: true, prompt: 'Upload Photo', endpoint: '/api/admin/eatfresh/photos' }
          ]
        }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSuccess(result) {
    this.context.router.history.push(`/admin/eatfresh/attractions/${result.id}`)
    this.context.modal.close()
  }

}

export default New
