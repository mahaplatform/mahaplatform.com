import ManagerToken from '../../tokens/manager_token'
import { Fields, List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import NewType from '../types/new'
import Users from './users'
import React from 'react'
import Edit from './edit'

const Details = ({ title, origins }) => {

  const list = {
    sections: [
      {
        items: [
          { label: 'Title', content: title },
          { label: 'Origins', content: <span>{ origins.split('\n').map((origin, index) => (
            <span key={`origin_${index}`}>{ origin }<br /></span>
          )) }</span> }
        ]
      }
    ]
  }

  return <List { ...list } />

}

const Managers = ({ site_id, managers }) => {

  const list = {
    items: managers.map((manager, index) => ({
      component: (props) => <ManagerToken manager={ manager } />
    })),
    buttons: [
      { label: 'Manage Users', color: 'blue', modal: <Users site_id={ site_id } /> }
    ]
  }

  return (
    <div>
      <p>Managers are users with administrative access to your site</p>
      <List { ...list } />
    </div>
  )

}

const Profiles = (fields, context) => (
  <div>
    <p>
      Below are the fields you want to track for members of your site
    </p>
    <Fields { ...fields } />
  </div>
)

const Emails = ({ site_id, emails }, context) => {

  const list = {
    items: emails.map((email, index) => ({
      link: `/admin/sites/sites/${site_id}/emails/${email.id}`,
      component: (props) => (
        <div className="token">
          <strong>{ email.code }</strong><br />
          { email.subject }
        </div>
      )
    }))
  }

  return (
    <div>
      <p>
        Emails are automated communications that the system send on your behalf
      </p>
      <List { ...list } />
    </div>
  )

}

Emails.contextTypes = {
  modal: PropTypes.object
}

const Types = ({ site_id, types }, context) => {

  const list = {
    items: types.length > 0 ? types.map((type, index) => ({
      link: `/admin/sites/sites/${site_id}/types/${type.id}`,
      component: (props) => (
        <div className="token">
          <strong>{ type.title }</strong><br />
          { type.description }
        </div>
      )
    })) : {
      component: <div>You have not yet created any types</div>
    },
    buttons: [
      { label: 'Add Type', color: 'blue', modal: <NewType site_id={ site_id } /> }
    ]
  }

  return (
    <div>
      <p>
        Content Types are the schema of the content that you want to expose
        on your site.
      </p>
      <List { ...list } />
    </div>
  )

}

Types.contextTypes = {
  modal: PropTypes.object
}

const mapResourcesToPage = (props, context, page) => ({
  emails: `/api/admin/sites/sites/${page.params.id}/emails`,
  managers: `/api/admin/sites/sites/${page.params.id}/managers`,
  site: `/api/admin/sites/sites/${page.params.id}`,
  types: `/api/admin/sites/sites/${page.params.id}/types`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Site',
  rights: [],
  tabs: {
    items: [
      { label: 'Details', component: <Details { ...resources.site } /> },
      { label: 'Managers', component: <Managers site_id={ page.params.id } managers={ resources.managers } /> },
      { label: 'Profiles', component: <Profiles parent_type="sites_sites" parent_id={ page.params.id } /> },
      { label: 'Emails', component: <Emails site_id={ page.params.id } emails={ resources.emails } /> },
      { label: 'Types', component: <Types site_id={ page.params.id } types={ resources.types } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit Site',
        rights: [],
        modal: () => <Edit site_id={ page.params.id } />
      }, {
        label: 'Manage Users',
        rights: [],
        modal: () => <Users site_id={ page.params.id } />
      }, {
        label: 'Add Type',
        rights: [],
        modal: () => <NewType site_id={ page.params.id } />
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
