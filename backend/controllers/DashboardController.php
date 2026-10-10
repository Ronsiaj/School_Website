<?php

class DashboardController
{
    public function stats(): void
    {
        requireAuth();

        sendSuccess('Stats fetched', [
            'gallery_count'      => (new Gallery())->count(),
            'news_count'         => (new News())->count(),
            'achievements_count' => (new Achievement())->count(),
            'messages_count'     => (new ContactMessage())->count(),
        ]);
    }
}
