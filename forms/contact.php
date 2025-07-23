<?php

$name = $_POST['name'];
 $email = $_POST['email'];
 $subject = $_POST['subject'];
 $message = $_POST['message'];

$from = "lokesh7.website.com";
$to = "tactloki@gmail.com";
$body = "Name : $name.\n"."Email : $email.\n"."Subject : $subject.\n"."Message : $message.\n";

$headers = "From :".$from."Reply-to :".$email;

mail($to,$subject,$body,$header);

header("Location:index.html");

?>
