<?php

class GalleryController
{
    public function index(): void
    {
        $category = $_GET['category'] ?? 'all';
        $items    = (new Gallery())->all($category);
        sendSuccess('Gallery fetched', ['items' => $items]);
    }

    public function store(): void
    {
        requireAuth();

        $title    = sanitizeString($_POST['title'] ?? '');
        $category = sanitizeString($_POST['category'] ?? 'campus');

        if ($title === '' || empty($_FILES['image'])) {
            sendError('Title and image are required.', 422);
        }

        try {
            $path = FileUploadService::upload($_FILES['image'], 'gallery');
        } catch (Exception $e) {
            sendError($e->getMessage(), 422);
        }

        $id = (new Gallery())->create($path, $title, $category);
        sendSuccess('Image uploaded successfully', ['id' => $id, 'image' => $path], 201);
    }

    public function update(int $id): void
    {
        requireAuth();

        $gallery = new Gallery();
        $existing = $gallery->find($id);
        if (!$existing) {
            sendError('Gallery image not found.', 404);
        }

        $fields = [];
        if (!empty($_POST['title'])) {
            $fields['title'] = sanitizeString($_POST['title']);
        }
        if (!empty($_POST['category'])) {
            $fields['category'] = sanitizeString($_POST['category']);
        }
        if (!empty($_FILES['image']['name'])) {
            try {
                $fields['image'] = FileUploadService::upload($_FILES['image'], 'gallery');
                FileUploadService::delete($existing['image']);
            } catch (Exception $e) {
                sendError($e->getMessage(), 422);
            }
        }

        $gallery->update($id, $fields);
        sendSuccess('Image updated successfully');
    }

    public function destroy(int $id): void
    {
        requireAuth();

        $gallery  = new Gallery();
        $existing = $gallery->find($id);
        if (!$existing) {
            sendError('Gallery image not found.', 404);
        }

        $gallery->delete($id);
        FileUploadService::delete($existing['image']);
        sendSuccess('Image deleted successfully');
    }
}
