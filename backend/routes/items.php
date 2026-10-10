<?php
// Generic "items" routes - powers all repeatable static sections
route('GET',  '#^api/items/([a-z_]+)/admin$#', ['ItemController', 'bySectionAdmin']);
route('GET',  '#^api/items/([a-z_]+)$#',       ['ItemController', 'bySection']);
route('POST', '#^api/items$#',                 ['ItemController', 'store']);
route('POST', '#^api/items/update/(\d+)$#',    ['ItemController', 'update']);
route('POST', '#^api/items/delete/(\d+)$#',    ['ItemController', 'destroy']);
