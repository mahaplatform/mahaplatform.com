import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Invoice from './invoice.js'

describe('src/apps/finance/web/invoice/components/invoice', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/invoice.js', () => {

    it('renders', async () => {

      const invoice = shallow(<Invoice />)

      expect(invoice.is('div.invoice')).to.be.true

    })

  })


})
