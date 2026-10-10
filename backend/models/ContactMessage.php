<?php

class ContactMessage
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO contact_messages (name, phone, email, subject, message)
             VALUES (:name, :phone, :email, :subject, :message)'
        );
        $stmt->execute([
            'name'    => $data['name'],
            'phone'   => $data['phone'],
            'email'   => $data['email'],
            'subject' => $data['subject'],
            'message' => $data['message'],
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function all(): array
    {
        return $this->db->query('SELECT * FROM contact_messages ORDER BY created_at DESC')->fetchAll();
    }

    public function count(): int
    {
        return (int) $this->db->query('SELECT COUNT(*) FROM contact_messages')->fetchColumn();
    }
}
