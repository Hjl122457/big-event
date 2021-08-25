$(function () {
  // 点击"去注册账号链接"
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击"去登录"
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 从layui中获取 form对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过from.verify（）函数自定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      //然后进行一次等于的半段
      // 如果半段失败 则return一个提示消息即可
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });
  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault();
    // 2. 发起Ajax的POST请求
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    $.post(
      "http://api-breakingnews-web.itheima.net/api/reguser",
      data,
      function (res) {
        if (res.status !== 0) {
          console.log(res);
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录！");
        // 模拟人的点击行为
        $("#link_login").click();
      }
    );
  });
  // 监听登录表单的提交事件
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'POST',
      data:$(this).serialize(),
      success:function(res){
          if(res.status !== 0){
            return layer.msg('登陆失败！')
          }
          layer.msg('登陆成功！')
          location.href='/index.html'
          // console.log('token');
      }
    })
  })
});
