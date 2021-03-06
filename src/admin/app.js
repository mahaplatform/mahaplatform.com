import adminaccess from '../lib/admin/components/access'
import adminassignment from '../lib/admin/components/assignment'
import adminattachmentsDrive from '../lib/admin/components/attachments/drive'
import adminattachmentsFiles from '../lib/admin/components/attachments/files'
import adminattachments from '../lib/admin/components/attachments'
import adminattachmentsWeb from '../lib/admin/components/attachments/web'
import adminauthorized from '../lib/admin/components/authorized'
import admincarousel from '../lib/admin/components/carousel'
import adminchooser from '../lib/admin/components/chooser'
import admincollectionFilters from '../lib/admin/components/collection/filters'
import admincollection from '../lib/admin/components/collection'
import admincollectionTable from '../lib/admin/components/collection/table'
import admincomments from '../lib/admin/components/comments'
import admincontainer from '../lib/admin/components/container'
import admincriteriaBuilder from '../lib/admin/components/criteria_builder'
import admindesigner from '../lib/admin/components/designer'
import admindrawer from '../lib/admin/components/drawer'
import adminemojis from '../lib/admin/components/emojis'
import adminfields from '../lib/admin/components/fields'
import adminformAddressfield from '../lib/admin/components/form/addressfield'
import adminformAssignmentfield from '../lib/admin/components/form/assignmentfield'
import adminformAttachmentfield from '../lib/admin/components/form/attachmentfield'
import adminformColorfield from '../lib/admin/components/form/colorfield'
import adminformCriteriafield from '../lib/admin/components/form/criteriafield'
import adminformFilefield from '../lib/admin/components/form/filefield'
import adminformHtmlfield from '../lib/admin/components/form/htmlfield'
import adminformLinkfield from '../lib/admin/components/form/linkfield'
import adminformLookup from '../lib/admin/components/form/lookup'
import adminformLookup2 from '../lib/admin/components/form/lookup2'
import adminformPhonenumberfield from '../lib/admin/components/form/phonenumberfield'
import adminformProfilefield from '../lib/admin/components/form/profilefield'
import adminform from '../lib/admin/components/form'
import adminformSelectCheckboxes from '../lib/admin/components/form/select/checkboxes'
import adminformSelectRadioGroup from '../lib/admin/components/form/select/radio_group'
import adminformSelect from '../lib/admin/components/form/select'
import adminformTablefield from '../lib/admin/components/form/tablefield'
import adminformToggleList from '../lib/admin/components/form/toggle_list'
import adminformVideofield from '../lib/admin/components/form/videofield'
import adminimageEditor from '../lib/admin/components/image_editor'
import adminimportConfigure from '../lib/admin/components/import/configure'
import adminimportField from '../lib/admin/components/import/field'
import adminimportFinalizing from '../lib/admin/components/import/finalizing'
import adminimportIntro from '../lib/admin/components/import/intro'
import adminimportMapping from '../lib/admin/components/import/mapping'
import adminimportParsing from '../lib/admin/components/import/parsing'
import adminimportPreview from '../lib/admin/components/import/preview'
import adminimportProcessing from '../lib/admin/components/import/processing'
import adminimport from '../lib/admin/components/import'
import adminimportUpload from '../lib/admin/components/import/upload'
import adminimportValidatingFix from '../lib/admin/components/import/validating/fix'
import adminimportValidating from '../lib/admin/components/import/validating'
import adminimportValidatingReview from '../lib/admin/components/import/validating/review'
import admininfinite from '../lib/admin/components/infinite'
import adminmenu from '../lib/admin/components/menu'
import adminmultiform from '../lib/admin/components/multiform'
import adminpage from '../lib/admin/components/page'
import adminpicklist from '../lib/admin/components/picklist'
import adminpopup from '../lib/admin/components/popup'
import adminpreview from '../lib/admin/components/preview'
import adminprompt from '../lib/admin/components/prompt'
import adminsearch from '../lib/admin/components/search'
import adminsearch2 from '../lib/admin/components/search2'
import adminsearchbox from '../lib/admin/components/searchbox'
import adminsortableList from '../lib/admin/components/sortable_list'
import admintasks from '../lib/admin/components/tasks'
import adminuploader from '../lib/admin/components/uploader'
import automationflowchartDesigner from '../apps/automation/admin/components/flowchart_designer'
import automationfollowsfield from '../apps/automation/admin/components/followsfield'
import automationimagesfield from '../apps/automation/admin/components/imagesfield'
import automationsharesfield from '../apps/automation/admin/components/sharesfield'
import campaignsrecordingfield from '../apps/campaigns/admin/components/recordingfield'
import chatchannel from '../apps/chat/admin/components/channel'
import chatchannels from '../apps/chat/admin/components/channels'
import chatfullchat from '../apps/chat/admin/components/fullchat'
import chatsubscriptions from '../apps/chat/admin/components/subscriptions'
import chatchat from '../apps/chat/admin/roots/chat'
import crmaccess from '../apps/crm/admin/components/access'
import crmcheckboxesfield from '../apps/crm/admin/components/checkboxesfield'
import crmintro from '../apps/crm/admin/components/contactimport/intro'
import crmtimeline from '../apps/crm/admin/components/timeline'
import driveaccess from '../apps/drive/admin/components/access'
import driveexplorer from '../apps/drive/admin/components/explorer'
import drivemove from '../apps/drive/admin/components/move'
import drivechat from '../apps/drive/admin/components/share/chat'
import driveshare from '../apps/drive/admin/components/share'
import driveuploader from '../apps/drive/admin/components/uploader'
import driveversions from '../apps/drive/admin/components/versions'
import financeallocations from '../apps/finance/admin/components/allocations'
import financecardfield from '../apps/finance/admin/components/cardfield'
import financelineItems from '../apps/finance/admin/components/line_items'
import financeroutingnumberfield from '../apps/finance/admin/components/routingnumberfield'
import financetripsImportFinalize from '../apps/finance/admin/components/trips_import_finalize'
import formsformDesigner from '../apps/forms/admin/components/form_designer'
import formsproductfield from '../apps/forms/admin/components/productfield'
import formsrulesfield from '../apps/forms/admin/components/rulesfield'
import mahaprofiles from '../apps/maha/admin/components/account/account/profiles'
import mahanotificationTypes from '../apps/maha/admin/components/account/notifications/notification_types'
import mahaappitems from '../apps/maha/admin/components/account/security/appitems'
import mahaactivate from '../apps/maha/admin/components/activate'
import mahaadmin from '../apps/maha/admin/components/admin'
import mahabrowser from '../apps/maha/admin/components/device/browser'
import mahacordova from '../apps/maha/admin/components/device/cordova'
import mahaelectron from '../apps/maha/admin/components/device/electron'
import mahadevice from '../apps/maha/admin/components/device'
import mahaarticles from '../apps/maha/admin/components/help/articles'
import mahanavigation from '../apps/maha/admin/components/navigation'
import mahanetwork from '../apps/maha/admin/components/network'
import mahanotifications from '../apps/maha/admin/components/notifications'
import mahaomnisearch from '../apps/maha/admin/components/omnisearch'
import mahabadge from '../apps/maha/admin/components/portal/badge'
import mahaportal from '../apps/maha/admin/components/portal'
import mahapresence from '../apps/maha/admin/components/presence'
import mahapush from '../apps/maha/admin/components/push'
import mahareset from '../apps/maha/admin/components/reset'
import maharouter from '../apps/maha/admin/components/router'
import mahasignin from '../apps/maha/admin/components/signin'
import mahareactions from '../apps/maha/admin/roots/reactions'
import mahastars from '../apps/maha/admin/roots/stars'
import newsnew from '../apps/news/admin/components/new'
import newsnews from '../apps/news/admin/roots/news'
import platformapps from '../apps/platform/admin/components/apps'
import sitessitesImportFinalize from '../apps/sites/admin/components/sites_import_finalize'
import storesmediafield from '../apps/stores/admin/components/mediafield'
import teamaccess from '../apps/team/admin/components/access'
import teamroles from '../apps/team/admin/components/roles'
import analyticsRoutes from '../apps/analytics/admin/views/index.js'
import automationRoutes from '../apps/automation/admin/views/index.js'
import campaignsRoutes from '../apps/campaigns/admin/views/index.js'
import chatRoutes from '../apps/chat/admin/views/index.js'
import crmRoutes from '../apps/crm/admin/views/index.js'
import datasetsRoutes from '../apps/datasets/admin/views/index.js'
import driveRoutes from '../apps/drive/admin/views/index.js'
import eventsRoutes from '../apps/events/admin/views/index.js'
import financeRoutes from '../apps/finance/admin/views/index.js'
import formsRoutes from '../apps/forms/admin/views/index.js'
import mahaRoutes from '../apps/maha/admin/views/index.js'
import newsRoutes from '../apps/news/admin/views/index.js'
import phoneRoutes from '../apps/phone/admin/views/index.js'
import platformRoutes from '../apps/platform/admin/views/index.js'
import sitesRoutes from '../apps/sites/admin/views/index.js'
import storesRoutes from '../apps/stores/admin/views/index.js'
import surveysRoutes from '../apps/surveys/admin/views/index.js'
import teamRoutes from '../apps/team/admin/views/index.js'
import websitesRoutes from '../apps/websites/admin/views/index.js'
import chatBadges from '../apps/chat/admin/badges/index.js'
import mahaBadges from '../apps/maha/admin/badges/index.js'
import phoneBadges from '../apps/phone/admin/badges/index.js'
import chatRoots from '../apps/chat/admin/roots/index.js'
import mahaRoots from '../apps/maha/admin/roots/index.js'
import newsRoots from '../apps/news/admin/roots/index.js'
import phoneRoots from '../apps/phone/admin/roots/index.js'
import financeUserTasks from '../apps/finance/admin/user_tasks.js'
import financeUserFields from '../apps/finance/admin/user_fields.js'
import financeUserValues from '../apps/finance/admin/user_values.js'
import automationActivityCards from '../apps/automation/admin/activities/index.js'
import campaignsActivityCards from '../apps/campaigns/admin/activities/index.js'
import crmActivityCards from '../apps/crm/admin/activities/index.js'
import eventsActivityCards from '../apps/events/admin/activities/index.js'
import formsActivityCards from '../apps/forms/admin/activities/index.js'
import phoneActivityCards from '../apps/phone/admin/activities/index.js'
import campaignsAdminDashboardEmailsIndexJs from '../apps/campaigns/admin/dashboard/emails/index.js'
import eventsAdminDashboardEventDetailIndexJs from '../apps/events/admin/dashboard/event_detail/index.js'
import financeAdminDashboardAdminOverviewIndexJs from '../apps/finance/admin/dashboard/admin_overview/index.js'
import financeAdminDashboardExpenseApprovalsIndexJs from '../apps/finance/admin/dashboard/expense_approvals/index.js'
import financeAdminDashboardNewItemIndexJs from '../apps/finance/admin/dashboard/new_item/index.js'
import formsAdminDashboardFormIndexJs from '../apps/forms/admin/dashboard/form/index.js'
import mahaAdminDashboardGreetingIndexJs from '../apps/maha/admin/dashboard/greeting/index.js'
import financeSettings from '../apps/finance/admin/settings.js'
import Platform from '../apps/maha/admin/components/platform'
import Forbidden from '../apps/maha/admin/views/forbidden'
import NotFound from '../apps/maha/admin/views/not_found'
import Root from '../apps/maha/admin/components/root'
import { hot } from 'react-hot-loader'
import PropTypes from 'prop-types'
import React from 'react'

class App extends React.Component {

  static childContextTypes = {
    configuration: PropTypes.object
  }

  static propTypes = {}

  render() {
    return (
      <Root reducers={ this._getReducers() }>
        <Platform { ...this._getPlatform() } />
      </Root>
    )
  }

  getChildContext() {
    return {
      configuration: {
        activityCards: this._getActivityCards(),
        appUserTasks: this._getAppUserTasks(),
        appUserFields: this._getAppUserFields(),
        appUserValues: this._getAppUserValues(),
        dashboardCards: this._getDashboardCards(),
        usage: this._getUsage(),
        settings: this._getSettings()
      }
    }
  }

  _getActivityCards() {
    return {
      ...automationActivityCards,
      ...campaignsActivityCards,
      ...crmActivityCards,
      ...eventsActivityCards,
      ...formsActivityCards,
      ...phoneActivityCards,
    }
  }

  _getAppUserFields() {
    return [
      financeUserFields,
    ]
  }

  _getAppUserTasks() {
    return [
      financeUserTasks,
    ]
  }

  _getAppUserValues() {
    return [
      financeUserValues,
    ]
  }

  _getBadges() {
    return [
      ...chatBadges.map(badge => ({
        app: 'chat',
        ...badge
      })),
      ...mahaBadges.map(badge => ({
        app: 'maha',
        ...badge
      })),
      ...phoneBadges.map(badge => ({
        app: 'phone',
        ...badge
      })),
    ]
  }

  _getDashboardCards() {
    return [
      {
        ...campaignsAdminDashboardEmailsIndexJs,
        app: 'campaigns',
        type: campaignsAdminDashboardEmailsIndexJs.code,
        code: 'campaigns:'+campaignsAdminDashboardEmailsIndexJs.code
      },
      {
        ...eventsAdminDashboardEventDetailIndexJs,
        app: 'events',
        type: eventsAdminDashboardEventDetailIndexJs.code,
        code: 'events:'+eventsAdminDashboardEventDetailIndexJs.code
      },
      {
        ...financeAdminDashboardAdminOverviewIndexJs,
        app: 'finance',
        type: financeAdminDashboardAdminOverviewIndexJs.code,
        code: 'finance:'+financeAdminDashboardAdminOverviewIndexJs.code
      },
      {
        ...financeAdminDashboardExpenseApprovalsIndexJs,
        app: 'finance',
        type: financeAdminDashboardExpenseApprovalsIndexJs.code,
        code: 'finance:'+financeAdminDashboardExpenseApprovalsIndexJs.code
      },
      {
        ...financeAdminDashboardNewItemIndexJs,
        app: 'finance',
        type: financeAdminDashboardNewItemIndexJs.code,
        code: 'finance:'+financeAdminDashboardNewItemIndexJs.code
      },
      {
        ...formsAdminDashboardFormIndexJs,
        app: 'forms',
        type: formsAdminDashboardFormIndexJs.code,
        code: 'forms:'+formsAdminDashboardFormIndexJs.code
      },
      {
        ...mahaAdminDashboardGreetingIndexJs,
        app: 'maha',
        type: mahaAdminDashboardGreetingIndexJs.code,
        code: 'maha:'+mahaAdminDashboardGreetingIndexJs.code
      },
    ]
  }

  _getPlatform() {
    return {
      badges: this._getBadges(),
      roots: this._getRoots(),
      routes: this._getRoutes()
    }
  }

  _getReducers() {
    return [
      adminaccess,
      adminassignment,
      adminattachmentsDrive,
      adminattachmentsFiles,
      adminattachments,
      adminattachmentsWeb,
      adminauthorized,
      admincarousel,
      adminchooser,
      admincollectionFilters,
      admincollection,
      admincollectionTable,
      admincomments,
      admincontainer,
      admincriteriaBuilder,
      admindesigner,
      admindrawer,
      adminemojis,
      adminfields,
      adminformAddressfield,
      adminformAssignmentfield,
      adminformAttachmentfield,
      adminformColorfield,
      adminformCriteriafield,
      adminformFilefield,
      adminformHtmlfield,
      adminformLinkfield,
      adminformLookup,
      adminformLookup2,
      adminformPhonenumberfield,
      adminformProfilefield,
      adminform,
      adminformSelectCheckboxes,
      adminformSelectRadioGroup,
      adminformSelect,
      adminformTablefield,
      adminformToggleList,
      adminformVideofield,
      adminimageEditor,
      adminimportConfigure,
      adminimportField,
      adminimportFinalizing,
      adminimportIntro,
      adminimportMapping,
      adminimportParsing,
      adminimportPreview,
      adminimportProcessing,
      adminimport,
      adminimportUpload,
      adminimportValidatingFix,
      adminimportValidating,
      adminimportValidatingReview,
      admininfinite,
      adminmenu,
      adminmultiform,
      adminpage,
      adminpicklist,
      adminpopup,
      adminpreview,
      adminprompt,
      adminsearch,
      adminsearch2,
      adminsearchbox,
      adminsortableList,
      admintasks,
      adminuploader,
      automationflowchartDesigner,
      automationfollowsfield,
      automationimagesfield,
      automationsharesfield,
      campaignsrecordingfield,
      chatchannel,
      chatchannels,
      chatfullchat,
      chatsubscriptions,
      chatchat,
      crmaccess,
      crmcheckboxesfield,
      crmintro,
      crmtimeline,
      driveaccess,
      driveexplorer,
      drivemove,
      drivechat,
      driveshare,
      driveuploader,
      driveversions,
      financeallocations,
      financecardfield,
      financelineItems,
      financeroutingnumberfield,
      financetripsImportFinalize,
      formsformDesigner,
      formsproductfield,
      formsrulesfield,
      mahaprofiles,
      mahanotificationTypes,
      mahaappitems,
      mahaactivate,
      mahaadmin,
      mahabrowser,
      mahacordova,
      mahaelectron,
      mahadevice,
      mahaarticles,
      mahanavigation,
      mahanetwork,
      mahanotifications,
      mahaomnisearch,
      mahabadge,
      mahaportal,
      mahapresence,
      mahapush,
      mahareset,
      maharouter,
      mahasignin,
      mahareactions,
      mahastars,
      newsnew,
      newsnews,
      platformapps,
      sitessitesImportFinalize,
      storesmediafield,
      teamaccess,
      teamroles,
    ]
  }

  _getRoots() {
    return [
      ...chatRoots.map(root => ({
        app: 'chat',
        component: root
      })),
      ...mahaRoots.map(root => ({
        app: 'maha',
        component: root
      })),
      ...newsRoots.map(root => ({
        app: 'news',
        component: root
      })),
      ...phoneRoots.map(root => ({
        app: 'phone',
        component: root
      })),
    ]
  }

  _getRoutes() {
    return [
      { path: '/:team/analytics', children: analyticsRoutes },
      { path: '/:team/automation', children: automationRoutes },
      { path: '/:team/campaigns', children: campaignsRoutes },
      { path: '/:team/chat', children: chatRoutes },
      { path: '/:team/crm', children: crmRoutes },
      { path: '/:team/datasets', children: datasetsRoutes },
      { path: '/:team/drive', children: driveRoutes },
      { path: '/:team/events', children: eventsRoutes },
      { path: '/:team/finance', children: financeRoutes },
      { path: '/:team/expenses', children: financeRoutes },
      { path: '/:team/forms', children: formsRoutes },
      { path: '/:team', children: mahaRoutes },
      { path: '/:team/news', children: newsRoutes },
      { path: '/:team/phone', children: phoneRoutes },
      { path: '/:team/platform', children: platformRoutes },
      { path: '/:team/sites', children: sitesRoutes },
      { path: '/:team/stores', children: storesRoutes },
      { path: '/:team/surveys', children: surveysRoutes },
      { path: '/:team/team', children: teamRoutes },
      { path: '/:team/websites', children: websitesRoutes },
      { path: '/forbidden', component: Forbidden },
      { path: '/*', component: NotFound }
    ]
  }

  _getSettings() {
    return {
      finance: financeSettings,
    }
  }

  _getUsage() {
    return {
    }
  }

}

export default hot(module)(App)
