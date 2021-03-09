"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggedOut = exports.LoggedIn = exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _Page = require("./Page");

var HeaderStories = _interopRequireWildcard(require("./Header.stories"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  title: 'Example/Page',
  component: _Page.Page
};
exports["default"] = _default;

var Template = function Template(args) {
  return /*#__PURE__*/_react["default"].createElement(_Page.Page, args);
};

var LoggedIn = Template.bind({});
exports.LoggedIn = LoggedIn;
LoggedIn.args = _objectSpread({}, HeaderStories.LoggedIn.args);
var LoggedOut = Template.bind({});
exports.LoggedOut = LoggedOut;
LoggedOut.args = _objectSpread({}, HeaderStories.LoggedOut.args);