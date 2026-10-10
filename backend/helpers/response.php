<?php
/**
 * Standard API response helpers.
 * Every endpoint responds with: { status, message, data }
 */

function sendJson(bool $status, string $message, $data = null, int $httpCode = 200): void
{
    http_response_code($httpCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status'  => $status,
        'message' => $message,
        'data'    => $data,
    ], JSON_UNESCAPED_SLASHES);
    exit;
}

function sendSuccess(string $message = 'Success', $data = null, int $httpCode = 200): void
{
    sendJson(true, $message, $data, $httpCode);
}

function sendError(string $message = 'Something went wrong', int $httpCode = 400, $data = null): void
{
    sendJson(false, $message, $data, $httpCode);
}

/**
 * Reads JSON body or falls back to $_POST (for multipart/form-data requests).
 */
function getRequestBody(): array
{
    $raw = file_get_contents('php://input');
    if (!empty($raw)) {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            return $decoded;
        }
    }
    return $_POST ?? [];
}
