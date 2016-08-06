/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Include the CSRF TOKEN for every post requests
	$.ajaxSetup({
		headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
	});

	var App = function (_React$Component) {
		_inherits(App, _React$Component);

		function App(props) {
			_classCallCheck(this, App);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

			_this._loadProducts = function () {
				$.ajax({
					url: '/products',
					type: 'GET',
					success: function (response) {
						this.setState({ products: response });
					}.bind(_this)
				});
			};

			_this._onSubmit = function () {
				var name = _this.refs.name.value;
				var quantity = _this.refs.quantity.value;
				var price = _this.refs.price.value;

				// Check if a field is empty
				if (s.isBlank(name) || s.isBlank(quantity) || s.isBlank(price)) {
					alert('All fields should not be left empty.');
					return;
				}

				var data = { name: name, quantity: quantity, price: price };

				$.ajax({
					url: '/products',
					type: 'POST',
					data: data,
					success: function (response) {
						// Set back to default values
						this.refs.name.value = '';
						this.refs.quantity.value = '';
						this.refs.price.value = '';

						var products = this.state.products;
						products.unshift(data);

						this.setState({ products: products }, function () {
							$('html, body').animate({
								scrollTop: $('.table').offset().top
							}, 800);
						});
					}.bind(_this)
				});
			};

			_this.state = {
				products: 'first'
			};
			return _this;
		}

		_createClass(App, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				// Load Products
				this._loadProducts();
			}
		}, {
			key: 'render',
			value: function render() {
				var products = void 0;
				var grandTotal = 0;

				if (this.state.products == 'first') {
					products = React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							{ className: 'text-muted', colSpan: '5' },
							React.createElement('i', { className: 'fa fa-spinner fa-pulse' }),
							' Loading Products...'
						)
					);
				} else if (_.isEmpty(this.state.products)) {
					products = React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							{ className: 'text-muted', colSpan: '5' },
							'Empty Products'
						)
					);
				} else {
					products = this.state.products.map(function (product, key) {
						var total = product.quantity * product.price;
						grandTotal += total;
						var date = moment.utc(product.created_at).local().format('MMM DD, YYYY hh:mm A');

						return React.createElement(
							'tr',
							{ key: key },
							React.createElement(
								'td',
								null,
								product.name
							),
							React.createElement(
								'td',
								null,
								product.quantity
							),
							React.createElement(
								'td',
								null,
								product.price
							),
							React.createElement(
								'td',
								null,
								date
							),
							React.createElement(
								'td',
								null,
								total.toFixed(2)
							)
						);
					});
				}

				return React.createElement(
					'div',
					{ className: 'app' },
					React.createElement(
						'h1',
						null,
						'Products'
					),
					React.createElement('br', null),
					React.createElement(
						'div',
						{ className: 'form-group' },
						React.createElement(
							'label',
							{ htmlFor: 'name' },
							'Product Name'
						),
						React.createElement('input', { id: 'name', ref: 'name', type: 'text', className: 'form-control', placeholder: 'Product Name' })
					),
					React.createElement(
						'div',
						{ className: 'form-group' },
						React.createElement(
							'label',
							{ htmlFor: 'quantity' },
							'Quantity In Stock'
						),
						React.createElement('input', { id: 'quantity', ref: 'quantity', type: 'number', className: 'form-control', placeholder: 'Quantity In Stock' })
					),
					React.createElement(
						'div',
						{ className: 'form-group' },
						React.createElement(
							'label',
							{ htmlFor: 'price' },
							'Price Per Item'
						),
						React.createElement('input', { id: 'price', ref: 'price', type: 'number', className: 'form-control', placeholder: 'Price Per Item' })
					),
					React.createElement(
						'button',
						{ type: 'submit', className: 'btn btn-success btn-lg col-xs-12 col-md-4 col-md-offset-4', onClick: this._onSubmit },
						'SUBMIT'
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						'table',
						{ className: 'table' },
						React.createElement(
							'thead',
							null,
							React.createElement(
								'tr',
								null,
								React.createElement(
									'th',
									null,
									'Product Name'
								),
								React.createElement(
									'th',
									null,
									'Quantity In Stock'
								),
								React.createElement(
									'th',
									null,
									'Price Per Item'
								),
								React.createElement(
									'th',
									null,
									'Submitted On'
								),
								React.createElement(
									'th',
									null,
									'Total Value'
								)
							)
						),
						React.createElement(
							'tbody',
							null,
							products,
							React.createElement(
								'tr',
								null,
								React.createElement('td', null),
								React.createElement('td', null),
								React.createElement('td', null),
								React.createElement('td', null),
								React.createElement(
									'td',
									null,
									React.createElement(
										'strong',
										null,
										'Total: ' + grandTotal.toFixed(2)
									)
								)
							)
						)
					)
				);
			}
		}]);

		return App;
	}(React.Component);

	;

	ReactDOM.render(React.createElement(App, null), document.getElementById('react'));

/***/ }
/******/ ]);