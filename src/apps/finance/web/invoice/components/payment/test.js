import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Payment from './payment.js'

describe('src/apps/finance/web/invoice/components/payment', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/payment.js', () => {

    it('renders', async () => {

      const payment = shallow(<Payment />)

      expect(payment.is('div.payment')).to.be.true

    })

  })


})
