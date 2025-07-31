<?php
session_start();

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $users = file('users.txt', FILE_IGNORE_NEW_LINES);

    foreach ($users as $user) {
        if (explode(':', $user)[0] === $username) {
            $error = "Username already taken.";
            break;
        }
    }

    if (!$error) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        file_put_contents('users.txt', "$username:$hashedPassword\n", FILE_APPEND);
        $_SESSION['username'] = $username;
        header("Location: index.php");
        exit();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Sign Up</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="dark">
    <div class="auth-container">
        <h2>Create an Account</h2>
        <form method="POST">
            <input type="text" name="username" placeholder="Choose username" required>
            <input type="password" name="password" placeholder="Create password" required>
            <input type="submit" value="Sign Up">
            <a href="login.php">Already have an account? Login</a>
            <p style="color: red;"><?php echo $error; ?></p>
        </form>
    </div>
</body>
</html>
