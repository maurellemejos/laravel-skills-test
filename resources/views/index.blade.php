<!--
HINT: I used webpack, gulf and react for the scripts. The unminified react source file is located at /public/js/components/app.js
GITHUB: https://github.com/maurellemejos/laravel-skills-test
-->

<!DOCTYPE html>
<html>
    <head>
    	<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laravel Skills Test</title>
        <!-- CSS -->
        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
	    <link rel="stylesheet" href="{{ elixir('css/all.css') }}">
	    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
	    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	    <![endif]-->
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div id="react"></div>
            </div>
        </div>

        <!-- Scripts -->
    	<script src="{{ elixir('js/vendors.js') }}"></script>
    	<script src="{{ elixir('js/bundle.js') }}"></script>

    </body>
</html>
