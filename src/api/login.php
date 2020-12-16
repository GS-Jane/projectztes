<?php
// 登陆接口(传递用户用户名和密码)
$con = mysqli_connect('localhost','root','123456','zte');

  $username = $_POST['username'];
  $password = $_POST['password'];

  // $username = "abc";
  // $password = "111111";
  $sql = "SELECT * FROM `login` WHERE `username`='$username' AND `password`='$password'";

  $res = mysqli_query($con,$sql);

  if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }

  $row = mysqli_fetch_assoc($res);

  if (!$row) {
    // 没有匹配的数据 登录失败
    echo json_encode(array(
      "code" => 0,
      "message" => "登录失败"
    ),JSON_UNESCAPED_UNICODE);
  } else {
    // 有匹配的数据 登录成功
    echo json_encode(array(
      "code" => 1,
      "message" => "登录成功"
    ),JSON_UNESCAPED_UNICODE);
  }

?>
