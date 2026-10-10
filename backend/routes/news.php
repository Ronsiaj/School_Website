<?php
// News & Events routes
route('GET',  '#^api/news$#',               ['NewsController', 'index']);
route('GET',  '#^api/news/(\d+)$#',         ['NewsController', 'show']);
route('POST', '#^api/news$#',               ['NewsController', 'store']);
route('POST', '#^api/news/update/(\d+)$#',  ['NewsController', 'update']);
route('POST', '#^api/news/delete/(\d+)$#',  ['NewsController', 'destroy']);
