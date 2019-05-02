import AttractionToken from '../../components/attraction_token'
import CategoryToken from '../../components/category_token'
import OfferingToken from '../../components/offering_token'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'
import New from './new'

const features = [
  { label: 'Cage Free / Pasture Raised', name: 'is_free_range', color: 'pink', abbreviation: 'Cf' },
  { label: 'Family Friendly', name: 'is_family_friendly', color: 'purple', abbreviation: 'Ff' },
  { label: 'Family Owned', name: 'is_family_owned', color: 'orange', abbreviation: 'Fo' },
  { label: 'Handicap Accessible', name: 'is_accessible', color: 'blue', abbreviation: 'Ha' },
  { label: 'Military Discount', name: 'is_military', color: 'olive', abbreviation: 'Ml' },
  { label: 'Organic / USDA Organic', name: 'is_organic', color: 'black', abbreviation: 'Og' },
  { label: 'Senior Discount', name: 'is_senior', color: 'red', abbreviation: 'Sr' },
  { label: 'Vegetarian / Vegan', name: 'is_vegetarian', color: 'green', abbreviation: 'Vg' }
]

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Attractions',
  collection: {
    endpoint: '/api/admin/eatfresh/attractions',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true, format: AttractionToken },
      { label: 'County', key: 'county', sort: 'eatfresh_counties.name', visible: false },
      { label: 'Approved', key: 'is_approved', visible: true, format: 'check_times' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'attraction',
    icon: 'cutlery',
    filters: [
      { label: 'Approved', name: 'is_approved', type: 'select', multiple: true, options: [ { value: true, text: 'Approved' }, { value: false, text: 'Rejected' }, { value: 'null', text: 'Pending' } ], defaultValue: [true,'null'] },
      { label: 'Category', type: 'select', name: 'category_id', endpoint: '/api/admin/eatfresh/categories', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' }, format: CategoryToken },
      { label: 'County', type: 'select', name: 'county_id', endpoint: '/api/admin/eatfresh/counties', value: 'id', text: 'name', sort: { key: 'name', order: 'asc' }, multiple: true  },
      { label: 'Offering', type: 'select', name: 'offering_id', endpoint: '/api/admin/eatfresh/offerings', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' }, format: OfferingToken, multiple: true },
      ...features.map(feature => ({ label: feature.label, type: 'toggle', name: feature.name, format: () => <FormatToken feature={ feature } /> }))
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' },
      { label: 'Description', key: 'description' },
      { label: 'Address 1', key: 'address_1' },
      { label: 'Address 2', key: 'address_2' },
      { label: 'City', key: 'city' },
      { label: 'State', key: 'state' },
      { label: 'Zip', key: 'zip' },
      { label: 'County', key: 'county' },
      { label: 'Hours of Operation', key: 'hours_of_operation' },
      { label: 'Website', key: 'website' },
      { label: 'Facebook', key: 'facebook' }
    ],
    link: (record) => `/admin/eatfresh/attractions/${record.id}`
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

const FormatToken = ({ feature }) => (
  <div className="feature-token">
    <div className={`feature-token-badge ${feature.color}`}>
      { feature.abbreviation }
    </div>
    { feature.label }
  </div>
)

FormatToken.propTypes = {
  feature: PropTypes.object
}

export default Page(null, mapPropsToPage)
