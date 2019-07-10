import adminassignment from './components/assignment'
import adminattachmentManager from './components/attachment_manager'
import adminattachmentsDrive from './components/attachments/drive'
import adminattachmentsFiles from './components/attachments/files'
import adminattachments from './components/attachments'
import adminattachmentsUrl from './components/attachments/url'
import adminauthorized from './components/authorized'
import adminbutton from './components/button'
import admincarousel from './components/carousel'
import adminchooser from './components/chooser'
import admincollection from './components/collection'
import admincomments from './components/comments'
import admincomposer from './components/composer'
import admindrawer from './components/drawer'
import adminemojis from './components/emojis'
import adminfields from './components/fields'
import adminfilters from './components/filters'
import adminflash from './components/flash'
import adminformAssignmentfield from './components/form/assignmentfield'
import adminformAttachmentfield from './components/form/attachmentfield'
import adminformColorfield from './components/form/colorfield'
import adminformDatefield from './components/form/datefield'
import adminformFilefield from './components/form/filefield'
import adminformLookup from './components/form/lookup'
import adminformLookup2 from './components/form/lookup2'
import adminform from './components/form'
import adminformSelectCheckboxGroup from './components/form/select/checkbox_group'
import adminformSelectRadioGroup from './components/form/select/radio_group'
import adminformSelect from './components/form/select'
import adminformTablefield from './components/form/tablefield'
import adminformToggleList from './components/form/toggle_list'
import adminformVideofield from './components/form/videofield'
import adminimportComplete from './components/import/complete'
import adminimportConfigure from './components/import/configure'
import adminimportField from './components/import/field'
import adminimportFinalizing from './components/import/finalizing'
import adminimportFix from './components/import/fix'
import adminimportIntro from './components/import/intro'
import adminimportMapping from './components/import/mapping'
import adminimportParsing from './components/import/parsing'
import adminimportPreview from './components/import/preview'
import adminimportProcessing from './components/import/processing'
import adminimport from './components/import'
import adminimportReview from './components/import/review'
import adminimportUpload from './components/import/upload'
import adminimportValidating from './components/import/validating'
import admininfinite from './components/infinite'
import adminmodal from './components/modal'
import adminpage from './components/page'
import adminpopup from './components/popup'
import adminprompt from './components/prompt'
import adminsearch from './components/search'
import adminsearch2 from './components/search2'
import adminsearchbox from './components/searchbox'
import adminsortableList from './components/sortable_list'
import admintabs from './components/tabs'
import admintasks from './components/tasks'
import admintray from './components/tray'
import adminuploader from './components/uploader'
import chatchannel from '../../apps/chat/admin/components/channel'
import chatchannels from '../../apps/chat/admin/components/channels'
import chatchatbar from '../../apps/chat/admin/components/chatbar'
import chatfullchat from '../../apps/chat/admin/components/fullchat'
import chatsubscriptions from '../../apps/chat/admin/components/subscriptions'
import chatchat from '../../apps/chat/admin/roots/chat'
import driveaccess from '../../apps/drive/admin/components/access'
import driveexplorer from '../../apps/drive/admin/components/explorer'
import drivemove from '../../apps/drive/admin/components/move'
import drivechat from '../../apps/drive/admin/components/share/chat'
import driveshare from '../../apps/drive/admin/components/share'
import driveversions from '../../apps/drive/admin/components/versions'
import expensestripsImportFinalize from '../../apps/expenses/admin/components/trips_import_finalize'
import competenciescommitments from '../../apps/learning/admin/components/commitments'
import competenciesgoals from '../../apps/learning/admin/components/goals'
import competenciesresources from '../../apps/learning/admin/components/resources'
import mahaprofiles from '../../apps/maha/admin/components/account/account/profiles'
import mahanotificationTypes from '../../apps/maha/admin/components/account/notifications/notification_types'
import mahaappitems from '../../apps/maha/admin/components/account/security/appitems'
import mahaactivate from '../../apps/maha/admin/components/activate'
import mahaadmin from '../../apps/maha/admin/components/admin'
import mahabrowser from '../../apps/maha/admin/components/device/browser'
import mahacordova from '../../apps/maha/admin/components/device/cordova'
import mahaelectron from '../../apps/maha/admin/components/device/electron'
import mahadevice from '../../apps/maha/admin/components/device'
import mahahelp from '../../apps/maha/admin/components/help'
import mahanavigation from '../../apps/maha/admin/components/navigation'
import mahanetwork from '../../apps/maha/admin/components/network'
import mahanotifications from '../../apps/maha/admin/components/notifications'
import mahaomnisearch from '../../apps/maha/admin/components/omnisearch'
import mahabadge from '../../apps/maha/admin/components/portal/badge'
import mahaportal from '../../apps/maha/admin/components/portal'
import mahapresence from '../../apps/maha/admin/components/presence'
import mahapush from '../../apps/maha/admin/components/push'
import mahareset from '../../apps/maha/admin/components/reset'
import maharouter from '../../apps/maha/admin/components/router'
import mahasignin from '../../apps/maha/admin/components/signin'
import mahareactions from '../../apps/maha/admin/roots/reactions'
import mahastars from '../../apps/maha/admin/roots/stars'
import platformapps from '../../apps/platform/admin/components/apps'
import siteshtmlfield from '../../apps/sites/admin/components/htmlfield'
import sitessitesImportFinalize from '../../apps/sites/admin/components/sites_import_finalize'
import teamaccess from '../../apps/team/admin/components/access'
import teamroles from '../../apps/team/admin/components/roles'
import trainingsanswers from '../../apps/training/admin/components/questions/answers'
import trainingsquestions from '../../apps/training/admin/components/questions'
import trainingsquiz from '../../apps/training/admin/components/quiz'
import chatRoutes from '../../apps/chat/admin/views/index.js'
import driveRoutes from '../../apps/drive/admin/views/index.js'
import eatfreshRoutes from '../../apps/eatfresh/admin/views/index.js'
import expensesRoutes from '../../apps/expenses/admin/views/index.js'
import competenciesRoutes from '../../apps/learning/admin/views/index.js'
import mahaRoutes from '../../apps/maha/admin/views/index.js'
import platformRoutes from '../../apps/platform/admin/views/index.js'
import sitesRoutes from '../../apps/sites/admin/views/index.js'
import teamRoutes from '../../apps/team/admin/views/index.js'
import trainingsRoutes from '../../apps/training/admin/views/index.js'
import chatBadges from '../../apps/chat/admin/badges/index.js'
import driveBadges from '../../apps/drive/admin/badges/index.js'
import mahaBadges from '../../apps/maha/admin/badges/index.js'
import chatRoots from '../../apps/chat/admin/roots/index.js'
import mahaRoots from '../../apps/maha/admin/roots/index.js'
import expensesUserTasks from '../../apps/expenses/admin/user_tasks.js'
import expensesUserFields from '../../apps/expenses/admin/user_fields.js'
import expensesUserValues from '../../apps/expenses/admin/user_values.js'
import expensesSettings from '../../apps/expenses/admin/settings.js'
import Platform from '../../apps/maha/admin/components/platform'
import NotFound from '../../apps/maha/admin/views/not_found'
import Root from '../../apps/maha/admin/components/root'
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
        appUserTasks: this._getAppUserTasks(),
        appUserFields: this._getAppUserFields(),
        appUserValues: this._getAppUserValues(),
        settings: this._getSettings()
      }
    }
  }

  _getAppUserFields() {
    return [
      expensesUserFields,
    ]
  }

  _getAppUserTasks() {
    return [
      expensesUserTasks,
    ]
  }

  _getAppUserValues() {
    return [
      expensesUserValues,
    ]
  }

  _getBadges() {
    return [
      ...chatBadges.map(badge => ({
        app: 'chat',
        ...badge
      })),
      ...driveBadges.map(badge => ({
        app: 'drive',
        ...badge
      })),
      ...mahaBadges.map(badge => ({
        app: 'maha',
        ...badge
      })),
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
      adminassignment,
      adminattachmentManager,
      adminattachmentsDrive,
      adminattachmentsFiles,
      adminattachments,
      adminattachmentsUrl,
      adminauthorized,
      adminbutton,
      admincarousel,
      adminchooser,
      admincollection,
      admincomments,
      admincomposer,
      admindrawer,
      adminemojis,
      adminfields,
      adminfilters,
      adminflash,
      adminformAssignmentfield,
      adminformAttachmentfield,
      adminformColorfield,
      adminformDatefield,
      adminformFilefield,
      adminformLookup,
      adminformLookup2,
      adminform,
      adminformSelectCheckboxGroup,
      adminformSelectRadioGroup,
      adminformSelect,
      adminformTablefield,
      adminformToggleList,
      adminformVideofield,
      adminimportComplete,
      adminimportConfigure,
      adminimportField,
      adminimportFinalizing,
      adminimportFix,
      adminimportIntro,
      adminimportMapping,
      adminimportParsing,
      adminimportPreview,
      adminimportProcessing,
      adminimport,
      adminimportReview,
      adminimportUpload,
      adminimportValidating,
      admininfinite,
      adminmodal,
      adminpage,
      adminpopup,
      adminprompt,
      adminsearch,
      adminsearch2,
      adminsearchbox,
      adminsortableList,
      admintabs,
      admintasks,
      admintray,
      adminuploader,
      chatchannel,
      chatchannels,
      chatchatbar,
      chatfullchat,
      chatsubscriptions,
      chatchat,
      driveaccess,
      driveexplorer,
      drivemove,
      drivechat,
      driveshare,
      driveversions,
      expensestripsImportFinalize,
      competenciescommitments,
      competenciesgoals,
      competenciesresources,
      mahaprofiles,
      mahanotificationTypes,
      mahaappitems,
      mahaactivate,
      mahaadmin,
      mahabrowser,
      mahacordova,
      mahaelectron,
      mahadevice,
      mahahelp,
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
      platformapps,
      siteshtmlfield,
      sitessitesImportFinalize,
      teamaccess,
      teamroles,
      trainingsanswers,
      trainingsquestions,
      trainingsquiz,
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
    ]
  }

  _getRoutes() {
    return [
      { path: '/admin/chat', children: chatRoutes },
      { path: '/admin/drive', children: driveRoutes },
      { path: '/admin/eatfresh', children: eatfreshRoutes },
      { path: '/admin/expenses', children: expensesRoutes },
      { path: '/admin/learning', children: competenciesRoutes },
      { path: '/admin', children: mahaRoutes },
      { path: '/admin/platform', children: platformRoutes },
      { path: '/admin/sites', children: sitesRoutes },
      { path: '/admin/team', children: teamRoutes },
      { path: '/admin/training', children: trainingsRoutes },
      { path: '/*', component: NotFound }
    ]
  }

  _getSettings() {
    return {
      expenses: expensesSettings,
    }
  }

}

export default hot(module)(App)
