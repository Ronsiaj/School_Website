# St. Joseph's School — Backend (Core PHP + MySQL)

## Setup (XAMPP)

1. Copy `backend/` into `C:\xampp\htdocs\` (or your htdocs path).
2. Create the database: open phpMyAdmin → New → name it `school_db`.
3. Import the schema: phpMyAdmin → school_db → Import → select `backend/db.sql`.
4. Confirm `config/database.php` matches your MySQL setup (defaults: `root` / no password / `school_db`).
5. Visit `http://localhost/backend/public/api/gallery` — you should get a JSON response.

Demo admin login: **admin / admin123**

## Folder structure

Matches the architecture doc: `config/`, `controllers/`, `models/`, `routes/`, `middleware/`,
`services/`, `helpers/`, `uploads/`, `public/index.php` (single front controller / router).

## Auth

Token-based (not PHP sessions), to match the existing frontend's `localStorage` token pattern.
`POST /api/auth/login` returns `{ data: { token } }`. Send it back as
`Authorization: Bearer <token>` on protected routes. Tokens are stored in `admin_tokens` and expire
after 24h (`TOKEN_TTL` in `config/constants.php`).

## Sections covered

- **Gallery, News & Events, Achievements, Content** (vision/mission/leadership/school info) — wired
  exactly per the architecture doc, each with its own model/controller/table.
- **Generic `items` table + `Item` model + `ItemController`** — covers every other repeatable card
  section so the admin can edit them too, without 10 near-duplicate CRUD modules:
  `hero_slides, why_choose_us, departments, campus, life_at_school, achievers, testimonials, alumni,
  academics_levels, icon_cards`.
  - Public: `GET /api/items/{section}`
  - Admin: `GET /api/items/{section}/admin`, `POST /api/items`, `POST /api/items/update/{id}`,
    `POST /api/items/delete/{id}`
  - Section-specific fields (e.g. testimonial author/role, alumni batch, achiever score) live in an
    `extra` JSON column.
- **Contact form** → `contact_messages` table, `POST /api/contact` (public), `GET
  /api/contact/messages` (admin inbox).
- **Dashboard stats** → `GET /api/dashboard/stats`.

## Uploaded images

Physical files live in `backend/uploads/{gallery,news,achievements}/`, outside the public web root
(per the doc). They're streamed through the front controller at
`{APP_URL}/uploads/{subfolder}/{file}` so the existing frontend's
`API_BASE + '/' + item.image` URL pattern keeps working unchanged.

## API response format

Every endpoint returns:
```json
{ "status": true, "message": "Success", "data": { } }
```
