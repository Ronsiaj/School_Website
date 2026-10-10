<?php

class Admission
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
        $this->createTable();
    }

    private function createTable(): void
    {
        $sql = "CREATE TABLE IF NOT EXISTS admissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            student_name VARCHAR(255) NOT NULL,
            dob DATE NOT NULL,
            gender VARCHAR(50) NOT NULL,
            class_applied VARCHAR(50) NOT NULL,
            parent_name VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            email VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            documents TEXT NULL,
            status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        $this->db->exec($sql);
    }

    public function all(): array
    {
        $stmt = $this->db->query('SELECT * FROM admissions ORDER BY created_at DESC');
        return $stmt->fetchAll();
    }

    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM admissions WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO admissions (student_name, dob, gender, class_applied, parent_name, phone, email, address, documents, status)
             VALUES (:student_name, :dob, :gender, :class_applied, :parent_name, :phone, :email, :address, :documents, :status)'
        );
        $stmt->execute([
            'student_name'  => $data['student_name'],
            'dob'           => $data['dob'],
            'gender'        => $data['gender'],
            'class_applied' => $data['class_applied'],
            'parent_name'   => $data['parent_name'],
            'phone'         => $data['phone'],
            'email'         => $data['email'],
            'address'       => $data['address'],
            'documents'     => $data['documents'] ?? null,
            'status'        => $data['status'] ?? 'pending',
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function updateStatus(int $id, string $status): bool
    {
        $stmt = $this->db->prepare('UPDATE admissions SET status = :status WHERE id = :id');
        return $stmt->execute(['status' => $status, 'id' => $id]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM admissions WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }
}
