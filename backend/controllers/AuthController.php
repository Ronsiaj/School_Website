<?php

class AuthController
{
    public function login(): void
    {
        $body = getRequestBody();
        $missing = validateRequired($body, ['email', 'password']);
        if (!empty($missing)) {
            sendError('Missing required fields: ' . implode(', ', $missing), 422);
        }

        $admin = new Admin();
        $row   = $admin->findByEmail(sanitizeString($body['email']));

        if (!$row || !$admin->verifyPassword($body['password'], $row['password'])) {
            sendError('Invalid credentials. Try admin / admin123', 401);
        }

        $token = $admin->createToken((int) $row['id']);

        sendSuccess('Login successful', [
            'token' => $token,
            'name'  => $row['name'],
            'email' => $row['email'],
        ]);
    }

    public function logout(): void
    {
        $token = getBearerToken();
        if ($token) {
            (new Admin())->deleteToken($token);
        }
        sendSuccess('Logged out successfully');
    }

    /** Lets the frontend verify an existing token is still valid on page load. */
    public function me(): void
    {
        $auth = requireAuth();
        sendSuccess('Authenticated', $auth);
    }
}
