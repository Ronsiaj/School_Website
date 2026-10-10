<?php

class AdmissionController
{
    public function index(): void
    {
        requireAuth();
        $items = (new Admission())->all();
        
        // Decode the documents JSON for the frontend
        foreach ($items as &$item) {
            $item['documents'] = $item['documents'] ? json_decode($item['documents'], true) : [];
        }
        
        sendSuccess('Admissions fetched', ['items' => $items]);
    }

    public function show(int $id): void
    {
        requireAuth();
        $item = (new Admission())->find($id);
        if (!$item) {
            sendError('Application not found.', 404);
        }
        $item['documents'] = $item['documents'] ? json_decode($item['documents'], true) : [];
        sendSuccess('Application fetched', $item);
    }

    public function store(): void
    {
        $data = [
            'student_name'  => sanitizeString($_POST['student_name'] ?? ''),
            'dob'           => sanitizeString($_POST['dob'] ?? ''),
            'gender'        => sanitizeString($_POST['gender'] ?? ''),
            'class_applied' => sanitizeString($_POST['class_applied'] ?? ''),
            'parent_name'   => sanitizeString($_POST['parent_name'] ?? ''),
            'phone'         => sanitizeString($_POST['phone'] ?? ''),
            'email'         => sanitizeString($_POST['email'] ?? ''),
            'address'       => sanitizeString($_POST['address'] ?? ''),
        ];

        $missing = validateRequired($data, array_keys($data));
        if (!empty($missing)) {
            sendError('Missing required fields: ' . implode(', ', $missing), 422);
        }
        
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            sendError('Invalid email format.', 422);
        }

        $documents = [];
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

        if (!empty($_FILES)) {
            foreach (['birth_certificate', 'marksheet', 'photo'] as $docKey) {
                if (!empty($_FILES[$docKey]['name'])) {
                    $ext = strtolower(pathinfo($_FILES[$docKey]['name'], PATHINFO_EXTENSION));
                    if (!in_array($ext, $allowedExtensions, true)) {
                        sendError("Invalid file type for {$docKey}. Allowed: jpg, png, pdf", 422);
                    }
                    try {
                        $path = FileUploadService::upload($_FILES[$docKey], 'admissions');
                        $documents[$docKey] = $path;
                    } catch (Exception $e) {
                        sendError($e->getMessage(), 422);
                    }
                }
            }
        }

        $data['documents'] = !empty($documents) ? json_encode($documents) : null;
        $data['status']    = 'pending';

        $id = (new Admission())->create($data);

        sendSuccess('Application submitted successfully', ['id' => $id], 201);
    }

    public function updateStatus(int $id): void
    {
        requireAuth();
        $status = sanitizeString($_POST['status'] ?? '');
        if (!in_array($status, ['approved', 'rejected', 'pending'], true)) {
            sendError('Invalid status.', 422);
        }

        $admission = new Admission();
        if (!$admission->find($id)) {
            sendError('Application not found.', 404);
        }

        $admission->updateStatus($id, $status);
        sendSuccess('Status updated');
    }

    public function destroy(int $id): void
    {
        requireAuth();
        $admission = new Admission();
        $existing  = $admission->find($id);
        if (!$existing) {
            sendError('Application not found.', 404);
        }

        $admission->delete($id);

        $documents = $existing['documents'] ? json_decode($existing['documents'], true) : [];
        if (is_array($documents)) {
            foreach ($documents as $path) {
                FileUploadService::delete($path);
            }
        }

        sendSuccess('Application deleted');
    }
}
