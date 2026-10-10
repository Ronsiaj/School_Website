<?php
// Contact form + admin dashboard stats
route('POST', '#^api/contact$#',          ['ContactController', 'store']);
route('GET',  '#^api/contact/messages$#', ['ContactController', 'index']);
route('GET',  '#^api/dashboard/stats$#',  ['DashboardController', 'stats']);

// Serve uploaded images (uploads/ lives outside the public web root)
route('GET',  '#^uploads/(.+)$#',         ['UploadController', 'serve']);
