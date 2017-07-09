'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _maha = require('maha');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sync = require('csv-parse/lib/sync');

var _sync2 = _interopRequireDefault(_sync);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (commander) {

  (0, _maha.Task)({
    commander: commander,
    command: 'ccetc:import:20170622',
    description: 'Migrate database',
    processor: import_20170622
  });
};

var import_20170622 = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var employees, projects, expenses, members, competencies, supervisors, assets, userData, supervisorData, projectData, expenseData, memberData, competencyData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            employees = toMatrix('20170622/employees.tsv', '\t');
            projects = toMatrix('20170622/projects.tsv', '\t');
            expenses = toMatrix('20170622/expense_types.tsv', '|');
            members = toMatrix('20170622/members.tsv', '|');
            competencies = toMatrix('20170622/competencies.tsv', '\t');
            supervisors = {};
            assets = [{
              id: 1,
              team_id: 1,
              original_file_name: 'cornell.jpg',
              file_name: 'cornell.jpg',
              content_type: 'image/jpeg',
              file_size: 17449,
              chunks_total: 1,
              created_at: (0, _moment2.default)(),
              updated_at: (0, _moment2.default)()
            }];
            userData = employees.reduce(function (data, record) {

              var user = _lodash2.default.find(data.users, { email: record[2] + '@cornell.edu' });

              var user_id = null;

              if (!user) {

                user_id = data.users.length + 1;

                var filename = record[2] + '.jpg';

                var filepath = _path2.default.join(__dirname, '..', '..', '..', 'data', 'photos', filename);

                var photoExists = _fs2.default.existsSync(filepath);

                var asset_id = photoExists ? data.assets.length + 1 : null;

                if (photoExists) {

                  data.assets.push({
                    id: asset_id,
                    team_id: 1,
                    original_file_name: filename,
                    file_name: filename,
                    content_type: _mimeTypes2.default.lookup(filepath),
                    file_size: _fs2.default.statSync(filepath).size,
                    chunks_total: 1,
                    created_at: (0, _moment2.default)(),
                    updated_at: (0, _moment2.default)()
                  });
                }

                data.users.push({
                  id: user_id,
                  team_id: 1,
                  first_name: record[0],
                  last_name: record[1],
                  email: record[2] + '@cornell.edu',
                  password_salt: '$2a$10$wlhVrmkAu7H7Wttks/9vte',
                  password_hash: '$2a$10$wlhVrmkAu7H7Wttks/9vte8KTY6afM7XHdKTXadrXlpvpVgfHyx6m',
                  is_active: true,
                  photo_id: asset_id,
                  created_at: (0, _moment2.default)(),
                  updated_at: (0, _moment2.default)()
                });

                var roles = [4, 5, 6, 7, 8];

                roles.map(function (index) {
                  if (record[index] == 1) {
                    data.users_roles.push({
                      user_id: user_id,
                      role_id: index - 3
                    });
                  }
                });
              } else {

                user_id = user.id;
              }

              if (!supervisors[record[3]]) supervisors[record[3]] = [];

              supervisors[record[3]].push(user_id);

              return data;
            }, { assets: assets, users: [], users_roles: [] });
            supervisorData = (0, _keys2.default)(supervisors).reduce(function (data, name) {
              var _name$match = name.match(/(.*) (.*)/),
                  _name$match2 = (0, _slicedToArray3.default)(_name$match, 3),
                  first_name = _name$match2[1],
                  last_name = _name$match2[2];

              var supervisor = _lodash2.default.find(userData.users, { first_name: first_name, last_name: last_name });

              data.supervisors.push({
                team_id: 1,
                user_id: supervisor.id,
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

              data.supervisions = [].concat((0, _toConsumableArray3.default)(data.supervisions), (0, _toConsumableArray3.default)(supervisors[name].map(function (employee_id) {
                return {
                  team_id: 1,
                  supervisor_id: supervisor.id,
                  employee_id: employee_id,
                  created_at: (0, _moment2.default)(),
                  updated_at: (0, _moment2.default)()
                };
              })));

              return data;
            }, { supervisors: [], supervisions: [] });
            projectData = projects.reduce(function (data, record) {

              var project_id = data.projects.length + 1;

              data.projects.push({
                id: project_id,
                team_id: 1,
                title: record[1].trim().replace(/'/g, ''),
                code: record[0].trim(),
                is_active: true,
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

              record[2].split('/').map(function (netid) {

                var user_id = _lodash2.default.find(userData.users, { email: netid + '@cornell.edu' }).id;

                data.members.push({
                  team_id: 1,
                  project_id: project_id,
                  user_id: user_id,
                  member_type_id: 1,
                  is_active: true,
                  created_at: (0, _moment2.default)(),
                  updated_at: (0, _moment2.default)()
                });
              });

              return data;
            }, { projects: [], members: [] });
            expenseData = expenses.reduce(function (data, record) {

              var expense_type_id = data.expense_types.length + 1;

              data.expense_types.push({
                id: expense_type_id,
                team_id: 1,
                code: record[0].trim(),
                title: record[1].trim(),
                description: record[2].trim(),
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

              return data;
            }, { expense_types: [] });
            memberData = members.reduce(function (data, record) {

              var project_id = _lodash2.default.find(projectData.projects, { code: record[0] }).id;

              var user_id = _lodash2.default.find(userData.users, { email: record[1] + '@cornell.edu' }).id;

              var member_types = {
                owner: 1,
                approver: 2,
                member: 3
              };

              data.members.push({
                team_id: 1,
                project_id: project_id,
                user_id: user_id,
                member_type_id: member_types[record[2]],
                is_active: true,
                created_at: (0, _moment2.default)(),
                updated_at: (0, _moment2.default)()
              });

              return data;
            }, { members: projectData.members });
            competencyData = competencies.reduce(function (data, record) {

              var category = findOrCreate(data.categories, { title: sanitize(record[0]) }, true);

              var competency = findOrCreate(data.competencies, { category_id: category.id, title: sanitize(record[1]), level: parseInt(record[2]), description: sanitize(record[3]) }, true, { title: sanitize(record[1]) });

              var resource = findOrCreate(data.resources, { title: sanitize(record[4]), description: sanitize(record[5]), url: record[6] }, true, { title: sanitize(record[4]) });

              data.competencies_resources.push({
                competency_id: competency.id,
                resource_id: resource.id
              });

              return data;
            }, { categories: [], competencies: [], resources: [], competencies_resources: [] });
            _context.next = 16;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'assets.js'), 'export default ' + toJSON({ tableName: 'maha_assets', records: userData.assets }));

          case 16:
            _context.next = 18;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'users.js'), 'export default ' + toJSON({ tableName: 'maha_users', records: userData.users }));

          case 18:
            _context.next = 20;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'users_roles.js'), 'export default ' + toJSON({ tableName: 'maha_users_roles', records: userData.users_roles }));

          case 20:
            _context.next = 22;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'projects.js'), 'export default ' + toJSON({ tableName: 'expenses_projects', records: projectData.projects }));

          case 22:
            _context.next = 24;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'members.js'), 'export default ' + toJSON({ tableName: 'expenses_members', records: memberData.members }));

          case 24:
            _context.next = 26;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'expense_types.js'), 'export default ' + toJSON({ tableName: 'expenses_expense_types', records: expenseData.expense_types }));

          case 26:
            _context.next = 28;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'supervisors.js'), 'export default ' + toJSON({ tableName: 'competencies_supervisors', records: supervisorData.supervisors }));

          case 28:
            _context.next = 30;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'supervisions.js'), 'export default ' + toJSON({ tableName: 'competencies_supervisions', records: supervisorData.supervisions }));

          case 30:
            _context.next = 32;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'categories.js'), 'export default ' + toJSON({ tableName: 'competencies_categories', records: competencyData.categories }));

          case 32:
            _context.next = 34;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'competencies.js'), 'export default ' + toJSON({ tableName: 'competencies_competencies', records: competencyData.competencies }));

          case 34:
            _context.next = 36;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'resources.js'), 'export default ' + toJSON({ tableName: 'competencies_resources', records: competencyData.resources }));

          case 36:
            _context.next = 38;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'competencies_resources.js'), 'export default ' + toJSON({ tableName: 'competencies_competencies_resources', records: competencyData.competencies_resources }));

          case 38:
            _context.next = 43;
            break;

          case 40:
            _context.prev = 40;
            _context.t0 = _context['catch'](0);


            console.log(_context.t0);

          case 43:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 40]]);
  }));

  return function import_20170622() {
    return _ref.apply(this, arguments);
  };
}();

var toJSON = function toJSON(object) {
  return (0, _stringify2.default)(object, null, '  ').replace(/\"(\w*)\"\:/g, '$1:').replace(/\"/g, '\'');
};

var toMatrix = function toMatrix(filename, delimiter) {
  return (0, _sync2.default)(_fs2.default.readFileSync(_path2.default.join(__dirname, '..', '..', 'files', filename), 'utf8'), { delimiter: delimiter, quote: '^' });
};

var sanitize = function sanitize(string) {
  return string.replace(/\'/g, '').trim();
};

var findOrCreate = function findOrCreate(collection, data, withId) {
  var compare = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


  var item = _lodash2.default.find(collection, compare || data);

  if (item) return item;

  var id = collection.length + 1;

  var base = withId ? { id: id, team_id: 1 } : { team_id: 1 };

  var newitem = _lodash2.default.assign(base, data, {
    created_at: (0, _moment2.default)(),
    updated_at: (0, _moment2.default)()
  });

  collection.push(newitem);

  return newitem;
};