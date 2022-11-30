// $('.forms input').css({backgroundColor:'aqua'})

$('.forms input[name=confirm]').blur(function(){
    if($(this).val()==$('.forms input[name=password]').val()){


    }else{
        $(this).css({border:'1px solid aqua'})

    }
})


function sub() {
            //如果全部输入正确返回成功  输入错误则输出提示
                if(nameCheck() && pwdCheck() && pwdSure()){
                    alert('提交成功');
                }else{
                    alert('你的输入有误，请按要求输入后再提交');
                }
            }

  //验证姓名字段
        function nameCheck(str) {
            let reg = /^[\u4e00-\u9fa5]{2,4}$/;
            let name = $("#name").val();
            if (!reg.test(name) || name=='') {
                $(".name").html("<span class='red'>请输入3~4位中文</span>");
                return false;
            }else{
                $(".name").text('√');
                return true;
            }
        }
         //验证密码字段
        function pwdCheck(str) {
            let reg = /^[\s\S]{6,12}/;
            let pwd = $("#pwd").val();
            if(!reg.test(pwd) || pwd==''){
                $(".pwd").html("<span class='red'>请输入6-12位密码</span>")
                return false;
            }else{
                $(".pwd").text('√');
                return true;
            }
        }
        //   //确认密码
          function pwdSure() {
            if ($("#pwd").val() === $("#pwd1").val()) {
                return true;
            } else {
                $(".pwd1").html("<span class='red'>两次密码输入不一致</span>")
                return false;
            }
        }

// $('#page li').click(function(){
//     $(this).addClass('active').siblings().removeClass('active')
// })