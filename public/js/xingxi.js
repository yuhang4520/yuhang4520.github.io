/**
 * Created by me on 2017/4/12.
 */
$(function () {
    //定义星球位置的数组
    // var json = [
    //     { transform:"scale(1.5)", top: "2.5rem", left: "1.3rem"},
    //     {width: "0.93rem", height: "0.915rem", top: "1.8rem", left: "2.3rem"},
    //     {width: "0.47rem", height: "0.47rem", top: "0.9rem", left: "2.7rem"},
    //     {width: "0.27rem", height: "0.27rem", top: "0.4rem", left: "2rem"},
    //     {width: "0.35rem", height: "0.35rem", top: "0.5rem", left: "1.3rem"},
    //     {width: "0.625rem", height: "0.5rem", top: "1.1rem", left: "0.5rem"},
    //     {width: "0.595rem", height: "0.595rem", top: "2rem", left: "0.5rem"}
    // ];

    //星系1 数组
    var json =[
        [
            {fontSize: "0.14rem", width: "0.88rem", height: "0.96rem", top: "1.8rem", left: "1.55rem"},
            {fontSize: "0.12rem", width: "0.85rem", height: "0.7rem", top: "1.35rem", left: "2.5rem"},
            {fontSize: "0.1rem", width: "0.55rem", height: "0.55rem", top: "0.7rem", left: "2.95rem"},
            {fontSize: "0rem", width: "0.27rem", height: "0.27rem", top: "0.33rem", left: "2.3rem"},
            {fontSize: "0rem", width: "0.35rem", height: "0.35rem", top: "0.4rem", left: "1.5rem"},
            {fontSize: "0.1rem", width: "0.59rem", height: "0.45rem", top: "0.89rem", left: "0.65rem"},
            {fontSize: "0.12rem", width: "0.595rem", height: "0.595rem", top: "1.6rem", left: "0.5rem"}
        ],
        [
            {fontSize: "0.14rem", width: "0.88rem", height: "0.96rem", top: "1.8rem", left: "1.55rem"},
            {fontSize: "0.12rem", width: "0.85rem", height: "0.7rem", top: "1.35rem", left: "2.5rem"},
            {fontSize: "0.1rem", width: "0.55rem", height: "0.55rem", top: "0.7rem", left: "2.95rem"},
            {fontSize: "0rem", width: "0.27rem", height: "0.27rem", top: "0.33rem", left: "2.3rem"},
            {fontSize: "0rem", width: "0.35rem", height: "0.35rem", top: "0.4rem", left: "1.5rem"},
            {fontSize: "0.1rem", width: "0.59rem", height: "0.45rem", top: "0.89rem", left: "0.65rem"},
            {fontSize: "0.12rem", width: "0.595rem", height: "0.595rem", top: "1.6rem", left: "0.5rem"}
        ],
        [
            {fontSize: "0.14rem", width: "0.88rem", height: "0.96rem", top: "1.8rem", left: "1.55rem"},
            {fontSize: "0.12rem", width: "0.78rem", height: "0.6rem", top: "1.09rem", left: "2.9rem"},
            {fontSize: "0rem", width: "0.27rem", height: "0.27rem", top: "0.33rem", left: "2.3rem"},
            {fontSize: "0.1rem", width: "0.59rem", height: "0.45rem", top: "0.5rem", left: "1.2rem"},
            {fontSize: "0.12rem", width: "0.595rem", height: "0.595rem", top: "1.2rem", left: "0.5rem"}

        ],
        [
            {fontSize: "0.14rem", width: "0.88rem", height: "0.96rem", top: "1.8rem", left: "1.55rem"},
            {fontSize: "0.12rem", width: "0.78rem", height: "0.6rem", top: "1.35rem", left: "2.5rem"},
            {fontSize: "0.1rem", width: "0.47rem", height: "0.47rem", top: "0.7rem", left: "2.95rem"},
        ],
    ] ;


    //首页初始化

    //获取元素
    var $_xingxi0 = $(".swiper-xingxi0");
    var $_liarr = $_xingxi0.children("li")
    var ajax_li= $_xingxi0.children("li[data_flag='0']")

    // 开闭,控制动画是否可以开启,动画执行中不可多次点击
    var flag = true;
    var body = document.querySelector("body")
    //第一页初始化星球位置
    move(0,$_xingxi0,json[0])
    //获得初始数据
    send_ajax(ajax_li)
    // <!-- Initialize Swiper 滑动切换星系-->

    var Myswiper = new Swiper('.swiper-container', {

        width: window.innerWidth,
        noSwiping: true,
        effect : 'cube',
        tdFlow: {
            shadows : false,
        },
        fade: {
            crossFade: true,
        },
        onTransitionEnd: function(){

            //切换结束时，触发
            // 切换结束后触发
            $(".yh_foot_box").addClass("dn")
            var swiper_index=Myswiper.activeIndex;
            var now_swiper = $(".swiper-xingxi"+swiper_index)
//              初始化第二页星球位置
            $_liarr=now_swiper.children("li")
            move(0,now_swiper,json[swiper_index])
            $_liarr.off("touchend").on("touchend", function () {
                $_self=$(this);
                control_anmit($_self,json[swiper_index]);
            })
            setTimeout(function () {
                $(".yh_foot_box").addClass("dn")
                //初始化下部分内容默认发ajax
                var ajax_li= now_swiper.children("li[data_flag='0']")
//                 var bg_index = ajax_li.attr("data_bg")
// //            alert(bg_index)
//                 $(".yh_foot_box").removeClass("animated bounceInLeft")
//                 setTimeout(function () {
//                     $(".yh_foot_box").addClass("animated bounceInLeft").removeClass("dn")
//                 }, 0)
//                 $(".yh_foot_box").css("backgroundImage", "url(../public/images/page2_" + bg_index + ".png)")

                send_ajax(ajax_li)

            })
        }
    });
//    Myswiper.on("tap",function () {
//        alert(1)
//    })

    //第一页的点击转动
    $_liarr.on("touchend", function () {
        var $_self=$(this);
        control_anmit($_self,json[0]);
    })



    //控制动画参数传入
    function control_anmit($_self,arr) {

        $_self=$($_self)
        var $_parent=$_self.parent()
        //  找到当前最大的li
        var $_li_flag = $_self.parent().children("li[data_flag='0']")
        //点击的li的data_yh
        var now_data_yh = $_self.attr("data_yh");
        //最前方的li的data_yh
        var fist_data_yh = $_li_flag.attr("data_yh");
        //计算需要移动几次,以及移动方向
        var move_n;
        //   动几次
        var move_num = parseInt(now_data_yh) - parseInt(fist_data_yh)
        move_n = move_num

        console.log("move_n是" + move_n)
        var li_sun=arr.length;


        if(move_num>0){
           if( Math.abs(move_num)<=(li_sun-1)/2){
               /*1-2*/
               move(move_n,$_parent,arr,true)
           }else {
               /*3-4*/
               move_n=Math.abs(li_sun)-move_n;
               move(move_n,$_parent,arr,false)
           }

        }else {

            if( Math.abs(move_num)<=(li_sun-1)/2){
                /*-2  -1*/
                move_n=-move_n;
                move(move_n,$_parent,arr,false)
            }else {
                /*-3  -4*/
                move_n=move_n+Math.abs(li_sun);
                move(move_n,$_parent,arr,true)
            }

        }


        // //对动的次数做出处理
        // if (move_num > 6) {
        //     move_n = move_num - 7
        // } else if (move_num < 0) {
        //     move_n = -move_num
        // }
        // console.log("move_n是" + move_n)
        // //方向判断
        // if (move_num >= -6 && move_num <= -4) {
        //     move_n = 7 - move_n
        //     move(move_n, $_parent,arr,true)
        //     // console.log("a")
        // } else if (move_num >= -3 && move_num <= 0) {
        //     move(move_n,$_parent,arr,false)
        //     // console.log("b")
        //
        // } else if (move_num >= 0 && move_num <= 3) {
        //     move(move_n,$_parent,arr,true)
        //     // console.log("c")
        //
        // } else if (move_num >= 4 && move_num <= 6) {
        //     move_n = 7 - move_n
        //     move(move_n,$_parent,arr, false)
        //     // console.log("d")
        // }
        // console.log(now_data_yh)
        // console.log(fist_data_yh)
        // console.log(move_num)

       $_self.attr("data_flag", "0");
       $_self.siblings().removeAttr("data_flag")
        //            改变背景颜色
//         var bg_index = $_self.attr("data_bg")
// //            alert(bg_index)
//         $(".yh_foot_box").removeClass("animated bounceInLeft")
//         setTimeout(function () {
//             $(".yh_foot_box").addClass("animated bounceInLeft").removeClass("dn")
//         }, 0)
//         $(".yh_foot_box").css("backgroundImage", "url(../public/images/page2_" + bg_index + ".png)")


    }

//参数说明
//n   动几次
//boll  方向     true:顺时针  false 逆时针
//arr   改变属性的数组
    function move(n, eles,arr,bool,ms) {
        var maxwidth = 0;
        var widarr = [];
        $liarr=$(eles).children("li")


        var fis=$(eles).children("li[data_flag='0']").html()
        //默认500毫秒执行完成
        if (ms == undefined) {
            ms = 500;
        }

        // if (flag == false) {
        //     alert("点了太多次哦")
        //     return false
        // }
        if (n<0) {
            return false
        }

        //动画执行中
        flag = false;

        if (bool !== undefined&&n>0) {
            if (bool) {
                // 反向旋转：删除数组中最后一个元素，添加到数组中的第一位)
                arr.unshift(arr.pop());
            } else {
                // 。正向旋转：删除数组中第一个元素，添加到数组中的最后一位)
                arr.push(arr.shift());
            }
        }

        $liarr.each(function (index, ele) {

            $(ele).animate(arr[index], ms, function () {
                if (index == arr.length - 1) {
                    flag = true;
                    if(n>0){
                        move(n,eles,arr,bool)

                    }


                }
            })

            // var width = $(this).css("width");
            // width = parseInt(width);
            // widarr.push(width);


        });
        //若是第一次初始化,不用执行以下代码

        // if (fis) {
            // //找到最大的球,即为最前面的球
            // maxwidth = widarr[0]
            // for (var j = 0; j < widarr.length; j++) {
            //     if (widarr[j] > maxwidth) {
            //         maxwidth = widarr[j];
            //     }
            // }
            // // console.log(widarr)
            // var inx = widarr.indexOf(maxwidth);
            // //    根据方向改变inx
            // if (bool) {
            //     inx = parseInt(inx) + 1;
            //
            //     //    大于6要处理
            //     if (inx > 6) {
            //         inx = inx - 7
            //     }
            //     // console.log("inx+1为"+inx)
            //     // console.log($_liarr)
            //     // console.log($_liarr[inx+1])
            // } else {
            //     inx = parseInt(inx) - 1;
            //     //若果是负数要处理
            //     if (inx < 0) {
            //         inx = inx + 7
            //     }
            //     // console.log("inx-1为"+inx)
            //
            // }
            // $($liarr[inx]).attr("data_flag", "0")
            // $($liarr[inx]).siblings().removeAttr("data_flag")
        //
        // } else {
        //     $($liarr[0]).attr("data_flag", "0")
        // }
      //  //第一次初始化完成
       // fist_run = true;
        n--;
        flag=true;
    }

})