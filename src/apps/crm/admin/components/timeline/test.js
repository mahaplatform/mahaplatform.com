import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Activities from './activities.js'

describe('src/apps/crm/admin/components/activities', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/activities.js', () => {

    it('renders', async () => {

      const activities = shallow(<Activities />)

      expect(activities.is('div.activities')).to.be.true

    })

  })


})
