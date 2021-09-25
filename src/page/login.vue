<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button style="float: right; padding: 3px 0" type="text"
          >管理员登录</el-button
        >
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="UserName">
          <el-input v-model="ruleForm.UserName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="ruleForm.Password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="ValidateCode">
          <el-col :span="12">
            <el-input v-model="ruleForm.ValidateCode"></el-input>
          </el-col>
          <el-col :span="12">
            <img :src="imgSrc" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import axios from '../util/config'
import {baseUrl} from '../util/config'

export default {
  data() {
    return {
      imgSrc:`${baseUrl}/Account/ValidateCode`,
      ruleForm: {
        UserName: "",
        Password: "",
        ValidateCode: "",
      },
      rules: {
        UserName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        Password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        ValidateCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证成功
          //向后端接口传数据，发起请求
          axios
            .post('/Account/Login', this.ruleForm, {
              withCredentials: true,
            })
            .then((obj) => {
              let result = obj.data;
              if (result.code > 0) {
                this.$message({
                  message: result.msg,
                  type: "warning",
                });
              } else {
                //1、页面跳转
                //2、保存token令牌
                localStorage.setItem("token",result.token);
                axios.defaults.headers.common['Authorization'] = `bearer ${localStorage.getItem('token')}`;
                this.$router.push('/home')
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: rgb(146, 166, 173);
  overflow: hidden;
}
.text {
  font-size: 14px;
}
.el-form{
    width: 100%;
}
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 0 auto;
  margin-top: 14%;
  overflow: hidden;
}
</style>