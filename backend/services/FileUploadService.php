<?php
/**
 * Handles validated image uploads into backend/uploads/{subfolder}.
 * Returns the relative path (e.g. "uploads/gallery/abc123.jpg") to store in DB.
 */

class FileUploadService
{
    /**
     * @param array  $file      A single entry from $_FILES, e.g. $_FILES['image']
     * @param string $subfolder One of: gallery, news, achievements
     * @return string Relative path from backend root
     * @throws Exception on validation failure
     */
    public static function upload(array $file, string $subfolder): string
    {
        if (!isset($file['error']) || $file['error'] !== UPLOAD_ERR_OK) {
            throw new Exception('File upload failed (error code ' . ($file['error'] ?? 'unknown') . ').');
        }

        if ($file['size'] > MAX_UPLOAD_SIZE) {
            throw new Exception('File exceeds the 5MB size limit.');
        }

        $finfo    = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!array_key_exists($mimeType, ALLOWED_IMAGE_TYPES)) {
            throw new Exception('Invalid file type. Only JPG, PNG, and WEBP are allowed.');
        }

        $extension = ALLOWED_IMAGE_TYPES[$mimeType];
        $filename  = bin2hex(random_bytes(12)) . '.' . $extension;

        $targetDir = UPLOAD_PATH . '/' . trim($subfolder, '/');
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }

        $targetPath = $targetDir . '/' . $filename;

        if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
            throw new Exception('Could not save uploaded file.');
        }

        return 'uploads/' . trim($subfolder, '/') . '/' . $filename;
    }

    /**
     * Deletes a previously uploaded file given its relative path.
     */
    public static function delete(?string $relativePath): void
    {
        if (!$relativePath) {
            return;
        }
        $fullPath = BASE_PATH . '/' . ltrim($relativePath, '/');
        if (is_file($fullPath)) {
            @unlink($fullPath);
        }
    }
}
