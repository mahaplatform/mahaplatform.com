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
    created_at: '2017-10-19T13:51:22.758Z',
    updated_at: '2017-10-19T13:51:22.758Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Program Assistant II',
    created_at: '2017-10-19T13:51:22.759Z',
    updated_at: '2017-10-19T13:51:22.759Z'
  }, {
    id: 3,
    team_id: 1,
    title: 'Program Educator I',
    created_at: '2017-10-19T13:51:22.760Z',
    updated_at: '2017-10-19T13:51:22.760Z'
  }, {
    id: 4,
    team_id: 1,
    title: 'Program Coordinator I',
    created_at: '2017-10-19T13:51:22.761Z',
    updated_at: '2017-10-19T13:51:22.761Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Program Educator II',
    created_at: '2017-10-19T13:51:22.761Z',
    updated_at: '2017-10-19T13:51:22.761Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Program Coordinator II',
    created_at: '2017-10-19T13:51:22.762Z',
    updated_at: '2017-10-19T13:51:22.762Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Communications Coordinator',
    created_at: '2017-10-19T13:51:22.763Z',
    updated_at: '2017-10-19T13:51:22.763Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Subject Educator I',
    created_at: '2017-10-19T13:51:22.763Z',
    updated_at: '2017-10-19T13:51:22.763Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Subect Educator II',
    created_at: '2017-10-19T13:51:22.764Z',
    updated_at: '2017-10-19T13:51:22.764Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Program Leader I',
    created_at: '2017-10-19T13:51:22.765Z',
    updated_at: '2017-10-19T13:51:22.765Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Program Leader II',
    created_at: '2017-10-19T13:51:22.766Z',
    updated_at: '2017-10-19T13:51:22.766Z'
  }, {
    id: 12,
    team_id: 1,
    title: 'Subject Educator III',
    created_at: '2017-10-19T13:51:22.767Z',
    updated_at: '2017-10-19T13:51:22.767Z'
  }, {
    id: 13,
    team_id: 1,
    title: 'Communications Manager',
    created_at: '2017-10-19T13:51:22.768Z',
    updated_at: '2017-10-19T13:51:22.768Z'
  }, {
    id: 14,
    team_id: 1,
    title: 'Community Liason',
    created_at: '2017-10-19T13:51:22.768Z',
    updated_at: '2017-10-19T13:51:22.768Z'
  }, {
    id: 15,
    team_id: 1,
    title: 'Community Educator',
    created_at: '2017-10-19T13:51:22.769Z',
    updated_at: '2017-10-19T13:51:22.769Z'
  }, {
    id: 16,
    team_id: 1,
    title: 'Grants and Contract Liason',
    created_at: '2017-10-19T13:51:22.770Z',
    updated_at: '2017-10-19T13:51:22.770Z'
  }, {
    id: 17,
    team_id: 1,
    title: 'Public Affairs Liason',
    created_at: '2017-10-19T13:51:22.771Z',
    updated_at: '2017-10-19T13:51:22.771Z'
  }, {
    id: 18,
    team_id: 1,
    title: 'Resource Educator',
    created_at: '2017-10-19T13:51:22.772Z',
    updated_at: '2017-10-19T13:51:22.772Z'
  }, {
    id: 19,
    team_id: 1,
    title: 'Team Leader',
    created_at: '2017-10-19T13:51:22.773Z',
    updated_at: '2017-10-19T13:51:22.773Z'
  }, {
    id: 20,
    team_id: 1,
    title: 'Senior Team Leader',
    created_at: '2017-10-19T13:51:22.774Z',
    updated_at: '2017-10-19T13:51:22.774Z'
  }, {
    id: 21,
    team_id: 1,
    title: 'Senior Resource Educator',
    created_at: '2017-10-19T13:51:22.775Z',
    updated_at: '2017-10-19T13:51:22.775Z'
  }, {
    id: 22,
    team_id: 1,
    title: 'Issue Leader',
    created_at: '2017-10-19T13:51:22.776Z',
    updated_at: '2017-10-19T13:51:22.776Z'
  }, {
    id: 23,
    team_id: 1,
    title: 'Regional Issue Educator',
    created_at: '2017-10-19T13:51:22.777Z',
    updated_at: '2017-10-19T13:51:22.777Z'
  }, {
    id: 24,
    team_id: 1,
    title: 'Senior Issue Leader',
    created_at: '2017-10-19T13:51:22.777Z',
    updated_at: '2017-10-19T13:51:22.777Z'
  }, {
    id: 25,
    team_id: 1,
    title: 'Senior Issue Educator',
    created_at: '2017-10-19T13:51:22.778Z',
    updated_at: '2017-10-19T13:51:22.778Z'
  }, {
    id: 26,
    team_id: 1,
    title: 'Program Director',
    created_at: '2017-10-19T13:51:22.779Z',
    updated_at: '2017-10-19T13:51:22.779Z'
  }, {
    id: 27,
    team_id: 1,
    title: 'Executive Director',
    created_at: '2017-10-19T13:51:22.780Z',
    updated_at: '2017-10-19T13:51:22.780Z'
  }, {
    id: 28,
    team_id: 1,
    title: 'Administrative Assistant I',
    created_at: '2017-10-19T13:51:22.781Z',
    updated_at: '2017-10-19T13:51:22.781Z'
  }, {
    id: 29,
    team_id: 1,
    title: 'Custodian',
    created_at: '2017-10-19T13:51:22.781Z',
    updated_at: '2017-10-19T13:51:22.781Z'
  }, {
    id: 30,
    team_id: 1,
    title: 'Farm Worker I',
    created_at: '2017-10-19T13:51:22.781Z',
    updated_at: '2017-10-19T13:51:22.781Z'
  }, {
    id: 31,
    team_id: 1,
    title: 'Administrative Assistant II',
    created_at: '2017-10-19T13:51:22.782Z',
    updated_at: '2017-10-19T13:51:22.782Z'
  }, {
    id: 32,
    team_id: 1,
    title: 'Account Representative I',
    created_at: '2017-10-19T13:51:22.782Z',
    updated_at: '2017-10-19T13:51:22.782Z'
  }, {
    id: 33,
    team_id: 1,
    title: 'Farm Worker II',
    created_at: '2017-10-19T13:51:22.782Z',
    updated_at: '2017-10-19T13:51:22.782Z'
  }, {
    id: 34,
    team_id: 1,
    title: 'Account Representative II',
    created_at: '2017-10-19T13:51:22.783Z',
    updated_at: '2017-10-19T13:51:22.783Z'
  }, {
    id: 35,
    team_id: 1,
    title: 'Facilities Coordinator I',
    created_at: '2017-10-19T13:51:22.783Z',
    updated_at: '2017-10-19T13:51:22.783Z'
  }, {
    id: 36,
    team_id: 1,
    title: 'HR Representative',
    created_at: '2017-10-19T13:51:22.783Z',
    updated_at: '2017-10-19T13:51:22.783Z'
  }, {
    id: 37,
    team_id: 1,
    title: 'IT Representative',
    created_at: '2017-10-19T13:51:22.784Z',
    updated_at: '2017-10-19T13:51:22.784Z'
  }, {
    id: 38,
    team_id: 1,
    title: 'Senior Administrative Assistant',
    created_at: '2017-10-19T13:51:22.784Z',
    updated_at: '2017-10-19T13:51:22.784Z'
  }, {
    id: 39,
    team_id: 1,
    title: 'IT Coordinator',
    created_at: '2017-10-19T13:51:22.784Z',
    updated_at: '2017-10-19T13:51:22.784Z'
  }, {
    id: 40,
    team_id: 1,
    title: 'HR Coordinator',
    created_at: '2017-10-19T13:51:22.785Z',
    updated_at: '2017-10-19T13:51:22.785Z'
  }, {
    id: 41,
    team_id: 1,
    title: 'Finance Coordinator',
    created_at: '2017-10-19T13:51:22.785Z',
    updated_at: '2017-10-19T13:51:22.785Z'
  }, {
    id: 42,
    team_id: 1,
    title: 'Farm Coordinator',
    created_at: '2017-10-19T13:51:22.785Z',
    updated_at: '2017-10-19T13:51:22.785Z'
  }, {
    id: 43,
    team_id: 1,
    title: 'Facilities Coordinator II',
    created_at: '2017-10-19T13:51:22.786Z',
    updated_at: '2017-10-19T13:51:22.786Z'
  }, {
    id: 44,
    team_id: 1,
    title: 'Operations Coordinator I',
    created_at: '2017-10-19T13:51:22.786Z',
    updated_at: '2017-10-19T13:51:22.786Z'
  }, {
    id: 45,
    team_id: 1,
    title: 'Finance Coordinator II',
    created_at: '2017-10-19T13:51:22.787Z',
    updated_at: '2017-10-19T13:51:22.787Z'
  }, {
    id: 46,
    team_id: 1,
    title: 'Payroll Accounts Coordinator',
    created_at: '2017-10-19T13:51:22.787Z',
    updated_at: '2017-10-19T13:51:22.787Z'
  }, {
    id: 47,
    team_id: 1,
    title: 'Operations Coordinator II',
    created_at: '2017-10-19T13:51:22.787Z',
    updated_at: '2017-10-19T13:51:22.787Z'
  }, {
    id: 48,
    team_id: 1,
    title: 'Regional HR Coordinator',
    created_at: '2017-10-19T13:51:22.788Z',
    updated_at: '2017-10-19T13:51:22.788Z'
  }, {
    id: 49,
    team_id: 1,
    title: 'Regional IT Coordinator',
    created_at: '2017-10-19T13:51:22.788Z',
    updated_at: '2017-10-19T13:51:22.788Z'
  }, {
    id: 50,
    team_id: 1,
    title: 'Regional Finance Coordinator',
    created_at: '2017-10-19T13:51:22.788Z',
    updated_at: '2017-10-19T13:51:22.788Z'
  }, {
    id: 51,
    team_id: 1,
    title: 'Farm Supervisor',
    created_at: '2017-10-19T13:51:22.789Z',
    updated_at: '2017-10-19T13:51:22.789Z'
  }, {
    id: 52,
    team_id: 1,
    title: 'Payroll Accounts Manager',
    created_at: '2017-10-19T13:51:22.789Z',
    updated_at: '2017-10-19T13:51:22.789Z'
  }, {
    id: 53,
    team_id: 1,
    title: 'Facilities Manager',
    created_at: '2017-10-19T13:51:22.790Z',
    updated_at: '2017-10-19T13:51:22.790Z'
  }, {
    id: 54,
    team_id: 1,
    title: 'Farm Manager',
    created_at: '2017-10-19T13:51:22.791Z',
    updated_at: '2017-10-19T13:51:22.791Z'
  }, {
    id: 55,
    team_id: 1,
    title: 'Administrator',
    created_at: '2017-10-19T13:51:22.792Z',
    updated_at: '2017-10-19T13:51:22.792Z'
  }, {
    id: 56,
    team_id: 1,
    title: 'HR Manager',
    created_at: '2017-10-19T13:51:22.792Z',
    updated_at: '2017-10-19T13:51:22.792Z'
  }, {
    id: 57,
    team_id: 1,
    title: 'Finance Manager',
    created_at: '2017-10-19T13:51:22.793Z',
    updated_at: '2017-10-19T13:51:22.793Z'
  }, {
    id: 58,
    team_id: 1,
    title: 'IT Manager',
    created_at: '2017-10-19T13:51:22.794Z',
    updated_at: '2017-10-19T13:51:22.794Z'
  }, {
    id: 59,
    team_id: 1,
    title: 'Senior Administrator',
    created_at: '2017-10-19T13:51:22.794Z',
    updated_at: '2017-10-19T13:51:22.794Z'
  }, {
    id: 60,
    team_id: 1,
    title: 'Lead Finance Manager',
    created_at: '2017-10-19T13:51:22.795Z',
    updated_at: '2017-10-19T13:51:22.795Z'
  }, {
    id: 61,
    team_id: 1,
    title: 'Lead HR Manager',
    created_at: '2017-10-19T13:51:22.796Z',
    updated_at: '2017-10-19T13:51:22.796Z'
  }, {
    id: 62,
    team_id: 1,
    title: 'Lead IT Manager',
    created_at: '2017-10-19T13:51:22.797Z',
    updated_at: '2017-10-19T13:51:22.797Z'
  }]
});

exports.default = classificationsFixtures;