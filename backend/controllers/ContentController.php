<?php

class ContentController
{
    /** GET /api/content - everything, as a flat object */
    public function index(): void
    {
        sendSuccess('Content fetched', (new Content())->all());
    }

    /** GET /api/content/school-info - used by the homepage boot script */
    public function schoolInfo(): void
    {
        $keys = [
            'announcement_text',
            'school_phone',
            'school_phone_alt',
            'school_email',
            'school_address',
            'office_hours',
            'about_students_count',
            'about_faculty_count',
            'about_pass_rate',
        ];
        sendSuccess('School info fetched', (new Content())->getMany($keys));
    }

    /** GET /api/content/leadership - founder/principal/superior + vision/mission */
    public function leadership(): void
    {
        $keys = [
            'vision_statement',
            'mission_statement',
            'founder_name',
            'founder_message',
            'principal_name',
            'principal_message',
            'superior_name',
            'superior_message',
        ];
        sendSuccess('Leadership content fetched', (new Content())->getMany($keys));
    }

    /** POST /api/content/update - admin bulk update, body: { "key": "value", ... } */
    public function update(): void
    {
        requireAuth();

        $body = getRequestBody();
        if (empty($body) || !is_array($body)) {
            sendError('No content provided.', 422);
        }

        $clean = [];
        foreach ($body as $key => $value) {
            $clean[sanitizeString((string) $key)] = is_string($value) ? $value : (string) $value;
        }

        (new Content())->setMany($clean);
        sendSuccess('Content updated successfully');
    }
}
