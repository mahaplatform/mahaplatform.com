import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Amountfield from './amountfield.js'

describe('src/apps/finance/admin/components/amountfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/amountfield.js', () => {

    it('renders', async () => {

      const amountfield = shallow(<Amountfield />)

      expect(amountfield.is('div.amountfield')).to.be.true

    })

  })


})
