import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Contactimport from './contactimport.js'

describe('src/web/apps/crm/admin/components/contactimport', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/contactimport.js', () => {

    it('renders', async () => {

      const contactimport = shallow(<Contactimport />)

      expect(contactimport.is('div.contactimport')).to.be.true

    })

  })


})
