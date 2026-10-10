<?php
// Auth routes
route('POST', '#^api/auth/login$#', ['AuthController', 'login']);
route('POST', '#^api/auth/logout$#', ['AuthController', 'logout']);
route('GET',  '#^api/auth/me$#',     ['AuthController', 'me']);
