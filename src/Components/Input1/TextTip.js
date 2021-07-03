"use strict";
import './TextTip.css'
exports.__esModule = true;

var IconFormat;
(function (IconFormat) {
    IconFormat["URL"] = "url";
    IconFormat["SVGSprite"] = "svgsprite";
    IconFormat["Font"] = "font";
})(IconFormat || (IconFormat = {}));
;
;
;
var TextTip = /** @class */ (function () {
    function TextTip(config) {
        var _this = this;
        this.config = {
            scope: 'body',
            minLength: 1,
            maxLength: Infinity,
            iconFormat: IconFormat.URL,
            buttons: [],
            theme: 'default',
            mobileOSBehaviour: 'hide'
        };
        this.open = false;
        this.isMobileOS = false;
        this._setupScope = function () {
            if (typeof _this.config.scope === 'string') {
                _this.scopeEl = document.querySelector(_this.config.scope);
            }
            if (!_this.scopeEl) {
                throw new Error('TextTip: Cannot find supplied scope');
            }
            _this.scopeEl.setAttribute('data-texttip-scope-id', _this.id.toString());
        };
        this._setupTooltip = function () {
            var inner = document.createElement('div');
            inner.classList.add('texttip__inner');
            _this.config.buttons.forEach(function (btn, index) {
                if (!btn.callback || !btn.icon || !btn.title) {
                    throw new Error('TextTip: All buttons should have a callback, icon and title property');
                }
                var btnEl = document.createElement('div');
                btnEl.classList.add('texttip__btn');
                btnEl.setAttribute('role', 'button');
                btnEl.setAttribute('data-texttip-btn-index', index.toString());
                btnEl.style.transitionDelay = (40 * (index + 1)) + 'ms';
                switch (_this.config.iconFormat) {
                    case IconFormat.URL:
                        btnEl.innerHTML = "<img src=\"" + btn.icon + "\" alt=\"" + btn.title + "\">";
                        break;
                    case IconFormat.SVGSprite:
                        /*
                         * The base64 image overlay hack is needed to make the click events work
                         * without it the events are swallowed completely for some reason (probably shadow dom related)
                         */
                        btnEl.innerHTML = "\n\t\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" title=\"" + btn.title + "\" pointer-events=\"none\">\n\t\t\t\t\t\t\t<use xlink:href=\"" + btn.icon + "\"></use>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t<img class=\"texttip__btn-cover\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=\" alt=\"\" aria-hidden=\"true\" />\n\t\t\t\t\t\t";
                        break;
                    case IconFormat.Font:
                        btnEl.innerHTML = "<i class=\"" + btn.icon + "\" title=\"" + btn.title + "\"></i>";
                        break;
                }
                inner.appendChild(btnEl);
            });
            var tooltip = document.createElement('div');
            tooltip.classList.add('texttip', 'texttip--theme-' + _this.config.theme);
            tooltip.setAttribute('data-textip-iconformat', _this.config.iconFormat);
            tooltip.setAttribute('data-texttip-id', _this.id.toString());
            tooltip.setAttribute('role', 'tooltip');
            tooltip.setAttribute('aria-hidden', 'true');
            tooltip.appendChild(inner);
            document.body.appendChild(tooltip);
            _this.tipEl = tooltip;
            _this.tipWidth = _this.tipEl.offsetWidth;
        };
        this._setupEvents = function () {
            document.addEventListener('selectionchange', _this._onSelectionChanged);
            _this.tipEl.querySelectorAll('.texttip__btn').forEach(function (btn, index) {
                btn.addEventListener('click', _this._onButtonClick);
            });
        };
        this._onSelectionChanged = function (event) {
            if (_this._selectionValid()) {
                _this._updatePosition();
                _this._show();
            }
            else {
                _this._hide();
            }
        };
        this._selectionValid = function () {
            var selection = window.getSelection();
            var selStr = selection.toString();
            var selLength = selStr.length;
            if (selLength < _this.config.minLength || selLength > _this.config.maxLength) {
                return false;
            }
            var anchorNodeParent = selection.anchorNode.parentElement;
            var focusNodeParent = selection.focusNode.parentElement;
            if (!anchorNodeParent || !focusNodeParent)
                return false;
            var anchorParent = anchorNodeParent.closest("[data-texttip-scope-id=\"" + _this.id + "\"]");
            var focusParent = focusNodeParent.closest("[data-texttip-scope-id=\"" + _this.id + "\"]");
            // Selection must start and end within specified scope
            return !!anchorParent && !!focusParent;
        };
        this._updatePosition = function () {
            var selection = window.getSelection();
            // Allows us to measure where the selection is on the page relative to the viewport
            var range = selection.getRangeAt(0);
            var _a = range.getBoundingClientRect(), selTop = _a.top, selLeft = _a.left, selWidth = _a.width;
            // Middle of selection width
            var newTipLeft = selLeft + (selWidth / 2) - window.scrollX;
            // Right above selection 
            var newTipBottom = window.innerHeight - selTop - window.scrollY;
            // Stop tooltip bleeding off of left or right edge of screen
            // Use a buffer of 20px so we don't bump right against the edge
            // The tooltip transforms itself left minus 50% of it's width in css
            // so this will need to be taken into account
            var buffer = 20;
            var tipHalfWidth = _this.tipWidth / 2;
            // "real" means after taking the css transform into account
            var realTipLeft = newTipLeft - tipHalfWidth;
            var realTipRight = realTipLeft + _this.tipWidth;
            if (realTipLeft < buffer) {
                // Correct for left edge overlap
                newTipLeft = buffer + tipHalfWidth;
            }
            else if (realTipRight > window.innerWidth - buffer) {
                // Correct for right edge overlap
                newTipLeft = window.innerWidth - buffer - tipHalfWidth;
            }
            _this.tipEl.style.left = newTipLeft + 'px';
            _this.tipEl.style.bottom = newTipBottom + 'px';
        };
        this._onButtonClick = function (event) {
            event.preventDefault();
            event.stopPropagation();
            var btn = event.currentTarget;
            var btnIndex = parseInt(btn.getAttribute('data-texttip-btn-index'), 10);
            var selection = window.getSelection();
            _this.config.buttons[btnIndex].callback(selection.toString());
        };
        this._show = function () {
            if (_this.open)
                return;
            _this.open = true;
            _this.tipEl.classList.add('texttip--show');
            _this.tipEl.setAttribute('aria-hidden', 'true');
            // Callback
            if (_this.config.on && typeof _this.config.on.show === 'function')
                _this.config.on.show();
        };
        this._hide = function () {
            if (!_this.open)
                return;
            _this.open = false;
            _this.tipEl.classList.remove('texttip--show');
            _this.tipEl.setAttribute('aria-hidden', 'false');
            // Callback
            if (_this.config.on && typeof _this.config.on.hide === 'function')
                _this.config.on.hide();
        };
        if (typeof window.getSelection === 'undefined') {
            throw new Error('TextTip: Selection api not supported in this browser');
        }
        if (typeof config !== 'object') {
            throw new Error('TextTip: No config supplied');
        }
        Object.assign(this.config, config);
        if (typeof config.buttons === 'undefined') {
            throw new Error('TextTip: No buttons supplied');
        }
        this.isMobileOS = /iPad|iPhone|iPod|Android/i.test(navigator.userAgent);
        this.id = TextTip._getID();
        // Hide on mobile OS's, they have their own conflicting tooltips
        if (this.config.mobileOSBehaviour === 'hide' && this.isMobileOS)
            return;
        this._setupScope();
        this._setupTooltip();
        this._setupEvents();
    }
    ;
    TextTip.instanceCount = 0;
    TextTip._getID = function () { return ++TextTip.instanceCount; };
    return TextTip;
}());
exports["default"] = TextTip;
;
