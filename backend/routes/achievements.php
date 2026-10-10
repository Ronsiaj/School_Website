<?php
// Achievements routes
route('GET',  '#^api/achievements$#',               ['AchievementController', 'index']);
route('POST', '#^api/achievements$#',               ['AchievementController', 'store']);
route('POST', '#^api/achievements/update/(\d+)$#',  ['AchievementController', 'update']);
route('POST', '#^api/achievements/delete/(\d+)$#',  ['AchievementController', 'destroy']);
