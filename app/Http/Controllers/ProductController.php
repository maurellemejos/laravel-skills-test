<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
	public function getAll() {
		$filename = 'products.json';
		$file = storage_path('app/' . $filename);
		$products = []; // Default

		if (file_exists($file)) {
			$products = json_decode(file_get_contents($file), true);
		}
			
		return response()->json($products);
	}

    public function add(Request $request) {
    	// Default response
    	$response = ['success' => true];

    	$now = Carbon::now()->toDateTimeString();

    	$product = [
    		'name' => $request->input('name'),
    		'quantity' => $request->input('quantity'),
    		'price' => $request->input('price'),
    		'created_at' => $now
    	];

    	// File
    	$filename = 'products.json';
    	$file = storage_path('app/' . $filename);

    	$json = [];

    	if (file_exists($file)) {
    		$json = json_decode(file_get_contents($file), true);
    	}

    	// Insert the product on top
    	array_unshift($json, $product);

    	// Write to file
    	file_put_contents($file, json_encode($json));

    	return response()->json($response);
    }
}
