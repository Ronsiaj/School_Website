<?php

class AchievementController
{
    public function index(): void
    {
        sendSuccess('Achievements fetched', ['items' => (new Achievement())->all()]);
    }

    public function store(): void
    {
        requireAuth();

        $studentName = sanitizeString($_POST['student_name'] ?? '');
        $achievement = sanitizeString($_POST['achievement'] ?? '');
        $year        = sanitizeString($_POST['year'] ?? date('Y'));

        $missing = validateRequired(
            ['student_name' => $studentName, 'achievement' => $achievement],
            ['student_name', 'achievement']
        );
        if (!empty($missing)) {
            sendError('Missing required fields: ' . implode(', ', $missing), 422);
        }

        $image = null;
        if (!empty($_FILES['image']['name'])) {
            try {
                $image = FileUploadService::upload($_FILES['image'], 'achievements');
            } catch (Exception $e) {
                sendError($e->getMessage(), 422);
            }
        }

        $id = (new Achievement())->create([
            'student_name' => $studentName,
            'achievement'  => $achievement,
            'image'        => $image,
            'year'         => $year,
        ]);

        sendSuccess('Achievement added', ['id' => $id], 201);
    }

    public function update(int $id): void
    {
        requireAuth();

        $model    = new Achievement();
        $existing = $model->find($id);
        if (!$existing) {
            sendError('Achievement not found.', 404);
        }

        $fields = [];
        foreach (['student_name', 'achievement', 'year'] as $key) {
            if (!empty($_POST[$key])) {
                $fields[$key] = sanitizeString($_POST[$key]);
            }
        }
        if (!empty($_FILES['image']['name'])) {
            try {
                $fields['image'] = FileUploadService::upload($_FILES['image'], 'achievements');
                FileUploadService::delete($existing['image']);
            } catch (Exception $e) {
                sendError($e->getMessage(), 422);
            }
        }

        $model->update($id, $fields);
        sendSuccess('Achievement updated');
    }

    public function destroy(int $id): void
    {
        requireAuth();

        $model    = new Achievement();
        $existing = $model->find($id);
        if (!$existing) {
            sendError('Achievement not found.', 404);
        }

        $model->delete($id);
        FileUploadService::delete($existing['image']);
        sendSuccess('Achievement deleted');
    }
}
