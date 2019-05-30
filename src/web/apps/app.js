import chatchannel from './chat/admin/components/channel'
import chatchannels from './chat/admin/components/channels'
import chatchatbar from './chat/admin/components/chatbar'
import chatfullchat from './chat/admin/components/fullchat'
import chatsubscriptions from './chat/admin/components/subscriptions'
import chatchat from './chat/admin/roots/chat'
import competenciescommitments from './competencies/admin/components/commitments'
import competenciesresources from './competencies/admin/components/resources'
import driveaccess from './drive/admin/components/access'
import driveexplorer from './drive/admin/components/explorer'
import drivemove from './drive/admin/components/move'
import drivechat from './drive/admin/components/share/chat'
import driveshare from './drive/admin/components/share'
import driveversions from './drive/admin/components/versions'
import expensestripsImportFinalize from './expenses/admin/components/trips_import_finalize'
import mahaprofiles from './maha/admin/components/account/account/profiles'
import mahanotificationTypes from './maha/admin/components/account/notifications/notification_types'
import mahaappitems from './maha/admin/components/account/security/appitems'
import mahaactivate from './maha/admin/components/activate'
import mahaadmin from './maha/admin/components/admin'
import mahaassignment from './maha/admin/components/assignment'
import mahaattachmentManager from './maha/admin/components/attachment_manager'
import mahaattachmentfield from './maha/admin/components/attachmentfield'
import mahadrive from './maha/admin/components/attachments/drive'
import mahafiles from './maha/admin/components/attachments/files'
import mahaattachments from './maha/admin/components/attachments'
import mahaurl from './maha/admin/components/attachments/url'
import mahaauthorized from './maha/admin/components/authorized'
import mahabutton from './maha/admin/components/button'
import mahacarousel from './maha/admin/components/carousel'
import mahachooser from './maha/admin/components/chooser'
import mahacollection from './maha/admin/components/collection'
import mahacomments from './maha/admin/components/comments'
import mahacomposer from './maha/admin/components/composer'
import mahabrowser from './maha/admin/components/device/browser'
import mahacordova from './maha/admin/components/device/cordova'
import mahaelectron from './maha/admin/components/device/electron'
import mahadevice from './maha/admin/components/device'
import mahadrawer from './maha/admin/components/drawer'
import mahaemojis from './maha/admin/components/emojis'
import mahafields from './maha/admin/components/fields'
import mahafilters from './maha/admin/components/filters'
import mahaflash from './maha/admin/components/flash'
import mahacolorfield from './maha/admin/components/form/colorfield'
import mahadatefield from './maha/admin/components/form/datefield'
import mahafilefield from './maha/admin/components/form/filefield'
import mahalookup from './maha/admin/components/form/lookup'
import mahalookup2 from './maha/admin/components/form/lookup2'
import mahaform from './maha/admin/components/form'
import mahaselect from './maha/admin/components/form/select'
import mahatablefield from './maha/admin/components/form/tablefield'
import mahatoggleList from './maha/admin/components/form/toggle_list'
import mahavideofield from './maha/admin/components/form/videofield'
import mahahelp from './maha/admin/components/help'
import mahacomplete from './maha/admin/components/import/complete'
import mahaconfigure from './maha/admin/components/import/configure'
import mahafield from './maha/admin/components/import/field'
import mahafinalizing from './maha/admin/components/import/finalizing'
import mahafix from './maha/admin/components/import/fix'
import mahaintro from './maha/admin/components/import/intro'
import mahamapping from './maha/admin/components/import/mapping'
import mahaparsing from './maha/admin/components/import/parsing'
import mahapreview from './maha/admin/components/import/preview'
import mahaprocessing from './maha/admin/components/import/processing'
import mahaimport from './maha/admin/components/import'
import mahareview from './maha/admin/components/import/review'
import mahaupload from './maha/admin/components/import/upload'
import mahavalidating from './maha/admin/components/import/validating'
import mahainfinite from './maha/admin/components/infinite'
import mahamodal from './maha/admin/components/modal'
import mahanavigation from './maha/admin/components/navigation'
import mahanetwork from './maha/admin/components/network'
import mahanotifications from './maha/admin/components/notifications'
import mahaomnisearch from './maha/admin/components/omnisearch'
import mahapage from './maha/admin/components/page'
import mahapopup from './maha/admin/components/popup'
import mahabadge from './maha/admin/components/portal/badge'
import mahaportal from './maha/admin/components/portal'
import mahapresence from './maha/admin/components/presence'
import mahaprompt from './maha/admin/components/prompt'
import mahapush from './maha/admin/components/push'
import mahareset from './maha/admin/components/reset'
import maharouter from './maha/admin/components/router'
import mahasearch from './maha/admin/components/search'
import mahasearch2 from './maha/admin/components/search2'
import mahasearchbox from './maha/admin/components/searchbox'
import mahasignin from './maha/admin/components/signin'
import mahasortableList from './maha/admin/components/sortable_list'
import mahatabs from './maha/admin/components/tabs'
import mahatasks from './maha/admin/components/tasks'
import mahatray from './maha/admin/components/tray'
import mahauploader from './maha/admin/components/uploader'
import mahareactions from './maha/admin/roots/reactions'
import mahastars from './maha/admin/roots/stars'
import platformapps from './platform/admin/components/apps'
import siteshtmlfield from './sites/admin/components/htmlfield'
import sitessitesImportFinalize from './sites/admin/components/sites_import_finalize'
import teamaccess from './team/admin/components/access'
import teamroles from './team/admin/components/roles'
import chatRoutes from './chat/admin/views/index.js'
import competenciesRoutes from './competencies/admin/views/index.js'
import driveRoutes from './drive/admin/views/index.js'
import eatfreshRoutes from './eatfresh/admin/views/index.js'
import expensesRoutes from './expenses/admin/views/index.js'
import mahaRoutes from './maha/admin/views/index.js'
import platformRoutes from './platform/admin/views/index.js'
import sitesRoutes from './sites/admin/views/index.js'
import teamRoutes from './team/admin/views/index.js'
import chatBadges from './chat/admin/badges/index.js'
import mahaBadges from './maha/admin/badges/index.js'
import chatRoots from './chat/admin/roots/index.js'
import mahaRoots from './maha/admin/roots/index.js'
import expensesUserTasks from './expenses/admin/user_tasks.js'
import expensesUserFields from './expenses/admin/user_fields.js'
import expensesUserValues from './expenses/admin/user_values.js'
import expensesSettings from './expenses/admin/settings.js'
import Platform from './maha/admin/components/platform'
import NotFound from './maha/admin/views/not_found'
import { hot } from 'react-hot-loader'
import Root from './maha/admin/components/root'
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
      chatchannel,
      chatchannels,
      chatchatbar,
      chatfullchat,
      chatsubscriptions,
      chatchat,
      competenciescommitments,
      competenciesresources,
      driveaccess,
      driveexplorer,
      drivemove,
      drivechat,
      driveshare,
      driveversions,
      expensestripsImportFinalize,
      mahaprofiles,
      mahanotificationTypes,
      mahaappitems,
      mahaactivate,
      mahaadmin,
      mahaassignment,
      mahaattachmentManager,
      mahaattachmentfield,
      mahadrive,
      mahafiles,
      mahaattachments,
      mahaurl,
      mahaauthorized,
      mahabutton,
      mahacarousel,
      mahachooser,
      mahacollection,
      mahacomments,
      mahacomposer,
      mahabrowser,
      mahacordova,
      mahaelectron,
      mahadevice,
      mahadrawer,
      mahaemojis,
      mahafields,
      mahafilters,
      mahaflash,
      mahacolorfield,
      mahadatefield,
      mahafilefield,
      mahalookup,
      mahalookup2,
      mahaform,
      mahaselect,
      mahatablefield,
      mahatoggleList,
      mahavideofield,
      mahahelp,
      mahacomplete,
      mahaconfigure,
      mahafield,
      mahafinalizing,
      mahafix,
      mahaintro,
      mahamapping,
      mahaparsing,
      mahapreview,
      mahaprocessing,
      mahaimport,
      mahareview,
      mahaupload,
      mahavalidating,
      mahainfinite,
      mahamodal,
      mahanavigation,
      mahanetwork,
      mahanotifications,
      mahaomnisearch,
      mahapage,
      mahapopup,
      mahabadge,
      mahaportal,
      mahapresence,
      mahaprompt,
      mahapush,
      mahareset,
      maharouter,
      mahasearch,
      mahasearch2,
      mahasearchbox,
      mahasignin,
      mahasortableList,
      mahatabs,
      mahatasks,
      mahatray,
      mahauploader,
      mahareactions,
      mahastars,
      platformapps,
      siteshtmlfield,
      sitessitesImportFinalize,
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
    ]
  }

  _getRoutes() {
    return [
      { path: '/admin/chat', children: chatRoutes },
      { path: '/admin/competencies', children: competenciesRoutes },
      { path: '/admin/drive', children: driveRoutes },
      { path: '/admin/eatfresh', children: eatfreshRoutes },
      { path: '/admin/expenses', children: expensesRoutes },
      { path: '/admin', children: mahaRoutes },
      { path: '/admin/platform', children: platformRoutes },
      { path: '/admin/sites', children: sitesRoutes },
      { path: '/admin/team', children: teamRoutes },
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
