<?php
/**
 * Single entry point for the backend API.
 * All requests are routed through here via .htaccess.
 */

declare(strict_types=1);

require_once __DIR__ . '/../config/constants.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../helpers/validator.php';
require_once __DIR__ . '/../middleware/authMiddleware.php';
require_once __DIR__ . '/../services/FileUploadService.php';

// Autoload models & controllers by convention
spl_autoload_register(function (string $class) {
    foreach (['models', 'controllers'] as $dir) {
        $path = __DIR__ . "/../{$dir}/{$class}.php";
        if (is_file($path)) {
            require_once $path;
            return;
        }
    }
});

// ===== CORS =====
header('Access-Control-Allow-Origin: ' . CORS_ALLOW_ORIGIN);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ===== Tiny router =====
$GLOBALS['__ROUTES'] = [];

function route(string $method, string $pattern, array $handler): void
{
    $GLOBALS['__ROUTES'][] = ['method' => $method, 'pattern' => $pattern, 'handler' => $handler];
}

// Load all route definitions
foreach (glob(__DIR__ . '/../routes/*.php') as $routeFile) {
    require $routeFile;
}

// ===== Resolve request path relative to /backend/public =====
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
$scriptDir  = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/'); // e.g. /backend/public

$path = $requestUri;
if ($scriptDir !== '' && str_starts_with($path, $scriptDir)) {
    $path = substr($path, strlen($scriptDir));
}
$path = trim($path, '/'); // e.g. "api/gallery"

$method = $_SERVER['REQUEST_METHOD'];

// ===== Dispatch =====
foreach ($GLOBALS['__ROUTES'] as $r) {
    if ($r['method'] !== $method) {
        continue;
    }
    if (preg_match($r['pattern'], $path, $matches)) {
        array_shift($matches); // drop full match
        // Cast numeric strings to int to satisfy strict_types=1
        foreach ($matches as &$m) {
            if (is_numeric($m)) $m = (int)$m;
        }
        unset($m);
        
        [$controllerName, $action] = $r['handler'];
        $controller = new $controllerName();
        $controller->$action(...$matches);
        exit;
    }
}

sendError('Route not found: ' . $method . ' /' . $path, 404);
