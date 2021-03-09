"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./button.css");

/**
 * Primary UI component for user interaction
 */
var Button = function Button(_ref) {
  var primary = _ref.primary,
      backgroundColor = _ref.backgroundColor,
      size = _ref.size,
      label = _ref.label,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["primary", "backgroundColor", "size", "label"]);
  var mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return /*#__PURE__*/_react["default"].createElement("button", (0, _extends2["default"])({
    type: "button",
    className: ['storybook-button', "storybook-button--".concat(size), mode].join(' '),
    style: backgroundColor && {
      backgroundColor: backgroundColor
    }
  }, props), label);
};

exports.Button = Button;
Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: _propTypes["default"].bool,

  /**
   * What background color to use
   */
  backgroundColor: _propTypes["default"].string,

  /**
   * How large should the button be?
   */
  size: _propTypes["default"].oneOf(['small', 'medium', 'large']),

  /**
   * Button contents
   */
  label: _propTypes["default"].string.isRequired,

  /**
   * Optional click handler
   */
  onClick: _propTypes["default"].func
};
Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined
};