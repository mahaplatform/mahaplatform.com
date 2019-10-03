import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Uploader from './uploader.js'

describe('./src/apps/drive/admin/components/uploader', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/uploader.js', () => {

    it('renders', async () => {

      const uploader = shallow(<Uploader />)

      expect(uploader.is('div.uploader')).to.be.true

    })

  })


})
