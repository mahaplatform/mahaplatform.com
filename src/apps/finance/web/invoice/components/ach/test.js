import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Ach from './ach.js'

describe('src/apps/finance/web/invoice/components/ach', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/ach.js', () => {

    it('renders', async () => {

      const ach = shallow(<Ach />)

      expect(ach.is('div.ach')).to.be.true

    })

  })


})
