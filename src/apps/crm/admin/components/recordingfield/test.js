import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Recordingfield from './recordingfield.js'

describe('src/apps/crm/admin/components/recordingfield', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/recordingfield.js', () => {

    it('renders', async () => {

      const recordingfield = shallow(<Recordingfield />)

      expect(recordingfield.is('div.recordingfield')).to.be.true

    })

  })


})
