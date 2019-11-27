import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Allocations from './allocations.js'

describe('src/apps/expenses/admin/components/allocations', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/allocations.js', () => {

    it('renders', async () => {

      const allocations = shallow(<Allocations />)

      expect(allocations.is('div.allocations')).to.be.true

    })

  })


})
