import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Checkboxesfield from './checkboxesfield.js'

describe('src/apps/crm/admin/components/checkboxesfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/checkboxesfield.js', () => {

    it('renders', async () => {

      const checkboxesfield = shallow(<Checkboxesfield />)

      expect(checkboxesfield.is('div.checkboxesfield')).to.be.true

    })

  })


})
