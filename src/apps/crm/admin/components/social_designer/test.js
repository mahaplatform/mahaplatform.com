import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import SocialDesigner from './social_designer.js'

describe('src/apps/crm/admin/components/social_designer', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/social-designer.js', () => {

    it('renders', async () => {

      const social-designer = shallow(<SocialDesigner />)

      expect(social-designer.is('div.social-designer')).to.be.true

    })

  })


})
