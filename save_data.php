<?php
$data = json_decode(file_get_contents('php://input'), true);

if (file_put_contents('data.json', json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
