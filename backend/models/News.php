<?php

class News
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function all(?string $type = null): array
    {
        if ($type && $type !== 'all') {
            $stmt = $this->db->prepare(
                'SELECT * FROM news WHERE type = :type ORDER BY event_date DESC, created_at DESC'
            );
            $stmt->execute(['type' => $type]);
        } else {
            $stmt = $this->db->query('SELECT * FROM news ORDER BY event_date DESC, created_at DESC');
        }
        return $stmt->fetchAll();
    }

    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM news WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO news (title, description, image, type, event_date, status)
             VALUES (:title, :description, :image, :type, :event_date, :status)'
        );
        $stmt->execute([
            'title'       => $data['title'],
            'description' => $data['description'],
            'image'       => $data['image'] ?? null,
            'type'        => $data['type'],
            'event_date'  => $data['event_date'] ?? date('Y-m-d'),
            'status'      => $data['status'] ?? 'published',
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
        $sql  = 'UPDATE news SET ' . implode(', ', $sets) . ' WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM news WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }

    public function count(): int
    {
        return (int) $this->db->query('SELECT COUNT(*) FROM news')->fetchColumn();
    }
}
