import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import File from './file.js'

describe('src/apps/crm/admin/components/contactimport/sources/file', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/file.js', () => {

    it('renders', async () => {

      const file = shallow(<File />)

      expect(file.is('div.file')).to.be.true

    })

  })


})
