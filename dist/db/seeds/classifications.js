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
    created_at: '2017-10-12T14:02:26.010Z',
    updated_at: '2017-10-12T14:02:26.010Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Program Assistant II',
    created_at: '2017-10-12T14:02:26.011Z',
    updated_at: '2017-10-12T14:02:26.011Z'
  }, {
    id: 3,
    team_id: 1,
    title: 'Program Educator I',
    created_at: '2017-10-12T14:02:26.013Z',
    updated_at: '2017-10-12T14:02:26.013Z'
  }, {
    id: 4,
    team_id: 1,
    title: 'Program Coordinator I',
    created_at: '2017-10-12T14:02:26.014Z',
    updated_at: '2017-10-12T14:02:26.014Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Program Educator II',
    created_at: '2017-10-12T14:02:26.015Z',
    updated_at: '2017-10-12T14:02:26.015Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Program Coordinator II',
    created_at: '2017-10-12T14:02:26.015Z',
    updated_at: '2017-10-12T14:02:26.015Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Communications Coordinator',
    created_at: '2017-10-12T14:02:26.016Z',
    updated_at: '2017-10-12T14:02:26.016Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Subject Educator I',
    created_at: '2017-10-12T14:02:26.016Z',
    updated_at: '2017-10-12T14:02:26.016Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Subect Educator II',
    created_at: '2017-10-12T14:02:26.017Z',
    updated_at: '2017-10-12T14:02:26.017Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Program Leader I',
    created_at: '2017-10-12T14:02:26.018Z',
    updated_at: '2017-10-12T14:02:26.018Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Program Leader II',
    created_at: '2017-10-12T14:02:26.019Z',
    updated_at: '2017-10-12T14:02:26.019Z'
  }, {
    id: 12,
    team_id: 1,
    title: 'Subject Educator III',
    created_at: '2017-10-12T14:02:26.020Z',
    updated_at: '2017-10-12T14:02:26.020Z'
  }, {
    id: 13,
    team_id: 1,
    title: 'Communications Manager',
    created_at: '2017-10-12T14:02:26.021Z',
    updated_at: '2017-10-12T14:02:26.021Z'
  }, {
    id: 14,
    team_id: 1,
    title: 'Community Liason',
    created_at: '2017-10-12T14:02:26.021Z',
    updated_at: '2017-10-12T14:02:26.021Z'
  }, {
    id: 15,
    team_id: 1,
    title: 'Community Educator',
    created_at: '2017-10-12T14:02:26.022Z',
    updated_at: '2017-10-12T14:02:26.022Z'
  }, {
    id: 16,
    team_id: 1,
    title: 'Grants and Contract Liason',
    created_at: '2017-10-12T14:02:26.023Z',
    updated_at: '2017-10-12T14:02:26.023Z'
  }, {
    id: 17,
    team_id: 1,
    title: 'Public Affairs Liason',
    created_at: '2017-10-12T14:02:26.023Z',
    updated_at: '2017-10-12T14:02:26.023Z'
  }, {
    id: 18,
    team_id: 1,
    title: 'Resource Educator',
    created_at: '2017-10-12T14:02:26.024Z',
    updated_at: '2017-10-12T14:02:26.024Z'
  }, {
    id: 19,
    team_id: 1,
    title: 'Team Leader',
    created_at: '2017-10-12T14:02:26.025Z',
    updated_at: '2017-10-12T14:02:26.025Z'
  }, {
    id: 20,
    team_id: 1,
    title: 'Senior Team Leader',
    created_at: '2017-10-12T14:02:26.026Z',
    updated_at: '2017-10-12T14:02:26.026Z'
  }, {
    id: 21,
    team_id: 1,
    title: 'Senior Resource Educator',
    created_at: '2017-10-12T14:02:26.026Z',
    updated_at: '2017-10-12T14:02:26.026Z'
  }, {
    id: 22,
    team_id: 1,
    title: 'Issue Leader',
    created_at: '2017-10-12T14:02:26.027Z',
    updated_at: '2017-10-12T14:02:26.027Z'
  }, {
    id: 23,
    team_id: 1,
    title: 'Regional Issue Educator',
    created_at: '2017-10-12T14:02:26.028Z',
    updated_at: '2017-10-12T14:02:26.028Z'
  }, {
    id: 24,
    team_id: 1,
    title: 'Senior Issue Leader',
    created_at: '2017-10-12T14:02:26.029Z',
    updated_at: '2017-10-12T14:02:26.029Z'
  }, {
    id: 25,
    team_id: 1,
    title: 'Senior Issue Educator',
    created_at: '2017-10-12T14:02:26.030Z',
    updated_at: '2017-10-12T14:02:26.030Z'
  }, {
    id: 26,
    team_id: 1,
    title: 'Program Director',
    created_at: '2017-10-12T14:02:26.031Z',
    updated_at: '2017-10-12T14:02:26.031Z'
  }, {
    id: 27,
    team_id: 1,
    title: 'Executive Director',
    created_at: '2017-10-12T14:02:26.031Z',
    updated_at: '2017-10-12T14:02:26.031Z'
  }, {
    id: 28,
    team_id: 1,
    title: 'Administrative Assistant I',
    created_at: '2017-10-12T14:02:26.032Z',
    updated_at: '2017-10-12T14:02:26.032Z'
  }, {
    id: 29,
    team_id: 1,
    title: 'Custodian',
    created_at: '2017-10-12T14:02:26.033Z',
    updated_at: '2017-10-12T14:02:26.033Z'
  }, {
    id: 30,
    team_id: 1,
    title: 'Farm Worker I',
    created_at: '2017-10-12T14:02:26.033Z',
    updated_at: '2017-10-12T14:02:26.033Z'
  }, {
    id: 31,
    team_id: 1,
    title: 'Administrative Assistant II',
    created_at: '2017-10-12T14:02:26.033Z',
    updated_at: '2017-10-12T14:02:26.033Z'
  }, {
    id: 32,
    team_id: 1,
    title: 'Account Representative I',
    created_at: '2017-10-12T14:02:26.034Z',
    updated_at: '2017-10-12T14:02:26.034Z'
  }, {
    id: 33,
    team_id: 1,
    title: 'Farm Worker II',
    created_at: '2017-10-12T14:02:26.034Z',
    updated_at: '2017-10-12T14:02:26.034Z'
  }, {
    id: 34,
    team_id: 1,
    title: 'Account Representative II',
    created_at: '2017-10-12T14:02:26.034Z',
    updated_at: '2017-10-12T14:02:26.035Z'
  }, {
    id: 35,
    team_id: 1,
    title: 'Facilities Coordinator I',
    created_at: '2017-10-12T14:02:26.035Z',
    updated_at: '2017-10-12T14:02:26.035Z'
  }, {
    id: 36,
    team_id: 1,
    title: 'HR Representative',
    created_at: '2017-10-12T14:02:26.035Z',
    updated_at: '2017-10-12T14:02:26.035Z'
  }, {
    id: 37,
    team_id: 1,
    title: 'IT Representative',
    created_at: '2017-10-12T14:02:26.036Z',
    updated_at: '2017-10-12T14:02:26.036Z'
  }, {
    id: 38,
    team_id: 1,
    title: 'Senior Administrative Assistant',
    created_at: '2017-10-12T14:02:26.036Z',
    updated_at: '2017-10-12T14:02:26.036Z'
  }, {
    id: 39,
    team_id: 1,
    title: 'IT Coordinator',
    created_at: '2017-10-12T14:02:26.036Z',
    updated_at: '2017-10-12T14:02:26.036Z'
  }, {
    id: 40,
    team_id: 1,
    title: 'HR Coordinator',
    created_at: '2017-10-12T14:02:26.037Z',
    updated_at: '2017-10-12T14:02:26.037Z'
  }, {
    id: 41,
    team_id: 1,
    title: 'Finance Coordinator',
    created_at: '2017-10-12T14:02:26.037Z',
    updated_at: '2017-10-12T14:02:26.037Z'
  }, {
    id: 42,
    team_id: 1,
    title: 'Farm Coordinator',
    created_at: '2017-10-12T14:02:26.037Z',
    updated_at: '2017-10-12T14:02:26.038Z'
  }, {
    id: 43,
    team_id: 1,
    title: 'Facilities Coordinator II',
    created_at: '2017-10-12T14:02:26.038Z',
    updated_at: '2017-10-12T14:02:26.038Z'
  }, {
    id: 44,
    team_id: 1,
    title: 'Operations Coordinator I',
    created_at: '2017-10-12T14:02:26.038Z',
    updated_at: '2017-10-12T14:02:26.038Z'
  }, {
    id: 45,
    team_id: 1,
    title: 'Finance Coordinator II',
    created_at: '2017-10-12T14:02:26.039Z',
    updated_at: '2017-10-12T14:02:26.039Z'
  }, {
    id: 46,
    team_id: 1,
    title: 'Payroll Accounts Coordinator',
    created_at: '2017-10-12T14:02:26.039Z',
    updated_at: '2017-10-12T14:02:26.039Z'
  }, {
    id: 47,
    team_id: 1,
    title: 'Operations Coordinator II',
    created_at: '2017-10-12T14:02:26.039Z',
    updated_at: '2017-10-12T14:02:26.039Z'
  }, {
    id: 48,
    team_id: 1,
    title: 'Regional HR Coordinator',
    created_at: '2017-10-12T14:02:26.040Z',
    updated_at: '2017-10-12T14:02:26.040Z'
  }, {
    id: 49,
    team_id: 1,
    title: 'Regional IT Coordinator',
    created_at: '2017-10-12T14:02:26.040Z',
    updated_at: '2017-10-12T14:02:26.040Z'
  }, {
    id: 50,
    team_id: 1,
    title: 'Regional Finance Coordinator',
    created_at: '2017-10-12T14:02:26.041Z',
    updated_at: '2017-10-12T14:02:26.041Z'
  }, {
    id: 51,
    team_id: 1,
    title: 'Farm Supervisor',
    created_at: '2017-10-12T14:02:26.041Z',
    updated_at: '2017-10-12T14:02:26.041Z'
  }, {
    id: 52,
    team_id: 1,
    title: 'Payroll Accounts Manager',
    created_at: '2017-10-12T14:02:26.042Z',
    updated_at: '2017-10-12T14:02:26.042Z'
  }, {
    id: 53,
    team_id: 1,
    title: 'Facilities Manager',
    created_at: '2017-10-12T14:02:26.043Z',
    updated_at: '2017-10-12T14:02:26.043Z'
  }, {
    id: 54,
    team_id: 1,
    title: 'Farm Manager',
    created_at: '2017-10-12T14:02:26.043Z',
    updated_at: '2017-10-12T14:02:26.043Z'
  }, {
    id: 55,
    team_id: 1,
    title: 'Administrator',
    created_at: '2017-10-12T14:02:26.044Z',
    updated_at: '2017-10-12T14:02:26.044Z'
  }, {
    id: 56,
    team_id: 1,
    title: 'HR Manager',
    created_at: '2017-10-12T14:02:26.045Z',
    updated_at: '2017-10-12T14:02:26.045Z'
  }, {
    id: 57,
    team_id: 1,
    title: 'Finance Manager',
    created_at: '2017-10-12T14:02:26.046Z',
    updated_at: '2017-10-12T14:02:26.046Z'
  }, {
    id: 58,
    team_id: 1,
    title: 'IT Manager',
    created_at: '2017-10-12T14:02:26.046Z',
    updated_at: '2017-10-12T14:02:26.046Z'
  }, {
    id: 59,
    team_id: 1,
    title: 'Senior Administrator',
    created_at: '2017-10-12T14:02:26.047Z',
    updated_at: '2017-10-12T14:02:26.047Z'
  }, {
    id: 60,
    team_id: 1,
    title: 'Lead Finance Manager',
    created_at: '2017-10-12T14:02:26.048Z',
    updated_at: '2017-10-12T14:02:26.048Z'
  }, {
    id: 61,
    team_id: 1,
    title: 'Lead HR Manager',
    created_at: '2017-10-12T14:02:26.049Z',
    updated_at: '2017-10-12T14:02:26.049Z'
  }, {
    id: 62,
    team_id: 1,
    title: 'Lead IT Manager',
    created_at: '2017-10-12T14:02:26.050Z',
    updated_at: '2017-10-12T14:02:26.050Z'
  }]
});

exports.default = classificationsFixtures;