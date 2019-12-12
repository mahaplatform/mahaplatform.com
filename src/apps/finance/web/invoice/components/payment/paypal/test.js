import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Paypal from './paypal.js'

describe('src/apps/finance/web/invoice/components/paypal', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/paypal.js', () => {

    it('renders', async () => {

      const paypal = shallow(<Paypal />)

      expect(paypal.is('div.paypal')).to.be.true

    })

  })


})
