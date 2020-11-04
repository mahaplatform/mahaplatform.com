import FormsList from './forms/list'
import FormsShow from './forms/show'
import FormsDesign from './forms/design'
import ResponsesList from './forms/responses/list'
import ResponsesShow from './forms/responses/show'
import ResponseUploadShow from './forms/responses/upload'

const routes = [
  { path: '/', component: FormsList },
  { path: '/forms/:id', component: FormsShow },
  { path: '/forms/:id/design', component: FormsDesign },
  { path: '/forms/:form_id/responses', component: ResponsesList },
  { path: '/forms/:form_id/responses/:id', component: ResponsesShow },
  { path: '/forms/:form_id/responses/:response_id/uploads/:id', component: ResponseUploadShow }

]

export default routes
