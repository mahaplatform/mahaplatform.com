'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    tableName: 'maha_roles',
    records: [{
      id: 1,
      team_id: 1,
      title: 'Platform Administrator',
      description: 'Users who have adminstrative access to the entire platform'
    }, {
      id: 2,
      team_id: 1,
      title: 'Human Resources',
      description: 'Users who manage have adminstrative access to human resources'
    }, {
      id: 3,
      team_id: 1,
      title: 'Finance',
      description: 'Users where have adminstrative access to financial information'
    }, {
      id: 4,
      team_id: 1,
      title: 'Benefits Eligible Employee',
      description: 'Users who have access to benefits eligible staff tools'
    }, {
      id: 5,
      team_id: 1,
      title: 'Temp Employee',
      description: 'Users who have access to temporary employee staff tools'
    }, {
      id: 6,
      team_id: 2,
      title: 'Platform Administrator',
      description: 'Users who have adminstrative access to the entire platform'
    }]
  };
};