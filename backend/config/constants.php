<?php
/**
 * Global constants
 */

// Absolute path to backend/ root
define('BASE_PATH', dirname(__DIR__));

// Absolute path to uploads folder on disk
define('UPLOAD_PATH', BASE_PATH . '/uploads');

// Public URL base for the backend (adjust if deployed elsewhere).
// Frontend JS builds image URLs as API_BASE + '/' + image_path, so this
// should match wherever /backend/public is served from.
define('APP_URL', 'http://localhost/school/backend/public');

// Token lifetime for admin sessions (seconds) - 24 hours
define('TOKEN_TTL', 60 * 60 * 24);

// Allowed upload mime types -> extension
define('ALLOWED_IMAGE_TYPES', [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
]);

// Max upload size in bytes (5MB)
define('MAX_UPLOAD_SIZE', 5 * 1024 * 1024);

// CORS - allow the frontend to call this API from any local origin during dev
define('CORS_ALLOW_ORIGIN', '*');
