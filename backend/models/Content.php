<?php

class Content
{
    private PDO $db;

    public function __construct()
    {
        $this->db = getDB();
    }

    public function get(string $key): ?string
    {
        $stmt = $this->db->prepare('SELECT content_value FROM content WHERE content_key = :key');
        $stmt->execute(['key' => $key]);
        $value = $stmt->fetchColumn();
        return $value === false ? null : $value;
    }

    /**
     * Returns all content rows as a flat [key => value] map.
     */
    public function all(): array
    {
        $rows = $this->db->query('SELECT content_key, content_value FROM content')->fetchAll();
        $map  = [];
        foreach ($rows as $row) {
            $map[$row['content_key']] = $row['content_value'];
        }
        return $map;
    }

    /**
     * Returns a subset of keys as a flat map, e.g. for the leadership page.
     */
    public function getMany(array $keys): array
    {
        if (empty($keys)) {
            return [];
        }
        $placeholders = implode(',', array_fill(0, count($keys), '?'));
        $stmt = $this->db->prepare(
            "SELECT content_key, content_value FROM content WHERE content_key IN ({$placeholders})"
        );
        $stmt->execute($keys);
        $map = [];
        foreach ($stmt->fetchAll() as $row) {
            $map[$row['content_key']] = $row['content_value'];
        }
        return $map;
    }

    /**
     * Upserts a single key/value pair.
     */
    public function set(string $key, string $value): bool
    {
        $stmt = $this->db->prepare(
            'INSERT INTO content (content_key, content_value) VALUES (:key, :value)
             ON DUPLICATE KEY UPDATE content_value = :value2'
        );
        return $stmt->execute(['key' => $key, 'value' => $value, 'value2' => $value]);
    }

    /**
     * Upserts multiple key/value pairs in one call.
     */
    public function setMany(array $map): bool
    {
        $this->db->beginTransaction();
        try {
            foreach ($map as $key => $value) {
                $this->set($key, (string) $value);
            }
            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}
