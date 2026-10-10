<?php
/**
 * Lightweight validation helpers used by controllers.
 */

/**
 * Ensures every key in $required exists and is non-empty in $data.
 * Returns array of missing field names (empty array = valid).
 */
function validateRequired(array $data, array $required): array
{
    $missing = [];
    foreach ($required as $field) {
        if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
            $missing[] = $field;
        }
    }
    return $missing;
}

function isValidEmail(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function isValidPhone(string $phone): bool
{
    return (bool) preg_match('/^\d{10}$/', trim($phone));
}

function sanitizeString(?string $value): string
{
    return trim(htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8'));
}
