<?php
/**
 * Database connection (PDO singleton)
 * XAMPP defaults: root / no password / db: school_db
 */

function getDB(): PDO
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $host    = '127.0.0.1';
    $dbname  = 'st_josephs_school';
    $user    = 'root';
    $pass    = '';
    $charset = 'utf8mb4';

    $dsn = "mysql:host={$host};dbname={$dbname};charset={$charset}";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode([
            'status'  => false,
            'message' => 'Database connection failed.',
            'data'    => null,
        ]);
        exit;
    }

    return $pdo;
}
