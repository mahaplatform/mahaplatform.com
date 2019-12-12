import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Card from './card.js'

describe('src/apps/finance/web/invoice/components/card', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/card.js', () => {

    it('renders', async () => {

      const card = shallow(<Card />)

      expect(card.is('div.card')).to.be.true

    })

  })


})
