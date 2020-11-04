import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Rulesfield from './rulesfield.js'

describe('src/apps/forms/admin/components/rulesfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/rulesfield.js', () => {

    it('renders', async () => {

      const rulesfield = shallow(<Rulesfield />)

      expect(rulesfield.is('div.rulesfield')).to.be.true

    })

  })


})
