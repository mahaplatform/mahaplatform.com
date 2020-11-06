import PropTypes from 'prop-types'
import { List } from '@admin'
import React from 'react'

const Details = ({ attraction }) => {
  const list = {}
  if(attraction.is_approved === null) {
    list.alert = { color: 'blue', message: 'This attraction is pending approval' }
  }
  if(attraction.is_approved === false) {
    list.alert = { color: 'red', message: 'This attraction has been rejected' }
  }
  list.items = [
    { label: 'Photo', content: attraction.photo },
    { label: 'Title', content: attraction.title },
    { label: 'Description', content: attraction.description },
    { label: 'Address 1', content: attraction.address_1 },
    { label: 'Address 2', content: attraction.address_2 },
    { label: 'City', content: attraction.city },
    { label: 'State', content: attraction.state },
    { label: 'Zip', content: attraction.zip },
    { label: 'County', content: attraction.county },
    { label: 'Hours of Operation', content: attraction.hours_of_operation },
    { label: 'Website', content: attraction.website },
    { label: 'Facebook', content: attraction.facebook },
    { label: 'Categories', content: attraction.categories, format: Categories },
    { label: 'Offerings', content: attraction.offerings, format: Offerings },
    { label: 'Photos', content: attraction.photos, format: Photos }
  ]
  if(attraction.contact_name) {
    list.items.unshift({ label: 'Contact', content: <div>
      { attraction.contact_name }<br />
      { attraction.contact_email }<br />
      { attraction.contact_phone }
    </div> })
  }
  return <List { ...list } />
}

Details.propTypes = {
  attraction: PropTypes.object
}

const Categories = ({ value }) => (
  <div className="catgeories">
    { value.map((category, index) => (
      <div key={`category_${index}`} className="category">
        { category.title }
      </div>
    )) }
  </div>
)

Categories.propTypes = {
  value: PropTypes.array
}

const Offerings = ({ value }) => (
  <div className="offerings">
    { value.map((offering, index) => (
      <div key={`offering_${index}`} className="offering">
        { offering.title }
      </div>
    )) }
  </div>
)

Offerings.propTypes = {
  value: PropTypes.array
}

const Photos = ({ value }) => (
  <div className="photos">
    { value.map((photo, index) => (
      <div key={`photo_${index}`} className="photo">
        { photo.path }
      </div>
    )) }
  </div>
)

Photos.propTypes = {
  value: PropTypes.array
}

export default Details
