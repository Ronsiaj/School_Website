<?php

class ItemController
{
    /** GET /api/items/{section} - public, active items only */
    public function bySection(string $section): void
    {
        if (!in_array($section, Item::SECTIONS, true)) {
            sendError('Unknown section: ' . $section, 404);
        }
        sendSuccess('Items fetched', ['items' => (new Item())->bySection($section)]);
    }

    /** GET /api/items/{section}/admin - admin view, includes drafts */
    public function bySectionAdmin(string $section): void
    {
        requireAuth();
        if (!in_array($section, Item::SECTIONS, true)) {
            sendError('Unknown section: ' . $section, 404);
        }
        sendSuccess('Items fetched', ['items' => (new Item())->bySectionAdmin($section)]);
    }

    /** POST /api/items - admin create. multipart/form-data with optional image. */
    public function store(): void
    {
        requireAuth();

        $section = sanitizeString($_POST['section'] ?? '');
        if (!in_array($section, Item::SECTIONS, true)) {
            sendError('Unknown or missing section.', 422);
        }

        $image = null;
        if (!empty($_FILES['image']['name'])) {
            try {
                $image = FileUploadService::upload($_FILES['image'], 'gallery');
            } catch (Exception $e) {
                sendError($e->getMessage(), 422);
            }
        }

        $extra = [];
        if (!empty($_POST['extra'])) {
            $decoded = json_decode($_POST['extra'], true);
            $extra   = is_array($decoded) ? $decoded : [];
        }

        $id = (new Item())->create([
            'section'     => $section,
            'title'       => sanitizeString($_POST['title'] ?? ''),
            'subtitle'    => sanitizeString($_POST['subtitle'] ?? ''),
            'description' => sanitizeString($_POST['description'] ?? ''),
            'image'       => $image,
            'sort_order'  => (int) ($_POST['sort_order'] ?? 0),
            'status'      => $_POST['status'] ?? 'active',
            'extra'       => $extra,
        ]);

        sendSuccess('Item created', ['id' => $id], 201);
    }

    /** POST /api/items/update/{id} - admin update */
    public function update(int $id): void
    {
        requireAuth();

        $model    = new Item();
        $existing = $model->find($id);
        if (!$existing) {
            sendError('Item not found.', 404);
        }

        $fields = [];
        foreach (['title', 'subtitle', 'description', 'status'] as $key) {
            if (isset($_POST[$key])) {
                $fields[$key] = sanitizeString($_POST[$key]);
            }
        }
        if (isset($_POST['sort_order'])) {
            $fields['sort_order'] = (int) $_POST['sort_order'];
        }
        if (!empty($_POST['extra'])) {
            $decoded = json_decode($_POST['extra'], true);
            if (is_array($decoded)) {
                $fields['extra'] = $decoded;
            }
        }
        if (!empty($_FILES['image']['name'])) {
            try {
                $fields['image'] = FileUploadService::upload($_FILES['image'], 'gallery');
                FileUploadService::delete($existing['image']);
            } catch (Exception $e) {
                sendError($e->getMessage(), 422);
            }
        }

        $model->update($id, $fields);
        sendSuccess('Item updated successfully');
    }

    /** POST /api/items/delete/{id} - admin delete */
    public function destroy(int $id): void
    {
        requireAuth();

        $model    = new Item();
        $existing = $model->find($id);
        if (!$existing) {
            sendError('Item not found.', 404);
        }

        $model->delete($id);
        FileUploadService::delete($existing['image']);
        sendSuccess('Item deleted successfully');
    }
}
