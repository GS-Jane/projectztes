<?php
    // 添加到购物车接口(传用户的用户名和商品的ID)
    # 用户名 商品id
    $username = $_GET['username'];
    $goods_id = $_GET['goods_id'];
    $good_num = $_GET['good_num'];
    $good_color = $_GET['good_color'];
    $good_edition = $_GET['good_edition'];
    $good_network = $_GET['good_network'];
    $good_img = $_GET['good_img'];
    $name = $_GET['name'];
    $good_price = $_GET['good_price'];
    // $username = '婧婧';
    // $goods_id = '8';
    // $good_num = 1;
    $con = mysqli_connect('localhost','root','123456','zte');


    $sql = "SELECT * FROM `goodscar` WHERE `username`='$username' AND `good_id`='$goods_id' AND `good_color`='$good_color' AND `good_edition`='$good_edition' AND `good_network`='$good_network'";
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('error for mysql' . mysqli_error());
    }
    $row = mysqli_fetch_assoc($res);
     # 如果购物车表中存在该条数据，让这个条数据中的goods_num 值加 1
    if($row){
        $goodsNum = $row['good_num']+ $good_num;
       $res2= mysqli_query($con,"UPDATE `goodscar` SET `good_num` = '$goodsNum'  WHERE  `username`='$username' AND `good_id`='$goods_id' AND `good_color`='$good_color' AND `good_edition`='$good_edition' AND `good_network`='$good_network'");
    }else{
        # 如果不存在，就往goodscar表中 添加数据
        $res2= mysqli_query($con,"INSERT INTO `goodscar` (`good_id`, `username`, `good_num`,`is_select`,`good_color`,`good_edition`,`good_network`,`good_img`,`name`,`good_price`) VALUES ($goods_id, '$username', '$good_num','0','$good_color','$good_edition','$good_network','$good_img','$name','$good_price')");
    }
    if($res2){
        echo json_encode(array("code"=>true,"msg"=>"添加数据成功"),JSON_UNESCAPED_UNICODE);
    }

?>