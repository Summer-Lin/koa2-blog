<template>
  <div class="login-box">
    <div class="form-box">

    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="username">
        <Input type="text" v-model="formInline.username" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="密码">
         <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        <Button type="primary" @click="handleSubmit('formInline')">注册</Button>
      </FormItem>
    </Form>
    </div>
  </div>
</template>

<script>
  import {login} from "@/api/backend/index"
  import Auth from "@/utils/auth"
  import {token} from "@/utils/config"
  export default {

    data() {
      return {
        formInline: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [{
            required: true,
            message: 'Please fill in the user name',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: 'Please fill in the password.',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 6,
              message: 'The password length cannot be less than 6 bits',
              trigger: 'blur'
            }
          ]
        }
      }
    },

    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            login(this.formInline).then(res => {
              if (res.code === 200) {
                this.$Message.success(res.message);
                Auth.setToken(res.data.token)
                setTimeout(() => {
                  this.$router.push({name: "userList"})
                }, 1000);

              } else {
                  this.$Message.error(res.message);
              }
            })
            
          } else {
            this.$Message.error("请输入用户名和密码!");
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .login-box {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../../../assets/images/timg.jpg");
    .form-box {
      width: 20%;
      text-align: center;
      margin: 200px auto;
    }
  }
</style>