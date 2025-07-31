<?php
session_start();

if (isset($_SESSION['username'])) {
    header("Location: index.php");
    exit();
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $users = file('users.txt', FILE_IGNORE_NEW_LINES);

    foreach ($users as $user) {
        list($storedUsername, $hashedPassword) = explode(':', $user);
        if ($username === $storedUsername && password_verify($password, $hashedPassword)) {
            $_SESSION['username'] = $username;
            header("Location: index.php");
            exit();
        }
    }
    $error = "Invalid credentials.";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="dark">
    <div class="auth-container">
        <h2>Login to Play</h2>
        <form method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="submit" value="Login">
            <a href="signup.php">Don't have an account? Sign up</a>
            <p style="color: red;"><?php echo $error; ?></p>
        </form>
    </div>
</body>
</html>
