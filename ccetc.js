'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _maha = require('maha');

var _maha2 = _interopRequireDefault(_maha);

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

var _aws = require('platform/services/aws');

var _aws2 = _interopRequireDefault(_aws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (commander) {

  (0, _maha2.default)({
    commander: commander,
    command: 'ccetc:import:20170622',
    description: 'Migrate database',
    processor: import_20170622
  });
};

var import_20170622 = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var users, projects, expenses, members, assets, userData, projectData, expenseData, memberData, s3;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            users = toMatrix('20170622/users.tsv', '\t');
            projects = toMatrix('20170622/projects.tsv', '\t');
            expenses = toMatrix('20170622/expense_types.tsv', '|');
            members = toMatrix('20170622/members.tsv', '|');
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
            userData = users.reduce(function (data, record) {

              var user_id = data.users.length + 1;

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

              var roles = [3, 4, 5, 6, 7, 8];

              roles.map(function (index) {
                if (record[index] == 1) {
                  data.users_roles.push({
                    team_id: 1,
                    user_id: user_id,
                    role_id: index - 2,
                    created_at: (0, _moment2.default)(),
                    updated_at: (0, _moment2.default)()
                  });
                }
              });

              return data;
            }, { assets: assets, users: [], users_roles: [] });
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
            _context2.next = 12;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', 'db', 'seeds', 'assets.js'), 'module.exports = ' + toJSON({ tableName: 'assets', records: userData.assets }), reject);

          case 12:
            _context2.next = 14;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', 'db', 'seeds', 'users.js'), 'module.exports = ' + toJSON({ tableName: 'users', records: userData.users }), reject);

          case 14:
            _context2.next = 16;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', 'db', 'seeds', 'users_roles.js'), 'module.exports = ' + toJSON({ tableName: 'users_roles', records: userData.users_roles }), reject);

          case 16:
            _context2.next = 18;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', 'db', 'seeds', 'projects.js'), 'module.exports = ' + toJSON({ tableName: 'expenses_projects', records: projectData.projects }), reject);

          case 18:
            _context2.next = 20;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', 'db', 'seeds', 'members.js'), 'module.exports = ' + toJSON({ tableName: 'expenses_members', records: memberData.members }), reject);

          case 20:
            _context2.next = 22;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', 'db', 'seeds', 'expense_types.js'), 'module.exports = ' + toJSON({ tableName: 'expenses_expense_types', records: expenseData.expense_types }), reject);

          case 22:
            s3 = new _aws2.default.S3();
            _context2.next = 25;
            return userData.assets.map((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
              var filename, contentType, filepath;
              return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      filename = asset.file_name;
                      contentType = asset.content_type;
                      filepath = _path2.default.join(__dirname, '..', '..', '..', 'data', 'photos', asset.file_name);
                      _context.next = 5;
                      return s3.upload({
                        Bucket: process.env.AWS_BUCKET,
                        Key: 'assets/' + asset.id + '/' + filename,
                        ACL: 'public-read',
                        Body: _fs2.default.readFileSync(filepath),
                        ContentType: contentType
                      }).promise().catch(function (err) {
                        console.log('Unable to upload asset');
                      });

                    case 5:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            })));

          case 25:
            return _context2.abrupt('return', _bluebird2.default.map(userData.assets));

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2['catch'](0);


            console.log(_context2.t0);

          case 31:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 28]]);
  }));

  return function import_20170622() {
    return _ref.apply(this, arguments);
  };
}();

var toJSON = function toJSON(object) {
  return (0, _stringify2.default)(object, null, '  ').replace(/\"(\w*)\"\:/g, '$1:').replace(/\"/g, '\'');
};

var toMatrix = function toMatrix(filename, delimiter) {
  return (0, _sync2.default)(_fs2.default.readFileSync(_path2.default.join(__dirname, '..', 'files', filename), 'utf8'), { delimiter: delimiter, quote: '^' });
};