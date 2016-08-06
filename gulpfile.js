var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
	// mix.sass('app.scss');
	
	// Combine all vendors into one file (vendors.js)
    mix.combine([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/react/dist/react-with-addons.js',
        './node_modules/react-dom/dist/react-dom.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/underscore/underscore.js',
        './node_modules/underscore.string/dist/underscore.string.js',
        './node_modules/moment/moment.js',
    ], 'public/js/vendors.js');

    // Combine all css
    mix.styles([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/font-awesome/css/font-awesome.css',
        //'roboto.css',
        //'styles.css',
    ]);

	// Version the files
	mix.version([
	    'js/bundle.js',
	    'js/vendors.js',
	    'css/all.css'
	]);
});


