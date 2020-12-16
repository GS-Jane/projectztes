<?php

  // 获取商品的详细信息(传递商品的ID)
$con = mysqli_connect('localhost','root','123456','zte');

  $id = $_GET['id'];

  $sql = "SELECT * FROM `goods` WHERE `id`='$id'";

  $res = mysqli_query($con,$sql);

  if (!$res) {
    die('error for mysql: ' . mysqli_error());
  }

  $row = mysqli_fetch_assoc($res);

  echo json_encode(array(
    "code" => 1,
    "message" => "获取商品信息成功",
    "detail" => $row
  ),JSON_UNESCAPED_UNICODE)

?>
