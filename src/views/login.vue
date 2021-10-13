<template>
  <div class="bg">
    <div class="login-box">
      <img src="../assets/img/login.png" class="left">
      <div class="right">
        <h3>欢迎进入我的WIN-OS</h3>
        <p></p>
        <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="0px">
          <el-form-item prop="username">
            <el-input v-model="form.username" clearable  placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">            
            <el-input v-model="form.password" type="password" clearable  placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  components: {
    
  },

  data() {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { 
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '密码不得少于6位',
            trigger: 'change'
          }
        ]
      }
    }
  },

  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.$request({
            url: '/login',
            method: 'post',
            data: this.form
          }).then(res => {
            if(!this.$store.state.token){
              localStorage.setItem('token',res.data.data.token)
              console.log(localStorage.token)
              this.$store.commit('SET_TOKEN')
            }
            this.$router.push('/')
          }).catch(err => {
            throw err
          })
        }else {
          console.log('error')
        }
      })
    }
  },
}
</script>

<style scoped>
  .bg {
    background-image: url('../assets/img/bg.jpg');
    background-size: cover;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bg .login-box {
    width: 540px;
    height: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: whitesmoke;
    border: 1xp solid ;
    border-radius: 2px;
    box-shadow: 2px 2px 2px #808080;
  }
  .left {
    width: 60%;
  }
  .right {
    padding: 10px
  }

  button {
    width: 100%
  }

</style>