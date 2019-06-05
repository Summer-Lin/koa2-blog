<template>
  <div class="home-box">
    <title-box>
      <div slot="title">用户列表</div>
    </title-box>
    <Table 
      highlight-row 
      :loading="table.loading"
      :columns="table.cols" 
      :data="table.data"></Table>
  </div>
</template>

<script>
  import {
    getUserList
  } from "@/api/backend/index"
  import titleBox from "@/pages/backend/components/titleBox.vue"
  export default {
    components: {
      titleBox
    },
    data() {
      return {
        table: {
          loading: false,
          data: [],
          cols: [{
              type: 'index',
              width: 60,
              align: 'center'
            },
            {
              title: '用户名',
              key: 'username'
            },
            {
              title: '邮箱',
              key: 'email'
            },
          ]
        }
      }
    },

    created() {
      this.getUserList()
    },

    methods: {
      getUserList() {
        this.table.loading = true
        getUserList().then(res => {
          if (res.code === 200) {
            this.table.data = res.data
          } else {
            this.$Message.error(res.message);
          }
          this.table.loading = false
        })
      },
    }
  }
</script>

<style lang="less">
  .home-box {
    height: 100%;

    .layout {
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      height: 100%;

      .ivu-layout {
        height: 100%;
      }
    }

    .layout-logo {
      width: 100px;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
      color: #fff;
      line-height: 30px;
    }

    .layout-nav {
      width: 420px;
      margin: 0 auto;
      margin-right: 20px;
    }

    table {
      margin-top: 10px;
    }
  }
</style>