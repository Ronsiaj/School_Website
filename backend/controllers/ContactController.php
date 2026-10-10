<?php

class ContactController
{
    public function store(): void
    {
        $body = getRequestBody();

        $name    = sanitizeString($body['name'] ?? '');
        $phone   = sanitizeString($body['phone'] ?? '');
        $email   = sanitizeString($body['email'] ?? '');
        $subject = sanitizeString($body['subject'] ?? '');
        $message = sanitizeString($body['message'] ?? '');

        $missing = validateRequired(
            compact('name', 'phone', 'email', 'subject', 'message'),
            ['name', 'phone', 'email', 'subject', 'message']
        );
        if (!empty($missing)) {
            sendError('Missing required fields: ' . implode(', ', $missing), 422);
        }

        if (!isValidEmail($email)) {
            sendError('Please provide a valid email address.', 422);
        }
        if (!isValidPhone($phone)) {
            sendError('Please provide a valid phone number.', 422);
        }

        (new ContactMessage())->create(compact('name', 'phone', 'email', 'subject', 'message'));

        sendSuccess('Thank you! Your message has been sent. We will get back to you within 24 hours.', null, 201);
    }

    /** GET /api/contact/messages - admin inbox */
    public function index(): void
    {
        requireAuth();
        sendSuccess('Messages fetched', ['items' => (new ContactMessage())->all()]);
    }
}
