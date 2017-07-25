'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _bluebird = require('bluebird');

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _maha = require('maha');

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

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

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
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var employees, projects, expenses, members, competencies, expectations, supervisors, assets, userData, supervisorData, projectData, expenseData, memberData, competencyData, expectationsData, s3;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            employees = toMatrix('20170622/employees.tsv', '\t');
            projects = toMatrix('20170622/projects.tsv', '\t');
            expenses = toMatrix('20170622/expense_types.tsv', '|');
            members = toMatrix('20170622/members.tsv', '|');
            competencies = toMatrix('20170622/competencies.tsv', '\t');
            expectations = toMatrix('20170622/expectations.tsv', '\t');
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

                var filepath = _path2.default.join(__dirname, '..', '..', 'files', '20170622', 'photos', filename);

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

              if (record[9]) {

                var group = findOrCreate(data.groups, { team_id: 1, title: sanitize(record[9]) }, true);

                data.users_groups.push({
                  user_id: user_id,
                  group_id: group.id
                });
              }

              return data;
            }, { assets: assets, users: [], users_roles: [], groups: [], users_groups: [] });
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

              var category = findOrCreate(data.categories, { team_id: 1, title: sanitize(record[0]) }, true);

              var competency = findOrCreate(data.competencies, { team_id: 1, category_id: category.id, title: sanitize(record[1]), level: parseInt(record[2]), description: sanitize(record[3]) }, true, { title: sanitize(record[1]) });

              var resource = findOrCreate(data.resources, { team_id: 1, title: sanitize(record[4]), description: sanitize(record[5]), url: record[6] }, true, { title: sanitize(record[4]) });

              data.competencies_resources.push({
                competency_id: competency.id,
                resource_id: resource.id
              });

              return data;
            }, { categories: [], competencies: [], resources: [], competencies_resources: [] });
            expectationsData = expectations.reduce(function (data, record, index) {

              var competency = findOrCreate(competencyData.competencies, { team_id: 1, title: sanitize(record[2]), level: parseInt(record[3]) }, true);

              var classification = findOrCreate(data.classifications, { team_id: 1, title: sanitize(record[0]) }, true);

              var program = findOrCreate(data.programs, { team_id: 1, title: sanitize(record[1]) }, true);

              data.expectations.push({
                team_id: 1,
                classification_id: classification.id,
                program_id: program.id,
                competency_id: competency.id
              });

              return data;
            }, { expectations: [], classifications: [], programs: [] });


            writeFile('assets', 'maha_assets', userData.assets);

            _context2.next = 19;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'users.js'), 'export default ' + toJSON({ tableName: 'maha_users', records: userData.users }));

          case 19:
            _context2.next = 21;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'users_roles.js'), 'export default ' + toJSON({ tableName: 'maha_users_roles', records: userData.users_roles }));

          case 21:
            _context2.next = 23;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'groups.js'), 'export default ' + toJSON({ tableName: 'maha_groups', records: userData.groups }));

          case 23:
            _context2.next = 25;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'users_groups.js'), 'export default ' + toJSON({ tableName: 'maha_users_groups', records: userData.users_groups }));

          case 25:
            _context2.next = 27;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'projects.js'), 'export default ' + toJSON({ tableName: 'expenses_projects', records: projectData.projects }));

          case 27:
            _context2.next = 29;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'members.js'), 'export default ' + toJSON({ tableName: 'expenses_members', records: memberData.members }));

          case 29:
            _context2.next = 31;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'expense_types.js'), 'export default ' + toJSON({ tableName: 'expenses_expense_types', records: expenseData.expense_types }));

          case 31:
            _context2.next = 33;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'supervisors.js'), 'export default ' + toJSON({ tableName: 'competencies_supervisors', records: supervisorData.supervisors }));

          case 33:
            _context2.next = 35;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'supervisions.js'), 'export default ' + toJSON({ tableName: 'competencies_supervisions', records: supervisorData.supervisions }));

          case 35:
            _context2.next = 37;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'categories.js'), 'export default ' + toJSON({ tableName: 'competencies_categories', records: competencyData.categories }));

          case 37:
            _context2.next = 39;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'competencies.js'), 'export default ' + toJSON({ tableName: 'competencies_competencies', records: competencyData.competencies }));

          case 39:
            _context2.next = 41;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'resources.js'), 'export default ' + toJSON({ tableName: 'competencies_resources', records: competencyData.resources }));

          case 41:
            _context2.next = 43;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'competencies_resources.js'), 'export default ' + toJSON({ tableName: 'competencies_competencies_resources', records: competencyData.competencies_resources }));

          case 43:
            _context2.next = 45;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'classifications.js'), 'export default ' + toJSON({ tableName: 'competencies_classifications', records: expectationsData.classifications }));

          case 45:
            _context2.next = 47;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'programs.js'), 'export default ' + toJSON({ tableName: 'competencies_programs', records: expectationsData.programs }));

          case 47:
            _context2.next = 49;
            return _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', 'expectations.js'), 'export default ' + toJSON({ tableName: 'competencies_expectations', records: expectationsData.expectations }));

          case 49:

            _awsSdk2.default.config.constructor({
              accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
              region: process.env.AWS_REGION || ''
            });

            s3 = new _awsSdk2.default.S3();
            _context2.next = 53;
            return (0, _bluebird.map)(userData.assets, function () {
              var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(asset) {
                var filename, contentType, filepath;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        filename = asset.file_name;
                        contentType = asset.content_type;
                        filepath = _path2.default.join(__dirname, '..', '..', 'files', '20170622', 'photos', asset.file_name);
                        _context.next = 5;
                        return s3.upload({
                          Bucket: process.env.AWS_BUCKET,
                          Key: 'assets/' + asset.id + '/' + asset.file_name,
                          ACL: 'public-read',
                          Body: _fs2.default.readFileSync(filepath),
                          ContentType: contentType
                        }).promise();

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 53:
            _context2.next = 58;
            break;

          case 55:
            _context2.prev = 55;
            _context2.t0 = _context2['catch'](0);


            console.log(_context2.t0);

          case 58:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 55]]);
  }));

  return function import_20170622() {
    return _ref.apply(this, arguments);
  };
}();

var writeFile = function writeFile(name, tableName, records) {

  _fs2.default.writeFileSync(_path2.default.join(__dirname, '..', '..', 'src', 'db', 'seeds', name + '.js'), 'export default ' + toJSON({ tableName: tableName, records: records }));
};

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