<?php

    // 获取购物车的数据(传递用户的用户名)
    //  当购物车获取数据的时候，前端需要传递用户名给后端 
    $username = $_GET['username'];
    // $username = 'abc';
    # 链接数据库
    $con = mysqli_connect('localhost','root','123456','zte');

    # 设置SQL语句
    $sql = "SELECT * FROM `goodscar` WHERE `username`='$username'";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('error for mysql' . mysqli_error());
    }
  # 数据的处理
  $dataArr = array();
  $row = mysqli_fetch_assoc($res);
  while($row){
      array_push($dataArr,$row);
      $row = mysqli_fetch_assoc($res);
  }
  echo json_encode(array(
    // "total" => $row2['count'],
    "list" => $dataArr,
    "code" => 1,
    "message" => "获取列表数据成功"
  ),JSON_UNESCAPED_UNICODE);
?>