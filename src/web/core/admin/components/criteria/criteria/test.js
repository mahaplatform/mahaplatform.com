import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Criteria from './criteria.js'

describe('src/web/apps/crm/admin/components/criteria', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/criteria.js', () => {

    it('renders', async () => {

      const criteria = shallow(<Criteria />)

      expect(criteria.is('div.criteria')).to.be.true

    })

  })


})
