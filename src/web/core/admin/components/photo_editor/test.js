import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import PhotoEditor from './photo_editor.js'

describe('src/web/core/admin/components/photo_editor', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/photo-editor.js', () => {

    it('renders', async () => {

      const photo-editor = shallow(<PhotoEditor />)

      expect(photo-editor.is('div.photo-editor')).to.be.true

    })

  })


})
