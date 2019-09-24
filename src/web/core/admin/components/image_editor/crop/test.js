import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Crop from './crop.js'

describe('src/web/core/admin/components/image_editor/crop', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/crop.js', () => {

    it('renders', async () => {

      const crop = shallow(<Crop />)

      expect(crop.is('div.crop')).to.be.true

    })

  })


})
