'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var appsFixtures = new _maha.Fixtures({
  tableName: 'maha_apps',
  records: [{
    id: 1,
    title: 'Team',
    path: 'team',
    app_category_id: 1,
    app_author_id: 1,
    short_description: 'Manage team settings, users, apps, access, and activity',
    long_description: 'Vexillologist viral stumptown salvia. Asymmetrical green juice lumbersexual, microdosing hell of yuccie messenger bag butcher pok pok XOXO organic neutra brunch bushwick street art. Meh iceland disrupt, polaroid skateboard lo-fi chambray tofu tumblr green juice vexillologist cliche umami. Wolf put a bird on it gochujang health goth, gluten-free synth cliche pork belly succulents unicorn selfies kinfolk tofu. Vexillologist viral stumptown salvia. Asymmetrical green juice lumbersexual, microdosing hell of yuccie messenger bag butcher pok pok XOXO organic neutra brunch bushwick street art. Meh iceland disrupt, polaroid skateboard lo-fi chambray tofu tumblr green juice vexillologist cliche umami. Wolf put a bird on it gochujang health goth, gluten-free synth cliche pork belly succulents unicorn selfies kinfolk tofu.',
    version: '1.0.0',
    color: 'red',
    icon: 'users',
    weight: 1
  }, {
    id: 2,
    title: 'Expenses',
    path: 'expenses',
    app_category_id: 4,
    app_author_id: 1,
    short_description: 'Manage expenses for expenses, advances, and vehicle trips',
    long_description: 'Vexillologist viral stumptown salvia. Asymmetrical green juice lumbersexual, microdosing hell of yuccie messenger bag butcher pok pok XOXO organic neutra brunch bushwick street art. Meh iceland disrupt, polaroid skateboard lo-fi chambray tofu tumblr green juice vexillologist cliche umami. Wolf put a bird on it gochujang health goth, gluten-free synth cliche pork belly succulents unicorn selfies kinfolk tofu. Vexillologist viral stumptown salvia. Asymmetrical green juice lumbersexual, microdosing hell of yuccie messenger bag butcher pok pok XOXO organic neutra brunch bushwick street art. Meh iceland disrupt, polaroid skateboard lo-fi chambray tofu tumblr green juice vexillologist cliche umami. Wolf put a bird on it gochujang health goth, gluten-free synth cliche pork belly succulents unicorn selfies kinfolk tofu.',
    version: '1.0.0',
    color: 'green',
    icon: 'dollar',
    weight: 2
  }, {
    id: 3,
    title: 'Competencies',
    path: 'competencies',
    app_category_id: 3,
    app_author_id: 1,
    short_description: 'Manage resources required for various job positions',
    long_description: 'Vexillologist viral stumptown salvia. Asymmetrical green juice lumbersexual, microdosing hell of yuccie messenger bag butcher pok pok XOXO organic neutra brunch bushwick street art. Meh iceland disrupt, polaroid skateboard lo-fi chambray tofu tumblr green juice vexillologist cliche umami. Wolf put a bird on it gochujang health goth, gluten-free synth cliche pork belly succulents unicorn selfies kinfolk tofu. Vexillologist viral stumptown salvia. Asymmetrical green juice lumbersexual, microdosing hell of yuccie messenger bag butcher pok pok XOXO organic neutra brunch bushwick street art. Meh iceland disrupt, polaroid skateboard lo-fi chambray tofu tumblr green juice vexillologist cliche umami. Wolf put a bird on it gochujang health goth, gluten-free synth cliche pork belly succulents unicorn selfies kinfolk tofu.',
    version: '1.0.0',
    color: 'blue',
    icon: 'trophy',
    weight: 2
  }, {
    id: 4,
    title: 'Eat Fresh',
    path: 'eatfresh',
    app_category_id: 3,
    app_author_id: 1,
    short_description: 'Manage resources required for various job positions',
    long_description: 'Vexillologist viral stumptown salvia. Asymmetrical green juice lumbersexual, microdosing hell of yuccie messenger bag butcher pok pok XOXO organic neutra brunch bushwick street art. Meh iceland disrupt, polaroid skateboard lo-fi chambray tofu tumblr green juice vexillologist cliche umami. Wolf put a bird on it gochujang health goth, gluten-free synth cliche pork belly succulents unicorn selfies kinfolk tofu. Vexillologist viral stumptown salvia. Asymmetrical green juice lumbersexual, microdosing hell of yuccie messenger bag butcher pok pok XOXO organic neutra brunch bushwick street art. Meh iceland disrupt, polaroid skateboard lo-fi chambray tofu tumblr green juice vexillologist cliche umami. Wolf put a bird on it gochujang health goth, gluten-free synth cliche pork belly succulents unicorn selfies kinfolk tofu.',
    version: '1.0.0',
    color: 'orange',
    icon: 'spoon',
    weight: 2
  }]
});

exports.default = appsFixtures;