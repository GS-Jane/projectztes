<?php

    $username = $_POST['username'];
    $password = $_POST['password'];

    // $username = "abc";
    // $password = "111111";
    $con = mysqli_connect('localhost','root','123456','zte');

    /* 
        获取到用户名和密码之后 先去数据库中判断这个用户名是否存在
        如果用户名存在，直接返回 用户名已经存在
        如果用户名不存在，把这个用户名和密码 插入数据库
    */
    // 查询用户是否已经存在
    $sql1 = "SELECT * FROM `login` WHERE `username`='$username'";

    $res1 = mysqli_query($con,$sql1);


    if(!$res1){
      die('error for mysql: ' . mysqli_error());
    }
    $row = mysqli_fetch_assoc($res1);
    
    if($row){
      echo json_encode(array(
        "code" => 0,
        "message" => "注册失败"
      ),JSON_UNESCAPED_UNICODE);
    }else{
      $sql = "INSERT INTO `login` (`id`, `username`,`password`) VALUES (null, '$username','$password');";

      $res = mysqli_query($con,$sql);
      echo json_encode(array(
        "code" => 1,
        "message" => "注册成功"
      ),JSON_UNESCAPED_UNICODE);
    }

   
   
    // if(!$res){
    //     // print_r("注册失败");
    //     echo json_encode(array(
    //       "code" => 0,
    //       "message" => "注册失败"
    //     ),JSON_UNESCAPED_UNICODE);
    // }else{
    //   echo json_encode(array(
    //     "code" => 1,
    //     "message" => "注册成功"
    //   ),JSON_UNESCAPED_UNICODE);
    // }
    // print_r($res);

?>