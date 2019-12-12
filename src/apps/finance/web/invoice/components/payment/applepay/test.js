import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Applepay from './applepay.js'

describe('src/apps/finance/web/invoice/components/applepay', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/applepay.js', () => {

    it('renders', async () => {

      const applepay = shallow(<Applepay />)

      expect(applepay.is('div.applepay')).to.be.true

    })

  })


})
