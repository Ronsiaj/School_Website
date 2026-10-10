<?php
// Admissions routes
route('GET',    '#^api/admissions$#',               ['AdmissionController', 'index']);
route('GET',    '#^api/admissions/(\d+)$#',         ['AdmissionController', 'show']);
route('POST',   '#^api/admissions$#',               ['AdmissionController', 'store']);
route('POST',   '#^api/admissions/update/(\d+)$#',  ['AdmissionController', 'updateStatus']);
route('POST',   '#^api/admissions/delete/(\d+)$#',  ['AdmissionController', 'destroy']);
