<?php

class Achievement
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function all(): array
    {
        return $this->db->query('SELECT * FROM achievements ORDER BY year DESC, id DESC')->fetchAll();
    }

    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM achievements WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO achievements (student_name, achievement, image, year)
             VALUES (:student_name, :achievement, :image, :year)'
        );
        $stmt->execute([
            'student_name' => $data['student_name'],
            'achievement'  => $data['achievement'],
            'image'        => $data['image'] ?? null,
            'year'         => $data['year'] ?? date('Y'),
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $fields): bool
    {
        $sets   = [];
        $params = ['id' => $id];
        foreach ($fields as $key => $value) {
            $sets[]       = "{$key} = :{$key}";
            $params[$key] = $value;
        }
        if (empty($sets)) {
            return false;
        }
        $sql  = 'UPDATE achievements SET ' . implode(', ', $sets) . ' WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM achievements WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }

    public function count(): int
    {
        return (int) $this->db->query('SELECT COUNT(*) FROM achievements')->fetchColumn();
    }
}
