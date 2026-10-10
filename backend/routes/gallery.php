<?php
// Gallery routes
route('GET',  '#^api/gallery$#',                 ['GalleryController', 'index']);
route('POST', '#^api/gallery$#',                 ['GalleryController', 'store']);
route('POST', '#^api/gallery/update/(\d+)$#',    ['GalleryController', 'update']);
route('POST', '#^api/gallery/delete/(\d+)$#',    ['GalleryController', 'destroy']);
