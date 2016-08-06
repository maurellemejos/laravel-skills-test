// Include the CSRF TOKEN for every post requests
$.ajaxSetup({
    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: 'first'
		};
	}

	componentDidMount() {
		// Load Products
		this._loadProducts();
	}

	_loadProducts = () => {
		$.ajax({
			url: '/products',
			type: 'GET',
			success: function(response) {
				this.setState({products: response});
			}.bind(this)
		});
	}

	_onSubmit = () => {
		const name = this.refs.name.value;
		const quantity = this.refs.quantity.value;
		const price = this.refs.price.value;

		// Check if a field is empty
		if (s.isBlank(name) || s.isBlank(quantity) || s.isBlank(price)) {
			alert('All fields should not be left empty.');
			return;
		}

		const data = {name, quantity, price};

		$.ajax({
			url: '/products',
			type: 'POST',
			data: data,
			success: function(response) {
				// Set back to default values
				this.refs.name.value = '';
				this.refs.quantity.value = '';
				this.refs.price.value = '';

				let products = this.state.products;
				products.unshift(data);
				
				this.setState({products: products}, function() {
					$('html, body').animate({
		 				scrollTop: $('.table').offset().top
		 			}, 800);
				});
			}.bind(this)
		});
	}

	render() {
		let products;
		let grandTotal = 0;

		if (this.state.products == 'first') {
			products = <tr><td className="text-muted" colSpan="5"><i className="fa fa-spinner fa-pulse" /> Loading Products...</td></tr>;
		} else if (_.isEmpty(this.state.products)) {
			products = <tr><td className="text-muted" colSpan="5">Empty Products</td></tr>;
		} else {
			products = this.state.products.map((product, key) => {
				let total = product.quantity * product.price;
				grandTotal += total;
				let date = moment.utc(product.created_at).local().format('MMM DD, YYYY hh:mm A');

				return (
					<tr key={key}>
						<td>{product.name}</td>
						<td>{product.quantity}</td>
						<td>{product.price}</td>
						<td>{date}</td>
						<td>{total.toFixed(2)}</td>
					</tr>
				);
			});
		}

		return (
			<div className="app">
				<h1>Products</h1>
				<br />
				<div className="form-group">
			    	<label htmlFor="name">Product Name</label>
			    	<input id="name" ref="name" type="text" className="form-control" placeholder="Product Name" />
  				</div>
  				<div className="form-group">
			    	<label htmlFor="quantity">Quantity In Stock</label>
			    	<input id="quantity" ref="quantity" type="number" className="form-control" placeholder="Quantity In Stock" />
  				</div>
  				<div className="form-group">
			    	<label htmlFor="price">Price Per Item</label>
			    	<input id="price" ref="price" type="number" className="form-control" placeholder="Price Per Item" />
  				</div>
  				<button type="submit" className="btn btn-success btn-lg col-xs-12 col-md-4 col-md-offset-4" onClick={this._onSubmit}>SUBMIT</button>
  				<br />
  				<br />
  				<br />
  				<br />
  				<br />
  				<table className="table">
  					<thead>
  						<tr>
  							<th>Product Name</th>
  							<th>Quantity In Stock</th>
  							<th>Price Per Item</th>
  							<th>Submitted On</th>
  							<th>Total Value</th>
  						</tr>
  					</thead>
  					<tbody>
  						{products}
  						<tr>
  							<td></td>
  							<td></td>
  							<td></td>
  							<td></td>
  							<td><strong>{`Total: ${grandTotal.toFixed(2)}`}</strong></td>
  						</tr>
  					</tbody>
  				</table>
			</div>
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById('react')
);