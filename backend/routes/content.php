<?php
// Content routes (vision/mission/founder/principal/superior, school info, announcement)
route('GET',  '#^api/content$#',             ['ContentController', 'index']);
route('GET',  '#^api/content/school-info$#', ['ContentController', 'schoolInfo']);
route('GET',  '#^api/content/leadership$#',  ['ContentController', 'leadership']);
route('POST', '#^api/content/update$#',      ['ContentController', 'update']);
