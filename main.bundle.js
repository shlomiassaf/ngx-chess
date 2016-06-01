webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	 * Providers provided by Angular
	 */
	var platform_browser_dynamic_1 = __webpack_require__(299);
	/*
	* Platform and Environment
	* our providers/directives/pipes
	*/
	var browser_1 = __webpack_require__(504);
	var environment_1 = __webpack_require__(507);
	/*
	* App Component
	* our top level component that holds all of our components
	*/
	var app_1 = __webpack_require__(473);
	/*
	 * Bootstrap our Angular app with a top level component `App` and inject
	 * our Services and Providers into Angular's dependency injection
	 */
	function main(initialHmrState) {
	    return platform_browser_dynamic_1.bootstrap(app_1.App, browser_1.PROVIDERS.concat(environment_1.ENV_PROVIDERS, browser_1.DIRECTIVES, browser_1.PIPES, app_1.APP_PROVIDERS))
	        .catch(function (err) { return console.error(err); });
	}
	exports.main = main;
	/*
	 * Vendors
	 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
	 * You can also import them in vendors to ensure that they are bundled in one file
	 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
	 */
	/*
	 * Hot Module Reload
	 * experimental version by @gdi2290
	 */
	if (false) {
	    // activate hot module reload
	    var ngHmr = require('angular2-hmr');
	    ngHmr.hotModuleReplacement(main, module);
	}
	else {
	    // bootstrap when document is ready
	    document.addEventListener('DOMContentLoaded', function () { return main(); });
	}


/***/ },

/***/ 132:
/***/ function(module, exports) {

	"use strict";
	var OpaqueToken = (function () {
	    function OpaqueToken(_desc) {
	        this._desc = _desc;
	    }
	    OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
	    return OpaqueToken;
	}());
	exports.OpaqueToken = OpaqueToken;
	exports.HMR_STATE = new OpaqueToken('hmrState');
	var HmrStore = (function () {
	    function HmrStore() {
	    }
	    HmrStore.set = function (prop, value) {
	        HmrStore._state[prop] = value;
	        return HmrStore._state[prop];
	    };
	    HmrStore.get = function (prop) {
	        return HmrStore._state[prop];
	    };
	    HmrStore.select = function (name, getState) {
	        HmrStore._states.push({ name: name, getState: getState });
	        var defaultData = getState();
	        var currentData = HmrStore.get(name);
	        if (defaultData && !currentData) {
	            return HmrStore.set(name, defaultData);
	        }
	        else if (defaultData && currentData) {
	            return HmrStore.set(name, Object.assign({}, defaultData, currentData));
	        }
	        else {
	            return HmrStore.set(name, currentData || defaultData);
	        }
	    };
	    HmrStore.dispose = function () {
	        HmrStore._states = [];
	        HmrStore._state = {};
	        HmrStore._initialValues = {};
	    };
	    HmrStore.getState = function () {
	        var initialState = Object.assign({}, HmrStore._state);
	        return HmrStore._states
	            .reduce(function (memo, item) {
	            memo[item.name] = item.getState();
	            return memo;
	        }, initialState);
	    };
	    HmrStore.toJSON = function () {
	        return HmrStore.getState();
	    };
	    HmrStore.dev = false;
	    HmrStore._state = {};
	    HmrStore._initialValues = {};
	    HmrStore._states = [];
	    return HmrStore;
	}());
	exports.HmrStore = HmrStore;


/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var angular2_hmr_1 = __webpack_require__(566);
	var AppState = (function () {
	    function AppState() {
	        // @HmrState() is used by HMR to track the state of any object during a hot module replacement
	        this._state = {};
	    }
	    Object.defineProperty(AppState.prototype, "state", {
	        // already return a clone of the current state
	        get: function () {
	            return this._state = this._clone(this._state);
	        },
	        // never allow mutation
	        set: function (value) {
	            throw new Error('do not mutate the `.state` directly');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AppState.prototype.get = function (prop) {
	        // use our state getter for the clone
	        var state = this.state;
	        return state[prop] || state;
	    };
	    AppState.prototype.set = function (prop, value) {
	        // internally mutate our state
	        return this._state[prop] = value;
	    };
	    AppState.prototype._clone = function (object) {
	        // simple object clone
	        return JSON.parse(JSON.stringify(object));
	    };
	    __decorate([
	        angular2_hmr_1.HmrState(), 
	        __metadata('design:type', Object)
	    ], AppState.prototype, "_state", void 0);
	    AppState = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], AppState);
	    return AppState;
	}());
	exports.AppState = AppState;


/***/ },

/***/ 338:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var button_1 = __webpack_require__(326);
	var card_1 = __webpack_require__(327);
	// import { MdCheckbox } from '@angular2-material/checkbox';
	var input_1 = __webpack_require__(467);
	// import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
	// import { MdProgressBar } from '@angular2-material/progress-bar';
	// import { MdProgressCircle, MdSpinner } from '@angular2-material/progress-circle';
	var radio_1 = __webpack_require__(331);
	var sidenav_1 = __webpack_require__(201);
	var toolbar_1 = __webpack_require__(333);
	var icon_1 = __webpack_require__(330);
	/*
	 * we are grouping the module so we only need to manage the imports in one location
	 */
	exports.MATERIAL_PIPES = [];
	exports.MATERIAL_DIRECTIVES = sidenav_1.MD_SIDENAV_DIRECTIVES.concat([
	    button_1.MdAnchor,
	    button_1.MdButton,
	    toolbar_1.MdToolbar,
	    // MdCheckbox,
	    radio_1.MdRadioButton,
	    radio_1.MdRadioGroup
	], input_1.MD_INPUT_DIRECTIVES, card_1.MD_CARD_DIRECTIVES, icon_1.MD_ICON_DIRECTIVES);
	exports.MATERIAL_PROVIDERS = [
	    radio_1.MdRadioDispatcher,
	    icon_1.MdIconRegistry
	];


/***/ },

/***/ 467:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(36);
	var field_value_1 = __webpack_require__(328);
	var error_1 = __webpack_require__(130);
	var Observable_1 = __webpack_require__(7);
	var noop = function () { };
	var MD_INPUT_CONTROL_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
	    useExisting: core_1.forwardRef(function () { return MdInput; }),
	    multi: true
	});
	// Invalid input type. Using one of these will throw an MdInputUnsupportedTypeError.
	var MD_INPUT_INVALID_INPUT_TYPE = [
	    'file',
	    'radio',
	    'checkbox',
	];
	var nextUniqueId = 0;
	var MdInputPlaceholderConflictError = (function (_super) {
	    __extends(MdInputPlaceholderConflictError, _super);
	    function MdInputPlaceholderConflictError() {
	        _super.call(this, 'Placeholder attribute and child element were both specified.');
	    }
	    return MdInputPlaceholderConflictError;
	}(error_1.MdError));
	exports.MdInputPlaceholderConflictError = MdInputPlaceholderConflictError;
	var MdInputUnsupportedTypeError = (function (_super) {
	    __extends(MdInputUnsupportedTypeError, _super);
	    function MdInputUnsupportedTypeError(type) {
	        _super.call(this, "Input type \"" + type + "\" isn't supported by md-input.");
	    }
	    return MdInputUnsupportedTypeError;
	}(error_1.MdError));
	exports.MdInputUnsupportedTypeError = MdInputUnsupportedTypeError;
	var MdInputDuplicatedHintError = (function (_super) {
	    __extends(MdInputDuplicatedHintError, _super);
	    function MdInputDuplicatedHintError(align) {
	        _super.call(this, "A hint was already declared for 'align=\"" + align + "\"'.");
	    }
	    return MdInputDuplicatedHintError;
	}(error_1.MdError));
	exports.MdInputDuplicatedHintError = MdInputDuplicatedHintError;
	/**
	 * The placeholder directive. The content can declare this to implement more
	 * complex placeholders.
	 */
	var MdPlaceholder = (function () {
	    function MdPlaceholder() {
	    }
	    MdPlaceholder = __decorate([
	        core_1.Directive({
	            selector: 'md-placeholder'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdPlaceholder);
	    return MdPlaceholder;
	}());
	exports.MdPlaceholder = MdPlaceholder;
	/** The hint directive, used to tag content as hint labels (going under the input). */
	var MdHint = (function () {
	    function MdHint() {
	        // Whether to align the hint label at the start or end of the line.
	        this.align = 'start';
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MdHint.prototype, "align", void 0);
	    MdHint = __decorate([
	        core_1.Directive({
	            selector: 'md-hint',
	            host: {
	                '[class.md-right]': 'align == "end"',
	                '[class.md-hint]': 'true'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdHint);
	    return MdHint;
	}());
	exports.MdHint = MdHint;
	/**
	 * Component that represents a text input. It encapsulates the <input> HTMLElement and
	 * improve on its behaviour, along with styling it according to the Material Design.
	 */
	var MdInput = (function () {
	    function MdInput() {
	        this._focused = false;
	        this._value = '';
	        /** Callback registered via registerOnTouched (ControlValueAccessor) */
	        this._onTouchedCallback = noop;
	        /** Callback registered via registerOnChange (ControlValueAccessor) */
	        this._onChangeCallback = noop;
	        /**
	         * Bindings.
	         */
	        this.align = 'start';
	        this.dividerColor = 'primary';
	        this.floatingPlaceholder = true;
	        this.hintLabel = '';
	        this.autoFocus = false;
	        this.disabled = false;
	        this.id = "md-input-" + nextUniqueId++;
	        this.list = null;
	        this.max = null;
	        this.maxLength = null;
	        this.min = null;
	        this.minLength = null;
	        this.placeholder = null;
	        this.readOnly = false;
	        this.required = false;
	        this.spellCheck = false;
	        this.step = null;
	        this.tabIndex = null;
	        this.type = 'text';
	        this.name = null;
	        this._blurEmitter = new core_1.EventEmitter();
	        this._focusEmitter = new core_1.EventEmitter();
	    }
	    Object.defineProperty(MdInput.prototype, "focused", {
	        /** Readonly properties. */
	        get: function () { return this._focused; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "empty", {
	        get: function () { return this._value == null || this._value === ''; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "characterCount", {
	        get: function () {
	            return this.empty ? 0 : ('' + this._value).length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "inputId", {
	        get: function () { return this.id + "-input"; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "onBlur", {
	        get: function () {
	            return this._blurEmitter.asObservable();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "onFocus", {
	        get: function () {
	            return this._focusEmitter.asObservable();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdInput.prototype, "value", {
	        get: function () { return this._value; },
	        set: function (v) {
	            v = this._convertValueForInputType(v);
	            if (v !== this._value) {
	                this._value = v;
	                this._onChangeCallback(v);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    Object.defineProperty(MdInput.prototype, "_align", {
	        // This is to remove the `align` property of the `md-input` itself. Otherwise HTML5
	        // might place it as RTL when we don't want to. We still want to use `align` as an
	        // Input though, so we use HostBinding.
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    /** Set focus on input */
	    MdInput.prototype.focus = function () {
	        this._inputElement.nativeElement.focus();
	    };
	    /** @internal */
	    MdInput.prototype.handleFocus = function (event) {
	        this._focused = true;
	        this._focusEmitter.emit(event);
	    };
	    /** @internal */
	    MdInput.prototype.handleBlur = function (event) {
	        this._focused = false;
	        this._onTouchedCallback();
	        this._blurEmitter.emit(event);
	    };
	    /** @internal */
	    MdInput.prototype.handleChange = function (event) {
	        this.value = event.target.value;
	        this._onTouchedCallback();
	    };
	    /** @internal */
	    MdInput.prototype.hasPlaceholder = function () {
	        return !!this.placeholder || this._placeholderChild != null;
	    };
	    /** Implemented as part of ControlValueAccessor. */
	    MdInput.prototype.writeValue = function (value) {
	        this._value = value;
	    };
	    /** Implemented as part of ControlValueAccessor. */
	    MdInput.prototype.registerOnChange = function (fn) {
	        this._onChangeCallback = fn;
	    };
	    /** Implemented as part of ControlValueAccessor. */
	    MdInput.prototype.registerOnTouched = function (fn) {
	        this._onTouchedCallback = fn;
	    };
	    /** @internal */
	    MdInput.prototype.ngAfterContentInit = function () {
	        var _this = this;
	        this._validateConstraints();
	        // Trigger validation when the hint children change.
	        this._hintChildren.changes.subscribe(function () {
	            _this._validateConstraints();
	        });
	    };
	    /** @internal */
	    MdInput.prototype.ngOnChanges = function (changes) {
	        this._validateConstraints();
	    };
	    /**
	     * Convert the value passed in to a value that is expected from the type of the md-input.
	     * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
	     * on our internal input it won't work locally.
	     * @private
	     */
	    MdInput.prototype._convertValueForInputType = function (v) {
	        switch (this.type) {
	            case 'number': return parseFloat(v);
	            default: return v;
	        }
	    };
	    /**
	     * Ensure that all constraints defined by the API are validated, or throw errors otherwise.
	     * Constraints for now:
	     *   - placeholder attribute and <md-placeholder> are mutually exclusive.
	     *   - type attribute is not one of the forbidden types (see constant at the top).
	     *   - Maximum one of each `<md-hint>` alignment specified, with the attribute being
	     *     considered as align="start".
	     * @private
	     */
	    MdInput.prototype._validateConstraints = function () {
	        var _this = this;
	        if (this.placeholder != '' && this.placeholder != null && this._placeholderChild != null) {
	            throw new MdInputPlaceholderConflictError();
	        }
	        if (MD_INPUT_INVALID_INPUT_TYPE.indexOf(this.type) != -1) {
	            throw new MdInputUnsupportedTypeError(this.type);
	        }
	        if (this._hintChildren) {
	            // Validate the hint labels.
	            var startHint_1 = null;
	            var endHint_1 = null;
	            this._hintChildren.forEach(function (hint) {
	                if (hint.align == 'start') {
	                    if (startHint_1 || _this.hintLabel) {
	                        throw new MdInputDuplicatedHintError('start');
	                    }
	                    startHint_1 = hint;
	                }
	                else if (hint.align == 'end') {
	                    if (endHint_1) {
	                        throw new MdInputDuplicatedHintError('end');
	                    }
	                    endHint_1 = hint;
	                }
	            });
	        }
	    };
	    __decorate([
	        core_1.Input('aria-label'), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "ariaLabel", void 0);
	    __decorate([
	        core_1.Input('aria-labelledby'), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "ariaLabelledBy", void 0);
	    __decorate([
	        core_1.Input('aria-disabled'),
	        field_value_1.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdInput.prototype, "ariaDisabled", void 0);
	    __decorate([
	        core_1.Input('aria-required'),
	        field_value_1.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdInput.prototype, "ariaRequired", void 0);
	    __decorate([
	        core_1.Input('aria-invalid'),
	        field_value_1.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdInput.prototype, "ariaInvalid", void 0);
	    __decorate([
	        core_1.ContentChild(MdPlaceholder), 
	        __metadata('design:type', MdPlaceholder)
	    ], MdInput.prototype, "_placeholderChild", void 0);
	    __decorate([
	        core_1.ContentChildren(MdHint), 
	        __metadata('design:type', core_1.QueryList)
	    ], MdInput.prototype, "_hintChildren", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MdInput.prototype, "align", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MdInput.prototype, "dividerColor", void 0);
	    __decorate([
	        core_1.Input(),
	        field_value_1.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdInput.prototype, "floatingPlaceholder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "hintLabel", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "autoComplete", void 0);
	    __decorate([
	        core_1.Input(),
	        field_value_1.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdInput.prototype, "autoFocus", void 0);
	    __decorate([
	        core_1.Input(),
	        field_value_1.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdInput.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "id", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "list", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "max", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], MdInput.prototype, "maxLength", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "min", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], MdInput.prototype, "minLength", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "placeholder", void 0);
	    __decorate([
	        core_1.Input(),
	        field_value_1.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdInput.prototype, "readOnly", void 0);
	    __decorate([
	        core_1.Input(),
	        field_value_1.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdInput.prototype, "required", void 0);
	    __decorate([
	        core_1.Input(),
	        field_value_1.BooleanFieldValue(), 
	        __metadata('design:type', Boolean)
	    ], MdInput.prototype, "spellCheck", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], MdInput.prototype, "step", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], MdInput.prototype, "tabIndex", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "type", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdInput.prototype, "name", void 0);
	    __decorate([
	        core_1.Output('blur'), 
	        __metadata('design:type', Observable_1.Observable)
	    ], MdInput.prototype, "onBlur", null);
	    __decorate([
	        core_1.Output('focus'), 
	        __metadata('design:type', Observable_1.Observable)
	    ], MdInput.prototype, "onFocus", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MdInput.prototype, "value", null);
	    __decorate([
	        core_1.HostBinding('attr.align'), 
	        __metadata('design:type', Object)
	    ], MdInput.prototype, "_align", null);
	    __decorate([
	        core_1.ViewChild('input'), 
	        __metadata('design:type', core_1.ElementRef)
	    ], MdInput.prototype, "_inputElement", void 0);
	    MdInput = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'md-input',
	            template: "<div class=\"md-input-wrapper\"> <div class=\"md-input-table\"> <div class=\"md-input-prefix\"><ng-content select=\"[md-prefix]\"></ng-content></div> <div class=\"md-input-infix\"> <input #input aria-target class=\"md-input-element\" [class.md-end]=\"align == 'end'\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-disabled]=\"ariaDisabled\" [attr.aria-required]=\"ariaRequired\" [attr.aria-invalid]=\"ariaInvalid\" [attr.autocomplete]=\"autoComplete\" [autofocus]=\"autoFocus\" [disabled]=\"disabled\" [id]=\"inputId\" [attr.list]=\"list\" [attr.max]=\"max\" [attr.maxlength]=\"maxLength\" [attr.min]=\"min\" [attr.minlength]=\"minLength\" [readonly]=\"readOnly\" [required]=\"required\" [spellcheck]=\"spellCheck\" [attr.step]=\"step\" [attr.tabindex]=\"tabIndex\" [type]=\"type\" [attr.name]=\"name\" (focus)=\"handleFocus($event)\" (blur)=\"handleBlur($event)\" [(ngModel)]=\"value\" (change)=\"handleChange($event)\"> <label class=\"md-input-placeholder\" [attr.for]=\"inputId\" [class.md-empty]=\"empty\" [class.md-focused]=\"focused\" [class.md-float]=\"floatingPlaceholder\" [class.md-accent]=\"dividerColor == 'accent'\" [class.md-warn]=\"dividerColor == 'warn'\" *ngIf=\"hasPlaceholder()\"> <ng-content select=\"md-placeholder\"></ng-content> {{placeholder}} <span class=\"md-placeholder-required\" *ngIf=\"required\">*</span> </label> </div> <div class=\"md-input-suffix\"><ng-content select=\"[md-suffix]\"></ng-content></div> </div> <div class=\"md-input-underline\" [class.md-disabled]=\"disabled\"> <span class=\"md-input-ripple\" [class.md-focused]=\"focused\" [class.md-accent]=\"dividerColor == 'accent'\" [class.md-warn]=\"dividerColor == 'warn'\"></span> </div> <div *ngIf=\"hintLabel != ''\" class=\"md-hint\">{{hintLabel}}</div> <ng-content select=\"md-hint\"></ng-content> </div> ",
	            styles: ["/** * Mixin that creates a new stacking context. * see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */ /** * This mixin hides an element visually. * That means it's still accessible for screen-readers but not visible in view. */ /** * Forces an element to grow to fit floated contents; used as as an alternative to * `overflow: hidden;` because it doesn't cut off contents. */ /** * A mixin, which generates temporary ink ripple on a given component. * When $bindToParent is set to true, it will check for the focused class on the same selector as you included * that mixin. * It is also possible to specify the color palette of the temporary ripple. By default it uses the * accent palette for its background. */ /**  * Undo the red box-shadow glow added by Firefox on invalid inputs. * See https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-ui-invalid */ :-moz-ui-invalid { box-shadow: none; } /** * Applies a floating placeholder above the input itself. */ :host { display: inline-block; position: relative; font-family: Roboto, \"Helvetica Neue\", sans-serif; text-align: left; } :host .md-input-wrapper { margin: 16px 0; } :host .md-input-table { display: inline-table; -webkit-flex-flow: column; -ms-flex-flow: column; flex-flow: column; vertical-align: bottom; width: 100%; } :host .md-input-table > * { display: table-cell; } :host .md-input-element { font: inherit; background: transparent; border: none; outline: none; padding: 0; width: 100%; } :host .md-input-element.md-end { text-align: right; } :host .md-input-infix { position: relative; } :host .md-input-placeholder { position: absolute; left: 0; top: 0; visibility: hidden; font-size: 100%; pointer-events: none; color: rgba(0, 0, 0, 0.38); z-index: 1; width: 100%; display: block; white-space: nowrap; text-overflow: ellipsis; overflow-x: hidden; -webkit-transform: translateY(0); transform: translateY(0); -webkit-transform-origin: bottom left; transform-origin: bottom left; -webkit-transition: scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); transition: scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), scale 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); } :host .md-input-placeholder.md-empty { visibility: visible; cursor: text; } :host .md-input-placeholder.md-float:not(.md-empty), :host .md-input-placeholder.md-float.md-focused { visibility: visible; padding-bottom: 5px; -webkit-transform: translateY(-100%) scale(0.75); transform: translateY(-100%) scale(0.75); } :host .md-input-placeholder.md-float:not(.md-empty) .md-placeholder-required, :host .md-input-placeholder.md-float.md-focused .md-placeholder-required { color: #9c27b0; } :host .md-input-placeholder.md-focused { color: #009688; } :host .md-input-placeholder.md-focused.md-accent { color: #9c27b0; } :host .md-input-placeholder.md-focused.md-warn { color: #f44336; } :host input:-webkit-autofill + .md-input-placeholder { visibility: visible; padding-bottom: 5px; -webkit-transform: translateY(-100%) scale(0.75); transform: translateY(-100%) scale(0.75); } :host input:-webkit-autofill + .md-input-placeholder .md-placeholder-required { color: #9c27b0; } :host .md-input-underline { position: absolute; height: 1px; width: 100%; margin-top: 4px; border-top: 1px solid rgba(0, 0, 0, 0.38); } :host .md-input-underline.md-disabled { border-top: 0; background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.26) 33%, transparent 0%); background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.26) 33%, transparent 0%); background-position: 0; background-size: 4px 1px; background-repeat: repeat-x; } :host .md-input-underline .md-input-ripple { position: absolute; height: 2px; z-index: 1; background-color: #009688; top: -1px; width: 100%; -webkit-transform-origin: top; transform-origin: top; opacity: 0; -webkit-transform: scaleY(0); transform: scaleY(0); -webkit-transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); } :host .md-input-underline .md-input-ripple.md-accent { background-color: #9c27b0; } :host .md-input-underline .md-input-ripple.md-warn { background-color: #f44336; } :host .md-input-underline .md-input-ripple.md-focused { opacity: 1; -webkit-transform: scaleY(1); transform: scaleY(1); } :host .md-hint { position: absolute; font-size: 75%; bottom: -0.5em; } :host .md-hint.md-right { right: 0; } :host-context([dir=\"rtl\"]) { text-align: right; } :host-context([dir=\"rtl\"]) .md-input-placeholder { -webkit-transform-origin: bottom right; transform-origin: bottom right; } :host-context([dir=\"rtl\"]) .md-input-element.md-end { text-align: left; } :host-context([dir=\"rtl\"]) .md-hint { right: 0; left: auto; } :host-context([dir=\"rtl\"]) .md-hint.md-right { right: auto; left: 0; } "],
	            providers: [MD_INPUT_CONTROL_VALUE_ACCESSOR],
	            host: { '(click)': 'focus()' }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdInput);
	    return MdInput;
	}());
	exports.MdInput = MdInput;
	exports.MD_INPUT_DIRECTIVES = [MdPlaceholder, MdInput, MdHint];
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-IydvmmBU.tmp/0/components/input/input.js.map

/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_deprecated_1 = __webpack_require__(127);
	var app_service_1 = __webpack_require__(202);
	var home_1 = __webpack_require__(472);
	var game_1 = __webpack_require__(470);
	/*
	 * App Component
	 * Top Level Component
	 */
	var App = (function () {
	    function App(appState) {
	        this.appState = appState;
	        this.loading = false;
	        this.name = 'Angular 2 Chess';
	    }
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            pipes: [],
	            providers: [],
	            encapsulation: core_1.ViewEncapsulation.None,
	            styles: [
	                __webpack_require__(509),
	                __webpack_require__(510)
	            ],
	            template: "\n    <md-content>\n      <md-toolbar color=\"primary\">\n          <span>{{ name }}</span>\n          <span class=\"fill\"></span>\n          <button md-button [routerLink]=\" ['Home'] \">\n            Home\n          </button>\n          <button md-button [routerLink]=\" ['Game'] \">\n            Game\n          </button>\n      </md-toolbar>\n\n      <md-progress-bar mode=\"indeterminate\" color=\"primary\" *ngIf=\"loading\"></md-progress-bar>\n\n      <router-outlet></router-outlet>\n      </md-content>\n  "
	        }),
	        router_deprecated_1.RouteConfig([
	            { path: '/home', name: 'Home', component: home_1.Home, useAsDefault: true },
	            { path: '/game', name: 'Game', component: game_1.Game }
	        ]), 
	        __metadata('design:paramtypes', [app_service_1.AppState])
	    ], App);
	    return App;
	}());
	exports.App = App;


/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var sidenav_1 = __webpack_require__(201);
	var ng2_chess_1 = __webpack_require__(82);
	var dom_svg_board_1 = __webpack_require__(97);
	var chessjs_ai_1 = __webpack_require__(336);
	/*
	 When ng2-chess is an npm module:
	 import { DOM_SVG_KIT_DIRECTIVES } from 'ng2-chess/plugins/ui/dom-svg-board';
	 import { CHESSJS_CHESS_GAME_PROVIDERS } from 'ng2-chess/plugins/game/chessjs';
	 import { CHESSJS_AI_CHESS_GAME_PROVIDERS } from 'ng2-chess/plugins/game/chessjs-ai';
	 */
	var Player = (function () {
	    function Player(color, type, aiIndex) {
	        this.color = color;
	        this.type = type;
	        this.aiIndex = aiIndex;
	    }
	    Object.defineProperty(Player.prototype, "rawtype", {
	        get: function () {
	            return ng2_chess_1.PlayerType[this.type];
	        },
	        set: function (value) {
	            this.type = ng2_chess_1.PlayerType[value];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Player;
	}());
	var Game = (function () {
	    function Game() {
	        this.aiLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	        this.black = new Player(ng2_chess_1.PieceColor.BLACK, ng2_chess_1.PlayerType.AI, 9);
	        this.white = new Player(ng2_chess_1.PieceColor.WHITE, ng2_chess_1.PlayerType.HUMAN, 9);
	    }
	    Game.prototype.ngAfterViewInit = function () {
	        var _this = this;
	        this.ctrl = this.board.ctrl;
	        this.ctrl.init()
	            .then(function () { return _this.sidenav.toggle(true); });
	    };
	    Game.prototype.onPlayerTypeChange = function (event, player) {
	        this.ctrl.setPlayer(player.color, ng2_chess_1.PlayerType[event.value]);
	    };
	    Game.prototype.onAILevelChange = function ($event, player) {
	        player.aiIndex = Number($event.srcElement.selectedIndex);
	        this.ctrl.setPlayer(player.color, player.type, this.getLevel(player.aiIndex));
	    };
	    Game.prototype.onNewGame = function () {
	        this.ctrl
	            .setPlayer(this.black.color, this.black.type, this.getLevel(this.black.aiIndex))
	            .setPlayer(this.white.color, this.white.type, this.getLevel(this.white.aiIndex))
	            .newGame();
	        this.isInit = true;
	    };
	    Game.prototype.onStop = function () {
	        this.ctrl.aiStop();
	    };
	    Game.prototype.hint = function () {
	        var _this = this;
	        this.ctrl.aiNextMove().then(function (mv) { return _this.ctrl.highlight(mv.to, mv.from); });
	    };
	    Game.prototype.getLevel = function (idx) {
	        return this.aiLevels[idx];
	    };
	    __decorate([
	        core_1.ViewChild('sidenav'), 
	        __metadata('design:type', sidenav_1.MdSidenav)
	    ], Game.prototype, "sidenav", void 0);
	    __decorate([
	        core_1.ViewChild('board'), 
	        __metadata('design:type', ng2_chess_1.ChessBoard)
	    ], Game.prototype, "board", void 0);
	    Game = __decorate([
	        core_1.Component({
	            selector: 'game',
	            providers: chessjs_ai_1.CHESSJS_AI_CHESS_GAME_PROVIDERS.slice(),
	            directives: dom_svg_board_1.DOM_SVG_KIT_DIRECTIVES.slice(),
	            pipes: [],
	            styles: [__webpack_require__(511)],
	            template: __webpack_require__(512)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Game);
	    return Game;
	}());
	exports.Game = Game;


/***/ },

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(469));


/***/ },

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var ng2_chess_1 = __webpack_require__(82);
	var dom_svg_board_1 = __webpack_require__(97);
	var chessjs_1 = __webpack_require__(204);
	var Home = (function () {
	    function Home() {
	    }
	    Home.prototype.ngAfterViewInit = function () {
	        var _this = this;
	        this.board.ctrl
	            .init()
	            .then(function () {
	            _this.board.ctrl
	                .setPlayer(ng2_chess_1.PieceColor.BLACK, ng2_chess_1.PlayerType.HUMAN)
	                .setPlayer(ng2_chess_1.PieceColor.WHITE, ng2_chess_1.PlayerType.HUMAN)
	                .newGame();
	        });
	    };
	    __decorate([
	        core_1.ViewChild('board'), 
	        __metadata('design:type', ng2_chess_1.ChessBoard)
	    ], Home.prototype, "board", void 0);
	    Home = __decorate([
	        core_1.Component({
	            selector: 'home',
	            providers: chessjs_1.CHESSJS_CHESS_GAME_PROVIDERS.slice(),
	            directives: dom_svg_board_1.DOM_SVG_KIT_DIRECTIVES.slice(),
	            pipes: [],
	            styles: [__webpack_require__(513)],
	            template: __webpack_require__(514)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Home);
	    return Home;
	}());
	exports.Home = Home;


/***/ },

/***/ 472:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(471));


/***/ },

/***/ 473:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	// App
	__export(__webpack_require__(468));
	__export(__webpack_require__(202));
	var app_service_2 = __webpack_require__(202);
	// Application wide providers
	exports.APP_PROVIDERS = [
	    app_service_2.AppState
	];


/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available directives in any template
	 */
	"use strict";
	var core_1 = __webpack_require__(1);
	// Angular 2 Router
	var router_deprecated_1 = __webpack_require__(127);
	// Angular 2 Material 2
	// TODO(gdi2290): replace with @angular2-material/all
	var angular2_material2_1 = __webpack_require__(338);
	// application_directives: directives that are global through out the application
	exports.APPLICATION_DIRECTIVES = router_deprecated_1.ROUTER_DIRECTIVES.concat(angular2_material2_1.MATERIAL_DIRECTIVES);
	exports.DIRECTIVES = [
	    { provide: core_1.PLATFORM_DIRECTIVES, multi: true, useValue: exports.APPLICATION_DIRECTIVES }
	];


/***/ },

/***/ 504:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(503));
	__export(__webpack_require__(505));
	__export(__webpack_require__(506));


/***/ },

/***/ 505:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available pipes in any template
	 */
	"use strict";
	var core_1 = __webpack_require__(1);
	// application_pipes: pipes that are global through out the application
	exports.APPLICATION_PIPES = [];
	exports.PIPES = [
	    { provide: core_1.PLATFORM_PIPES, multi: true, useValue: exports.APPLICATION_PIPES }
	];


/***/ },

/***/ 506:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * These are globally available services in any component or any other service
	 */
	"use strict";
	// Angular 2
	var common_1 = __webpack_require__(36);
	// Angular 2 Http
	var http_1 = __webpack_require__(184);
	// Angular 2 Router
	var router_deprecated_1 = __webpack_require__(127);
	// Angular 2 Material
	// TODO(gdi2290): replace with @angular2-material/all
	var angular2_material2_1 = __webpack_require__(338);
	/*
	* Application Providers/Directives/Pipes
	* providers/directives/pipes that only live in our browser environment
	*/
	exports.APPLICATION_PROVIDERS = common_1.FORM_PROVIDERS.concat(http_1.HTTP_PROVIDERS, angular2_material2_1.MATERIAL_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS, [
	    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
	]);
	exports.PROVIDERS = exports.APPLICATION_PROVIDERS.slice();


/***/ },

/***/ 507:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Angular 2
	var core_1 = __webpack_require__(1);
	// Environment Providers
	var PROVIDERS = [];
	if (false) {
	    // Production
	    core_1.enableProdMode();
	    PROVIDERS = PROVIDERS.slice();
	}
	else {
	    // Development
	    PROVIDERS = PROVIDERS.slice();
	}
	exports.ENV_PROVIDERS = PROVIDERS.slice();


/***/ },

/***/ 509:
/***/ function(module, exports) {

	module.exports = "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n"

/***/ },

/***/ 510:
/***/ function(module, exports) {

	module.exports = "html, body{\n  height: 100%;\n  background: #F4FAFA;\n}\nbutton.active{\n  background: #fff;\n  color: #009688;\n}\nbutton.active:hover{\n  color: #fff;\n}\n.fill{\n  flex: 1 1 auto;\n}\n.app-state{\n  margin: 15px;\n  flex: 1;\n}\n.home{\n  flex: 1;\n}\nmd-content{\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\nfooter{\n  flex: 0 0 60px;\n  padding: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #fff;\n}\n"

/***/ },

/***/ 511:
/***/ function(module, exports) {

	module.exports = ":host {\n  height: 100%;\n}\n\nmd-card, md-card:hover {\n  box-shadow: none;\n  background-color: transparent;\n}\n.md-sidenav-side {\n  width: 250px;\n}\n\n.settings-button {\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 5000;\n}\n\n.sidenav-layout {\n  height: 100%;\n}\n\n.settings-container {\n  padding: 24px;\n\n  display: flex;\n  flex-flow: row wrap;\n  align-items: stretch;\n\n  flex: 0 0 250px;\n}\n\n.settings-container > div {\n  flex: 1 100%;\n}\n\n.form-row {\n  margin: 15px 0;\n}\n\n.config-section h3 {\n  border-bottom: 1px solid #009688;\n}\n\n.config-section {\n  margin-bottom: 50px;\n}\n\n.config-section:last-of-type {\n  border-top: 1px solid #009688;\n  border-bottom: 1px solid #009688;\n  margin-bottom: 0;\n}\n\n.board-container {\n  flex: 5 0px;\n}\n\n.game-toolbar {\n  display: flex;\n  justify-content: center;\n}\n\n.game-toolbar > * {\n  margin: 5px;\n}\n.svg-chess-board {\n  margin: auto;\n  width: 100%;\n  height: 100%;\n}\n\n@media (min-height: 400px) and (orientation: landscape) {\n  .svg-chess-board {\n    max-width: 200px;\n    max-height: 200px;\n  }\n}\n\n@media (min-height: 600px) and (orientation: landscape) {\n  .svg-chess-board {\n    max-width: 400px;\n    max-height: 400px;\n  }\n}\n\n@media (min-height: 700px) and (orientation: landscape) {\n  .svg-chess-board {\n    max-width: 500px;\n    max-height: 500px;\n  }\n}\n\n@media (min-height: 800px) and (orientation: landscape) {\n  .svg-chess-board {\n    max-width: 600px;\n    max-height: 600px;\n  }\n}\n\n@media (min-height: 900px) and (orientation: landscape) {\n  .svg-chess-board {\n    max-width: 700px;\n    max-height: 700px;\n  }\n}\n"

/***/ },

/***/ 512:
/***/ function(module, exports) {

	module.exports = "<button class=\"settings-button\" md-fab (click)=\"sidenav.toggle()\">\n  <md-icon class=\"md-24\">settings</md-icon>\n</button>\n<md-sidenav-layout class=\"sidenav-layout\">\n  <md-sidenav #sidenav mode=\"side\">\n    <div class=\"settings-container\">\n      <div class=\"config-section\">\n        <h3>Black:</h3>\n        <form>\n          <div class=\"form-row\">\n            <md-radio-group [(ngModel)]=\"black.rawtype\" (change)=\"onPlayerTypeChange($event, black)\">\n              <md-radio-button value=\"HUMAN\">Human</md-radio-button>\n              <md-radio-button value=\"AI\">Computer</md-radio-button>\n            </md-radio-group>\n          </div>\n          <div class=\"form-row\">\n            <label>AI Level:</label>\n            <select (change)=\"onAILevelChange($event, black)\">\n              <option *ngFor=\"let i of aiLevels\" [attr.value]=\"i\"\n                      [attr.selected]=\"black.aiIndex === i\">{{i}}</option>\n            </select>\n          </div>\n        </form>\n      </div>\n      <div class=\"config-section\">\n        <h3>White:</h3>\n        <form>\n          <div class=\"form-row\">\n            <md-radio-group [(ngModel)]=\"white.rawtype\" (change)=\"onPlayerTypeChange($event, white)\">\n              <md-radio-button value=\"HUMAN\">Human</md-radio-button>\n              <md-radio-button value=\"AI\">Computer</md-radio-button>\n            </md-radio-group>\n          </div>\n          <div class=\"form-row\">\n            <label>AI Level:</label>\n            <select (change)=\"onAILevelChange($event, white)\">\n              <option *ngFor=\"let i of aiLevels\" [attr.value]=\"i\"\n                      [attr.selected]=\"white.aiIndex === i\">{{i}}</option>\n            </select>\n          </div>\n        </form>\n      </div>\n      <div class=\"config-section\">\n        <button md-button color=\"primary\" (click)=\"onNewGame()\">New Game</button>\n        <button md-button color=\"accent\" (click)=\"onStop()\" [disabled]=\"!board.ctrl.aiProcessing\">Stop</button>\n      </div>\n    </div>\n  </md-sidenav>\n  <md-card class=\"board-container\">\n    <br>\n    <chess-board class=\"svg-chess-board\" #board></chess-board>\n    <div class=\"game-toolbar\">\n      <button md-mini-fab (click)=\"ctrl.undo()\" [disabled]=\"board.ctrl.aiProcessing || !isInit\">\n        <md-icon class=\"md-24\">undo</md-icon>\n      </button>\n      <button md-mini-fab (click)=\"hint()\" [disabled]=\"board.ctrl.aiProcessing || !isInit\" *ngIf=\"board.ctrl.aiSupported\">\n        <md-icon class=\"md-24\">remove_red_eye</md-icon>\n      </button>\n    </div>\n  </md-card>\n  <div>\n    <p style=\"text-align: center; margin-top: 0\">No web worker yet, some lags while computer thinks</p>\n    <p style=\"text-align: center; margin-top: 0\">Use Chrome Browser, Drag and Drop issues on FF</p>\n  </div>\n</md-sidenav-layout>\n\n"

/***/ },

/***/ 513:
/***/ function(module, exports) {

	module.exports = ".home {\n  padding-left: 24px;\n  padding-right: 24px;\n  text-align: center;\n  color: #009688;\n}\n\n.home h1 {\n  color: #9c27b0;\n}\n.home p > a {\n  font-size: 1.15em;\n}\n.board-container {\n  padding-top: 25px;\n  padding-left: 25%;\n  width: 50%;\n}\n"

/***/ },

/***/ 514:
/***/ function(module, exports) {

	module.exports = "<div class=\"home\">\n  <h1>Angular 2 Chess</h1>\n  <p>A plugin oriented chess module built with Angular 2.</p>\n  <p>To play, click of the \"Game\" menu on the top-right corner.</p>\n  <p>For more infomation please visit the <a href=\"https://github.com/shlomiassaf/ng2-chess\" target=\"_blank\">GitHub page</a></p>\n  <div class=\"board-container\">\n    <chess-board class=\"svg-chess-board\" #board></chess-board>\n  </div>\n  <p style=\"color: #1fad83\">Angular 2 Chess is in early stages, currently alpha.</p>\n  <p style=\"color: #1fad83\">Use Chrome Browser, Drag and Drop issues on FF</p>\n</div>\n"

/***/ },

/***/ 565:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hmr_store_1 = __webpack_require__(132);
	// noop in parentNode
	// TODO: find a better way to noop
	var _env = typeof process !== 'undefined' &&
	    process &&
	    ({"ENV":"development","NODE_ENV":"development","HMR":false}) &&
	    (("development") ||
	        ("development"));
	var _dev = ((_env &&
	    typeof _env === 'string' &&
	    (_env.indexOf('dev') > -1)) ||
	    _env === undefined);
	function setDev(newDev) {
	    if (typeof newDev === 'string') {
	        return _dev = (newDev.indexOf('dev') > -1);
	    }
	    else if (typeof newDev === 'boolean') {
	        return _dev = newDev;
	    }
	    throw new Error('Please provide a string or boolean');
	}
	exports.setDev = setDev;
	function HmrState(namespaceOrConfig, config) {
	    function decoratorFactory(target, decoratedPropertyName, descriptor) {
	        if (!_dev) {
	            return descriptor;
	        }
	        var key = namespaceOrConfig || target.constructor.name + '#' + decoratedPropertyName;
	        hmr_store_1.HmrStore.select(key, function () { return hmr_store_1.HmrStore.get(key); });
	        Object.defineProperty(target, decoratedPropertyName, {
	            get: function () { return hmr_store_1.HmrStore.get(key); },
	            set: function (newValue) {
	                var currentValue = hmr_store_1.HmrStore.get(key);
	                if (!currentValue) {
	                    hmr_store_1.HmrStore._initialValues[key] = newValue;
	                }
	                else {
	                    newValue = Object.assign(newValue, currentValue);
	                }
	                return hmr_store_1.HmrStore.set(key, newValue);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        return descriptor;
	    }
	    return decoratorFactory;
	}
	exports.HmrState = HmrState;


/***/ },

/***/ 566:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var hmr_store_1 = __webpack_require__(132);
	__export(__webpack_require__(567));
	__export(__webpack_require__(565));
	__export(__webpack_require__(132));
	function provideHmrState(initialState) {
	    if (initialState === void 0) { initialState = {}; }
	    return [
	        { provide: hmr_store_1.HMR_STATE, useValue: initialState },
	        { provide: hmr_store_1.HmrStore, useValue: hmr_store_1.HmrStore }
	    ];
	}
	exports.provideHmrState = provideHmrState;


/***/ },

/***/ 567:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hmr_store_1 = __webpack_require__(132);
	function hotModuleReplacement(bootloader, module, options) {
	    if (options === void 0) { options = {}; }
	    if (!module.hot) {
	        console.warn('Warning: please use webpack hot flag');
	        return document.addEventListener('DOMContentLoaded', function () { return bootloader(); });
	    }
	    hmr_store_1.HmrStore.dev = true;
	    var LOCALSTORAGE_KEY = options.LOCALSTORAGE_KEY || '@@WEBPACK_INITIAL_DATA';
	    var LOCAL = options.localStorage || false;
	    var TOKEN = options.storeToken || hmr_store_1.HmrStore;
	    var DISPOSE = options.globalDispose || 'WEBPACK_HMR_beforeunload';
	    var GET_STATE = options.getState || getState;
	    var DATA = options.data || module.hot.data && module.hot.data.state;
	    var COMPONENT_REF = null;
	    var disposed = false;
	    function getState(appState) {
	        var json = appState.toJSON();
	        if (LOCAL) {
	            console.time('localStorage');
	            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(appState));
	            console.timeEnd('localStorage');
	        }
	        return json;
	    }
	    console.log('DATA', DATA);
	    if (!DATA && LOCAL) {
	        try {
	            console.time('start localStorage');
	            DATA = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || DATA;
	            console.timeEnd('start localStorage');
	        }
	        catch (e) {
	            console.log('JSON.parse Error', e);
	        }
	    }
	    console.time('bootstrap');
	    if (document.readyState === 'complete') {
	        bootloader(DATA)
	            .then(function (cmpRef) { return COMPONENT_REF = cmpRef; })
	            .then((function (cmpRef) { return (console.timeEnd('bootstrap'), cmpRef); }));
	    }
	    else {
	        document.addEventListener('DOMContentLoaded', function () {
	            bootloader(DATA)
	                .then(function (cmpRef) { return COMPONENT_REF = cmpRef; })
	                .then((function (cmpRef) { return (console.timeEnd('bootstrap'), cmpRef); }));
	        });
	    }
	    function beforeunload(event) {
	        var injector = COMPONENT_REF.injector;
	        var appState;
	        if ('getOptional' in injector) {
	            appState = COMPONENT_REF.injector.getOptional(TOKEN) || TOKEN;
	        }
	        else {
	            appState = COMPONENT_REF.injector.get(TOKEN, TOKEN);
	        }
	        return GET_STATE(appState);
	    }
	    window[DISPOSE] = function () {
	        disposed = true;
	        window.removeEventListener('beforeunload', beforeunload);
	        if (LOCAL) {
	            localStorage.removeItem(LOCALSTORAGE_KEY);
	        }
	    };
	    module.hot.accept();
	    window.addEventListener('beforeunload', beforeunload);
	    module.hot.dispose(function (data) {
	        console.time('dispose');
	        var componentNode = COMPONENT_REF.location.nativeElement;
	        var newNode = document.createElement(componentNode.tagName);
	        // display none
	        var currentDisplay = newNode.style.display;
	        newNode.style.display = 'none';
	        var parentNode = componentNode.parentNode;
	        parentNode.insertBefore(newNode, componentNode);
	        var injector = COMPONENT_REF.injector;
	        var appState;
	        if ('getOptional' in injector) {
	            appState = COMPONENT_REF.injector.getOptional(TOKEN) || TOKEN;
	        }
	        else {
	            appState = COMPONENT_REF.injector.get(TOKEN, TOKEN);
	        }
	        var json = GET_STATE(appState, COMPONENT_REF);
	        data.state = json;
	        if ('destroy' in COMPONENT_REF) {
	            COMPONENT_REF.destroy();
	        }
	        else if ('dispose' in COMPONENT_REF) {
	            COMPONENT_REF.dispose();
	        }
	        newNode.style.display = currentDisplay;
	        if (!disposed) {
	            window.removeEventListener('beforeunload', beforeunload);
	        }
	        disposed = true;
	        console.timeEnd('dispose');
	    });
	}
	exports.hotModuleReplacement = hotModuleReplacement;


/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5icm93c2VyLnRzIiwid2VicGFjazovLy8uL34vYW5ndWxhcjItaG1yL3NyYy9obXItc3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hcHAuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxhdGZvcm0vYnJvd3Nlci9hbmd1bGFyMi1tYXRlcmlhbDIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vfi9AYW5ndWxhcjItbWF0ZXJpYWwvaW5wdXQvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hcHAuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvZ2FtZS9nYW1lLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2dhbWUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvaG9tZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9wbGF0Zm9ybS9icm93c2VyL2RpcmVjdGl2ZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXRmb3JtL2Jyb3dzZXIvcGlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsYXRmb3JtL2Jyb3dzZXIvcHJvdmlkZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9wbGF0Zm9ybS9lbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly8vLi9+L25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9nYW1lL2dhbWUuY3NzIiwid2VicGFjazovLy8uL3NyYy9hcHAvZ2FtZS9nYW1lLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9ob21lL2hvbWUuY3NzIiwid2VicGFjazovLy8uL3NyYy9hcHAvaG9tZS9ob21lLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vfi9hbmd1bGFyMi1obXIvc3JjL2htci1kZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vfi9hbmd1bGFyMi1obXIvc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL34vYW5ndWxhcjItaG1yL3NyYy93ZWJwYWNrLWhtci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7SUFFRztBQUNILHNEQUEwQixHQUFtQyxDQUFDO0FBRTlEOzs7R0FHRTtBQUNGLHFDQUE2QyxHQUFvQixDQUFDO0FBQ2xFLHlDQUE4QixHQUF3QixDQUFDO0FBRXZEOzs7R0FHRTtBQUNGLGlDQUFtQyxHQUFPLENBQUM7QUFFM0M7OztJQUdHO0FBQ0gsZUFBcUIsZUFBcUI7S0FFeEMsTUFBTSxDQUFDLG9DQUFTLENBQUMsU0FBRyxFQUNmLG1CQUFTLFFBQ1QsMkJBQWEsRUFDYixvQkFBVSxFQUNWLGVBQUssRUFDTCxtQkFBYSxDQUNqQixDQUFDO1VBQ0QsS0FBSyxDQUFDLGFBQUcsSUFBSSxjQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7QUFFcEMsRUFBQztBQVhlLGFBQUksT0FXbkI7QUFHRDs7Ozs7SUFLRztBQUdIOzs7SUFHRztBQUNILEdBQUUsQ0FBQyxDQUFDLEtBQXFDLENBQUMsQ0FBQyxDQUFDO0tBQzFDLDZCQUE2QjtLQUM3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDcEMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMzQyxFQUFDO0FBQUMsS0FBSSxDQUFDLENBQUM7S0FDTixtQ0FBbUM7S0FDbkMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLGNBQU0sV0FBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUM7QUFDOUQsRUFBQzs7Ozs7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscXlDQUFveUMsYUFBYSxpZEFBaWQsV0FBVztBQUM3d0QsbVhBQWtYLGtEQUFrRCxnaUJBQWdpQixrQkFBa0IsRUFBRSx3RUFBd0UsdUJBQXVCLG9CQUFvQixxREFBcUQsa0JBQWtCLEVBQUUsMEJBQTBCLGdCQUFnQixFQUFFLHdCQUF3Qix1QkFBdUIsMkJBQTJCLHVCQUF1QixtQkFBbUIsd0JBQXdCLGFBQWEsRUFBRSw0QkFBNEIscUJBQXFCLEVBQUUsMEJBQTBCLGVBQWUseUJBQXlCLGNBQWMsZUFBZSxZQUFZLGFBQWEsRUFBRSxpQ0FBaUMsbUJBQW1CLEVBQUUsd0JBQXdCLG9CQUFvQixFQUFFLDhCQUE4QixvQkFBb0IsU0FBUyxRQUFRLG9CQUFvQixpQkFBaUIsc0JBQXNCLDRCQUE0QixZQUFZLGFBQWEsZ0JBQWdCLHFCQUFxQix5QkFBeUIsb0JBQW9CLGtDQUFrQywwQkFBMEIsdUNBQXVDLCtCQUErQix1S0FBdUssK0pBQStKLHVKQUF1SixnTkFBZ04sRUFBRSx1Q0FBdUMscUJBQXFCLGNBQWMsRUFBRSx1R0FBdUcscUJBQXFCLHFCQUFxQixrREFBa0QsMENBQTBDLEVBQUUseUpBQXlKLGdCQUFnQixFQUFFLHlDQUF5QyxnQkFBZ0IsRUFBRSxtREFBbUQsZ0JBQWdCLEVBQUUsaURBQWlELGdCQUFnQixFQUFFLHVEQUF1RCxxQkFBcUIscUJBQXFCLGtEQUFrRCwwQ0FBMEMsRUFBRSxnRkFBZ0YsZ0JBQWdCLEVBQUUsNEJBQTRCLG9CQUFvQixhQUFhLGFBQWEsaUJBQWlCLDJDQUEyQyxFQUFFLHdDQUF3QyxlQUFlLGtIQUFrSCw4R0FBOEcsd0JBQXdCLDBCQUEwQiw2QkFBNkIsRUFBRSw2Q0FBNkMsb0JBQW9CLGFBQWEsWUFBWSwyQkFBMkIsV0FBVyxhQUFhLCtCQUErQix1QkFBdUIsWUFBWSw4QkFBOEIsc0JBQXNCLDRIQUE0SCxvSEFBb0gsNEdBQTRHLHFLQUFxSyxFQUFFLHVEQUF1RCwyQkFBMkIsRUFBRSxxREFBcUQsMkJBQTJCLEVBQUUsd0RBQXdELFlBQVksOEJBQThCLHNCQUFzQixFQUFFLGlCQUFpQixvQkFBb0IsZ0JBQWdCLGdCQUFnQixFQUFFLDBCQUEwQixVQUFVLEVBQUUsK0JBQStCLG1CQUFtQixFQUFFLHFEQUFxRCx3Q0FBd0MsZ0NBQWdDLEVBQUUsd0RBQXdELGtCQUFrQixFQUFFLHdDQUF3QyxVQUFVLFlBQVksRUFBRSxpREFBaUQsYUFBYSxTQUFTLEVBQUU7QUFDdm5MO0FBQ0Esb0JBQW1CO0FBQ25CLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDhKOzs7Ozs7OztBQzdiQSxrQ0FBNkMsQ0FBZSxDQUFDO0FBQzdELCtDQUE0QixHQUE0QixDQUFDO0FBRXpELHlDQUF5QixHQUFlLENBQUM7QUFDekMsa0NBQXFCLEdBQVEsQ0FBQztBQUM5QixrQ0FBcUIsR0FBUSxDQUFDO0FBRTlCOzs7SUFHRztBQWlDSDtLQUlFLGFBQ1MsUUFBa0I7U0FBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtTQUozQixZQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ2hCLFNBQUksR0FBRyxpQkFBaUIsQ0FBQztLQUt6QixDQUFDO0tBdkNIO1NBQUMsZ0JBQVMsQ0FBQzthQUNULFFBQVEsRUFBRSxLQUFLO2FBQ2YsS0FBSyxFQUFFLEVBQUc7YUFDVixTQUFTLEVBQUUsRUFBRzthQUNkLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO2FBQ3JDLE1BQU0sRUFBRTtpQkFDTixtQkFBTyxDQUFDLEdBQWUsQ0FBQztpQkFDeEIsbUJBQU8sQ0FBQyxHQUFXLENBQUM7Y0FDckI7YUFDRCxRQUFRLEVBQUUsc2dCQWlCVDtVQUNGLENBQUM7U0FDRCwrQkFBVyxDQUFDO2FBQ1gsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFHLElBQUksRUFBRSxNQUFNLEVBQUcsU0FBUyxFQUFFLFdBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO2FBQ3RFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRyxJQUFJLEVBQUUsTUFBTSxFQUFHLFNBQVMsRUFBRSxXQUFJLEVBQUU7VUFDbkQsQ0FBQzs7WUFBQTtLQVNGLFVBQUM7QUFBRCxFQUFDO0FBUlksWUFBRyxNQVFmOzs7Ozs7Ozs7QUNuREQsa0NBQW9ELENBQWUsQ0FBQztBQUNwRSxxQ0FBMEIsR0FBb0MsQ0FBQztBQUcvRCx1Q0FBb0YsRUFBVyxDQUFDO0FBQ2hHLDJDQUF1QyxFQUFtRCxDQUFDO0FBQzNGLHdDQUFnRCxHQUFrRCxDQUFDO0FBRW5HOzs7OztJQUtHO0FBRUg7S0FPRSxnQkFBbUIsS0FBaUIsRUFBUyxJQUFnQixFQUFTLE9BQWU7U0FBbEUsVUFBSyxHQUFMLEtBQUssQ0FBWTtTQUFTLFNBQUksR0FBSixJQUFJLENBQVk7U0FBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO0tBRXJGLENBQUM7S0FSRCxzQkFBSSwyQkFBTztjQUFYO2FBQ0UsTUFBTSxDQUFDLHNCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CLENBQUM7Y0FDRCxVQUFZLEtBQWE7YUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxzQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDLENBQUM7OztRQUhBO0tBT0gsYUFBQztBQUFELEVBQUM7QUFVRDtLQWFFO1NBWkEsYUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FFbEMsVUFBSyxHQUFXLElBQUksTUFBTSxDQUFDLHNCQUFVLENBQUMsS0FBSyxFQUFFLHNCQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQy9ELFVBQUssR0FBVyxJQUFJLE1BQU0sQ0FBQyxzQkFBVSxDQUFDLEtBQUssRUFBRSxzQkFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztLQVNuRCxDQUFDO0tBRWhCLDhCQUFlLEdBQWY7U0FBQSxpQkFLQztTQUpDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Y0FDYixJQUFJLENBQUUsY0FBTSxZQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBekIsQ0FBeUIsQ0FBRSxDQUFDO0tBRTdDLENBQUM7S0FFRCxpQ0FBa0IsR0FBbEIsVUFBbUIsS0FBb0IsRUFBRSxNQUFjO1NBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQU8sc0JBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNsRSxDQUFDO0tBRUQsOEJBQWUsR0FBZixVQUFnQixNQUFhLEVBQUUsTUFBYztTQUMzQyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBUSxNQUFNLENBQUMsVUFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ2hGLENBQUM7S0FFRCx3QkFBUyxHQUFUO1NBQ0UsSUFBSSxDQUFDLElBQUk7Y0FDTixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2NBQy9FLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Y0FDL0UsT0FBTyxFQUFFLENBQUM7U0FFYixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNyQixDQUFDO0tBRUQscUJBQU0sR0FBTjtTQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDckIsQ0FBQztLQUVELG1CQUFJLEdBQUo7U0FBQSxpQkFFQztTQURDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFFLFlBQUUsSUFBSyxZQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBbkMsQ0FBbUMsQ0FBRSxDQUFDO0tBQzVFLENBQUM7S0FFTyx1QkFBUSxHQUFoQixVQUFpQixHQUFXO1NBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzVCLENBQUM7S0E1Q0Q7U0FBQyxnQkFBUyxDQUFDLFNBQVMsQ0FBQzs7MENBQUE7S0FDckI7U0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQzs7d0NBQUE7S0FmckI7U0FBQyxnQkFBUyxDQUFDO2FBQ1QsUUFBUSxFQUFFLE1BQU07YUFDaEIsU0FBUyxFQUFPLDRDQUErQixRQUFFO2FBQ2pELFVBQVUsRUFBTyxzQ0FBc0IsUUFBRTthQUN6QyxLQUFLLEVBQUUsRUFBRzthQUNWLE1BQU0sRUFBRSxDQUFFLG1CQUFPLENBQUMsR0FBWSxDQUFDLENBQUU7YUFDakMsUUFBUSxFQUFFLG1CQUFPLENBQUMsR0FBYSxDQUFDO1VBQ2pDLENBQUM7O2FBQUE7S0FvREYsV0FBQztBQUFELEVBQUM7QUFuRFksYUFBSSxPQW1EaEI7Ozs7Ozs7Ozs7OztBQ3RGRCw4QkFBYyxHQUFrQixDQUFDOzs7Ozs7Ozs7QUNBakMsa0NBQW9ELENBQWUsQ0FBQztBQUVwRSx1Q0FBeUUsRUFBVyxDQUFDO0FBQ3JGLDJDQUF1QyxFQUFvQyxDQUFDO0FBQzVFLHFDQUE2QyxHQUFnQyxDQUFDO0FBVTlFO0tBSUU7S0FBZSxDQUFDO0tBR2hCLDhCQUFlLEdBQWY7U0FBQSxpQkFTQztTQVJDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtjQUNaLElBQUksRUFBRTtjQUNOLElBQUksQ0FBRTthQUNMLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtrQkFDWixTQUFTLENBQUMsc0JBQVUsQ0FBQyxLQUFLLEVBQUUsc0JBQVUsQ0FBQyxLQUFLLENBQUM7a0JBQzdDLFNBQVMsQ0FBQyxzQkFBVSxDQUFDLEtBQUssRUFBRSxzQkFBVSxDQUFDLEtBQUssQ0FBQztrQkFDN0MsT0FBTyxFQUFFLENBQUM7U0FDZixDQUFDLENBQUMsQ0FBQztLQUNQLENBQUM7S0FkRDtTQUFDLGdCQUFTLENBQUMsT0FBTyxDQUFDOzt3Q0FBQTtLQVZyQjtTQUFDLGdCQUFTLENBQUM7YUFDVCxRQUFRLEVBQUUsTUFBTTthQUNoQixTQUFTLEVBQU8sc0NBQTRCLFFBQUU7YUFDOUMsVUFBVSxFQUFPLHNDQUFzQixRQUFFO2FBQ3pDLEtBQUssRUFBRSxFQUFHO2FBQ1YsTUFBTSxFQUFFLENBQUUsbUJBQU8sQ0FBQyxHQUFZLENBQUMsQ0FBRTthQUNqQyxRQUFRLEVBQUUsbUJBQU8sQ0FBQyxHQUFhLENBQUM7VUFDakMsQ0FBQzs7YUFBQTtLQW9CRixXQUFDO0FBQUQsRUFBQztBQW5CWSxhQUFJLE9BbUJoQjs7Ozs7Ozs7Ozs7O0FDakNELDhCQUFjLEdBQWtCLENBQUM7Ozs7Ozs7Ozs7OztBQ0FqQyxPQUFNO0FBQ04sOEJBQWMsR0FBaUIsQ0FBQztBQUNoQyw4QkFBYyxHQUFlLENBQUM7QUFFOUIseUNBQXlCLEdBQWUsQ0FBQztBQUV6Qyw4QkFBNkI7QUFDaEIsc0JBQWEsR0FBRztLQUMzQixzQkFBUTtFQUNULENBQUM7Ozs7Ozs7O0FDVEY7O0lBRUc7O0FBRUgsa0NBQW9DLENBQWUsQ0FBQztBQUNwRCxvQkFBbUI7QUFDbkIsK0NBQWtDLEdBQTRCLENBQUM7QUFFL0Qsd0JBQXVCO0FBQ3ZCLHNEQUFxRDtBQUNyRCxnREFBb0MsR0FBc0IsQ0FBQztBQUUzRCxrRkFBaUY7QUFDcEUsK0JBQXNCLEdBQzlCLHFDQUFpQixRQUNqQix3Q0FBbUIsQ0FDdkIsQ0FBQztBQUVXLG1CQUFVLEdBQUc7S0FDeEIsRUFBQyxPQUFPLEVBQUUsMEJBQW1CLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsOEJBQXNCLEVBQUU7RUFDL0UsQ0FBQzs7Ozs7Ozs7Ozs7O0FDcEJGLDhCQUFjLEdBQWMsQ0FBQztBQUM3Qiw4QkFBYyxHQUFTLENBQUM7QUFDeEIsOEJBQWMsR0FBYSxDQUFDOzs7Ozs7OztBQ0Y1Qjs7SUFFRzs7QUFFSCxrQ0FBK0IsQ0FBZSxDQUFDO0FBRS9DLHdFQUF1RTtBQUMxRCwwQkFBaUIsR0FBRyxFQUVoQyxDQUFDO0FBRVcsY0FBSyxHQUFHO0tBQ25CLEVBQUMsT0FBTyxFQUFFLHFCQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUseUJBQWlCLEVBQUU7RUFDckUsQ0FBQzs7Ozs7Ozs7QUNiRjs7SUFFRzs7QUFFSCxhQUFZO0FBQ1osb0NBQXVFLEVBQWlCLENBQUM7QUFDekYsa0JBQWlCO0FBQ2pCLGtDQUErQixHQUFlLENBQUM7QUFDL0Msb0JBQW1CO0FBQ25CLCtDQUFpQyxHQUE0QixDQUFDO0FBRTlELHNCQUFxQjtBQUNyQixzREFBcUQ7QUFDckQsZ0RBQW1DLEdBQXNCLENBQUM7QUFFMUQ7OztHQUdFO0FBQ1csOEJBQXFCLEdBQzdCLHVCQUFjLFFBQ2QscUJBQWMsRUFDZCx1Q0FBa0IsRUFDbEIsb0NBQWdCO0tBQ25CLEVBQUMsT0FBTyxFQUFFLHlCQUFnQixFQUFFLFFBQVEsRUFBRSw2QkFBb0IsRUFBRTtHQUM3RCxDQUFDO0FBRVcsa0JBQVMsR0FDakIsNkJBQXFCLFFBQ3pCLENBQUM7Ozs7Ozs7OztBQzVCRixhQUFZO0FBQ1osa0NBQStCLENBQWUsQ0FBQztBQUUvQyx5QkFBd0I7QUFDeEIsS0FBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBRW5CLEdBQUUsQ0FBQyxDQUFDLEtBQW9CLENBQUMsQ0FBQyxDQUFDO0tBQ3pCLGFBQWE7S0FDYixxQkFBYyxFQUFFLENBQUM7S0FFakIsU0FBUyxHQUNKLFNBQVMsUUFDYixDQUFDO0FBRUosRUFBQztBQUFDLEtBQUksQ0FBQyxDQUFDO0tBQ04sY0FBYztLQUNkLFNBQVMsR0FDSixTQUFTLFFBQ2IsQ0FBQztBQUVKLEVBQUM7QUFHWSxzQkFBYSxHQUNyQixTQUFTLFFBQ2IsQ0FBQzs7Ozs7Ozs7QUMxQkYsMlFBQTBRLDRCQUE0Qix1Q0FBdUMsMkNBQTJDLFdBQVcsMkVBQTJFLGNBQWMsR0FBRyxrWUFBa1ksMkJBQTJCLEdBQUcseUZBQXlGLDBCQUEwQixHQUFHLCtFQUErRSxrQkFBa0IsY0FBYyxHQUFHLGdHQUFnRyw2QkFBNkIsR0FBRywwSEFBMEgsa0JBQWtCLEdBQUcsNE9BQTRPLGtDQUFrQyxrREFBa0QsV0FBVyxvSkFBb0oscUJBQXFCLEdBQUcseVFBQXlRLHdCQUF3Qix1Q0FBdUMsOENBQThDLFdBQVcsNEdBQTRHLHlCQUF5QixHQUFHLHlGQUF5Rix3QkFBd0IsR0FBRyxxRUFBcUUsdUJBQXVCLEdBQUcsc0pBQXNKLG1CQUFtQixxQkFBcUIsR0FBRyx5RUFBeUUsMkJBQTJCLGdCQUFnQixHQUFHLHNFQUFzRSxtQkFBbUIsR0FBRyxvSEFBb0gsbUJBQW1CLG1CQUFtQix1QkFBdUIsNkJBQTZCLEdBQUcsU0FBUyxvQkFBb0IsR0FBRyxTQUFTLGdCQUFnQixHQUFHLHNMQUFzTCx1QkFBdUIsR0FBRyw2REFBNkQscUJBQXFCLEdBQUcsb1JBQW9SLHNDQUFzQywyQkFBMkIsV0FBVyw0REFBNEQscUJBQXFCLEdBQUcsMkdBQTJHLDRCQUE0QixzQkFBc0IsOEJBQThCLFdBQVcsNFFBQTRRLGtCQUFrQixzQkFBc0IsV0FBVyxrRkFBa0Ysc0JBQXNCLEdBQUcsK0ZBQStGLDhCQUE4QixHQUFHLG9LQUFvSyxpQ0FBaUMsR0FBRyxpUkFBaVIsK0JBQStCLFdBQVcsK01BQStNLHVCQUF1QixlQUFlLEdBQUcsd01BQXdNLG1DQUFtQyxHQUFHLG9HQUFvRyw4QkFBOEIsa0JBQWtCLG1DQUFtQyxHQUFHLHdRQUF3USwyQkFBMkIsMkJBQTJCLDJCQUEyQiw0QkFBNEIsdUJBQXVCLGdDQUFnQyxXQUFXLDJFQUEyRSxtQkFBbUIsR0FBRywwSUFBMEksMkJBQTJCLHVCQUF1QixXQUFXLHdMQUF3TCxpQkFBaUIsR0FBRyx1SUFBdUksa0NBQWtDLGlDQUFpQyxXQUFXLDhMQUE4TCw2QkFBNkIsR0FBRyxxSEFBcUgsbUJBQW1CLGtCQUFrQixHQUFHLDZLQUE2SywrQkFBK0IsMEJBQTBCLFdBQVcsRzs7Ozs7OztBQ0Fsa1AsOEJBQTZCLGlCQUFpQix3QkFBd0IsR0FBRyxnQkFBZ0IscUJBQXFCLG1CQUFtQixHQUFHLHNCQUFzQixnQkFBZ0IsR0FBRyxRQUFRLG1CQUFtQixHQUFHLGFBQWEsaUJBQWlCLFlBQVksR0FBRyxRQUFRLFlBQVksR0FBRyxhQUFhLGtCQUFrQiwyQkFBMkIsaUJBQWlCLEdBQUcsU0FBUyxtQkFBbUIsa0JBQWtCLGtCQUFrQix3QkFBd0IsNEJBQTRCLHFCQUFxQixHQUFHLEc7Ozs7Ozs7QUNBemUsMEJBQXlCLGlCQUFpQixHQUFHLDRCQUE0QixxQkFBcUIsa0NBQWtDLEdBQUcsb0JBQW9CLGlCQUFpQixHQUFHLHNCQUFzQix1QkFBdUIsY0FBYyxxQ0FBcUMsa0JBQWtCLEdBQUcscUJBQXFCLGlCQUFpQixHQUFHLHlCQUF5QixrQkFBa0Isb0JBQW9CLHdCQUF3Qix5QkFBeUIsc0JBQXNCLEdBQUcsK0JBQStCLGlCQUFpQixHQUFHLGVBQWUsbUJBQW1CLEdBQUcsd0JBQXdCLHFDQUFxQyxHQUFHLHFCQUFxQix3QkFBd0IsR0FBRyxrQ0FBa0Msa0NBQWtDLHFDQUFxQyxxQkFBcUIsR0FBRyxzQkFBc0IsZ0JBQWdCLEdBQUcsbUJBQW1CLGtCQUFrQiw0QkFBNEIsR0FBRyx1QkFBdUIsZ0JBQWdCLEdBQUcsb0JBQW9CLGlCQUFpQixnQkFBZ0IsaUJBQWlCLEdBQUcsNkRBQTZELHNCQUFzQix1QkFBdUIsd0JBQXdCLEtBQUssR0FBRyw2REFBNkQsc0JBQXNCLHVCQUF1Qix3QkFBd0IsS0FBSyxHQUFHLDZEQUE2RCxzQkFBc0IsdUJBQXVCLHdCQUF3QixLQUFLLEdBQUcsNkRBQTZELHNCQUFzQix1QkFBdUIsd0JBQXdCLEtBQUssR0FBRyw2REFBNkQsc0JBQXNCLHVCQUF1Qix3QkFBd0IsS0FBSyxHQUFHLEc7Ozs7Ozs7QUNBN3FELG84QkFBbThCLEdBQUcscXdCQUFxd0IsR0FBRyxrOEJBQWs4QiwyR0FBMkcsd0c7Ozs7Ozs7QUNBM3ZGLDBCQUF5Qix1QkFBdUIsd0JBQXdCLHVCQUF1QixtQkFBbUIsR0FBRyxjQUFjLG1CQUFtQixHQUFHLGVBQWUsc0JBQXNCLEdBQUcsb0JBQW9CLHNCQUFzQixzQkFBc0IsZUFBZSxHQUFHLEc7Ozs7Ozs7QUNBblIsbW5COzs7Ozs7OztBQ0FBLHVDQUF1QixHQUFhLENBQUM7QUFFckMsc0JBQXFCO0FBQ3JCLG1DQUFrQztBQUNsQyxLQUFNLElBQUksR0FBRyxPQUFPLE9BQU8sS0FBSyxXQUFXO0tBQ3pDLE9BQU87S0FDUCw0REFBVztLQUNYLENBQUMsZUFBZTtTQUNoQixlQUFvQixDQUFDLENBQUM7QUFFeEIsS0FBSSxJQUFJLEdBQVksQ0FBQyxDQUNqQixJQUFJO0tBQ0osT0FBTyxJQUFJLEtBQUssUUFBUTtLQUN4QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDM0I7S0FDQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUM7QUFFeEIsaUJBQXVCLE1BQXdCO0tBQzdDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDL0IsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3QyxDQUFDO0tBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDdkMsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7S0FDdkIsQ0FBQztLQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUN4RCxFQUFDO0FBUGUsZUFBTSxTQU9yQjtBQUVELG1CQUF5QixpQkFBZ0MsRUFBRSxNQUFZO0tBRXJFLDBCQUEwQixNQUFXLEVBQUUscUJBQThCLEVBQUUsVUFBZ0I7U0FDckYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztTQUFDLENBQUM7U0FFakMsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLHFCQUFxQixDQUFDO1NBQ3JGLG9CQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxjQUFNLDJCQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUM7U0FFOUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUscUJBQXFCLEVBQUU7YUFDbkQsR0FBRyxFQUFFLGNBQU0sMkJBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCO2FBQzVCLEdBQUcsRUFBRSxVQUFDLFFBQWM7aUJBRWxCLElBQUksWUFBWSxHQUFHLG9CQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7cUJBQ2xCLG9CQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztpQkFDMUMsQ0FBQztpQkFBQyxJQUFJLENBQUMsQ0FBQztxQkFDTixRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7aUJBQ25ELENBQUM7aUJBQ0QsTUFBTSxDQUFDLG9CQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUVyQyxDQUFDO2FBQ0QsVUFBVSxFQUFFLElBQUk7YUFDaEIsWUFBWSxFQUFFLElBQUk7VUFDbkIsQ0FBQyxDQUFDO1NBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUNwQixDQUFDO0tBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0FBQzFCLEVBQUM7QUE1QmUsaUJBQVEsV0E0QnZCOzs7Ozs7Ozs7Ozs7QUN0REQsdUNBQWtDLEdBQWEsQ0FBQztBQUVoRCw4QkFBYyxHQUFlLENBQUM7QUFDOUIsOEJBQWMsR0FBaUIsQ0FBQztBQUNoQyw4QkFBYyxHQUFhLENBQUM7QUFHNUIsMEJBQWdDLFlBQWlCO0tBQWpCLDRCQUFpQixHQUFqQixpQkFBaUI7S0FDL0MsTUFBTSxDQUFDO1NBQ0wsRUFBQyxPQUFPLEVBQUUscUJBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFO1NBQzdDLEVBQUMsT0FBTyxFQUFFLG9CQUFRLEVBQUUsUUFBUSxFQUFFLG9CQUFRLEVBQUM7TUFDeEMsQ0FBQztBQUNKLEVBQUM7QUFMZSx3QkFBZSxrQkFLOUI7Ozs7Ozs7OztBQ1pELHVDQUF1QixHQUFhLENBQUM7QUFZckMsK0JBQXFDLFVBQW9CLEVBQUUsTUFBVyxFQUFFLE9BQXlDO0tBQXpDLHVCQUF5QyxHQUF6QyxZQUF5QztLQUMvRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLGNBQU0saUJBQVUsRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDO0tBQzNFLENBQUM7S0FFRCxvQkFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7S0FDcEIsSUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLElBQUksd0JBQXdCLENBQUM7S0FDOUUsSUFBTSxLQUFLLEdBQWMsT0FBTyxDQUFDLFlBQVksSUFBUSxLQUFLLENBQUM7S0FDM0QsSUFBTSxLQUFLLEdBQWMsT0FBTyxDQUFDLFVBQVUsSUFBVSxvQkFBUSxDQUFDO0tBQzlELElBQU0sT0FBTyxHQUFZLE9BQU8sQ0FBQyxhQUFhLElBQU8sMEJBQTBCLENBQUM7S0FDaEYsSUFBTSxTQUFTLEdBQVUsT0FBTyxDQUFDLFFBQVEsSUFBWSxRQUFRLENBQUM7S0FDOUQsSUFBSSxJQUFJLEdBQWlCLE9BQU8sQ0FBQyxJQUFJLElBQWdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM5RixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7S0FDekIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0tBRXJCLGtCQUFrQixRQUFRO1NBQ3hCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUUvQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUM3QixZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNqRSxPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ2xDLENBQUM7U0FDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2QsQ0FBQztLQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbkIsSUFBSSxDQUFDO2FBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQ25DLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQzthQUNsRSxPQUFPLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDeEMsQ0FBRTtTQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3JDLENBQUM7S0FDSCxDQUFDO0tBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUMxQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDdkMsVUFBVSxDQUFDLElBQUksQ0FBQztjQUNiLElBQUksQ0FBQyxVQUFDLE1BQVcsSUFBSyxvQkFBYSxHQUFHLE1BQU0sRUFBdEIsQ0FBc0IsQ0FBQztjQUM3QyxJQUFJLENBQUMsQ0FBQyxnQkFBTSxJQUFJLFFBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDLENBQUM7S0FDOUQsQ0FBQztLQUFDLElBQUksQ0FBQyxDQUFDO1NBQ04sUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFO2FBQzVDLFVBQVUsQ0FBQyxJQUFJLENBQUM7a0JBQ2IsSUFBSSxDQUFDLFVBQUMsTUFBVyxJQUFLLG9CQUFhLEdBQUcsTUFBTSxFQUF0QixDQUFzQixDQUFDO2tCQUM3QyxJQUFJLENBQUMsQ0FBQyxnQkFBTSxJQUFJLFFBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDLENBQUM7U0FDOUQsQ0FBQyxDQUFDLENBQUM7S0FDTCxDQUFDO0tBSUQsc0JBQXNCLEtBQUs7U0FDekIsSUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztTQUN4QyxJQUFJLFFBQVEsQ0FBQztTQUNiLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQzlCLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUM7U0FDaEUsQ0FBQztTQUFDLElBQUksQ0FBQyxDQUFDO2FBQ04sUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0RCxDQUFDO1NBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM3QixDQUFDO0tBQ0ssTUFBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHO1NBQ3ZCLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDaEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUN6RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ1YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzVDLENBQUM7S0FDSCxDQUFDLENBQUM7S0FFRixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBRXBCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FFdEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTO1NBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEIsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDM0QsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUQsZUFBZTtTQUNmLElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUMvQixJQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDO1NBQzVDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBRWhELElBQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7U0FDeEMsSUFBSSxRQUFRLENBQUM7U0FDYixFQUFFLENBQUMsQ0FBQyxhQUFhLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQzthQUM5QixRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDO1NBQ2hFLENBQUM7U0FBQyxJQUFJLENBQUMsQ0FBQzthQUNOLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdEQsQ0FBQztTQUNELElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FFaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FFbEIsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDL0IsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCLENBQUM7U0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDdEMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCLENBQUM7U0FFRCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7U0FFdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ2QsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMzRCxDQUFDO1NBQ0QsUUFBUSxHQUFHLElBQUksQ0FBQztTQUNoQixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsRUFBQztBQTdHZSw2QkFBb0IsdUJBNkduQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBQcm92aWRlcnMgcHJvdmlkZWQgYnkgQW5ndWxhclxuICovXG5pbXBvcnQgeyBib290c3RyYXAgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuXG4vKlxuKiBQbGF0Zm9ybSBhbmQgRW52aXJvbm1lbnRcbiogb3VyIHByb3ZpZGVycy9kaXJlY3RpdmVzL3BpcGVzXG4qL1xuaW1wb3J0IHsgRElSRUNUSVZFUywgUElQRVMsIFBST1ZJREVSUyB9IGZyb20gJy4vcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQgeyBFTlZfUFJPVklERVJTIH0gZnJvbSAnLi9wbGF0Zm9ybS9lbnZpcm9ubWVudCc7XG5cbi8qXG4qIEFwcCBDb21wb25lbnRcbiogb3VyIHRvcCBsZXZlbCBjb21wb25lbnQgdGhhdCBob2xkcyBhbGwgb2Ygb3VyIGNvbXBvbmVudHNcbiovXG5pbXBvcnQgeyBBcHAsIEFQUF9QUk9WSURFUlMgfSBmcm9tICcuL2FwcCc7XG5cbi8qXG4gKiBCb290c3RyYXAgb3VyIEFuZ3VsYXIgYXBwIHdpdGggYSB0b3AgbGV2ZWwgY29tcG9uZW50IGBBcHBgIGFuZCBpbmplY3RcbiAqIG91ciBTZXJ2aWNlcyBhbmQgUHJvdmlkZXJzIGludG8gQW5ndWxhcidzIGRlcGVuZGVuY3kgaW5qZWN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWluKGluaXRpYWxIbXJTdGF0ZT86IGFueSk6IFByb21pc2U8YW55PiB7XG5cbiAgcmV0dXJuIGJvb3RzdHJhcChBcHAsIFtcbiAgICAuLi5QUk9WSURFUlMsXG4gICAgLi4uRU5WX1BST1ZJREVSUyxcbiAgICAuLi5ESVJFQ1RJVkVTLFxuICAgIC4uLlBJUEVTLFxuICAgIC4uLkFQUF9QUk9WSURFUlNcbiAgXSlcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpO1xuXG59XG5cblxuLypcbiAqIFZlbmRvcnNcbiAqIEZvciB2ZW5kb3JzIGZvciBleGFtcGxlIGpRdWVyeSwgTG9kYXNoLCBhbmd1bGFyMi1qd3QganVzdCBpbXBvcnQgdGhlbSBhbnl3aGVyZSBpbiB5b3VyIGFwcFxuICogWW91IGNhbiBhbHNvIGltcG9ydCB0aGVtIGluIHZlbmRvcnMgdG8gZW5zdXJlIHRoYXQgdGhleSBhcmUgYnVuZGxlZCBpbiBvbmUgZmlsZVxuICogQWxzbyBzZWUgY3VzdG9tLXR5cGluZ3MuZC50cyBhcyB5b3UgYWxzbyBuZWVkIHRvIGRvIGB0eXBpbmdzIGluc3RhbGwgeGAgd2hlcmUgYHhgIGlzIHlvdXIgbW9kdWxlXG4gKi9cblxuXG4vKlxuICogSG90IE1vZHVsZSBSZWxvYWRcbiAqIGV4cGVyaW1lbnRhbCB2ZXJzaW9uIGJ5IEBnZGkyMjkwXG4gKi9cbmlmICgnZGV2ZWxvcG1lbnQnID09PSBFTlYgJiYgSE1SID09PSB0cnVlKSB7XG4gIC8vIGFjdGl2YXRlIGhvdCBtb2R1bGUgcmVsb2FkXG4gIGxldCBuZ0htciA9IHJlcXVpcmUoJ2FuZ3VsYXIyLWhtcicpO1xuICBuZ0htci5ob3RNb2R1bGVSZXBsYWNlbWVudChtYWluLCBtb2R1bGUpO1xufSBlbHNlIHtcbiAgLy8gYm9vdHN0cmFwIHdoZW4gZG9jdW1lbnQgaXMgcmVhZHlcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IG1haW4oKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWluLmJyb3dzZXIudHNcbiAqKi8iLCJcbmV4cG9ydCBjbGFzcyBPcGFxdWVUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Rlc2M6IHN0cmluZykge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYFRva2VuICR7dGhpcy5fZGVzY31gOyB9XG59XG5cbmV4cG9ydCBjb25zdCBITVJfU1RBVEUgPSBuZXcgT3BhcXVlVG9rZW4oJ2htclN0YXRlJyk7XG5cbmV4cG9ydCBjbGFzcyBIbXJTdG9yZSB7XG4gIHN0YXRpYyBkZXYgPSBmYWxzZTtcbiAgc3RhdGljIF9zdGF0ZSA9IHt9O1xuICBzdGF0aWMgX2luaXRpYWxWYWx1ZXMgPSB7fTtcbiAgc3RhdGljIF9zdGF0ZXMgPSBbXTtcblxuICBzdGF0aWMgc2V0KHByb3AsIHZhbHVlKSB7XG4gICAgSG1yU3RvcmUuX3N0YXRlW3Byb3BdID0gdmFsdWU7XG4gICAgcmV0dXJuIEhtclN0b3JlLl9zdGF0ZVtwcm9wXTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQocHJvcCkge1xuICAgIHJldHVybiBIbXJTdG9yZS5fc3RhdGVbcHJvcF07XG4gIH1cblxuICBzdGF0aWMgc2VsZWN0KG5hbWUsIGdldFN0YXRlKSB7XG4gICAgSG1yU3RvcmUuX3N0YXRlcy5wdXNoKHsgbmFtZSwgZ2V0U3RhdGUgfSk7XG4gICAgbGV0IGRlZmF1bHREYXRhID0gZ2V0U3RhdGUoKTtcbiAgICBsZXQgY3VycmVudERhdGEgPSBIbXJTdG9yZS5nZXQobmFtZSk7XG5cbiAgICBpZiAoZGVmYXVsdERhdGEgJiYgIWN1cnJlbnREYXRhKSB7XG4gICAgICByZXR1cm4gSG1yU3RvcmUuc2V0KG5hbWUsIGRlZmF1bHREYXRhKTtcbiAgICB9IGVsc2UgaWYgKGRlZmF1bHREYXRhICYmIGN1cnJlbnREYXRhKSB7XG4gICAgICByZXR1cm4gSG1yU3RvcmUuc2V0KG5hbWUsICg8YW55Pk9iamVjdCkuYXNzaWduKHt9LCBkZWZhdWx0RGF0YSwgY3VycmVudERhdGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEhtclN0b3JlLnNldChuYW1lLCBjdXJyZW50RGF0YSB8fCBkZWZhdWx0RGF0YSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRpc3Bvc2UoKSB7XG4gICAgSG1yU3RvcmUuX3N0YXRlcyA9IFtdO1xuICAgIEhtclN0b3JlLl9zdGF0ZSA9IHt9O1xuICAgIEhtclN0b3JlLl9pbml0aWFsVmFsdWVzID0ge307XG4gIH1cblxuICBzdGF0aWMgZ2V0U3RhdGUoKSB7XG4gICAgbGV0IGluaXRpYWxTdGF0ZSA9ICg8YW55Pk9iamVjdCkuYXNzaWduKHt9LCBIbXJTdG9yZS5fc3RhdGUpO1xuICAgIHJldHVybiBIbXJTdG9yZS5fc3RhdGVzXG4gICAgICAucmVkdWNlKChtZW1vLCBpdGVtKSA9PiB7XG4gICAgICAgIG1lbW9baXRlbS5uYW1lXSA9IGl0ZW0uZ2V0U3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgICB9LCBpbml0aWFsU3RhdGUpO1xuICB9XG4gIHN0YXRpYyB0b0pTT04oKSB7XG4gICAgcmV0dXJuIEhtclN0b3JlLmdldFN0YXRlKCk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9hbmd1bGFyMi1obXIvc3JjL2htci1zdG9yZS50c1xuICoqLyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhtclN0YXRlIH0gZnJvbSAnYW5ndWxhcjItaG1yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwcFN0YXRlIHtcbiAgLy8gQEhtclN0YXRlKCkgaXMgdXNlZCBieSBITVIgdG8gdHJhY2sgdGhlIHN0YXRlIG9mIGFueSBvYmplY3QgZHVyaW5nIGEgaG90IG1vZHVsZSByZXBsYWNlbWVudFxuICBASG1yU3RhdGUoKSBfc3RhdGUgPSB7IH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIC8vIGFscmVhZHkgcmV0dXJuIGEgY2xvbmUgb2YgdGhlIGN1cnJlbnQgc3RhdGVcbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZSA9IHRoaXMuX2Nsb25lKHRoaXMuX3N0YXRlKTtcbiAgfVxuICAvLyBuZXZlciBhbGxvdyBtdXRhdGlvblxuICBzZXQgc3RhdGUodmFsdWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2RvIG5vdCBtdXRhdGUgdGhlIGAuc3RhdGVgIGRpcmVjdGx5Jyk7XG4gIH1cblxuXG4gIGdldChwcm9wPzogYW55KSB7XG4gICAgLy8gdXNlIG91ciBzdGF0ZSBnZXR0ZXIgZm9yIHRoZSBjbG9uZVxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gc3RhdGVbcHJvcF0gfHwgc3RhdGU7XG4gIH1cblxuICBzZXQocHJvcDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgLy8gaW50ZXJuYWxseSBtdXRhdGUgb3VyIHN0YXRlXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlW3Byb3BdID0gdmFsdWU7XG4gIH1cblxuXG4gIF9jbG9uZShvYmplY3QpIHtcbiAgICAvLyBzaW1wbGUgb2JqZWN0IGNsb25lXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoIG9iamVjdCApKTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwL2FwcC5zZXJ2aWNlLnRzXG4gKiovIiwiaW1wb3J0IHsgTWRBbmNob3IsIE1kQnV0dG9uIH0gZnJvbSAnQGFuZ3VsYXIyLW1hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNRF9DQVJEX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhcjItbWF0ZXJpYWwvY2FyZCc7XG4vLyBpbXBvcnQgeyBNZENoZWNrYm94IH0gZnJvbSAnQGFuZ3VsYXIyLW1hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7IE1EX0lOUFVUX0RJUkVDVElWRVMgfSBmcm9tICdAYW5ndWxhcjItbWF0ZXJpYWwvaW5wdXQnO1xuLy8gaW1wb3J0IHsgTURfTElTVF9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIyLW1hdGVyaWFsL2xpc3QnO1xuLy8gaW1wb3J0IHsgTWRQcm9ncmVzc0JhciB9IGZyb20gJ0Bhbmd1bGFyMi1tYXRlcmlhbC9wcm9ncmVzcy1iYXInO1xuLy8gaW1wb3J0IHsgTWRQcm9ncmVzc0NpcmNsZSwgTWRTcGlubmVyIH0gZnJvbSAnQGFuZ3VsYXIyLW1hdGVyaWFsL3Byb2dyZXNzLWNpcmNsZSc7XG5pbXBvcnQgeyBNZFJhZGlvQnV0dG9uLCBNZFJhZGlvRGlzcGF0Y2hlciwgTWRSYWRpb0dyb3VwIH0gZnJvbSAnQGFuZ3VsYXIyLW1hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7IE1EX1NJREVOQVZfRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyMi1tYXRlcmlhbC9zaWRlbmF2JztcbmltcG9ydCB7IE1kVG9vbGJhciB9IGZyb20gJ0Bhbmd1bGFyMi1tYXRlcmlhbC90b29sYmFyJztcbmltcG9ydCB7IE1EX0lDT05fRElSRUNUSVZFUywgTWRJY29uUmVnaXN0cnkgfSBmcm9tICdAYW5ndWxhcjItbWF0ZXJpYWwvaWNvbic7XG5cbi8qXG4gKiB3ZSBhcmUgZ3JvdXBpbmcgdGhlIG1vZHVsZSBzbyB3ZSBvbmx5IG5lZWQgdG8gbWFuYWdlIHRoZSBpbXBvcnRzIGluIG9uZSBsb2NhdGlvblxuICovXG5cbmV4cG9ydCBjb25zdCBNQVRFUklBTF9QSVBFUyA9IFtcblxuXTtcblxuZXhwb3J0IGNvbnN0IE1BVEVSSUFMX0RJUkVDVElWRVMgPSBbXG4gIC4uLk1EX1NJREVOQVZfRElSRUNUSVZFUyxcbiAgLi4uW1xuICAgIE1kQW5jaG9yLFxuICAgIE1kQnV0dG9uLFxuICAgIE1kVG9vbGJhcixcbiAgICAvLyBNZENoZWNrYm94LFxuICAgIE1kUmFkaW9CdXR0b24sXG4gICAgTWRSYWRpb0dyb3VwXG4gICAgLy8gTWRTcGlubmVyLFxuICAgIC8vIE1kUHJvZ3Jlc3NCYXIsXG4gICAgLy8gTWRQcm9ncmVzc0NpcmNsZVxuICBdLFxuICAuLi5NRF9JTlBVVF9ESVJFQ1RJVkVTLFxuICAvLyAuLi5NRF9MSVNUX0RJUkVDVElWRVMsXG4gIC4uLk1EX0NBUkRfRElSRUNUSVZFUyxcbiAgLi4uTURfSUNPTl9ESVJFQ1RJVkVTXG5dO1xuXG5leHBvcnQgY29uc3QgTUFURVJJQUxfUFJPVklERVJTID0gW1xuICBNZFJhZGlvRGlzcGF0Y2hlcixcbiAgTWRJY29uUmVnaXN0cnlcbl07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbGF0Zm9ybS9icm93c2VyL2FuZ3VsYXIyLW1hdGVyaWFsMi9pbmRleC50c1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59O1xyXG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59O1xyXG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcclxufTtcclxudmFyIGNvcmVfMSA9IHJlcXVpcmUoJ0Bhbmd1bGFyL2NvcmUnKTtcclxudmFyIGNvbW1vbl8xID0gcmVxdWlyZSgnQGFuZ3VsYXIvY29tbW9uJyk7XHJcbnZhciBmaWVsZF92YWx1ZV8xID0gcmVxdWlyZSgnQGFuZ3VsYXIyLW1hdGVyaWFsL2NvcmUvYW5ub3RhdGlvbnMvZmllbGQtdmFsdWUnKTtcclxudmFyIGVycm9yXzEgPSByZXF1aXJlKCdAYW5ndWxhcjItbWF0ZXJpYWwvY29yZS9lcnJvcnMvZXJyb3InKTtcclxudmFyIE9ic2VydmFibGVfMSA9IHJlcXVpcmUoJ3J4anMvT2JzZXJ2YWJsZScpO1xyXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHsgfTtcclxudmFyIE1EX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IgPSBuZXcgY29yZV8xLlByb3ZpZGVyKGNvbW1vbl8xLk5HX1ZBTFVFX0FDQ0VTU09SLCB7XHJcbiAgICB1c2VFeGlzdGluZzogY29yZV8xLmZvcndhcmRSZWYoZnVuY3Rpb24gKCkgeyByZXR1cm4gTWRJbnB1dDsgfSksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59KTtcclxuLy8gSW52YWxpZCBpbnB1dCB0eXBlLiBVc2luZyBvbmUgb2YgdGhlc2Ugd2lsbCB0aHJvdyBhbiBNZElucHV0VW5zdXBwb3J0ZWRUeXBlRXJyb3IuXHJcbnZhciBNRF9JTlBVVF9JTlZBTElEX0lOUFVUX1RZUEUgPSBbXHJcbiAgICAnZmlsZScsXHJcbiAgICAncmFkaW8nLFxyXG4gICAgJ2NoZWNrYm94JyxcclxuXTtcclxudmFyIG5leHRVbmlxdWVJZCA9IDA7XHJcbnZhciBNZElucHV0UGxhY2Vob2xkZXJDb25mbGljdEVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhNZElucHV0UGxhY2Vob2xkZXJDb25mbGljdEVycm9yLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTWRJbnB1dFBsYWNlaG9sZGVyQ29uZmxpY3RFcnJvcigpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCAnUGxhY2Vob2xkZXIgYXR0cmlidXRlIGFuZCBjaGlsZCBlbGVtZW50IHdlcmUgYm90aCBzcGVjaWZpZWQuJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWRJbnB1dFBsYWNlaG9sZGVyQ29uZmxpY3RFcnJvcjtcclxufShlcnJvcl8xLk1kRXJyb3IpKTtcclxuZXhwb3J0cy5NZElucHV0UGxhY2Vob2xkZXJDb25mbGljdEVycm9yID0gTWRJbnB1dFBsYWNlaG9sZGVyQ29uZmxpY3RFcnJvcjtcclxudmFyIE1kSW5wdXRVbnN1cHBvcnRlZFR5cGVFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoTWRJbnB1dFVuc3VwcG9ydGVkVHlwZUVycm9yLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTWRJbnB1dFVuc3VwcG9ydGVkVHlwZUVycm9yKHR5cGUpIHtcclxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBcIklucHV0IHR5cGUgXFxcIlwiICsgdHlwZSArIFwiXFxcIiBpc24ndCBzdXBwb3J0ZWQgYnkgbWQtaW5wdXQuXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1kSW5wdXRVbnN1cHBvcnRlZFR5cGVFcnJvcjtcclxufShlcnJvcl8xLk1kRXJyb3IpKTtcclxuZXhwb3J0cy5NZElucHV0VW5zdXBwb3J0ZWRUeXBlRXJyb3IgPSBNZElucHV0VW5zdXBwb3J0ZWRUeXBlRXJyb3I7XHJcbnZhciBNZElucHV0RHVwbGljYXRlZEhpbnRFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoTWRJbnB1dER1cGxpY2F0ZWRIaW50RXJyb3IsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBNZElucHV0RHVwbGljYXRlZEhpbnRFcnJvcihhbGlnbikge1xyXG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIFwiQSBoaW50IHdhcyBhbHJlYWR5IGRlY2xhcmVkIGZvciAnYWxpZ249XFxcIlwiICsgYWxpZ24gKyBcIlxcXCInLlwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBNZElucHV0RHVwbGljYXRlZEhpbnRFcnJvcjtcclxufShlcnJvcl8xLk1kRXJyb3IpKTtcclxuZXhwb3J0cy5NZElucHV0RHVwbGljYXRlZEhpbnRFcnJvciA9IE1kSW5wdXREdXBsaWNhdGVkSGludEVycm9yO1xyXG4vKipcclxuICogVGhlIHBsYWNlaG9sZGVyIGRpcmVjdGl2ZS4gVGhlIGNvbnRlbnQgY2FuIGRlY2xhcmUgdGhpcyB0byBpbXBsZW1lbnQgbW9yZVxyXG4gKiBjb21wbGV4IHBsYWNlaG9sZGVycy5cclxuICovXHJcbnZhciBNZFBsYWNlaG9sZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1kUGxhY2Vob2xkZXIoKSB7XHJcbiAgICB9XHJcbiAgICBNZFBsYWNlaG9sZGVyID0gX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLkRpcmVjdGl2ZSh7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnbWQtcGxhY2Vob2xkZXInXHJcbiAgICAgICAgfSksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW10pXHJcbiAgICBdLCBNZFBsYWNlaG9sZGVyKTtcclxuICAgIHJldHVybiBNZFBsYWNlaG9sZGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLk1kUGxhY2Vob2xkZXIgPSBNZFBsYWNlaG9sZGVyO1xyXG4vKiogVGhlIGhpbnQgZGlyZWN0aXZlLCB1c2VkIHRvIHRhZyBjb250ZW50IGFzIGhpbnQgbGFiZWxzIChnb2luZyB1bmRlciB0aGUgaW5wdXQpLiAqL1xyXG52YXIgTWRIaW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1kSGludCgpIHtcclxuICAgICAgICAvLyBXaGV0aGVyIHRvIGFsaWduIHRoZSBoaW50IGxhYmVsIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGxpbmUuXHJcbiAgICAgICAgdGhpcy5hbGlnbiA9ICdzdGFydCc7XHJcbiAgICB9XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuSW5wdXQoKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBPYmplY3QpXHJcbiAgICBdLCBNZEhpbnQucHJvdG90eXBlLCBcImFsaWduXCIsIHZvaWQgMCk7XHJcbiAgICBNZEhpbnQgPSBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuRGlyZWN0aXZlKHtcclxuICAgICAgICAgICAgc2VsZWN0b3I6ICdtZC1oaW50JyxcclxuICAgICAgICAgICAgaG9zdDoge1xyXG4gICAgICAgICAgICAgICAgJ1tjbGFzcy5tZC1yaWdodF0nOiAnYWxpZ24gPT0gXCJlbmRcIicsXHJcbiAgICAgICAgICAgICAgICAnW2NsYXNzLm1kLWhpbnRdJzogJ3RydWUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcclxuICAgIF0sIE1kSGludCk7XHJcbiAgICByZXR1cm4gTWRIaW50O1xyXG59KCkpO1xyXG5leHBvcnRzLk1kSGludCA9IE1kSGludDtcclxuLyoqXHJcbiAqIENvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYSB0ZXh0IGlucHV0LiBJdCBlbmNhcHN1bGF0ZXMgdGhlIDxpbnB1dD4gSFRNTEVsZW1lbnQgYW5kXHJcbiAqIGltcHJvdmUgb24gaXRzIGJlaGF2aW91ciwgYWxvbmcgd2l0aCBzdHlsaW5nIGl0IGFjY29yZGluZyB0byB0aGUgTWF0ZXJpYWwgRGVzaWduLlxyXG4gKi9cclxudmFyIE1kSW5wdXQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTWRJbnB1dCgpIHtcclxuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSAnJztcclxuICAgICAgICAvKiogQ2FsbGJhY2sgcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoZWQgKENvbnRyb2xWYWx1ZUFjY2Vzc29yKSAqL1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gbm9vcDtcclxuICAgICAgICAvKiogQ2FsbGJhY2sgcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPbkNoYW5nZSAoQ29udHJvbFZhbHVlQWNjZXNzb3IpICovXHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IG5vb3A7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQmluZGluZ3MuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hbGlnbiA9ICdzdGFydCc7XHJcbiAgICAgICAgdGhpcy5kaXZpZGVyQ29sb3IgPSAncHJpbWFyeSc7XHJcbiAgICAgICAgdGhpcy5mbG9hdGluZ1BsYWNlaG9sZGVyID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhpbnRMYWJlbCA9ICcnO1xyXG4gICAgICAgIHRoaXMuYXV0b0ZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaWQgPSBcIm1kLWlucHV0LVwiICsgbmV4dFVuaXF1ZUlkKys7XHJcbiAgICAgICAgdGhpcy5saXN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1heCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSBudWxsO1xyXG4gICAgICAgIHRoaXMubWluID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yZWFkT25seSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVxdWlyZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNwZWxsQ2hlY2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0ZXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFiSW5kZXggPSBudWxsO1xyXG4gICAgICAgIHRoaXMudHlwZSA9ICd0ZXh0JztcclxuICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2JsdXJFbWl0dGVyID0gbmV3IGNvcmVfMS5FdmVudEVtaXR0ZXIoKTtcclxuICAgICAgICB0aGlzLl9mb2N1c0VtaXR0ZXIgPSBuZXcgY29yZV8xLkV2ZW50RW1pdHRlcigpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1kSW5wdXQucHJvdG90eXBlLCBcImZvY3VzZWRcIiwge1xyXG4gICAgICAgIC8qKiBSZWFkb25seSBwcm9wZXJ0aWVzLiAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fZm9jdXNlZDsgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWRJbnB1dC5wcm90b3R5cGUsIFwiZW1wdHlcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fdmFsdWUgPT0gbnVsbCB8fCB0aGlzLl92YWx1ZSA9PT0gJyc7IH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1kSW5wdXQucHJvdG90eXBlLCBcImNoYXJhY3RlckNvdW50XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHkgPyAwIDogKCcnICsgdGhpcy5fdmFsdWUpLmxlbmd0aDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNZElucHV0LnByb3RvdHlwZSwgXCJpbnB1dElkXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuaWQgKyBcIi1pbnB1dFwiOyB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNZElucHV0LnByb3RvdHlwZSwgXCJvbkJsdXJcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmx1ckVtaXR0ZXIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWRJbnB1dC5wcm90b3R5cGUsIFwib25Gb2N1c1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb2N1c0VtaXR0ZXIuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWRJbnB1dC5wcm90b3R5cGUsIFwidmFsdWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICB2ID0gdGhpcy5fY29udmVydFZhbHVlRm9ySW5wdXRUeXBlKHYpO1xyXG4gICAgICAgICAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIDtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNZElucHV0LnByb3RvdHlwZSwgXCJfYWxpZ25cIiwge1xyXG4gICAgICAgIC8vIFRoaXMgaXMgdG8gcmVtb3ZlIHRoZSBgYWxpZ25gIHByb3BlcnR5IG9mIHRoZSBgbWQtaW5wdXRgIGl0c2VsZi4gT3RoZXJ3aXNlIEhUTUw1XHJcbiAgICAgICAgLy8gbWlnaHQgcGxhY2UgaXQgYXMgUlRMIHdoZW4gd2UgZG9uJ3Qgd2FudCB0by4gV2Ugc3RpbGwgd2FudCB0byB1c2UgYGFsaWduYCBhcyBhblxyXG4gICAgICAgIC8vIElucHV0IHRob3VnaCwgc28gd2UgdXNlIEhvc3RCaW5kaW5nLlxyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKiogU2V0IGZvY3VzIG9uIGlucHV0ICovXHJcbiAgICBNZElucHV0LnByb3RvdHlwZS5mb2N1cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfTtcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIE1kSW5wdXQucHJvdG90eXBlLmhhbmRsZUZvY3VzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZm9jdXNFbWl0dGVyLmVtaXQoZXZlbnQpO1xyXG4gICAgfTtcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIE1kSW5wdXQucHJvdG90eXBlLmhhbmRsZUJsdXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcclxuICAgICAgICB0aGlzLl9ibHVyRW1pdHRlci5lbWl0KGV2ZW50KTtcclxuICAgIH07XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBNZElucHV0LnByb3RvdHlwZS5oYW5kbGVDaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgTWRJbnB1dC5wcm90b3R5cGUuaGFzUGxhY2Vob2xkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5wbGFjZWhvbGRlciB8fCB0aGlzLl9wbGFjZWhvbGRlckNoaWxkICE9IG51bGw7XHJcbiAgICB9O1xyXG4gICAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXHJcbiAgICBNZElucHV0LnByb3RvdHlwZS53cml0ZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIH07XHJcbiAgICAvKiogSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci4gKi9cclxuICAgIE1kSW5wdXQucHJvdG90eXBlLnJlZ2lzdGVyT25DaGFuZ2UgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgICB9O1xyXG4gICAgLyoqIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuICovXHJcbiAgICBNZElucHV0LnByb3RvdHlwZS5yZWdpc3Rlck9uVG91Y2hlZCA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XHJcbiAgICB9O1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgTWRJbnB1dC5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRJbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVDb25zdHJhaW50cygpO1xyXG4gICAgICAgIC8vIFRyaWdnZXIgdmFsaWRhdGlvbiB3aGVuIHRoZSBoaW50IGNoaWxkcmVuIGNoYW5nZS5cclxuICAgICAgICB0aGlzLl9oaW50Q2hpbGRyZW4uY2hhbmdlcy5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5fdmFsaWRhdGVDb25zdHJhaW50cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIE1kSW5wdXQucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcclxuICAgICAgICB0aGlzLl92YWxpZGF0ZUNvbnN0cmFpbnRzKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IHRoZSB2YWx1ZSBwYXNzZWQgaW4gdG8gYSB2YWx1ZSB0aGF0IGlzIGV4cGVjdGVkIGZyb20gdGhlIHR5cGUgb2YgdGhlIG1kLWlucHV0LlxyXG4gICAgICogVGhpcyBpcyBub3JtYWxseSBwZXJmb3JtZWQgYnkgdGhlICpfVkFMVUVfQUNDRVNTT1IgaW4gZm9ybXMsIGJ1dCBzaW5jZSB0aGUgdHlwZSBpcyBib3VuZFxyXG4gICAgICogb24gb3VyIGludGVybmFsIGlucHV0IGl0IHdvbid0IHdvcmsgbG9jYWxseS5cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIE1kSW5wdXQucHJvdG90eXBlLl9jb252ZXJ0VmFsdWVGb3JJbnB1dFR5cGUgPSBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6IHJldHVybiBwYXJzZUZsb2F0KHYpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gdjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFbnN1cmUgdGhhdCBhbGwgY29uc3RyYWludHMgZGVmaW5lZCBieSB0aGUgQVBJIGFyZSB2YWxpZGF0ZWQsIG9yIHRocm93IGVycm9ycyBvdGhlcndpc2UuXHJcbiAgICAgKiBDb25zdHJhaW50cyBmb3Igbm93OlxyXG4gICAgICogICAtIHBsYWNlaG9sZGVyIGF0dHJpYnV0ZSBhbmQgPG1kLXBsYWNlaG9sZGVyPiBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlLlxyXG4gICAgICogICAtIHR5cGUgYXR0cmlidXRlIGlzIG5vdCBvbmUgb2YgdGhlIGZvcmJpZGRlbiB0eXBlcyAoc2VlIGNvbnN0YW50IGF0IHRoZSB0b3ApLlxyXG4gICAgICogICAtIE1heGltdW0gb25lIG9mIGVhY2ggYDxtZC1oaW50PmAgYWxpZ25tZW50IHNwZWNpZmllZCwgd2l0aCB0aGUgYXR0cmlidXRlIGJlaW5nXHJcbiAgICAgKiAgICAgY29uc2lkZXJlZCBhcyBhbGlnbj1cInN0YXJ0XCIuXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBNZElucHV0LnByb3RvdHlwZS5fdmFsaWRhdGVDb25zdHJhaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyICE9ICcnICYmIHRoaXMucGxhY2Vob2xkZXIgIT0gbnVsbCAmJiB0aGlzLl9wbGFjZWhvbGRlckNoaWxkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE1kSW5wdXRQbGFjZWhvbGRlckNvbmZsaWN0RXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1EX0lOUFVUX0lOVkFMSURfSU5QVVRfVFlQRS5pbmRleE9mKHRoaXMudHlwZSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IE1kSW5wdXRVbnN1cHBvcnRlZFR5cGVFcnJvcih0aGlzLnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faGludENoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIC8vIFZhbGlkYXRlIHRoZSBoaW50IGxhYmVscy5cclxuICAgICAgICAgICAgdmFyIHN0YXJ0SGludF8xID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGVuZEhpbnRfMSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2hpbnRDaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChoaW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGludC5hbGlnbiA9PSAnc3RhcnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0SGludF8xIHx8IF90aGlzLmhpbnRMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTWRJbnB1dER1cGxpY2F0ZWRIaW50RXJyb3IoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0SGludF8xID0gaGludDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhpbnQuYWxpZ24gPT0gJ2VuZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kSGludF8xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBNZElucHV0RHVwbGljYXRlZEhpbnRFcnJvcignZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVuZEhpbnRfMSA9IGhpbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuSW5wdXQoJ2FyaWEtbGFiZWwnKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBTdHJpbmcpXHJcbiAgICBdLCBNZElucHV0LnByb3RvdHlwZSwgXCJhcmlhTGFiZWxcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgnYXJpYS1sYWJlbGxlZGJ5JyksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgU3RyaW5nKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwiYXJpYUxhYmVsbGVkQnlcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgnYXJpYS1kaXNhYmxlZCcpLFxyXG4gICAgICAgIGZpZWxkX3ZhbHVlXzEuQm9vbGVhbkZpZWxkVmFsdWUoKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBCb29sZWFuKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwiYXJpYURpc2FibGVkXCIsIHZvaWQgMCk7XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuSW5wdXQoJ2FyaWEtcmVxdWlyZWQnKSxcclxuICAgICAgICBmaWVsZF92YWx1ZV8xLkJvb2xlYW5GaWVsZFZhbHVlKCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgQm9vbGVhbilcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcImFyaWFSZXF1aXJlZFwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCdhcmlhLWludmFsaWQnKSxcclxuICAgICAgICBmaWVsZF92YWx1ZV8xLkJvb2xlYW5GaWVsZFZhbHVlKCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgQm9vbGVhbilcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcImFyaWFJbnZhbGlkXCIsIHZvaWQgMCk7XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuQ29udGVudENoaWxkKE1kUGxhY2Vob2xkZXIpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIE1kUGxhY2Vob2xkZXIpXHJcbiAgICBdLCBNZElucHV0LnByb3RvdHlwZSwgXCJfcGxhY2Vob2xkZXJDaGlsZFwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLkNvbnRlbnRDaGlsZHJlbihNZEhpbnQpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIGNvcmVfMS5RdWVyeUxpc3QpXHJcbiAgICBdLCBNZElucHV0LnByb3RvdHlwZSwgXCJfaGludENoaWxkcmVuXCIsIHZvaWQgMCk7XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuSW5wdXQoKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBPYmplY3QpXHJcbiAgICBdLCBNZElucHV0LnByb3RvdHlwZSwgXCJhbGlnblwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgT2JqZWN0KVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwiZGl2aWRlckNvbG9yXCIsIHZvaWQgMCk7XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuSW5wdXQoKSxcclxuICAgICAgICBmaWVsZF92YWx1ZV8xLkJvb2xlYW5GaWVsZFZhbHVlKCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgQm9vbGVhbilcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcImZsb2F0aW5nUGxhY2Vob2xkZXJcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIFN0cmluZylcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcImhpbnRMYWJlbFwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgU3RyaW5nKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwiYXV0b0NvbXBsZXRlXCIsIHZvaWQgMCk7XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuSW5wdXQoKSxcclxuICAgICAgICBmaWVsZF92YWx1ZV8xLkJvb2xlYW5GaWVsZFZhbHVlKCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgQm9vbGVhbilcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcImF1dG9Gb2N1c1wiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCksXHJcbiAgICAgICAgZmllbGRfdmFsdWVfMS5Cb29sZWFuRmllbGRWYWx1ZSgpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIEJvb2xlYW4pXHJcbiAgICBdLCBNZElucHV0LnByb3RvdHlwZSwgXCJkaXNhYmxlZFwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgU3RyaW5nKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwiaWRcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIFN0cmluZylcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcImxpc3RcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIFN0cmluZylcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcIm1heFwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgTnVtYmVyKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwibWF4TGVuZ3RoXCIsIHZvaWQgMCk7XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuSW5wdXQoKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBTdHJpbmcpXHJcbiAgICBdLCBNZElucHV0LnByb3RvdHlwZSwgXCJtaW5cIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIE51bWJlcilcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcIm1pbkxlbmd0aFwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgU3RyaW5nKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwicGxhY2Vob2xkZXJcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgpLFxyXG4gICAgICAgIGZpZWxkX3ZhbHVlXzEuQm9vbGVhbkZpZWxkVmFsdWUoKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBCb29sZWFuKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwicmVhZE9ubHlcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgpLFxyXG4gICAgICAgIGZpZWxkX3ZhbHVlXzEuQm9vbGVhbkZpZWxkVmFsdWUoKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBCb29sZWFuKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwicmVxdWlyZWRcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgpLFxyXG4gICAgICAgIGZpZWxkX3ZhbHVlXzEuQm9vbGVhbkZpZWxkVmFsdWUoKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBCb29sZWFuKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwic3BlbGxDaGVja1wiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgTnVtYmVyKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwic3RlcFwiLCB2b2lkIDApO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgTnVtYmVyKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwidGFiSW5kZXhcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIFN0cmluZylcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcInR5cGVcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5JbnB1dCgpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIFN0cmluZylcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcIm5hbWVcIiwgdm9pZCAwKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5PdXRwdXQoJ2JsdXInKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBPYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZSlcclxuICAgIF0sIE1kSW5wdXQucHJvdG90eXBlLCBcIm9uQmx1clwiLCBudWxsKTtcclxuICAgIF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5PdXRwdXQoJ2ZvY3VzJyksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUpXHJcbiAgICBdLCBNZElucHV0LnByb3RvdHlwZSwgXCJvbkZvY3VzXCIsIG51bGwpO1xyXG4gICAgX19kZWNvcmF0ZShbXHJcbiAgICAgICAgY29yZV8xLklucHV0KCksIFxyXG4gICAgICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjp0eXBlJywgT2JqZWN0KVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwidmFsdWVcIiwgbnVsbCk7XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuSG9zdEJpbmRpbmcoJ2F0dHIuYWxpZ24nKSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnR5cGUnLCBPYmplY3QpXHJcbiAgICBdLCBNZElucHV0LnByb3RvdHlwZSwgXCJfYWxpZ25cIiwgbnVsbCk7XHJcbiAgICBfX2RlY29yYXRlKFtcclxuICAgICAgICBjb3JlXzEuVmlld0NoaWxkKCdpbnB1dCcpLCBcclxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246dHlwZScsIGNvcmVfMS5FbGVtZW50UmVmKVxyXG4gICAgXSwgTWRJbnB1dC5wcm90b3R5cGUsIFwiX2lucHV0RWxlbWVudFwiLCB2b2lkIDApO1xyXG4gICAgTWRJbnB1dCA9IF9fZGVjb3JhdGUoW1xyXG4gICAgICAgIGNvcmVfMS5Db21wb25lbnQoe1xyXG4gICAgICAgICAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgICAgICAgICBzZWxlY3RvcjogJ21kLWlucHV0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz1cXFwibWQtaW5wdXQtd3JhcHBlclxcXCI+IDxkaXYgY2xhc3M9XFxcIm1kLWlucHV0LXRhYmxlXFxcIj4gPGRpdiBjbGFzcz1cXFwibWQtaW5wdXQtcHJlZml4XFxcIj48bmctY29udGVudCBzZWxlY3Q9XFxcIlttZC1wcmVmaXhdXFxcIj48L25nLWNvbnRlbnQ+PC9kaXY+IDxkaXYgY2xhc3M9XFxcIm1kLWlucHV0LWluZml4XFxcIj4gPGlucHV0ICNpbnB1dCBhcmlhLXRhcmdldCBjbGFzcz1cXFwibWQtaW5wdXQtZWxlbWVudFxcXCIgW2NsYXNzLm1kLWVuZF09XFxcImFsaWduID09ICdlbmQnXFxcIiBbYXR0ci5hcmlhLWxhYmVsXT1cXFwiYXJpYUxhYmVsXFxcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVxcXCJhcmlhTGFiZWxsZWRCeVxcXCIgW2F0dHIuYXJpYS1kaXNhYmxlZF09XFxcImFyaWFEaXNhYmxlZFxcXCIgW2F0dHIuYXJpYS1yZXF1aXJlZF09XFxcImFyaWFSZXF1aXJlZFxcXCIgW2F0dHIuYXJpYS1pbnZhbGlkXT1cXFwiYXJpYUludmFsaWRcXFwiIFthdHRyLmF1dG9jb21wbGV0ZV09XFxcImF1dG9Db21wbGV0ZVxcXCIgW2F1dG9mb2N1c109XFxcImF1dG9Gb2N1c1xcXCIgW2Rpc2FibGVkXT1cXFwiZGlzYWJsZWRcXFwiIFtpZF09XFxcImlucHV0SWRcXFwiIFthdHRyLmxpc3RdPVxcXCJsaXN0XFxcIiBbYXR0ci5tYXhdPVxcXCJtYXhcXFwiIFthdHRyLm1heGxlbmd0aF09XFxcIm1heExlbmd0aFxcXCIgW2F0dHIubWluXT1cXFwibWluXFxcIiBbYXR0ci5taW5sZW5ndGhdPVxcXCJtaW5MZW5ndGhcXFwiIFtyZWFkb25seV09XFxcInJlYWRPbmx5XFxcIiBbcmVxdWlyZWRdPVxcXCJyZXF1aXJlZFxcXCIgW3NwZWxsY2hlY2tdPVxcXCJzcGVsbENoZWNrXFxcIiBbYXR0ci5zdGVwXT1cXFwic3RlcFxcXCIgW2F0dHIudGFiaW5kZXhdPVxcXCJ0YWJJbmRleFxcXCIgW3R5cGVdPVxcXCJ0eXBlXFxcIiBbYXR0ci5uYW1lXT1cXFwibmFtZVxcXCIgKGZvY3VzKT1cXFwiaGFuZGxlRm9jdXMoJGV2ZW50KVxcXCIgKGJsdXIpPVxcXCJoYW5kbGVCbHVyKCRldmVudClcXFwiIFsobmdNb2RlbCldPVxcXCJ2YWx1ZVxcXCIgKGNoYW5nZSk9XFxcImhhbmRsZUNoYW5nZSgkZXZlbnQpXFxcIj4gPGxhYmVsIGNsYXNzPVxcXCJtZC1pbnB1dC1wbGFjZWhvbGRlclxcXCIgW2F0dHIuZm9yXT1cXFwiaW5wdXRJZFxcXCIgW2NsYXNzLm1kLWVtcHR5XT1cXFwiZW1wdHlcXFwiIFtjbGFzcy5tZC1mb2N1c2VkXT1cXFwiZm9jdXNlZFxcXCIgW2NsYXNzLm1kLWZsb2F0XT1cXFwiZmxvYXRpbmdQbGFjZWhvbGRlclxcXCIgW2NsYXNzLm1kLWFjY2VudF09XFxcImRpdmlkZXJDb2xvciA9PSAnYWNjZW50J1xcXCIgW2NsYXNzLm1kLXdhcm5dPVxcXCJkaXZpZGVyQ29sb3IgPT0gJ3dhcm4nXFxcIiAqbmdJZj1cXFwiaGFzUGxhY2Vob2xkZXIoKVxcXCI+IDxuZy1jb250ZW50IHNlbGVjdD1cXFwibWQtcGxhY2Vob2xkZXJcXFwiPjwvbmctY29udGVudD4ge3twbGFjZWhvbGRlcn19IDxzcGFuIGNsYXNzPVxcXCJtZC1wbGFjZWhvbGRlci1yZXF1aXJlZFxcXCIgKm5nSWY9XFxcInJlcXVpcmVkXFxcIj4qPC9zcGFuPiA8L2xhYmVsPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwibWQtaW5wdXQtc3VmZml4XFxcIj48bmctY29udGVudCBzZWxlY3Q9XFxcIlttZC1zdWZmaXhdXFxcIj48L25nLWNvbnRlbnQ+PC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJtZC1pbnB1dC11bmRlcmxpbmVcXFwiIFtjbGFzcy5tZC1kaXNhYmxlZF09XFxcImRpc2FibGVkXFxcIj4gPHNwYW4gY2xhc3M9XFxcIm1kLWlucHV0LXJpcHBsZVxcXCIgW2NsYXNzLm1kLWZvY3VzZWRdPVxcXCJmb2N1c2VkXFxcIiBbY2xhc3MubWQtYWNjZW50XT1cXFwiZGl2aWRlckNvbG9yID09ICdhY2NlbnQnXFxcIiBbY2xhc3MubWQtd2Fybl09XFxcImRpdmlkZXJDb2xvciA9PSAnd2FybidcXFwiPjwvc3Bhbj4gPC9kaXY+IDxkaXYgKm5nSWY9XFxcImhpbnRMYWJlbCAhPSAnJ1xcXCIgY2xhc3M9XFxcIm1kLWhpbnRcXFwiPnt7aGludExhYmVsfX08L2Rpdj4gPG5nLWNvbnRlbnQgc2VsZWN0PVxcXCJtZC1oaW50XFxcIj48L25nLWNvbnRlbnQ+IDwvZGl2PiBcIixcclxuICAgICAgICAgICAgc3R5bGVzOiBbXCIvKiogKiBNaXhpbiB0aGF0IGNyZWF0ZXMgYSBuZXcgc3RhY2tpbmcgY29udGV4dC4gKiBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL0NTU19Qb3NpdGlvbmluZy9VbmRlcnN0YW5kaW5nX3pfaW5kZXgvVGhlX3N0YWNraW5nX2NvbnRleHQgKi8gLyoqICogVGhpcyBtaXhpbiBoaWRlcyBhbiBlbGVtZW50IHZpc3VhbGx5LiAqIFRoYXQgbWVhbnMgaXQncyBzdGlsbCBhY2Nlc3NpYmxlIGZvciBzY3JlZW4tcmVhZGVycyBidXQgbm90IHZpc2libGUgaW4gdmlldy4gKi8gLyoqICogRm9yY2VzIGFuIGVsZW1lbnQgdG8gZ3JvdyB0byBmaXQgZmxvYXRlZCBjb250ZW50czsgdXNlZCBhcyBhcyBhbiBhbHRlcm5hdGl2ZSB0byAqIGBvdmVyZmxvdzogaGlkZGVuO2AgYmVjYXVzZSBpdCBkb2Vzbid0IGN1dCBvZmYgY29udGVudHMuICovIC8qKiAqIEEgbWl4aW4sIHdoaWNoIGdlbmVyYXRlcyB0ZW1wb3JhcnkgaW5rIHJpcHBsZSBvbiBhIGdpdmVuIGNvbXBvbmVudC4gKiBXaGVuICRiaW5kVG9QYXJlbnQgaXMgc2V0IHRvIHRydWUsIGl0IHdpbGwgY2hlY2sgZm9yIHRoZSBmb2N1c2VkIGNsYXNzIG9uIHRoZSBzYW1lIHNlbGVjdG9yIGFzIHlvdSBpbmNsdWRlZCAqIHRoYXQgbWl4aW4uICogSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBzcGVjaWZ5IHRoZSBjb2xvciBwYWxldHRlIG9mIHRoZSB0ZW1wb3JhcnkgcmlwcGxlLiBCeSBkZWZhdWx0IGl0IHVzZXMgdGhlICogYWNjZW50IHBhbGV0dGUgZm9yIGl0cyBiYWNrZ3JvdW5kLiAqLyAvKiogICogVW5kbyB0aGUgcmVkIGJveC1zaGFkb3cgZ2xvdyBhZGRlZCBieSBGaXJlZm94IG9uIGludmFsaWQgaW5wdXRzLiAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvOi1tb3otdWktaW52YWxpZCAqLyA6LW1vei11aS1pbnZhbGlkIHsgYm94LXNoYWRvdzogbm9uZTsgfSAvKiogKiBBcHBsaWVzIGEgZmxvYXRpbmcgcGxhY2Vob2xkZXIgYWJvdmUgdGhlIGlucHV0IGl0c2VsZi4gKi8gOmhvc3QgeyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHBvc2l0aW9uOiByZWxhdGl2ZTsgZm9udC1mYW1pbHk6IFJvYm90bywgXFxcIkhlbHZldGljYSBOZXVlXFxcIiwgc2Fucy1zZXJpZjsgdGV4dC1hbGlnbjogbGVmdDsgfSA6aG9zdCAubWQtaW5wdXQtd3JhcHBlciB7IG1hcmdpbjogMTZweCAwOyB9IDpob3N0IC5tZC1pbnB1dC10YWJsZSB7IGRpc3BsYXk6IGlubGluZS10YWJsZTsgLXdlYmtpdC1mbGV4LWZsb3c6IGNvbHVtbjsgLW1zLWZsZXgtZmxvdzogY29sdW1uOyBmbGV4LWZsb3c6IGNvbHVtbjsgdmVydGljYWwtYWxpZ246IGJvdHRvbTsgd2lkdGg6IDEwMCU7IH0gOmhvc3QgLm1kLWlucHV0LXRhYmxlID4gKiB7IGRpc3BsYXk6IHRhYmxlLWNlbGw7IH0gOmhvc3QgLm1kLWlucHV0LWVsZW1lbnQgeyBmb250OiBpbmhlcml0OyBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgYm9yZGVyOiBub25lOyBvdXRsaW5lOiBub25lOyBwYWRkaW5nOiAwOyB3aWR0aDogMTAwJTsgfSA6aG9zdCAubWQtaW5wdXQtZWxlbWVudC5tZC1lbmQgeyB0ZXh0LWFsaWduOiByaWdodDsgfSA6aG9zdCAubWQtaW5wdXQtaW5maXggeyBwb3NpdGlvbjogcmVsYXRpdmU7IH0gOmhvc3QgLm1kLWlucHV0LXBsYWNlaG9sZGVyIHsgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAwOyB0b3A6IDA7IHZpc2liaWxpdHk6IGhpZGRlbjsgZm9udC1zaXplOiAxMDAlOyBwb2ludGVyLWV2ZW50czogbm9uZTsgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zOCk7IHotaW5kZXg6IDE7IHdpZHRoOiAxMDAlOyBkaXNwbGF5OiBibG9jazsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IG92ZXJmbG93LXg6IGhpZGRlbjsgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBib3R0b20gbGVmdDsgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tIGxlZnQ7IC13ZWJraXQtdHJhbnNpdGlvbjogc2NhbGUgMC40cyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKSwgY29sb3IgMC40cyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC40cyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKTsgdHJhbnNpdGlvbjogc2NhbGUgMC40cyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKSwgY29sb3IgMC40cyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKSwgLXdlYmtpdC10cmFuc2Zvcm0gMC40cyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKTsgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNHMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSksIHNjYWxlIDAuNHMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSksIGNvbG9yIDAuNHMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSk7IHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpLCBzY2FsZSAwLjRzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpLCBjb2xvciAwLjRzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpLCAtd2Via2l0LXRyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpOyB9IDpob3N0IC5tZC1pbnB1dC1wbGFjZWhvbGRlci5tZC1lbXB0eSB7IHZpc2liaWxpdHk6IHZpc2libGU7IGN1cnNvcjogdGV4dDsgfSA6aG9zdCAubWQtaW5wdXQtcGxhY2Vob2xkZXIubWQtZmxvYXQ6bm90KC5tZC1lbXB0eSksIDpob3N0IC5tZC1pbnB1dC1wbGFjZWhvbGRlci5tZC1mbG9hdC5tZC1mb2N1c2VkIHsgdmlzaWJpbGl0eTogdmlzaWJsZTsgcGFkZGluZy1ib3R0b206IDVweDsgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpIHNjYWxlKDAuNzUpOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpIHNjYWxlKDAuNzUpOyB9IDpob3N0IC5tZC1pbnB1dC1wbGFjZWhvbGRlci5tZC1mbG9hdDpub3QoLm1kLWVtcHR5KSAubWQtcGxhY2Vob2xkZXItcmVxdWlyZWQsIDpob3N0IC5tZC1pbnB1dC1wbGFjZWhvbGRlci5tZC1mbG9hdC5tZC1mb2N1c2VkIC5tZC1wbGFjZWhvbGRlci1yZXF1aXJlZCB7IGNvbG9yOiAjOWMyN2IwOyB9IDpob3N0IC5tZC1pbnB1dC1wbGFjZWhvbGRlci5tZC1mb2N1c2VkIHsgY29sb3I6ICMwMDk2ODg7IH0gOmhvc3QgLm1kLWlucHV0LXBsYWNlaG9sZGVyLm1kLWZvY3VzZWQubWQtYWNjZW50IHsgY29sb3I6ICM5YzI3YjA7IH0gOmhvc3QgLm1kLWlucHV0LXBsYWNlaG9sZGVyLm1kLWZvY3VzZWQubWQtd2FybiB7IGNvbG9yOiAjZjQ0MzM2OyB9IDpob3N0IGlucHV0Oi13ZWJraXQtYXV0b2ZpbGwgKyAubWQtaW5wdXQtcGxhY2Vob2xkZXIgeyB2aXNpYmlsaXR5OiB2aXNpYmxlOyBwYWRkaW5nLWJvdHRvbTogNXB4OyAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSkgc2NhbGUoMC43NSk7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSkgc2NhbGUoMC43NSk7IH0gOmhvc3QgaW5wdXQ6LXdlYmtpdC1hdXRvZmlsbCArIC5tZC1pbnB1dC1wbGFjZWhvbGRlciAubWQtcGxhY2Vob2xkZXItcmVxdWlyZWQgeyBjb2xvcjogIzljMjdiMDsgfSA6aG9zdCAubWQtaW5wdXQtdW5kZXJsaW5lIHsgcG9zaXRpb246IGFic29sdXRlOyBoZWlnaHQ6IDFweDsgd2lkdGg6IDEwMCU7IG1hcmdpbi10b3A6IDRweDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4zOCk7IH0gOmhvc3QgLm1kLWlucHV0LXVuZGVybGluZS5tZC1kaXNhYmxlZCB7IGJvcmRlci10b3A6IDA7IGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsIHJnYmEoMCwgMCwgMCwgMC4yNikgMCUsIHJnYmEoMCwgMCwgMCwgMC4yNikgMzMlLCB0cmFuc3BhcmVudCAwJSk7IGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgwLCAwLCAwLCAwLjI2KSAwJSwgcmdiYSgwLCAwLCAwLCAwLjI2KSAzMyUsIHRyYW5zcGFyZW50IDAlKTsgYmFja2dyb3VuZC1wb3NpdGlvbjogMDsgYmFja2dyb3VuZC1zaXplOiA0cHggMXB4OyBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7IH0gOmhvc3QgLm1kLWlucHV0LXVuZGVybGluZSAubWQtaW5wdXQtcmlwcGxlIHsgcG9zaXRpb246IGFic29sdXRlOyBoZWlnaHQ6IDJweDsgei1pbmRleDogMTsgYmFja2dyb3VuZC1jb2xvcjogIzAwOTY4ODsgdG9wOiAtMXB4OyB3aWR0aDogMTAwJTsgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiB0b3A7IHRyYW5zZm9ybS1vcmlnaW46IHRvcDsgb3BhY2l0eTogMDsgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgwKTsgdHJhbnNmb3JtOiBzY2FsZVkoMCk7IC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjRzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpLCAtd2Via2l0LXRyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpOyB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuNHMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSksIC13ZWJraXQtdHJhbnNmb3JtIDAuNHMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSk7IHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpLCBvcGFjaXR5IDAuNHMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSk7IHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpLCBvcGFjaXR5IDAuNHMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSksIC13ZWJraXQtdHJhbnNmb3JtIDAuNHMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSk7IH0gOmhvc3QgLm1kLWlucHV0LXVuZGVybGluZSAubWQtaW5wdXQtcmlwcGxlLm1kLWFjY2VudCB7IGJhY2tncm91bmQtY29sb3I6ICM5YzI3YjA7IH0gOmhvc3QgLm1kLWlucHV0LXVuZGVybGluZSAubWQtaW5wdXQtcmlwcGxlLm1kLXdhcm4geyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQ0MzM2OyB9IDpob3N0IC5tZC1pbnB1dC11bmRlcmxpbmUgLm1kLWlucHV0LXJpcHBsZS5tZC1mb2N1c2VkIHsgb3BhY2l0eTogMTsgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgxKTsgdHJhbnNmb3JtOiBzY2FsZVkoMSk7IH0gOmhvc3QgLm1kLWhpbnQgeyBwb3NpdGlvbjogYWJzb2x1dGU7IGZvbnQtc2l6ZTogNzUlOyBib3R0b206IC0wLjVlbTsgfSA6aG9zdCAubWQtaGludC5tZC1yaWdodCB7IHJpZ2h0OiAwOyB9IDpob3N0LWNvbnRleHQoW2Rpcj1cXFwicnRsXFxcIl0pIHsgdGV4dC1hbGlnbjogcmlnaHQ7IH0gOmhvc3QtY29udGV4dChbZGlyPVxcXCJydGxcXFwiXSkgLm1kLWlucHV0LXBsYWNlaG9sZGVyIHsgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBib3R0b20gcmlnaHQ7IHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbSByaWdodDsgfSA6aG9zdC1jb250ZXh0KFtkaXI9XFxcInJ0bFxcXCJdKSAubWQtaW5wdXQtZWxlbWVudC5tZC1lbmQgeyB0ZXh0LWFsaWduOiBsZWZ0OyB9IDpob3N0LWNvbnRleHQoW2Rpcj1cXFwicnRsXFxcIl0pIC5tZC1oaW50IHsgcmlnaHQ6IDA7IGxlZnQ6IGF1dG87IH0gOmhvc3QtY29udGV4dChbZGlyPVxcXCJydGxcXFwiXSkgLm1kLWhpbnQubWQtcmlnaHQgeyByaWdodDogYXV0bzsgbGVmdDogMDsgfSBcIl0sXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW01EX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgICAgICAgICBob3N0OiB7ICcoY2xpY2spJzogJ2ZvY3VzKCknIH1cclxuICAgICAgICB9KSwgXHJcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbXSlcclxuICAgIF0sIE1kSW5wdXQpO1xyXG4gICAgcmV0dXJuIE1kSW5wdXQ7XHJcbn0oKSk7XHJcbmV4cG9ydHMuTWRJbnB1dCA9IE1kSW5wdXQ7XHJcbmV4cG9ydHMuTURfSU5QVVRfRElSRUNUSVZFUyA9IFtNZFBsYWNlaG9sZGVyLCBNZElucHV0LCBNZEhpbnRdO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD0vdXNyL2xvY2FsL2dvb2dsZS9ob21lL2plbGJvdXJuL21hdGVyaWFsMi90bXAvYnJvY2NvbGlfdHlwZV9zY3JpcHRfY29tcGlsZXItaW5wdXRfYmFzZV9wYXRoLUl5ZHZtbUJVLnRtcC8wL2NvbXBvbmVudHMvaW5wdXQvaW5wdXQuanMubWFwXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vQGFuZ3VsYXIyLW1hdGVyaWFsL2lucHV0L2lucHV0LmpzXG4gKiogbW9kdWxlIGlkID0gNDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZUNvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkJztcblxuaW1wb3J0IHsgQXBwU3RhdGUgfSBmcm9tICcuL2FwcC5zZXJ2aWNlJztcbmltcG9ydCB7IEhvbWUgfSBmcm9tICcuL2hvbWUnO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vZ2FtZSc7XG5cbi8qXG4gKiBBcHAgQ29tcG9uZW50XG4gKiBUb3AgTGV2ZWwgQ29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcCcsXG4gIHBpcGVzOiBbIF0sXG4gIHByb3ZpZGVyczogWyBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtcbiAgICByZXF1aXJlKCdub3JtYWxpemUuY3NzJyksXG4gICAgcmVxdWlyZSgnLi9hcHAuY3NzJylcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bWQtY29udGVudD5cbiAgICAgIDxtZC10b29sYmFyIGNvbG9yPVwicHJpbWFyeVwiPlxuICAgICAgICAgIDxzcGFuPnt7IG5hbWUgfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWxsXCI+PC9zcGFuPlxuICAgICAgICAgIDxidXR0b24gbWQtYnV0dG9uIFtyb3V0ZXJMaW5rXT1cIiBbJ0hvbWUnXSBcIj5cbiAgICAgICAgICAgIEhvbWVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG1kLWJ1dHRvbiBbcm91dGVyTGlua109XCIgWydHYW1lJ10gXCI+XG4gICAgICAgICAgICBHYW1lXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICA8L21kLXRvb2xiYXI+XG5cbiAgICAgIDxtZC1wcm9ncmVzcy1iYXIgbW9kZT1cImluZGV0ZXJtaW5hdGVcIiBjb2xvcj1cInByaW1hcnlcIiAqbmdJZj1cImxvYWRpbmdcIj48L21kLXByb2dyZXNzLWJhcj5cblxuICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICAgICAgPC9tZC1jb250ZW50PlxuICBgXG59KVxuQFJvdXRlQ29uZmlnKFtcbiAgeyBwYXRoOiAnL2hvbWUnLCAgbmFtZTogJ0hvbWUnLCAgY29tcG9uZW50OiBIb21lLCB1c2VBc0RlZmF1bHQ6IHRydWUgfSxcbiAgeyBwYXRoOiAnL2dhbWUnLCAgbmFtZTogJ0dhbWUnLCAgY29tcG9uZW50OiBHYW1lIH1cbl0pXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgbG9hZGluZyA9IGZhbHNlO1xuICBuYW1lID0gJ0FuZ3VsYXIgMiBDaGVzcyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFwcFN0YXRlOiBBcHBTdGF0ZSkge1xuXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcC9hcHAuY29tcG9uZW50LnRzXG4gKiovIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kU2lkZW5hdiB9IGZyb20gJ0Bhbmd1bGFyMi1tYXRlcmlhbC9zaWRlbmF2L3NpZGVuYXYnO1xuaW1wb3J0IHsgTWRSYWRpb0NoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyMi1tYXRlcmlhbC9yYWRpby9yYWRpbyc7XG5cbmltcG9ydCB7IENoZXNzQm9hcmQsIENoZXNzQm9hcmRDb250cm9sbGVyLCBQaWVjZUNvbG9yLCBQbGF5ZXJUeXBlLCBCYXNlQmxvY2sgfSBmcm9tICduZzItY2hlc3MnO1xuaW1wb3J0IHsgRE9NX1NWR19LSVRfRElSRUNUSVZFUyB9IGZyb20gJy4uLy4uL3BhY2thZ2VzL25nMi1jaGVzcy9wbHVnaW5zL3VpL2RvbS1zdmctYm9hcmQnO1xuaW1wb3J0IHsgQ0hFU1NKU19BSV9DSEVTU19HQU1FX1BST1ZJREVSUyB9IGZyb20gJy4uLy4uL3BhY2thZ2VzL25nMi1jaGVzcy9wbHVnaW5zL2dhbWUvY2hlc3Nqcy1haSc7XG5cbi8qXG4gV2hlbiBuZzItY2hlc3MgaXMgYW4gbnBtIG1vZHVsZTpcbiBpbXBvcnQgeyBET01fU1ZHX0tJVF9ESVJFQ1RJVkVTIH0gZnJvbSAnbmcyLWNoZXNzL3BsdWdpbnMvdWkvZG9tLXN2Zy1ib2FyZCc7XG4gaW1wb3J0IHsgQ0hFU1NKU19DSEVTU19HQU1FX1BST1ZJREVSUyB9IGZyb20gJ25nMi1jaGVzcy9wbHVnaW5zL2dhbWUvY2hlc3Nqcyc7XG4gaW1wb3J0IHsgQ0hFU1NKU19BSV9DSEVTU19HQU1FX1BST1ZJREVSUyB9IGZyb20gJ25nMi1jaGVzcy9wbHVnaW5zL2dhbWUvY2hlc3Nqcy1haSc7XG4gKi9cblxuY2xhc3MgUGxheWVyIHtcbiAgZ2V0IHJhd3R5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gUGxheWVyVHlwZVt0aGlzLnR5cGVdO1xuICB9XG4gIHNldCByYXd0eXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnR5cGUgPSBQbGF5ZXJUeXBlW3ZhbHVlXTtcbiAgfVxuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29sb3I6IFBpZWNlQ29sb3IsIHB1YmxpYyB0eXBlOiBQbGF5ZXJUeXBlLCBwdWJsaWMgYWlJbmRleDogbnVtYmVyKSB7XG5cbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnYW1lJyxcbiAgcHJvdmlkZXJzOiBbIC4uLkNIRVNTSlNfQUlfQ0hFU1NfR0FNRV9QUk9WSURFUlMgXSxcbiAgZGlyZWN0aXZlczogWyAuLi5ET01fU1ZHX0tJVF9ESVJFQ1RJVkVTIF0sXG4gIHBpcGVzOiBbIF0sXG4gIHN0eWxlczogWyByZXF1aXJlKCcuL2dhbWUuY3NzJykgXSxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vZ2FtZS5odG1sJylcbn0pXG5leHBvcnQgY2xhc3MgR2FtZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBhaUxldmVscyA9IFsxLDIsMyw0LDUsNiw3LDgsOSwxMF07XG5cbiAgYmxhY2s6IFBsYXllciA9IG5ldyBQbGF5ZXIoUGllY2VDb2xvci5CTEFDSywgUGxheWVyVHlwZS5BSSwgOSk7XG4gIHdoaXRlOiBQbGF5ZXIgPSBuZXcgUGxheWVyKFBpZWNlQ29sb3IuV0hJVEUsIFBsYXllclR5cGUuSFVNQU4sIDkpO1xuXG4gIEBWaWV3Q2hpbGQoJ3NpZGVuYXYnKSBwcml2YXRlIHNpZGVuYXY6IE1kU2lkZW5hdjtcbiAgQFZpZXdDaGlsZCgnYm9hcmQnKSBwcml2YXRlIGJvYXJkOiBDaGVzc0JvYXJkO1xuXG4gIGlzSW5pdDogYm9vbGVhbjtcblxuICBwcml2YXRlIGN0cmw6IENoZXNzQm9hcmRDb250cm9sbGVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5jdHJsID0gdGhpcy5ib2FyZC5jdHJsO1xuICAgIHRoaXMuY3RybC5pbml0KClcbiAgICAgIC50aGVuKCAoKSA9PiB0aGlzLnNpZGVuYXYudG9nZ2xlKHRydWUpICk7XG5cbiAgfVxuXG4gIG9uUGxheWVyVHlwZUNoYW5nZShldmVudDogTWRSYWRpb0NoYW5nZSwgcGxheWVyOiBQbGF5ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmN0cmwuc2V0UGxheWVyKHBsYXllci5jb2xvciwgPGFueT5QbGF5ZXJUeXBlW2V2ZW50LnZhbHVlXSk7XG4gIH1cblxuICBvbkFJTGV2ZWxDaGFuZ2UoJGV2ZW50OiBFdmVudCwgcGxheWVyOiBQbGF5ZXIpOiB2b2lkIHtcbiAgICBwbGF5ZXIuYWlJbmRleCA9IE51bWJlciggKDxhbnk+JGV2ZW50LnNyY0VsZW1lbnQpLnNlbGVjdGVkSW5kZXgpO1xuICAgIHRoaXMuY3RybC5zZXRQbGF5ZXIocGxheWVyLmNvbG9yLCBwbGF5ZXIudHlwZSwgdGhpcy5nZXRMZXZlbChwbGF5ZXIuYWlJbmRleCkpO1xuICB9XG5cbiAgb25OZXdHYW1lKCk6IHZvaWQge1xuICAgIHRoaXMuY3RybFxuICAgICAgLnNldFBsYXllcih0aGlzLmJsYWNrLmNvbG9yLCB0aGlzLmJsYWNrLnR5cGUsIHRoaXMuZ2V0TGV2ZWwodGhpcy5ibGFjay5haUluZGV4KSlcbiAgICAgIC5zZXRQbGF5ZXIodGhpcy53aGl0ZS5jb2xvciwgdGhpcy53aGl0ZS50eXBlLCB0aGlzLmdldExldmVsKHRoaXMud2hpdGUuYWlJbmRleCkpXG4gICAgICAubmV3R2FtZSgpO1xuICAgIFxuICAgIHRoaXMuaXNJbml0ID0gdHJ1ZTtcbiAgfVxuXG4gIG9uU3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmN0cmwuYWlTdG9wKCk7XG4gIH1cblxuICBoaW50KCk6IHZvaWQge1xuICAgIHRoaXMuY3RybC5haU5leHRNb3ZlKCkudGhlbiggbXYgPT4gIHRoaXMuY3RybC5oaWdobGlnaHQobXYudG8sIG12LmZyb20pICk7XG4gIH1cblxuICBwcml2YXRlIGdldExldmVsKGlkeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5haUxldmVsc1tpZHhdO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHAvZ2FtZS9nYW1lLmNvbXBvbmVudC50c1xuICoqLyIsImV4cG9ydCAqIGZyb20gJy4vZ2FtZS5jb21wb25lbnQnO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwL2dhbWUvaW5kZXgudHNcbiAqKi8iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDaGVzc0JvYXJkLCBDaGVzc0JvYXJkQ29udHJvbGxlciwgUGllY2VDb2xvciwgUGxheWVyVHlwZSB9IGZyb20gJ25nMi1jaGVzcyc7XG5pbXBvcnQgeyBET01fU1ZHX0tJVF9ESVJFQ1RJVkVTIH0gZnJvbSAnbmcyLWNoZXNzL3BsdWdpbnMvdWkvZG9tLXN2Zy1ib2FyZCc7XG5pbXBvcnQgeyBDSEVTU0pTX0NIRVNTX0dBTUVfUFJPVklERVJTIH0gZnJvbSAnbmcyLWNoZXNzL3BsdWdpbnMvZ2FtZS9jaGVzc2pzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaG9tZScsXG4gIHByb3ZpZGVyczogWyAuLi5DSEVTU0pTX0NIRVNTX0dBTUVfUFJPVklERVJTIF0sXG4gIGRpcmVjdGl2ZXM6IFsgLi4uRE9NX1NWR19LSVRfRElSRUNUSVZFUyBdLFxuICBwaXBlczogWyBdLFxuICBzdHlsZXM6IFsgcmVxdWlyZSgnLi9ob21lLmNzcycpIF0sXG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2hvbWUuaHRtbCcpXG59KVxuZXhwb3J0IGNsYXNzIEhvbWUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgXG4gIEBWaWV3Q2hpbGQoJ2JvYXJkJykgcHJpdmF0ZSBib2FyZDogQ2hlc3NCb2FyZDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5ib2FyZC5jdHJsXG4gICAgICAuaW5pdCgpXG4gICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICB0aGlzLmJvYXJkLmN0cmxcbiAgICAgICAgICAuc2V0UGxheWVyKFBpZWNlQ29sb3IuQkxBQ0ssIFBsYXllclR5cGUuSFVNQU4pXG4gICAgICAgICAgLnNldFBsYXllcihQaWVjZUNvbG9yLldISVRFLCBQbGF5ZXJUeXBlLkhVTUFOKVxuICAgICAgICAgIC5uZXdHYW1lKCk7XG4gICAgICB9KTtcbiAgfVxuICBcbiBcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzXG4gKiovIiwiZXhwb3J0ICogZnJvbSAnLi9ob21lLmNvbXBvbmVudCc7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHAvaG9tZS9pbmRleC50c1xuICoqLyIsIi8vIEFwcFxuZXhwb3J0ICogZnJvbSAnLi9hcHAuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vYXBwLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBBcHBTdGF0ZSB9IGZyb20gJy4vYXBwLnNlcnZpY2UnO1xuXG4vLyBBcHBsaWNhdGlvbiB3aWRlIHByb3ZpZGVyc1xuZXhwb3J0IGNvbnN0IEFQUF9QUk9WSURFUlMgPSBbXG4gIEFwcFN0YXRlXG5dO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXBwL2luZGV4LnRzXG4gKiovIiwiLypcbiAqIFRoZXNlIGFyZSBnbG9iYWxseSBhdmFpbGFibGUgZGlyZWN0aXZlcyBpbiBhbnkgdGVtcGxhdGVcbiAqL1xuXG5pbXBvcnQgeyBQTEFURk9STV9ESVJFQ1RJVkVTIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBBbmd1bGFyIDIgUm91dGVyXG5pbXBvcnQgeyBST1VURVJfRElSRUNUSVZFUyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkJztcblxuLy8gQW5ndWxhciAyIE1hdGVyaWFsIDJcbi8vIFRPRE8oZ2RpMjI5MCk6IHJlcGxhY2Ugd2l0aCBAYW5ndWxhcjItbWF0ZXJpYWwvYWxsXG5pbXBvcnQgeyBNQVRFUklBTF9ESVJFQ1RJVkVTIH0gZnJvbSAnLi9hbmd1bGFyMi1tYXRlcmlhbDInO1xuXG4vLyBhcHBsaWNhdGlvbl9kaXJlY3RpdmVzOiBkaXJlY3RpdmVzIHRoYXQgYXJlIGdsb2JhbCB0aHJvdWdoIG91dCB0aGUgYXBwbGljYXRpb25cbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9ESVJFQ1RJVkVTID0gW1xuICAuLi5ST1VURVJfRElSRUNUSVZFUyxcbiAgLi4uTUFURVJJQUxfRElSRUNUSVZFU1xuXTtcblxuZXhwb3J0IGNvbnN0IERJUkVDVElWRVMgPSBbXG4gIHtwcm92aWRlOiBQTEFURk9STV9ESVJFQ1RJVkVTLCBtdWx0aTogdHJ1ZSwgdXNlVmFsdWU6IEFQUExJQ0FUSU9OX0RJUkVDVElWRVMgfVxuXTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BsYXRmb3JtL2Jyb3dzZXIvZGlyZWN0aXZlcy50c1xuICoqLyIsImV4cG9ydCAqIGZyb20gJy4vZGlyZWN0aXZlcyc7XG5leHBvcnQgKiBmcm9tICcuL3BpcGVzJztcbmV4cG9ydCAqIGZyb20gJy4vcHJvdmlkZXJzJztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXgudHNcbiAqKi8iLCIvKlxuICogVGhlc2UgYXJlIGdsb2JhbGx5IGF2YWlsYWJsZSBwaXBlcyBpbiBhbnkgdGVtcGxhdGVcbiAqL1xuXG5pbXBvcnQgeyBQTEFURk9STV9QSVBFUyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBhcHBsaWNhdGlvbl9waXBlczogcGlwZXMgdGhhdCBhcmUgZ2xvYmFsIHRocm91Z2ggb3V0IHRoZSBhcHBsaWNhdGlvblxuZXhwb3J0IGNvbnN0IEFQUExJQ0FUSU9OX1BJUEVTID0gW1xuXG5dO1xuXG5leHBvcnQgY29uc3QgUElQRVMgPSBbXG4gIHtwcm92aWRlOiBQTEFURk9STV9QSVBFUywgbXVsdGk6IHRydWUsIHVzZVZhbHVlOiBBUFBMSUNBVElPTl9QSVBFUyB9XG5dO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGxhdGZvcm0vYnJvd3Nlci9waXBlcy50c1xuICoqLyIsIi8qXG4gKiBUaGVzZSBhcmUgZ2xvYmFsbHkgYXZhaWxhYmxlIHNlcnZpY2VzIGluIGFueSBjb21wb25lbnQgb3IgYW55IG90aGVyIHNlcnZpY2VcbiAqL1xuXG4vLyBBbmd1bGFyIDJcbmltcG9ydCB7IEZPUk1fUFJPVklERVJTLCBIYXNoTG9jYXRpb25TdHJhdGVneSwgTG9jYXRpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG4vLyBBbmd1bGFyIDIgSHR0cFxuaW1wb3J0IHsgSFRUUF9QUk9WSURFUlMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbi8vIEFuZ3VsYXIgMiBSb3V0ZXJcbmltcG9ydCB7IFJPVVRFUl9QUk9WSURFUlMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZCc7XG5cbi8vIEFuZ3VsYXIgMiBNYXRlcmlhbFxuLy8gVE9ETyhnZGkyMjkwKTogcmVwbGFjZSB3aXRoIEBhbmd1bGFyMi1tYXRlcmlhbC9hbGxcbmltcG9ydCB7IE1BVEVSSUFMX1BST1ZJREVSUyB9IGZyb20gJy4vYW5ndWxhcjItbWF0ZXJpYWwyJztcblxuLypcbiogQXBwbGljYXRpb24gUHJvdmlkZXJzL0RpcmVjdGl2ZXMvUGlwZXNcbiogcHJvdmlkZXJzL2RpcmVjdGl2ZXMvcGlwZXMgdGhhdCBvbmx5IGxpdmUgaW4gb3VyIGJyb3dzZXIgZW52aXJvbm1lbnRcbiovXG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fUFJPVklERVJTID0gW1xuICAuLi5GT1JNX1BST1ZJREVSUyxcbiAgLi4uSFRUUF9QUk9WSURFUlMsXG4gIC4uLk1BVEVSSUFMX1BST1ZJREVSUyxcbiAgLi4uUk9VVEVSX1BST1ZJREVSUyxcbiAge3Byb3ZpZGU6IExvY2F0aW9uU3RyYXRlZ3ksIHVzZUNsYXNzOiBIYXNoTG9jYXRpb25TdHJhdGVneSB9XG5dO1xuXG5leHBvcnQgY29uc3QgUFJPVklERVJTID0gW1xuICAuLi5BUFBMSUNBVElPTl9QUk9WSURFUlNcbl07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbGF0Zm9ybS9icm93c2VyL3Byb3ZpZGVycy50c1xuICoqLyIsIlxuLy8gQW5ndWxhciAyXG5pbXBvcnQgeyBlbmFibGVQcm9kTW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vLyBFbnZpcm9ubWVudCBQcm92aWRlcnNcbmxldCBQUk9WSURFUlMgPSBbXTtcblxuaWYgKCdwcm9kdWN0aW9uJyA9PT0gRU5WKSB7XG4gIC8vIFByb2R1Y3Rpb25cbiAgZW5hYmxlUHJvZE1vZGUoKTtcblxuICBQUk9WSURFUlMgPSBbXG4gICAgLi4uUFJPVklERVJTXG4gIF07XG5cbn0gZWxzZSB7XG4gIC8vIERldmVsb3BtZW50XG4gIFBST1ZJREVSUyA9IFtcbiAgICAuLi5QUk9WSURFUlNcbiAgXTtcblxufVxuXG5cbmV4cG9ydCBjb25zdCBFTlZfUFJPVklERVJTID0gW1xuICAuLi5QUk9WSURFUlNcbl07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wbGF0Zm9ybS9lbnZpcm9ubWVudC50c1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCIvKiEgbm9ybWFsaXplLmNzcyB2NC4xLjEgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIHRoZSBkZWZhdWx0IGZvbnQgZmFtaWx5IGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gSUUgYW5kIGlPUy5cXG4gKi9cXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyAvKiAxICovXFxuICAtbXMtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKiBIVE1MNSBkaXNwbGF5IGRlZmluaXRpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSwgYW5kIEZpcmVmb3guXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUuXFxuICovXFxuXFxuYXJ0aWNsZSxcXG5hc2lkZSxcXG5kZXRhaWxzLCAvKiAxICovXFxuZmlnY2FwdGlvbixcXG5maWd1cmUsXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5tYWluLCAvKiAyICovXFxubWVudSxcXG5uYXYsXFxuc2VjdGlvbixcXG5zdW1tYXJ5IHsgLyogMSAqL1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDktLlxcbiAqL1xcblxcbmF1ZGlvLFxcbmNhbnZhcyxcXG5wcm9ncmVzcyxcXG52aWRlbyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGlPUyA0LTcuXFxuICovXFxuXFxuYXVkaW86bm90KFtjb250cm9sc10pIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC0uXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUuXFxuICovXFxuXFxudGVtcGxhdGUsIC8qIDEgKi9cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKiBMaW5rc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSBnYXBzIGluIGxpbmtzIHVuZGVybGluZSBpbiBpT1MgOCsgYW5kIFNhZmFyaSA4Ky5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyAvKiAxICovXFxuICAtd2Via2l0LXRleHQtZGVjb3JhdGlvbi1za2lwOiBvYmplY3RzOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgb3V0bGluZSBvbiBmb2N1c2VkIGxpbmtzIHdoZW4gdGhleSBhcmUgYWxzbyBhY3RpdmUgb3IgaG92ZXJlZFxcbiAqIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxcbiAqL1xcblxcbmE6YWN0aXZlLFxcbmE6aG92ZXIge1xcbiAgb3V0bGluZS13aWR0aDogMDtcXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBGaXJlZm94IDM5LS5cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmFiYnJbdGl0bGVdIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyAvKiAyICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUHJldmVudCB0aGUgZHVwbGljYXRlIGFwcGxpY2F0aW9uIG9mIGBib2xkZXJgIGJ5IHRoZSBuZXh0IHJ1bGUgaW4gU2FmYXJpIDYuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGluaGVyaXQ7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc3R5bGUgaW4gQW5kcm9pZCA0LjMtLlxcbiAqL1xcblxcbmRmbiB7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGJhY2tncm91bmQgYW5kIGNvbG9yIGluIElFIDktLlxcbiAqL1xcblxcbm1hcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLS5cXG4gKi9cXG5cXG5pbWcge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBIaWRlIHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKi9cXG5cXG5zdmc6bm90KDpyb290KSB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4vKiBHcm91cGluZyBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5jb2RlLFxcbmtiZCxcXG5wcmUsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBtYXJnaW4gaW4gSUUgOC5cXG4gKi9cXG5cXG5maWd1cmUge1xcbiAgbWFyZ2luOiAxZW0gNDBweDtcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKiBGb3Jtc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gYWxsIGJyb3dzZXJzIChvcGluaW9uYXRlZCkuXFxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCxcXG5zZWxlY3QsXFxudGV4dGFyZWEge1xcbiAgZm9udDogaW5oZXJpdDsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlc3RvcmUgdGhlIGZvbnQgd2VpZ2h0IHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbm9wdGdyb3VwIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4vKipcXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxcbiAqL1xcblxcbmJ1dHRvbixcXG5pbnB1dCB7IC8qIDEgKi9cXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cXG4gKiAxLiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uLFxcbnNlbGVjdCB7IC8qIDEgKi9cXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBQcmV2ZW50IGEgV2ViS2l0IGJ1ZyB3aGVyZSAoMikgZGVzdHJveXMgbmF0aXZlIGBhdWRpb2AgYW5kIGB2aWRlb2BcXG4gKiAgICBjb250cm9scyBpbiBBbmRyb2lkIDQuXFxuICogMi4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaHRtbCBbdHlwZT1cXFwiYnV0dG9uXFxcIl0sIC8qIDEgKi9cXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDaGFuZ2UgdGhlIGJvcmRlciwgbWFyZ2luLCBhbmQgcGFkZGluZyBpbiBhbGwgYnJvd3NlcnMgKG9waW5pb25hdGVkKS5cXG4gKi9cXG5cXG5maWVsZHNldCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjYzBjMGMwO1xcbiAgbWFyZ2luOiAwIDJweDtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjYyNWVtIDAuNzVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFLlxcbiAqL1xcblxcbnRleHRhcmVhIHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBJRSAxMC0uXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgYW5kIGNhbmNlbCBidXR0b25zIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIE9TIFguXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIHRleHQgc3R5bGUgb2YgcGxhY2Vob2xkZXJzIGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBvcGFjaXR5OiAwLjU0O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXG4gKiogbW9kdWxlIGlkID0gNTA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiaHRtbCwgYm9keXtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQ6ICNGNEZBRkE7XFxufVxcbmJ1dHRvbi5hY3RpdmV7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgY29sb3I6ICMwMDk2ODg7XFxufVxcbmJ1dHRvbi5hY3RpdmU6aG92ZXJ7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuLmZpbGx7XFxuICBmbGV4OiAxIDEgYXV0bztcXG59XFxuLmFwcC1zdGF0ZXtcXG4gIG1hcmdpbjogMTVweDtcXG4gIGZsZXg6IDE7XFxufVxcbi5ob21le1xcbiAgZmxleDogMTtcXG59XFxubWQtY29udGVudHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5mb290ZXJ7XFxuICBmbGV4OiAwIDAgNjBweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2FwcC9hcHAuY3NzXG4gKiogbW9kdWxlIGlkID0gNTEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiOmhvc3Qge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5tZC1jYXJkLCBtZC1jYXJkOmhvdmVyIHtcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuLm1kLXNpZGVuYXYtc2lkZSB7XFxuICB3aWR0aDogMjUwcHg7XFxufVxcblxcbi5zZXR0aW5ncy1idXR0b24ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICB6LWluZGV4OiA1MDAwO1xcbn1cXG5cXG4uc2lkZW5hdi1sYXlvdXQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uc2V0dGluZ3MtY29udGFpbmVyIHtcXG4gIHBhZGRpbmc6IDI0cHg7XFxuXFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xcblxcbiAgZmxleDogMCAwIDI1MHB4O1xcbn1cXG5cXG4uc2V0dGluZ3MtY29udGFpbmVyID4gZGl2IHtcXG4gIGZsZXg6IDEgMTAwJTtcXG59XFxuXFxuLmZvcm0tcm93IHtcXG4gIG1hcmdpbjogMTVweCAwO1xcbn1cXG5cXG4uY29uZmlnLXNlY3Rpb24gaDMge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwMDk2ODg7XFxufVxcblxcbi5jb25maWctc2VjdGlvbiB7XFxuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xcbn1cXG5cXG4uY29uZmlnLXNlY3Rpb246bGFzdC1vZi10eXBlIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMDA5Njg4O1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwMDk2ODg7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIGZsZXg6IDUgMHB4O1xcbn1cXG5cXG4uZ2FtZS10b29sYmFyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmdhbWUtdG9vbGJhciA+ICoge1xcbiAgbWFyZ2luOiA1cHg7XFxufVxcbi5zdmctY2hlc3MtYm9hcmQge1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbkBtZWRpYSAobWluLWhlaWdodDogNDAwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xcbiAgLnN2Zy1jaGVzcy1ib2FyZCB7XFxuICAgIG1heC13aWR0aDogMjAwcHg7XFxuICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgKG1pbi1oZWlnaHQ6IDYwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcXG4gIC5zdmctY2hlc3MtYm9hcmQge1xcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xcbiAgICBtYXgtaGVpZ2h0OiA0MDBweDtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtaW4taGVpZ2h0OiA3MDBweCkgYW5kIChvcmllbnRhdGlvbjogbGFuZHNjYXBlKSB7XFxuICAuc3ZnLWNoZXNzLWJvYXJkIHtcXG4gICAgbWF4LXdpZHRoOiA1MDBweDtcXG4gICAgbWF4LWhlaWdodDogNTAwcHg7XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWluLWhlaWdodDogODAwcHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xcbiAgLnN2Zy1jaGVzcy1ib2FyZCB7XFxuICAgIG1heC13aWR0aDogNjAwcHg7XFxuICAgIG1heC1oZWlnaHQ6IDYwMHB4O1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgKG1pbi1oZWlnaHQ6IDkwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcXG4gIC5zdmctY2hlc3MtYm9hcmQge1xcbiAgICBtYXgtd2lkdGg6IDcwMHB4O1xcbiAgICBtYXgtaGVpZ2h0OiA3MDBweDtcXG4gIH1cXG59XFxuXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2FwcC9nYW1lL2dhbWUuY3NzXG4gKiogbW9kdWxlIGlkID0gNTExXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGJ1dHRvbiBjbGFzcz1cXFwic2V0dGluZ3MtYnV0dG9uXFxcIiBtZC1mYWIgKGNsaWNrKT1cXFwic2lkZW5hdi50b2dnbGUoKVxcXCI+XFxuICA8bWQtaWNvbiBjbGFzcz1cXFwibWQtMjRcXFwiPnNldHRpbmdzPC9tZC1pY29uPlxcbjwvYnV0dG9uPlxcbjxtZC1zaWRlbmF2LWxheW91dCBjbGFzcz1cXFwic2lkZW5hdi1sYXlvdXRcXFwiPlxcbiAgPG1kLXNpZGVuYXYgI3NpZGVuYXYgbW9kZT1cXFwic2lkZVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcInNldHRpbmdzLWNvbnRhaW5lclxcXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29uZmlnLXNlY3Rpb25cXFwiPlxcbiAgICAgICAgPGgzPkJsYWNrOjwvaDM+XFxuICAgICAgICA8Zm9ybT5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1yb3dcXFwiPlxcbiAgICAgICAgICAgIDxtZC1yYWRpby1ncm91cCBbKG5nTW9kZWwpXT1cXFwiYmxhY2sucmF3dHlwZVxcXCIgKGNoYW5nZSk9XFxcIm9uUGxheWVyVHlwZUNoYW5nZSgkZXZlbnQsIGJsYWNrKVxcXCI+XFxuICAgICAgICAgICAgICA8bWQtcmFkaW8tYnV0dG9uIHZhbHVlPVxcXCJIVU1BTlxcXCI+SHVtYW48L21kLXJhZGlvLWJ1dHRvbj5cXG4gICAgICAgICAgICAgIDxtZC1yYWRpby1idXR0b24gdmFsdWU9XFxcIkFJXFxcIj5Db21wdXRlcjwvbWQtcmFkaW8tYnV0dG9uPlxcbiAgICAgICAgICAgIDwvbWQtcmFkaW8tZ3JvdXA+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JtLXJvd1xcXCI+XFxuICAgICAgICAgICAgPGxhYmVsPkFJIExldmVsOjwvbGFiZWw+XFxuICAgICAgICAgICAgPHNlbGVjdCAoY2hhbmdlKT1cXFwib25BSUxldmVsQ2hhbmdlKCRldmVudCwgYmxhY2spXFxcIj5cXG4gICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVxcXCJsZXQgaSBvZiBhaUxldmVsc1xcXCIgW2F0dHIudmFsdWVdPVxcXCJpXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5zZWxlY3RlZF09XFxcImJsYWNrLmFpSW5kZXggPT09IGlcXFwiPnt7aX19PC9vcHRpb24+XFxuICAgICAgICAgICAgPC9zZWxlY3Q+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9mb3JtPlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbmZpZy1zZWN0aW9uXFxcIj5cXG4gICAgICAgIDxoMz5XaGl0ZTo8L2gzPlxcbiAgICAgICAgPGZvcm0+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImZvcm0tcm93XFxcIj5cXG4gICAgICAgICAgICA8bWQtcmFkaW8tZ3JvdXAgWyhuZ01vZGVsKV09XFxcIndoaXRlLnJhd3R5cGVcXFwiIChjaGFuZ2UpPVxcXCJvblBsYXllclR5cGVDaGFuZ2UoJGV2ZW50LCB3aGl0ZSlcXFwiPlxcbiAgICAgICAgICAgICAgPG1kLXJhZGlvLWJ1dHRvbiB2YWx1ZT1cXFwiSFVNQU5cXFwiPkh1bWFuPC9tZC1yYWRpby1idXR0b24+XFxuICAgICAgICAgICAgICA8bWQtcmFkaW8tYnV0dG9uIHZhbHVlPVxcXCJBSVxcXCI+Q29tcHV0ZXI8L21kLXJhZGlvLWJ1dHRvbj5cXG4gICAgICAgICAgICA8L21kLXJhZGlvLWdyb3VwPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZm9ybS1yb3dcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5BSSBMZXZlbDo8L2xhYmVsPlxcbiAgICAgICAgICAgIDxzZWxlY3QgKGNoYW5nZSk9XFxcIm9uQUlMZXZlbENoYW5nZSgkZXZlbnQsIHdoaXRlKVxcXCI+XFxuICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cXFwibGV0IGkgb2YgYWlMZXZlbHNcXFwiIFthdHRyLnZhbHVlXT1cXFwiaVxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuc2VsZWN0ZWRdPVxcXCJ3aGl0ZS5haUluZGV4ID09PSBpXFxcIj57e2l9fTwvb3B0aW9uPlxcbiAgICAgICAgICAgIDwvc2VsZWN0PlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZm9ybT5cXG4gICAgICA8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb25maWctc2VjdGlvblxcXCI+XFxuICAgICAgICA8YnV0dG9uIG1kLWJ1dHRvbiBjb2xvcj1cXFwicHJpbWFyeVxcXCIgKGNsaWNrKT1cXFwib25OZXdHYW1lKClcXFwiPk5ldyBHYW1lPC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIG1kLWJ1dHRvbiBjb2xvcj1cXFwiYWNjZW50XFxcIiAoY2xpY2spPVxcXCJvblN0b3AoKVxcXCIgW2Rpc2FibGVkXT1cXFwiIWJvYXJkLmN0cmwuYWlQcm9jZXNzaW5nXFxcIj5TdG9wPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9tZC1zaWRlbmF2PlxcbiAgPG1kLWNhcmQgY2xhc3M9XFxcImJvYXJkLWNvbnRhaW5lclxcXCI+XFxuICAgIDxicj5cXG4gICAgPGNoZXNzLWJvYXJkIGNsYXNzPVxcXCJzdmctY2hlc3MtYm9hcmRcXFwiICNib2FyZD48L2NoZXNzLWJvYXJkPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJnYW1lLXRvb2xiYXJcXFwiPlxcbiAgICAgIDxidXR0b24gbWQtbWluaS1mYWIgKGNsaWNrKT1cXFwiY3RybC51bmRvKClcXFwiIFtkaXNhYmxlZF09XFxcImJvYXJkLmN0cmwuYWlQcm9jZXNzaW5nIHx8ICFpc0luaXRcXFwiPlxcbiAgICAgICAgPG1kLWljb24gY2xhc3M9XFxcIm1kLTI0XFxcIj51bmRvPC9tZC1pY29uPlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICAgIDxidXR0b24gbWQtbWluaS1mYWIgKGNsaWNrKT1cXFwiaGludCgpXFxcIiBbZGlzYWJsZWRdPVxcXCJib2FyZC5jdHJsLmFpUHJvY2Vzc2luZyB8fCAhaXNJbml0XFxcIiAqbmdJZj1cXFwiYm9hcmQuY3RybC5haVN1cHBvcnRlZFxcXCI+XFxuICAgICAgICA8bWQtaWNvbiBjbGFzcz1cXFwibWQtMjRcXFwiPnJlbW92ZV9yZWRfZXllPC9tZC1pY29uPlxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gIDwvbWQtY2FyZD5cXG4gIDxkaXY+XFxuICAgIDxwIHN0eWxlPVxcXCJ0ZXh0LWFsaWduOiBjZW50ZXI7IG1hcmdpbi10b3A6IDBcXFwiPk5vIHdlYiB3b3JrZXIgeWV0LCBzb21lIGxhZ3Mgd2hpbGUgY29tcHV0ZXIgdGhpbmtzPC9wPlxcbiAgICA8cCBzdHlsZT1cXFwidGV4dC1hbGlnbjogY2VudGVyOyBtYXJnaW4tdG9wOiAwXFxcIj5Vc2UgQ2hyb21lIEJyb3dzZXIsIERyYWcgYW5kIERyb3AgaXNzdWVzIG9uIEZGPC9wPlxcbiAgPC9kaXY+XFxuPC9tZC1zaWRlbmF2LWxheW91dD5cXG5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvYXBwL2dhbWUvZ2FtZS5odG1sXG4gKiogbW9kdWxlIGlkID0gNTEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiLmhvbWUge1xcbiAgcGFkZGluZy1sZWZ0OiAyNHB4O1xcbiAgcGFkZGluZy1yaWdodDogMjRweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjMDA5Njg4O1xcbn1cXG5cXG4uaG9tZSBoMSB7XFxuICBjb2xvcjogIzljMjdiMDtcXG59XFxuLmhvbWUgcCA+IGEge1xcbiAgZm9udC1zaXplOiAxLjE1ZW07XFxufVxcbi5ib2FyZC1jb250YWluZXIge1xcbiAgcGFkZGluZy10b3A6IDI1cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDI1JTtcXG4gIHdpZHRoOiA1MCU7XFxufVxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9hcHAvaG9tZS9ob21lLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImhvbWVcXFwiPlxcbiAgPGgxPkFuZ3VsYXIgMiBDaGVzczwvaDE+XFxuICA8cD5BIHBsdWdpbiBvcmllbnRlZCBjaGVzcyBtb2R1bGUgYnVpbHQgd2l0aCBBbmd1bGFyIDIuPC9wPlxcbiAgPHA+VG8gcGxheSwgY2xpY2sgb2YgdGhlIFxcXCJHYW1lXFxcIiBtZW51IG9uIHRoZSB0b3AtcmlnaHQgY29ybmVyLjwvcD5cXG4gIDxwPkZvciBtb3JlIGluZm9tYXRpb24gcGxlYXNlIHZpc2l0IHRoZSA8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vc2hsb21pYXNzYWYvbmcyLWNoZXNzXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+R2l0SHViIHBhZ2U8L2E+PC9wPlxcbiAgPGRpdiBjbGFzcz1cXFwiYm9hcmQtY29udGFpbmVyXFxcIj5cXG4gICAgPGNoZXNzLWJvYXJkIGNsYXNzPVxcXCJzdmctY2hlc3MtYm9hcmRcXFwiICNib2FyZD48L2NoZXNzLWJvYXJkPlxcbiAgPC9kaXY+XFxuICA8cCBzdHlsZT1cXFwiY29sb3I6ICMxZmFkODNcXFwiPkFuZ3VsYXIgMiBDaGVzcyBpcyBpbiBlYXJseSBzdGFnZXMsIGN1cnJlbnRseSBhbHBoYS48L3A+XFxuICA8cCBzdHlsZT1cXFwiY29sb3I6ICMxZmFkODNcXFwiPlVzZSBDaHJvbWUgQnJvd3NlciwgRHJhZyBhbmQgRHJvcCBpc3N1ZXMgb24gRkY8L3A+XFxuPC9kaXY+XFxuXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2FwcC9ob21lL2hvbWUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDUxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAyXG4gKiovIiwiaW1wb3J0IHtIbXJTdG9yZX0gZnJvbSAnLi9obXItc3RvcmUnO1xuXG4vLyBub29wIGluIHBhcmVudE5vZGVcbi8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgd2F5IHRvIG5vb3BcbmNvbnN0IF9lbnYgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgcHJvY2VzcyAmJlxuICBwcm9jZXNzLmVudiAmJlxuICAocHJvY2Vzcy5lbnYuRU5WIHx8XG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WKTtcblxubGV0IF9kZXY6IGJvb2xlYW4gPSAoKFxuICAgIF9lbnYgJiZcbiAgICB0eXBlb2YgX2VudiA9PT0gJ3N0cmluZycgJiZcbiAgICAoX2Vudi5pbmRleE9mKCdkZXYnKSA+IC0xKVxuICApIHx8IC8vIGRlZmF1bHQgdHJ1ZVxuICAgIF9lbnYgPT09IHVuZGVmaW5lZCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZXYobmV3RGV2OiBzdHJpbmcgfCBib29sZWFuKTogYm9vbGVhbiB8IHZvaWQge1xuICBpZiAodHlwZW9mIG5ld0RldiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gX2RldiA9IChuZXdEZXYuaW5kZXhPZignZGV2JykgPiAtMSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5ld0RldiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIF9kZXYgPSBuZXdEZXY7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIHN0cmluZyBvciBib29sZWFuJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIbXJTdGF0ZShuYW1lc3BhY2VPckNvbmZpZz86IHN0cmluZyB8IGFueSwgY29uZmlnPzogYW55KTogRnVuY3Rpb24ge1xuXG4gIGZ1bmN0aW9uIGRlY29yYXRvckZhY3RvcnkodGFyZ2V0OiBhbnksIGRlY29yYXRlZFByb3BlcnR5TmFtZT86IHN0cmluZywgZGVzY3JpcHRvcj86IGFueSk6IHZvaWQge1xuICAgIGlmICghX2RldikgeyByZXR1cm4gZGVzY3JpcHRvcjsgfVxuXG4gICAgbGV0IGtleSA9IG5hbWVzcGFjZU9yQ29uZmlnIHx8IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lICsgJyMnICsgZGVjb3JhdGVkUHJvcGVydHlOYW1lO1xuICAgIEhtclN0b3JlLnNlbGVjdChrZXksICgpID0+IEhtclN0b3JlLmdldChrZXkpKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlY29yYXRlZFByb3BlcnR5TmFtZSwge1xuICAgICAgZ2V0OiAoKSA9PiBIbXJTdG9yZS5nZXQoa2V5KSxcbiAgICAgIHNldDogKG5ld1ZhbHVlPzogYW55KSA9PiB7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IEhtclN0b3JlLmdldChrZXkpO1xuICAgICAgICBpZiAoIWN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIEhtclN0b3JlLl9pbml0aWFsVmFsdWVzW2tleV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IE9iamVjdC5hc3NpZ24obmV3VmFsdWUsIGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhtclN0b3JlLnNldChrZXksIG5ld1ZhbHVlKTtcblxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgfVxuXG4gIHJldHVybiBkZWNvcmF0b3JGYWN0b3J5O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2FuZ3VsYXIyLWhtci9zcmMvaG1yLWRlY29yYXRvci50c1xuICoqLyIsImltcG9ydCB7SE1SX1NUQVRFLCBIbXJTdG9yZX0gZnJvbSAnLi9obXItc3RvcmUnO1xuXG5leHBvcnQgKiBmcm9tICcuL3dlYnBhY2staG1yJztcbmV4cG9ydCAqIGZyb20gJy4vaG1yLWRlY29yYXRvcic7XG5leHBvcnQgKiBmcm9tICcuL2htci1zdG9yZSc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVIbXJTdGF0ZShpbml0aWFsU3RhdGUgPSB7fSk6IEFycmF5PGFueT4ge1xuICByZXR1cm4gW1xuICAgIHtwcm92aWRlOiBITVJfU1RBVEUsIHVzZVZhbHVlOiBpbml0aWFsU3RhdGUgfSxcbiAgICB7cHJvdmlkZTogSG1yU3RvcmUsIHVzZVZhbHVlOiBIbXJTdG9yZX1cbiAgXTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9hbmd1bGFyMi1obXIvc3JjL2luZGV4LnRzXG4gKiovIiwiaW1wb3J0IHtIbXJTdG9yZX0gZnJvbSAnLi9obXItc3RvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhvdE1vZHVsZVJlcGxhY2VtZW50T3B0aW9ucyB7XG4gIExPQ0FMU1RPUkFHRV9LRVk/OiBzdHJpbmc7XG4gIGxvY2FsU3RvcmFnZT86IGJvb2xlYW47XG4gIHN0b3JlVG9rZW4/OiBhbnk7XG4gIGdsb2JhbERpc3Bvc2U/OiBzdHJpbmc7XG5cbiAgZ2V0U3RhdGU/OiBGdW5jdGlvbjtcbiAgZGF0YT86IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhvdE1vZHVsZVJlcGxhY2VtZW50KGJvb3Rsb2FkZXI6IEZ1bmN0aW9uLCBtb2R1bGU6IGFueSwgb3B0aW9uczogSG90TW9kdWxlUmVwbGFjZW1lbnRPcHRpb25zID0ge30pIHtcbiAgaWYgKCFtb2R1bGUuaG90KSB7XG4gICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBwbGVhc2UgdXNlIHdlYnBhY2sgaG90IGZsYWcnKTtcbiAgICByZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IGJvb3Rsb2FkZXIoKSk7XG4gIH1cblxuICBIbXJTdG9yZS5kZXYgPSB0cnVlO1xuICBjb25zdCBMT0NBTFNUT1JBR0VfS0VZID0gb3B0aW9ucy5MT0NBTFNUT1JBR0VfS0VZIHx8ICdAQFdFQlBBQ0tfSU5JVElBTF9EQVRBJztcbiAgY29uc3QgTE9DQUwgICAgICAgICAgICA9IG9wdGlvbnMubG9jYWxTdG9yYWdlICAgICB8fCBmYWxzZTtcbiAgY29uc3QgVE9LRU4gICAgICAgICAgICA9IG9wdGlvbnMuc3RvcmVUb2tlbiAgICAgICB8fCBIbXJTdG9yZTtcbiAgY29uc3QgRElTUE9TRSAgICAgICAgICA9IG9wdGlvbnMuZ2xvYmFsRGlzcG9zZSAgICB8fCAnV0VCUEFDS19ITVJfYmVmb3JldW5sb2FkJztcbiAgY29uc3QgR0VUX1NUQVRFICAgICAgICA9IG9wdGlvbnMuZ2V0U3RhdGUgICAgICAgICB8fCBnZXRTdGF0ZTtcbiAgbGV0IERBVEEgICAgICAgICAgICAgICA9IG9wdGlvbnMuZGF0YSAgICAgICAgICAgICB8fCBtb2R1bGUuaG90LmRhdGEgJiYgbW9kdWxlLmhvdC5kYXRhLnN0YXRlO1xuICBsZXQgQ09NUE9ORU5UX1JFRiA9IG51bGw7XG4gIGxldCBkaXNwb3NlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGdldFN0YXRlKGFwcFN0YXRlKSB7XG4gICAgY29uc3QganNvbiA9IGFwcFN0YXRlLnRvSlNPTigpO1xuXG4gICAgaWYgKExPQ0FMKSB7XG4gICAgICBjb25zb2xlLnRpbWUoJ2xvY2FsU3RvcmFnZScpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxTVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkoYXBwU3RhdGUpKTtcbiAgICAgIGNvbnNvbGUudGltZUVuZCgnbG9jYWxTdG9yYWdlJyk7XG4gICAgfVxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgY29uc29sZS5sb2coJ0RBVEEnLCBEQVRBKTtcbiAgaWYgKCFEQVRBICYmIExPQ0FMKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUudGltZSgnc3RhcnQgbG9jYWxTdG9yYWdlJyk7XG4gICAgICBEQVRBID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTFNUT1JBR0VfS0VZKSkgfHwgREFUQTtcbiAgICAgIGNvbnNvbGUudGltZUVuZCgnc3RhcnQgbG9jYWxTdG9yYWdlJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ0pTT04ucGFyc2UgRXJyb3InLCBlKTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS50aW1lKCdib290c3RyYXAnKTtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICBib290bG9hZGVyKERBVEEpXG4gICAgICAudGhlbigoY21wUmVmOiBhbnkpID0+IENPTVBPTkVOVF9SRUYgPSBjbXBSZWYpXG4gICAgICAudGhlbigoY21wUmVmID0+IChjb25zb2xlLnRpbWVFbmQoJ2Jvb3RzdHJhcCcpLCBjbXBSZWYpKSk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgIGJvb3Rsb2FkZXIoREFUQSlcbiAgICAgICAgLnRoZW4oKGNtcFJlZjogYW55KSA9PiBDT01QT05FTlRfUkVGID0gY21wUmVmKVxuICAgICAgICAudGhlbigoY21wUmVmID0+IChjb25zb2xlLnRpbWVFbmQoJ2Jvb3RzdHJhcCcpLCBjbXBSZWYpKSk7XG4gICAgfSk7XG4gIH1cblxuXG5cbiAgZnVuY3Rpb24gYmVmb3JldW5sb2FkKGV2ZW50KSB7XG4gICAgY29uc3QgaW5qZWN0b3IgPSBDT01QT05FTlRfUkVGLmluamVjdG9yO1xuICAgIGxldCBhcHBTdGF0ZTtcbiAgICBpZiAoJ2dldE9wdGlvbmFsJyBpbiBpbmplY3Rvcikge1xuICAgICAgYXBwU3RhdGUgPSBDT01QT05FTlRfUkVGLmluamVjdG9yLmdldE9wdGlvbmFsKFRPS0VOKSB8fCBUT0tFTjtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwU3RhdGUgPSBDT01QT05FTlRfUkVGLmluamVjdG9yLmdldChUT0tFTiwgVE9LRU4pO1xuICAgIH1cbiAgICByZXR1cm4gR0VUX1NUQVRFKGFwcFN0YXRlKTtcbiAgfVxuICAoPGFueT53aW5kb3cpW0RJU1BPU0VdID0gKCkgPT4ge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgYmVmb3JldW5sb2FkKTtcbiAgICBpZiAoTE9DQUwpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKExPQ0FMU1RPUkFHRV9LRVkpO1xuICAgIH1cbiAgfTtcblxuICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBiZWZvcmV1bmxvYWQpO1xuXG4gIG1vZHVsZS5ob3QuZGlzcG9zZSgoZGF0YTogYW55KSA9PiB7XG4gICAgY29uc29sZS50aW1lKCdkaXNwb3NlJyk7XG4gICAgY29uc3QgY29tcG9uZW50Tm9kZSA9IENPTVBPTkVOVF9SRUYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBuZXdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChjb21wb25lbnROb2RlLnRhZ05hbWUpO1xuICAgIC8vIGRpc3BsYXkgbm9uZVxuICAgIGNvbnN0IGN1cnJlbnREaXNwbGF5ID0gbmV3Tm9kZS5zdHlsZS5kaXNwbGF5O1xuICAgIG5ld05vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBjb25zdCBwYXJlbnROb2RlID0gY29tcG9uZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIGNvbXBvbmVudE5vZGUpO1xuXG4gICAgY29uc3QgaW5qZWN0b3IgPSBDT01QT05FTlRfUkVGLmluamVjdG9yO1xuICAgIGxldCBhcHBTdGF0ZTtcbiAgICBpZiAoJ2dldE9wdGlvbmFsJyBpbiBpbmplY3Rvcikge1xuICAgICAgYXBwU3RhdGUgPSBDT01QT05FTlRfUkVGLmluamVjdG9yLmdldE9wdGlvbmFsKFRPS0VOKSB8fCBUT0tFTjtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwU3RhdGUgPSBDT01QT05FTlRfUkVGLmluamVjdG9yLmdldChUT0tFTiwgVE9LRU4pO1xuICAgIH1cbiAgICBjb25zdCBqc29uID0gR0VUX1NUQVRFKGFwcFN0YXRlLCBDT01QT05FTlRfUkVGKTtcblxuICAgIGRhdGEuc3RhdGUgPSBqc29uO1xuXG4gICAgaWYgKCdkZXN0cm95JyBpbiBDT01QT05FTlRfUkVGKSB7XG4gICAgICBDT01QT05FTlRfUkVGLmRlc3Ryb3koKTtcbiAgICB9IGVsc2UgaWYgKCdkaXNwb3NlJyBpbiBDT01QT05FTlRfUkVGKSB7XG4gICAgICBDT01QT05FTlRfUkVGLmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBuZXdOb2RlLnN0eWxlLmRpc3BsYXkgPSBjdXJyZW50RGlzcGxheTtcblxuICAgIGlmICghZGlzcG9zZWQpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBiZWZvcmV1bmxvYWQpO1xuICAgIH1cbiAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgY29uc29sZS50aW1lRW5kKCdkaXNwb3NlJyk7XG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2FuZ3VsYXIyLWhtci9zcmMvd2VicGFjay1obXIudHNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9