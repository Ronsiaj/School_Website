<?php

class Admin
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM admins WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function verifyPassword(string $plainPassword, string $hash): bool
    {
        return password_verify($plainPassword, $hash);
    }

    public function createToken(int $adminId): string
    {
        $token     = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', time() + TOKEN_TTL);

        $stmt = $this->db->prepare(
            'INSERT INTO admin_tokens (admin_id, token, expires_at) VALUES (:admin_id, :token, :expires_at)'
        );
        $stmt->execute([
            'admin_id'   => $adminId,
            'token'      => $token,
            'expires_at' => $expiresAt,
        ]);

        return $token;
    }

    public function deleteToken(string $token): void
    {
        $stmt = $this->db->prepare('DELETE FROM admin_tokens WHERE token = :token');
        $stmt->execute(['token' => $token]);
    }
}
