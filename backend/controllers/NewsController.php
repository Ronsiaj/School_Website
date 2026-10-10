<?php

class NewsController
{
    public function index(): void
    {
        $type = $_GET['type'] ?? 'all';
        $items = (new News())->all($type);
        sendSuccess('News fetched', ['items' => $items]);
    }

    public function show(int $id): void
    {
        $item = (new News())->find($id);
        if (!$item) {
            sendError('News item not found.', 404);
        }
        sendSuccess('News item fetched', $item);
    }

    public function store(): void
    {
        requireAuth();

        $title       = sanitizeString($_POST['title'] ?? '');
        $description = sanitizeString($_POST['description'] ?? '');
        $type        = sanitizeString($_POST['type'] ?? 'news');
        $eventDate   = sanitizeString($_POST['event_date'] ?? date('Y-m-d'));

        $missing = validateRequired(
            ['title' => $title, 'description' => $description, 'type' => $type],
            ['title', 'description', 'type']
        );
        if (!empty($missing)) {
            sendError('Missing required fields: ' . implode(', ', $missing), 422);
        }

        if (!in_array($type, ['news', 'event', 'achievements'], true)) {
            sendError('Type must be one of: news, event, achievements.', 422);
        }

        $image = null;
        if (!empty($_FILES['image']['name'])) {
            try {
                $image = FileUploadService::upload($_FILES['image'], 'news');
            } catch (Exception $e) {
                sendError($e->getMessage(), 422);
            }
        }

        $id = (new News())->create([
            'title'       => $title,
            'description' => $description,
            'image'       => $image,
            'type'        => $type,
            'event_date'  => $eventDate,
            'status'      => 'published',
        ]);

        sendSuccess('News item created', ['id' => $id], 201);
    }

    public function update(int $id): void
    {
        requireAuth();

        $news     = new News();
        $existing = $news->find($id);
        if (!$existing) {
            sendError('News item not found.', 404);
        }

        $fields = [];
        foreach (['title', 'description', 'type', 'event_date', 'status'] as $key) {
            if (!empty($_POST[$key])) {
                $fields[$key] = sanitizeString($_POST[$key]);
            }
        }
        if (!empty($_FILES['image']['name'])) {
            try {
                $fields['image'] = FileUploadService::upload($_FILES['image'], 'news');
                FileUploadService::delete($existing['image']);
            } catch (Exception $e) {
                sendError($e->getMessage(), 422);
            }
        }

        $news->update($id, $fields);
        sendSuccess('News item updated');
    }

    public function destroy(int $id): void
    {
        requireAuth();

        $news     = new News();
        $existing = $news->find($id);
        if (!$existing) {
            sendError('News item not found.', 404);
        }

        $news->delete($id);
        FileUploadService::delete($existing['image']);
        sendSuccess('News item deleted');
    }
}
