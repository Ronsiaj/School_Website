<?php

/**
 * Serves files from backend/uploads/* through the front controller, so the
 * physical uploads/ folder can stay outside the public web root (per the
 * architecture doc) while still being reachable at:
 *   {APP_URL}/uploads/{subfolder}/{filename}
 */
class UploadController
{
    public function serve(string $relativePath): void
    {
        // Prevent path traversal
        $relativePath = str_replace(['..', "\0"], '', $relativePath);
        $fullPath = UPLOAD_PATH . '/' . ltrim($relativePath, '/');

        if (!is_file($fullPath)) {
            http_response_code(404);
            exit;
        }

        $mime = mime_content_type($fullPath) ?: 'application/octet-stream';
        header('Content-Type: ' . $mime);
        header('Cache-Control: public, max-age=86400');
        header('Content-Length: ' . filesize($fullPath));
        readfile($fullPath);
        exit;
    }
}
