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
    created_at: '2017-09-12T20:47:27.347Z',
    updated_at: '2017-09-12T20:47:27.347Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Program Assistant II',
    created_at: '2017-09-12T20:47:27.349Z',
    updated_at: '2017-09-12T20:47:27.349Z'
  }, {
    id: 3,
    team_id: 1,
    title: 'Program Educator I',
    created_at: '2017-09-12T20:47:27.349Z',
    updated_at: '2017-09-12T20:47:27.349Z'
  }, {
    id: 4,
    team_id: 1,
    title: 'Program Coordinator I',
    created_at: '2017-09-12T20:47:27.350Z',
    updated_at: '2017-09-12T20:47:27.350Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Program Educator II',
    created_at: '2017-09-12T20:47:27.351Z',
    updated_at: '2017-09-12T20:47:27.351Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Program Coordinator II',
    created_at: '2017-09-12T20:47:27.351Z',
    updated_at: '2017-09-12T20:47:27.351Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Communications Coordinator',
    created_at: '2017-09-12T20:47:27.353Z',
    updated_at: '2017-09-12T20:47:27.353Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Subject Educator I',
    created_at: '2017-09-12T20:47:27.353Z',
    updated_at: '2017-09-12T20:47:27.353Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Subect Educator II',
    created_at: '2017-09-12T20:47:27.354Z',
    updated_at: '2017-09-12T20:47:27.354Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Program Leader I',
    created_at: '2017-09-12T20:47:27.355Z',
    updated_at: '2017-09-12T20:47:27.355Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Program Leader II',
    created_at: '2017-09-12T20:47:27.356Z',
    updated_at: '2017-09-12T20:47:27.356Z'
  }, {
    id: 12,
    team_id: 1,
    title: 'Subject Educator III',
    created_at: '2017-09-12T20:47:27.356Z',
    updated_at: '2017-09-12T20:47:27.356Z'
  }, {
    id: 13,
    team_id: 1,
    title: 'Communications Manager',
    created_at: '2017-09-12T20:47:27.357Z',
    updated_at: '2017-09-12T20:47:27.357Z'
  }, {
    id: 14,
    team_id: 1,
    title: 'Community Liason',
    created_at: '2017-09-12T20:47:27.358Z',
    updated_at: '2017-09-12T20:47:27.358Z'
  }, {
    id: 15,
    team_id: 1,
    title: 'Community Educator',
    created_at: '2017-09-12T20:47:27.358Z',
    updated_at: '2017-09-12T20:47:27.358Z'
  }, {
    id: 16,
    team_id: 1,
    title: 'Grants and Contract Liason',
    created_at: '2017-09-12T20:47:27.359Z',
    updated_at: '2017-09-12T20:47:27.359Z'
  }, {
    id: 17,
    team_id: 1,
    title: 'Public Affairs Liason',
    created_at: '2017-09-12T20:47:27.360Z',
    updated_at: '2017-09-12T20:47:27.360Z'
  }, {
    id: 18,
    team_id: 1,
    title: 'Resource Educator',
    created_at: '2017-09-12T20:47:27.360Z',
    updated_at: '2017-09-12T20:47:27.360Z'
  }, {
    id: 19,
    team_id: 1,
    title: 'Team Leader',
    created_at: '2017-09-12T20:47:27.361Z',
    updated_at: '2017-09-12T20:47:27.361Z'
  }, {
    id: 20,
    team_id: 1,
    title: 'Senior Team Leader',
    created_at: '2017-09-12T20:47:27.362Z',
    updated_at: '2017-09-12T20:47:27.362Z'
  }, {
    id: 21,
    team_id: 1,
    title: 'Senior Resource Educator',
    created_at: '2017-09-12T20:47:27.363Z',
    updated_at: '2017-09-12T20:47:27.363Z'
  }, {
    id: 22,
    team_id: 1,
    title: 'Issue Leader',
    created_at: '2017-09-12T20:47:27.364Z',
    updated_at: '2017-09-12T20:47:27.364Z'
  }, {
    id: 23,
    team_id: 1,
    title: 'Regional Issue Educator',
    created_at: '2017-09-12T20:47:27.365Z',
    updated_at: '2017-09-12T20:47:27.365Z'
  }, {
    id: 24,
    team_id: 1,
    title: 'Senior Issue Leader',
    created_at: '2017-09-12T20:47:27.365Z',
    updated_at: '2017-09-12T20:47:27.365Z'
  }, {
    id: 25,
    team_id: 1,
    title: 'Senior Issue Educator',
    created_at: '2017-09-12T20:47:27.366Z',
    updated_at: '2017-09-12T20:47:27.366Z'
  }, {
    id: 26,
    team_id: 1,
    title: 'Program Director',
    created_at: '2017-09-12T20:47:27.367Z',
    updated_at: '2017-09-12T20:47:27.367Z'
  }, {
    id: 27,
    team_id: 1,
    title: 'Executive Director',
    created_at: '2017-09-12T20:47:27.368Z',
    updated_at: '2017-09-12T20:47:27.368Z'
  }, {
    id: 28,
    team_id: 1,
    title: 'Administrative Assistant I',
    created_at: '2017-09-12T20:47:27.369Z',
    updated_at: '2017-09-12T20:47:27.369Z'
  }, {
    id: 29,
    team_id: 1,
    title: 'Custodian',
    created_at: '2017-09-12T20:47:27.369Z',
    updated_at: '2017-09-12T20:47:27.369Z'
  }, {
    id: 30,
    team_id: 1,
    title: 'Farm Worker I',
    created_at: '2017-09-12T20:47:27.370Z',
    updated_at: '2017-09-12T20:47:27.370Z'
  }, {
    id: 31,
    team_id: 1,
    title: 'Administrative Assistant II',
    created_at: '2017-09-12T20:47:27.370Z',
    updated_at: '2017-09-12T20:47:27.370Z'
  }, {
    id: 32,
    team_id: 1,
    title: 'Account Representative I',
    created_at: '2017-09-12T20:47:27.370Z',
    updated_at: '2017-09-12T20:47:27.370Z'
  }, {
    id: 33,
    team_id: 1,
    title: 'Farm Worker II',
    created_at: '2017-09-12T20:47:27.371Z',
    updated_at: '2017-09-12T20:47:27.371Z'
  }, {
    id: 34,
    team_id: 1,
    title: 'Account Representative II',
    created_at: '2017-09-12T20:47:27.371Z',
    updated_at: '2017-09-12T20:47:27.371Z'
  }, {
    id: 35,
    team_id: 1,
    title: 'Facilities Coordinator I',
    created_at: '2017-09-12T20:47:27.372Z',
    updated_at: '2017-09-12T20:47:27.372Z'
  }, {
    id: 36,
    team_id: 1,
    title: 'HR Representative',
    created_at: '2017-09-12T20:47:27.372Z',
    updated_at: '2017-09-12T20:47:27.372Z'
  }, {
    id: 37,
    team_id: 1,
    title: 'IT Representative',
    created_at: '2017-09-12T20:47:27.372Z',
    updated_at: '2017-09-12T20:47:27.372Z'
  }, {
    id: 38,
    team_id: 1,
    title: 'Senior Administrative Assistant',
    created_at: '2017-09-12T20:47:27.373Z',
    updated_at: '2017-09-12T20:47:27.373Z'
  }, {
    id: 39,
    team_id: 1,
    title: 'IT Coordinator',
    created_at: '2017-09-12T20:47:27.373Z',
    updated_at: '2017-09-12T20:47:27.373Z'
  }, {
    id: 40,
    team_id: 1,
    title: 'HR Coordinator',
    created_at: '2017-09-12T20:47:27.374Z',
    updated_at: '2017-09-12T20:47:27.374Z'
  }, {
    id: 41,
    team_id: 1,
    title: 'Finance Coordinator',
    created_at: '2017-09-12T20:47:27.374Z',
    updated_at: '2017-09-12T20:47:27.374Z'
  }, {
    id: 42,
    team_id: 1,
    title: 'Farm Coordinator',
    created_at: '2017-09-12T20:47:27.374Z',
    updated_at: '2017-09-12T20:47:27.374Z'
  }, {
    id: 43,
    team_id: 1,
    title: 'Facilities Coordinator II',
    created_at: '2017-09-12T20:47:27.375Z',
    updated_at: '2017-09-12T20:47:27.375Z'
  }, {
    id: 44,
    team_id: 1,
    title: 'Operations Coordinator I',
    created_at: '2017-09-12T20:47:27.375Z',
    updated_at: '2017-09-12T20:47:27.375Z'
  }, {
    id: 45,
    team_id: 1,
    title: 'Finance Coordinator II',
    created_at: '2017-09-12T20:47:27.376Z',
    updated_at: '2017-09-12T20:47:27.376Z'
  }, {
    id: 46,
    team_id: 1,
    title: 'Payroll Accounts Coordinator',
    created_at: '2017-09-12T20:47:27.376Z',
    updated_at: '2017-09-12T20:47:27.376Z'
  }, {
    id: 47,
    team_id: 1,
    title: 'Operations Coordinator II',
    created_at: '2017-09-12T20:47:27.376Z',
    updated_at: '2017-09-12T20:47:27.376Z'
  }, {
    id: 48,
    team_id: 1,
    title: 'Regional HR Coordinator',
    created_at: '2017-09-12T20:47:27.377Z',
    updated_at: '2017-09-12T20:47:27.377Z'
  }, {
    id: 49,
    team_id: 1,
    title: 'Regional IT Coordinator',
    created_at: '2017-09-12T20:47:27.377Z',
    updated_at: '2017-09-12T20:47:27.377Z'
  }, {
    id: 50,
    team_id: 1,
    title: 'Regional Finance Coordinator',
    created_at: '2017-09-12T20:47:27.378Z',
    updated_at: '2017-09-12T20:47:27.378Z'
  }, {
    id: 51,
    team_id: 1,
    title: 'Farm Supervisor',
    created_at: '2017-09-12T20:47:27.378Z',
    updated_at: '2017-09-12T20:47:27.378Z'
  }, {
    id: 52,
    team_id: 1,
    title: 'Payroll Accounts Manager',
    created_at: '2017-09-12T20:47:27.379Z',
    updated_at: '2017-09-12T20:47:27.379Z'
  }, {
    id: 53,
    team_id: 1,
    title: 'Facilities Manager',
    created_at: '2017-09-12T20:47:27.380Z',
    updated_at: '2017-09-12T20:47:27.380Z'
  }, {
    id: 54,
    team_id: 1,
    title: 'Farm Manager',
    created_at: '2017-09-12T20:47:27.381Z',
    updated_at: '2017-09-12T20:47:27.381Z'
  }, {
    id: 55,
    team_id: 1,
    title: 'Administrator',
    created_at: '2017-09-12T20:47:27.381Z',
    updated_at: '2017-09-12T20:47:27.381Z'
  }, {
    id: 56,
    team_id: 1,
    title: 'HR Manager',
    created_at: '2017-09-12T20:47:27.382Z',
    updated_at: '2017-09-12T20:47:27.382Z'
  }, {
    id: 57,
    team_id: 1,
    title: 'Finance Manager',
    created_at: '2017-09-12T20:47:27.383Z',
    updated_at: '2017-09-12T20:47:27.383Z'
  }, {
    id: 58,
    team_id: 1,
    title: 'IT Manager',
    created_at: '2017-09-12T20:47:27.384Z',
    updated_at: '2017-09-12T20:47:27.384Z'
  }, {
    id: 59,
    team_id: 1,
    title: 'Senior Administrator',
    created_at: '2017-09-12T20:47:27.384Z',
    updated_at: '2017-09-12T20:47:27.384Z'
  }, {
    id: 60,
    team_id: 1,
    title: 'Lead Finance Manager',
    created_at: '2017-09-12T20:47:27.385Z',
    updated_at: '2017-09-12T20:47:27.385Z'
  }, {
    id: 61,
    team_id: 1,
    title: 'Lead HR Manager',
    created_at: '2017-09-12T20:47:27.386Z',
    updated_at: '2017-09-12T20:47:27.386Z'
  }, {
    id: 62,
    team_id: 1,
    title: 'Lead IT Manager',
    created_at: '2017-09-12T20:47:27.387Z',
    updated_at: '2017-09-12T20:47:27.387Z'
  }]
});

exports.default = classificationsFixtures;