import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Imagesfield from './imagesfield.js'

describe('src/apps/crm/admin/components/designer/imagesfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/imagesfield.js', () => {

    it('renders', async () => {

      const imagesfield = shallow(<Imagesfield />)

      expect(imagesfield.is('div.imagesfield')).to.be.true

    })

  })


})
