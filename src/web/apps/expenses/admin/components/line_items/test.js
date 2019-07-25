import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import LineItems from './line_items.js'

describe('src/web/apps/expenses/admin/components/line_items', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/line-items.js', () => {

    it('renders', async () => {

      const line-items = shallow(<LineItems />)

      expect(line-items.is('div.line-items')).to.be.true

    })

  })


})
