'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var classificationsFixtures = new _maha.Fixtures({
  tableName: 'competencies_classifications',
  records: [{
    id: 1,
    team_id: 1,
    title: 'Prgoram Assistant I',
    created_at: '2017-11-04T21:55:18.745Z',
    updated_at: '2017-11-04T21:55:18.745Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Program Assistant II',
    created_at: '2017-11-04T21:55:18.746Z',
    updated_at: '2017-11-04T21:55:18.746Z'
  }, {
    id: 3,
    team_id: 1,
    title: 'Program Educator I',
    created_at: '2017-11-04T21:55:18.747Z',
    updated_at: '2017-11-04T21:55:18.747Z'
  }, {
    id: 4,
    team_id: 1,
    title: 'Program Coordinator I',
    created_at: '2017-11-04T21:55:18.748Z',
    updated_at: '2017-11-04T21:55:18.748Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Program Educator II',
    created_at: '2017-11-04T21:55:18.748Z',
    updated_at: '2017-11-04T21:55:18.748Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Program Coordinator II',
    created_at: '2017-11-04T21:55:18.749Z',
    updated_at: '2017-11-04T21:55:18.749Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Communications Coordinator',
    created_at: '2017-11-04T21:55:18.750Z',
    updated_at: '2017-11-04T21:55:18.750Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Subject Educator I',
    created_at: '2017-11-04T21:55:18.750Z',
    updated_at: '2017-11-04T21:55:18.750Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Subect Educator II',
    created_at: '2017-11-04T21:55:18.751Z',
    updated_at: '2017-11-04T21:55:18.751Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Program Leader I',
    created_at: '2017-11-04T21:55:18.752Z',
    updated_at: '2017-11-04T21:55:18.752Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Program Leader II',
    created_at: '2017-11-04T21:55:18.753Z',
    updated_at: '2017-11-04T21:55:18.753Z'
  }, {
    id: 12,
    team_id: 1,
    title: 'Subject Educator III',
    created_at: '2017-11-04T21:55:18.754Z',
    updated_at: '2017-11-04T21:55:18.754Z'
  }, {
    id: 13,
    team_id: 1,
    title: 'Communications Manager',
    created_at: '2017-11-04T21:55:18.755Z',
    updated_at: '2017-11-04T21:55:18.755Z'
  }, {
    id: 14,
    team_id: 1,
    title: 'Community Liason',
    created_at: '2017-11-04T21:55:18.755Z',
    updated_at: '2017-11-04T21:55:18.755Z'
  }, {
    id: 15,
    team_id: 1,
    title: 'Community Educator',
    created_at: '2017-11-04T21:55:18.756Z',
    updated_at: '2017-11-04T21:55:18.756Z'
  }, {
    id: 16,
    team_id: 1,
    title: 'Grants and Contract Liason',
    created_at: '2017-11-04T21:55:18.757Z',
    updated_at: '2017-11-04T21:55:18.757Z'
  }, {
    id: 17,
    team_id: 1,
    title: 'Public Affairs Liason',
    created_at: '2017-11-04T21:55:18.757Z',
    updated_at: '2017-11-04T21:55:18.757Z'
  }, {
    id: 18,
    team_id: 1,
    title: 'Resource Educator',
    created_at: '2017-11-04T21:55:18.758Z',
    updated_at: '2017-11-04T21:55:18.758Z'
  }, {
    id: 19,
    team_id: 1,
    title: 'Team Leader',
    created_at: '2017-11-04T21:55:18.759Z',
    updated_at: '2017-11-04T21:55:18.759Z'
  }, {
    id: 20,
    team_id: 1,
    title: 'Senior Team Leader',
    created_at: '2017-11-04T21:55:18.760Z',
    updated_at: '2017-11-04T21:55:18.760Z'
  }, {
    id: 21,
    team_id: 1,
    title: 'Senior Resource Educator',
    created_at: '2017-11-04T21:55:18.761Z',
    updated_at: '2017-11-04T21:55:18.761Z'
  }, {
    id: 22,
    team_id: 1,
    title: 'Issue Leader',
    created_at: '2017-11-04T21:55:18.762Z',
    updated_at: '2017-11-04T21:55:18.762Z'
  }, {
    id: 23,
    team_id: 1,
    title: 'Regional Issue Educator',
    created_at: '2017-11-04T21:55:18.763Z',
    updated_at: '2017-11-04T21:55:18.763Z'
  }, {
    id: 24,
    team_id: 1,
    title: 'Senior Issue Leader',
    created_at: '2017-11-04T21:55:18.764Z',
    updated_at: '2017-11-04T21:55:18.764Z'
  }, {
    id: 25,
    team_id: 1,
    title: 'Senior Issue Educator',
    created_at: '2017-11-04T21:55:18.764Z',
    updated_at: '2017-11-04T21:55:18.764Z'
  }, {
    id: 26,
    team_id: 1,
    title: 'Program Director',
    created_at: '2017-11-04T21:55:18.765Z',
    updated_at: '2017-11-04T21:55:18.765Z'
  }, {
    id: 27,
    team_id: 1,
    title: 'Executive Director',
    created_at: '2017-11-04T21:55:18.766Z',
    updated_at: '2017-11-04T21:55:18.766Z'
  }, {
    id: 28,
    team_id: 1,
    title: 'Administrative Assistant I',
    created_at: '2017-11-04T21:55:18.767Z',
    updated_at: '2017-11-04T21:55:18.767Z'
  }, {
    id: 29,
    team_id: 1,
    title: 'Custodian',
    created_at: '2017-11-04T21:55:18.767Z',
    updated_at: '2017-11-04T21:55:18.767Z'
  }, {
    id: 30,
    team_id: 1,
    title: 'Farm Worker I',
    created_at: '2017-11-04T21:55:18.768Z',
    updated_at: '2017-11-04T21:55:18.768Z'
  }, {
    id: 31,
    team_id: 1,
    title: 'Administrative Assistant II',
    created_at: '2017-11-04T21:55:18.768Z',
    updated_at: '2017-11-04T21:55:18.768Z'
  }, {
    id: 32,
    team_id: 1,
    title: 'Account Representative I',
    created_at: '2017-11-04T21:55:18.768Z',
    updated_at: '2017-11-04T21:55:18.769Z'
  }, {
    id: 33,
    team_id: 1,
    title: 'Farm Worker II',
    created_at: '2017-11-04T21:55:18.769Z',
    updated_at: '2017-11-04T21:55:18.769Z'
  }, {
    id: 34,
    team_id: 1,
    title: 'Account Representative II',
    created_at: '2017-11-04T21:55:18.769Z',
    updated_at: '2017-11-04T21:55:18.769Z'
  }, {
    id: 35,
    team_id: 1,
    title: 'Facilities Coordinator I',
    created_at: '2017-11-04T21:55:18.770Z',
    updated_at: '2017-11-04T21:55:18.770Z'
  }, {
    id: 36,
    team_id: 1,
    title: 'HR Representative',
    created_at: '2017-11-04T21:55:18.770Z',
    updated_at: '2017-11-04T21:55:18.770Z'
  }, {
    id: 37,
    team_id: 1,
    title: 'IT Representative',
    created_at: '2017-11-04T21:55:18.770Z',
    updated_at: '2017-11-04T21:55:18.770Z'
  }, {
    id: 38,
    team_id: 1,
    title: 'Senior Administrative Assistant',
    created_at: '2017-11-04T21:55:18.771Z',
    updated_at: '2017-11-04T21:55:18.771Z'
  }, {
    id: 39,
    team_id: 1,
    title: 'IT Coordinator',
    created_at: '2017-11-04T21:55:18.771Z',
    updated_at: '2017-11-04T21:55:18.771Z'
  }, {
    id: 40,
    team_id: 1,
    title: 'HR Coordinator',
    created_at: '2017-11-04T21:55:18.771Z',
    updated_at: '2017-11-04T21:55:18.771Z'
  }, {
    id: 41,
    team_id: 1,
    title: 'Finance Coordinator',
    created_at: '2017-11-04T21:55:18.772Z',
    updated_at: '2017-11-04T21:55:18.772Z'
  }, {
    id: 42,
    team_id: 1,
    title: 'Farm Coordinator',
    created_at: '2017-11-04T21:55:18.772Z',
    updated_at: '2017-11-04T21:55:18.772Z'
  }, {
    id: 43,
    team_id: 1,
    title: 'Facilities Coordinator II',
    created_at: '2017-11-04T21:55:18.773Z',
    updated_at: '2017-11-04T21:55:18.773Z'
  }, {
    id: 44,
    team_id: 1,
    title: 'Operations Coordinator I',
    created_at: '2017-11-04T21:55:18.773Z',
    updated_at: '2017-11-04T21:55:18.773Z'
  }, {
    id: 45,
    team_id: 1,
    title: 'Finance Coordinator II',
    created_at: '2017-11-04T21:55:18.773Z',
    updated_at: '2017-11-04T21:55:18.773Z'
  }, {
    id: 46,
    team_id: 1,
    title: 'Payroll Accounts Coordinator',
    created_at: '2017-11-04T21:55:18.774Z',
    updated_at: '2017-11-04T21:55:18.774Z'
  }, {
    id: 47,
    team_id: 1,
    title: 'Operations Coordinator II',
    created_at: '2017-11-04T21:55:18.774Z',
    updated_at: '2017-11-04T21:55:18.774Z'
  }, {
    id: 48,
    team_id: 1,
    title: 'Regional HR Coordinator',
    created_at: '2017-11-04T21:55:18.774Z',
    updated_at: '2017-11-04T21:55:18.774Z'
  }, {
    id: 49,
    team_id: 1,
    title: 'Regional IT Coordinator',
    created_at: '2017-11-04T21:55:18.775Z',
    updated_at: '2017-11-04T21:55:18.775Z'
  }, {
    id: 50,
    team_id: 1,
    title: 'Regional Finance Coordinator',
    created_at: '2017-11-04T21:55:18.775Z',
    updated_at: '2017-11-04T21:55:18.775Z'
  }, {
    id: 51,
    team_id: 1,
    title: 'Farm Supervisor',
    created_at: '2017-11-04T21:55:18.776Z',
    updated_at: '2017-11-04T21:55:18.776Z'
  }, {
    id: 52,
    team_id: 1,
    title: 'Payroll Accounts Manager',
    created_at: '2017-11-04T21:55:18.776Z',
    updated_at: '2017-11-04T21:55:18.776Z'
  }, {
    id: 53,
    team_id: 1,
    title: 'Facilities Manager',
    created_at: '2017-11-04T21:55:18.777Z',
    updated_at: '2017-11-04T21:55:18.777Z'
  }, {
    id: 54,
    team_id: 1,
    title: 'Farm Manager',
    created_at: '2017-11-04T21:55:18.778Z',
    updated_at: '2017-11-04T21:55:18.778Z'
  }, {
    id: 55,
    team_id: 1,
    title: 'Administrator',
    created_at: '2017-11-04T21:55:18.779Z',
    updated_at: '2017-11-04T21:55:18.779Z'
  }, {
    id: 56,
    team_id: 1,
    title: 'HR Manager',
    created_at: '2017-11-04T21:55:18.779Z',
    updated_at: '2017-11-04T21:55:18.779Z'
  }, {
    id: 57,
    team_id: 1,
    title: 'Finance Manager',
    created_at: '2017-11-04T21:55:18.780Z',
    updated_at: '2017-11-04T21:55:18.780Z'
  }, {
    id: 58,
    team_id: 1,
    title: 'IT Manager',
    created_at: '2017-11-04T21:55:18.781Z',
    updated_at: '2017-11-04T21:55:18.781Z'
  }, {
    id: 59,
    team_id: 1,
    title: 'Senior Administrator',
    created_at: '2017-11-04T21:55:18.782Z',
    updated_at: '2017-11-04T21:55:18.782Z'
  }, {
    id: 60,
    team_id: 1,
    title: 'Lead Finance Manager',
    created_at: '2017-11-04T21:55:18.782Z',
    updated_at: '2017-11-04T21:55:18.782Z'
  }, {
    id: 61,
    team_id: 1,
    title: 'Lead HR Manager',
    created_at: '2017-11-04T21:55:18.783Z',
    updated_at: '2017-11-04T21:55:18.783Z'
  }, {
    id: 62,
    team_id: 1,
    title: 'Lead IT Manager',
    created_at: '2017-11-04T21:55:18.784Z',
    updated_at: '2017-11-04T21:55:18.784Z'
  }]
});

exports.default = classificationsFixtures;