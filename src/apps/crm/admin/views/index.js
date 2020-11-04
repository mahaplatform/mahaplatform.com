import ContactsChannelsShow from './contacts/channels'
import ContactsList from './contacts/list'
import ContactsShow from './contacts/show'
import ContactsCallsShow from './contacts/calls/show'
import FormsList from './forms/list'
import FormsShow from './forms/show'
import FormsDesign from './forms/design'
import PhoneShow from './phone'
import ProgramsChannels from './programs/channels'
import ProgramsList from './programs/list'
import ProgramsShow from './programs/show'
import ProgramsListsShow from './programs/show/lists/show'
import ProgramsTopicsShow from './programs/show/topics/show'
import ResponsesList from './forms/responses/list'
import ResponsesShow from './forms/responses/show'
import ResponseUploadShow from './forms/responses/upload'
import TemplatesShow from './programs/show/templates/show'
import TemplatesDesign from './programs/show/templates/design'

const routes = [
  { path: '/contacts', component: ContactsList },
  { path: '/contacts/:id', component: ContactsShow },
  { path: '/contacts/:contact_id/calls/:id', component: ContactsCallsShow },
  { path: '/contacts/:contact_id/channels/programs/:program_id', component: ContactsChannelsShow },
  { path: '/contacts/:contact_id/channels/programs/:program_id/:type/:channel_id', component: ContactsChannelsShow },
  { path: '/forms', component: FormsList },
  { path: '/forms/:id', component: FormsShow },
  { path: '/forms/:id/design', component: FormsDesign },
  { path: '/forms/:form_id/responses', component: ResponsesList },
  { path: '/forms/:form_id/responses/:id', component: ResponsesShow },
  { path: '/forms/:form_id/responses/:response_id/uploads/:id', component: ResponseUploadShow },
  { path: '/phone', component: PhoneShow },
  { path: '/programs', component: ProgramsList },
  { path: '/programs/:id', component: ProgramsShow },
  { path: '/programs/:program_id/lists/:id', component: ProgramsListsShow },
  { path: '/programs/:program_id/topics/:id', component: ProgramsTopicsShow },
  { path: '/programs/:program_id/templates/:id', component: TemplatesShow },
  { path: '/programs/:program_id/templates/:id/design', component: TemplatesDesign },
  { path: '/programs/:program_id/channels', component: ProgramsChannels },
  { path: '/programs/:program_id/channels/:type/:channel_id', component: ProgramsChannels }

]

export default routes
