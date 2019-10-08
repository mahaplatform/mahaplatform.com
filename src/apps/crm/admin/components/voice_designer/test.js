import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import VoiceDesigner from './voice_designer.js'

describe('src/apps/crm/admin/components/voice_designer', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/voice-designer.js', () => {

    it('renders', async () => {

      const voice-designer = shallow(<VoiceDesigner />)

      expect(voice-designer.is('div.voice-designer')).to.be.true

    })

  })


})
