<?php

/**
 * Generic content-block model.
 *
 * Rather than a separate table/model/controller per static section (hero
 * slides, why-choose-us, departments, campus cards, life-at-school cards,
 * achievers, testimonials, alumni, academics levels...) every repeatable
 * "card" on the site lives in one `items` table, distinguished by `section`.
 *
 * `extra` stores any section-specific fields as JSON, e.g.:
 *   achievers:    {"score": "98.6%"}
 *   testimonials: {"author": "Dr. Ananya Sharma", "role": "Alumni, Batch of 2010"}
 *   alumni:       {"batch": "Batch of 2010", "role": "Cardiac Surgeon, AIIMS"}
 *   campus:       {}
 *   departments:  {"icon": "fa-calculator"}
 */
class Item
{
    private PDO $db;

    public const SECTIONS = [
        'hero_slides',
        'why_choose_us',
        'departments',
        'campus',
        'life_at_school',
        'achievers',
        'testimonials',
        'alumni',
        'academics_levels',
        'icon_cards',
    ];

    public function __construct()
    {
        $this->db = getDB();
    }

    public function bySection(string $section): array
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM items WHERE section = :section AND status = 'active'
             ORDER BY sort_order ASC, id ASC"
        );
        $stmt->execute(['section' => $section]);
        return array_map([$this, 'decorate'], $stmt->fetchAll());
    }

    /** Admin view - includes inactive/draft items too. */
    public function bySectionAdmin(string $section): array
    {
        $stmt = $this->db->prepare(
            'SELECT * FROM items WHERE section = :section ORDER BY sort_order ASC, id ASC'
        );
        $stmt->execute(['section' => $section]);
        return array_map([$this, 'decorate'], $stmt->fetchAll());
    }

    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare('SELECT * FROM items WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ? $this->decorate($row) : null;
    }

    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO items (section, title, subtitle, description, image, sort_order, status, extra)
             VALUES (:section, :title, :subtitle, :description, :image, :sort_order, :status, :extra)'
        );
        $stmt->execute([
            'section'     => $data['section'],
            'title'       => $data['title'] ?? null,
            'subtitle'    => $data['subtitle'] ?? null,
            'description' => $data['description'] ?? null,
            'image'       => $data['image'] ?? null,
            'sort_order'  => $data['sort_order'] ?? 0,
            'status'      => $data['status'] ?? 'active',
            'extra'       => isset($data['extra']) ? json_encode($data['extra']) : null,
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, array $fields): bool
    {
        if (isset($fields['extra']) && is_array($fields['extra'])) {
            $fields['extra'] = json_encode($fields['extra']);
        }
        $sets   = [];
        $params = ['id' => $id];
        foreach ($fields as $key => $value) {
            $sets[]       = "{$key} = :{$key}";
            $params[$key] = $value;
        }
        if (empty($sets)) {
            return false;
        }
        $sql  = 'UPDATE items SET ' . implode(', ', $sets) . ' WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM items WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }

    private function decorate(array $row): array
    {
        $row['extra'] = $row['extra'] ? json_decode($row['extra'], true) : new stdClass();
        return $row;
    }
}
