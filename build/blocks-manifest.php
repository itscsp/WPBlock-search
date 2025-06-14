<?php
// This file is generated. Do not modify it manually.
return array(
	'video-search' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/video-search',
		'version' => '0.1.0',
		'title' => 'Video Search',
		'category' => 'widgets',
		'icon' => 'search',
		'description' => 'A search block that shows results in a modal popup',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'searchPlaceholder' => array(
				'type' => 'string',
				'default' => 'Search posts and pages...'
			),
			'searchButtonText' => array(
				'type' => 'string',
				'default' => 'Search'
			),
			'postTypes' => array(
				'type' => 'array',
				'default' => array(
					'post',
					'page'
				)
			)
		),
		'textdomain' => 'video-search',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
