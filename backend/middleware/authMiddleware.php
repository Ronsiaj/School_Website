<?php
/**
 * Token-based admin auth middleware.
 * Expects header: Authorization: Bearer <token>
 * Call requireAuth() at the top of any protected controller action.
 * Returns the admin row (id, email, name) on success, halts the request on failure.
 */

function getBearerToken(): ?string
{
    $header = $_SERVER['HTTP_AUTHORIZATION']
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
        ?? '';

    if (preg_match('/Bearer\s+(\S+)/i', $header, $matches)) {
        return $matches[1];
    }
    return null;
}

function requireAuth(): array
{
    $token = getBearerToken();

    if (!$token) {
        sendError('Authentication required.', 401);
    }

    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT admin_tokens.admin_id, admin_tokens.expires_at, admins.email, admins.name
         FROM admin_tokens
         INNER JOIN admins ON admins.id = admin_tokens.admin_id
         WHERE admin_tokens.token = :token
         LIMIT 1'
    );
    $stmt->execute(['token' => $token]);
    $row = $stmt->fetch();

    if (!$row) {
        sendError('Invalid or expired session. Please log in again.', 401);
    }

    if (strtotime($row['expires_at']) < time()) {
        // Clean up expired token
        $del = $pdo->prepare('DELETE FROM admin_tokens WHERE token = :token');
        $del->execute(['token' => $token]);
        sendError('Session expired. Please log in again.', 401);
    }

    return [
        'admin_id' => (int) $row['admin_id'],
        'email'    => $row['email'],
        'name'     => $row['name'],
    ];
}
