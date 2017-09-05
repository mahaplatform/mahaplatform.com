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
    created_at: '2017-09-05T16:52:07.527Z',
    updated_at: '2017-09-05T16:52:07.527Z'
  }, {
    id: 2,
    team_id: 1,
    title: 'Program Assistant II',
    created_at: '2017-09-05T16:52:07.528Z',
    updated_at: '2017-09-05T16:52:07.528Z'
  }, {
    id: 3,
    team_id: 1,
    title: 'Program Educator I',
    created_at: '2017-09-05T16:52:07.530Z',
    updated_at: '2017-09-05T16:52:07.530Z'
  }, {
    id: 4,
    team_id: 1,
    title: 'Program Coordinator I',
    created_at: '2017-09-05T16:52:07.531Z',
    updated_at: '2017-09-05T16:52:07.531Z'
  }, {
    id: 5,
    team_id: 1,
    title: 'Program Educator II',
    created_at: '2017-09-05T16:52:07.532Z',
    updated_at: '2017-09-05T16:52:07.532Z'
  }, {
    id: 6,
    team_id: 1,
    title: 'Program Coordinator II',
    created_at: '2017-09-05T16:52:07.533Z',
    updated_at: '2017-09-05T16:52:07.533Z'
  }, {
    id: 7,
    team_id: 1,
    title: 'Communications Coordinator',
    created_at: '2017-09-05T16:52:07.534Z',
    updated_at: '2017-09-05T16:52:07.534Z'
  }, {
    id: 8,
    team_id: 1,
    title: 'Subject Educator I',
    created_at: '2017-09-05T16:52:07.534Z',
    updated_at: '2017-09-05T16:52:07.534Z'
  }, {
    id: 9,
    team_id: 1,
    title: 'Subect Educator II',
    created_at: '2017-09-05T16:52:07.535Z',
    updated_at: '2017-09-05T16:52:07.535Z'
  }, {
    id: 10,
    team_id: 1,
    title: 'Program Leader I',
    created_at: '2017-09-05T16:52:07.536Z',
    updated_at: '2017-09-05T16:52:07.536Z'
  }, {
    id: 11,
    team_id: 1,
    title: 'Program Leader II',
    created_at: '2017-09-05T16:52:07.538Z',
    updated_at: '2017-09-05T16:52:07.538Z'
  }, {
    id: 12,
    team_id: 1,
    title: 'Subject Educator III',
    created_at: '2017-09-05T16:52:07.538Z',
    updated_at: '2017-09-05T16:52:07.538Z'
  }, {
    id: 13,
    team_id: 1,
    title: 'Communications Manager',
    created_at: '2017-09-05T16:52:07.539Z',
    updated_at: '2017-09-05T16:52:07.539Z'
  }, {
    id: 14,
    team_id: 1,
    title: 'Community Liason',
    created_at: '2017-09-05T16:52:07.540Z',
    updated_at: '2017-09-05T16:52:07.540Z'
  }, {
    id: 15,
    team_id: 1,
    title: 'Community Educator',
    created_at: '2017-09-05T16:52:07.540Z',
    updated_at: '2017-09-05T16:52:07.540Z'
  }, {
    id: 16,
    team_id: 1,
    title: 'Grants and Contract Liason',
    created_at: '2017-09-05T16:52:07.541Z',
    updated_at: '2017-09-05T16:52:07.541Z'
  }, {
    id: 17,
    team_id: 1,
    title: 'Public Affairs Liason',
    created_at: '2017-09-05T16:52:07.542Z',
    updated_at: '2017-09-05T16:52:07.542Z'
  }, {
    id: 18,
    team_id: 1,
    title: 'Resource Educator',
    created_at: '2017-09-05T16:52:07.542Z',
    updated_at: '2017-09-05T16:52:07.542Z'
  }, {
    id: 19,
    team_id: 1,
    title: 'Team Leader',
    created_at: '2017-09-05T16:52:07.543Z',
    updated_at: '2017-09-05T16:52:07.543Z'
  }, {
    id: 20,
    team_id: 1,
    title: 'Senior Team Leader',
    created_at: '2017-09-05T16:52:07.544Z',
    updated_at: '2017-09-05T16:52:07.544Z'
  }, {
    id: 21,
    team_id: 1,
    title: 'Senior Resource Educator',
    created_at: '2017-09-05T16:52:07.545Z',
    updated_at: '2017-09-05T16:52:07.545Z'
  }, {
    id: 22,
    team_id: 1,
    title: 'Issue Leader',
    created_at: '2017-09-05T16:52:07.546Z',
    updated_at: '2017-09-05T16:52:07.546Z'
  }, {
    id: 23,
    team_id: 1,
    title: 'Regional Issue Educator',
    created_at: '2017-09-05T16:52:07.547Z',
    updated_at: '2017-09-05T16:52:07.547Z'
  }, {
    id: 24,
    team_id: 1,
    title: 'Senior Issue Leader',
    created_at: '2017-09-05T16:52:07.548Z',
    updated_at: '2017-09-05T16:52:07.548Z'
  }, {
    id: 25,
    team_id: 1,
    title: 'Senior Issue Educator',
    created_at: '2017-09-05T16:52:07.549Z',
    updated_at: '2017-09-05T16:52:07.549Z'
  }, {
    id: 26,
    team_id: 1,
    title: 'Program Director',
    created_at: '2017-09-05T16:52:07.550Z',
    updated_at: '2017-09-05T16:52:07.550Z'
  }, {
    id: 27,
    team_id: 1,
    title: 'Executive Director',
    created_at: '2017-09-05T16:52:07.551Z',
    updated_at: '2017-09-05T16:52:07.551Z'
  }, {
    id: 28,
    team_id: 1,
    title: 'Administrative Assistant I',
    created_at: '2017-09-05T16:52:07.552Z',
    updated_at: '2017-09-05T16:52:07.552Z'
  }, {
    id: 29,
    team_id: 1,
    title: 'Custodian',
    created_at: '2017-09-05T16:52:07.553Z',
    updated_at: '2017-09-05T16:52:07.553Z'
  }, {
    id: 30,
    team_id: 1,
    title: 'Farm Worker I',
    created_at: '2017-09-05T16:52:07.553Z',
    updated_at: '2017-09-05T16:52:07.553Z'
  }, {
    id: 31,
    team_id: 1,
    title: 'Administrative Assistant II',
    created_at: '2017-09-05T16:52:07.553Z',
    updated_at: '2017-09-05T16:52:07.553Z'
  }, {
    id: 32,
    team_id: 1,
    title: 'Account Representative I',
    created_at: '2017-09-05T16:52:07.554Z',
    updated_at: '2017-09-05T16:52:07.554Z'
  }, {
    id: 33,
    team_id: 1,
    title: 'Farm Worker II',
    created_at: '2017-09-05T16:52:07.554Z',
    updated_at: '2017-09-05T16:52:07.554Z'
  }, {
    id: 34,
    team_id: 1,
    title: 'Account Representative II',
    created_at: '2017-09-05T16:52:07.555Z',
    updated_at: '2017-09-05T16:52:07.555Z'
  }, {
    id: 35,
    team_id: 1,
    title: 'Facilities Coordinator I',
    created_at: '2017-09-05T16:52:07.555Z',
    updated_at: '2017-09-05T16:52:07.555Z'
  }, {
    id: 36,
    team_id: 1,
    title: 'HR Representative',
    created_at: '2017-09-05T16:52:07.556Z',
    updated_at: '2017-09-05T16:52:07.556Z'
  }, {
    id: 37,
    team_id: 1,
    title: 'IT Representative',
    created_at: '2017-09-05T16:52:07.556Z',
    updated_at: '2017-09-05T16:52:07.556Z'
  }, {
    id: 38,
    team_id: 1,
    title: 'Senior Administrative Assistant',
    created_at: '2017-09-05T16:52:07.556Z',
    updated_at: '2017-09-05T16:52:07.556Z'
  }, {
    id: 39,
    team_id: 1,
    title: 'IT Coordinator',
    created_at: '2017-09-05T16:52:07.557Z',
    updated_at: '2017-09-05T16:52:07.557Z'
  }, {
    id: 40,
    team_id: 1,
    title: 'HR Coordinator',
    created_at: '2017-09-05T16:52:07.557Z',
    updated_at: '2017-09-05T16:52:07.557Z'
  }, {
    id: 41,
    team_id: 1,
    title: 'Finance Coordinator',
    created_at: '2017-09-05T16:52:07.558Z',
    updated_at: '2017-09-05T16:52:07.558Z'
  }, {
    id: 42,
    team_id: 1,
    title: 'Farm Coordinator',
    created_at: '2017-09-05T16:52:07.558Z',
    updated_at: '2017-09-05T16:52:07.558Z'
  }, {
    id: 43,
    team_id: 1,
    title: 'Facilities Coordinator II',
    created_at: '2017-09-05T16:52:07.559Z',
    updated_at: '2017-09-05T16:52:07.559Z'
  }, {
    id: 44,
    team_id: 1,
    title: 'Operations Coordinator I',
    created_at: '2017-09-05T16:52:07.559Z',
    updated_at: '2017-09-05T16:52:07.559Z'
  }, {
    id: 45,
    team_id: 1,
    title: 'Finance Coordinator II',
    created_at: '2017-09-05T16:52:07.560Z',
    updated_at: '2017-09-05T16:52:07.560Z'
  }, {
    id: 46,
    team_id: 1,
    title: 'Payroll Accounts Coordinator',
    created_at: '2017-09-05T16:52:07.560Z',
    updated_at: '2017-09-05T16:52:07.560Z'
  }, {
    id: 47,
    team_id: 1,
    title: 'Operations Coordinator II',
    created_at: '2017-09-05T16:52:07.560Z',
    updated_at: '2017-09-05T16:52:07.560Z'
  }, {
    id: 48,
    team_id: 1,
    title: 'Regional HR Coordinator',
    created_at: '2017-09-05T16:52:07.561Z',
    updated_at: '2017-09-05T16:52:07.561Z'
  }, {
    id: 49,
    team_id: 1,
    title: 'Regional IT Coordinator',
    created_at: '2017-09-05T16:52:07.561Z',
    updated_at: '2017-09-05T16:52:07.561Z'
  }, {
    id: 50,
    team_id: 1,
    title: 'Regional Finance Coordinator',
    created_at: '2017-09-05T16:52:07.562Z',
    updated_at: '2017-09-05T16:52:07.562Z'
  }, {
    id: 51,
    team_id: 1,
    title: 'Farm Supervisor',
    created_at: '2017-09-05T16:52:07.562Z',
    updated_at: '2017-09-05T16:52:07.562Z'
  }, {
    id: 52,
    team_id: 1,
    title: 'Payroll Accounts Manager',
    created_at: '2017-09-05T16:52:07.563Z',
    updated_at: '2017-09-05T16:52:07.563Z'
  }, {
    id: 53,
    team_id: 1,
    title: 'Facilities Manager',
    created_at: '2017-09-05T16:52:07.564Z',
    updated_at: '2017-09-05T16:52:07.564Z'
  }, {
    id: 54,
    team_id: 1,
    title: 'Farm Manager',
    created_at: '2017-09-05T16:52:07.565Z',
    updated_at: '2017-09-05T16:52:07.565Z'
  }, {
    id: 55,
    team_id: 1,
    title: 'Administrator',
    created_at: '2017-09-05T16:52:07.565Z',
    updated_at: '2017-09-05T16:52:07.565Z'
  }, {
    id: 56,
    team_id: 1,
    title: 'HR Manager',
    created_at: '2017-09-05T16:52:07.566Z',
    updated_at: '2017-09-05T16:52:07.566Z'
  }, {
    id: 57,
    team_id: 1,
    title: 'Finance Manager',
    created_at: '2017-09-05T16:52:07.567Z',
    updated_at: '2017-09-05T16:52:07.567Z'
  }, {
    id: 58,
    team_id: 1,
    title: 'IT Manager',
    created_at: '2017-09-05T16:52:07.568Z',
    updated_at: '2017-09-05T16:52:07.568Z'
  }, {
    id: 59,
    team_id: 1,
    title: 'Senior Administrator',
    created_at: '2017-09-05T16:52:07.568Z',
    updated_at: '2017-09-05T16:52:07.568Z'
  }, {
    id: 60,
    team_id: 1,
    title: 'Lead Finance Manager',
    created_at: '2017-09-05T16:52:07.569Z',
    updated_at: '2017-09-05T16:52:07.569Z'
  }, {
    id: 61,
    team_id: 1,
    title: 'Lead HR Manager',
    created_at: '2017-09-05T16:52:07.570Z',
    updated_at: '2017-09-05T16:52:07.570Z'
  }, {
    id: 62,
    team_id: 1,
    title: 'Lead IT Manager',
    created_at: '2017-09-05T16:52:07.571Z',
    updated_at: '2017-09-05T16:52:07.571Z'
  }]
});

exports.default = classificationsFixtures;