import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Campaign from './campaign.js'

describe('src/apps/crm/admin/components/campaign', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/campaign.js', () => {

    it('renders', async () => {

      const campaign = shallow(<Campaign />)

      expect(campaign.is('div.campaign')).to.be.true

    })

  })


})
