<?php

class Gallery
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function all(?string $category = null): array
    {
        if ($category && $category !== 'all') {
            $stmt = $this->db->prepare(
                'SELECT * FROM gallery WHERE category = :category ORDER BY created_at DESC'
            );
            $stmt->execute(['category' => $category]);
        } else {
            $stmt = $this->db->query('SELECT * FROM gallery ORDER BY created_at DESC');
        }
        return $stmt->fetchAll();
    }

    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM gallery WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(string $image, string $title, string $category): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO gallery (image, title, category) VALUES (:image, :title, :category)'
        );
        $stmt->execute(['image' => $image, 'title' => $title, 'category' => $category]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $fields): bool
    {
        $sets   = [];
        $params = ['id' => $id];
        foreach ($fields as $key => $value) {
            $sets[]        = "{$key} = :{$key}";
            $params[$key]  = $value;
        }
        if (empty($sets)) {
            return false;
        }
        $sql  = 'UPDATE gallery SET ' . implode(', ', $sets) . ' WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM gallery WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }

    public function count(): int
    {
        return (int) $this->db->query('SELECT COUNT(*) FROM gallery')->fetchColumn();
    }
}
