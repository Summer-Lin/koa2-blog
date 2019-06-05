<template>
  <div class="home-box">
    <div class="layout">
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="4" @on-select="onExit">
            <div class="layout-logo">Summer-Blog</div>
            <div class="layout-nav">
              <MenuItem name="4" style="float:right;">
                <Icon type="ios-navigate"></Icon>退出登录
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Layout>

          <Sider hide-trigger>
            <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  用户
                </template>
                <MenuItem name="1-1">用户列表</MenuItem>

              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  Item 2
                </template>
                <MenuItem name="2-1">Option 1</MenuItem>
                <MenuItem name="2-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-analytics"></Icon>
                  Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
            </Menu>
          </Sider>


          <Layout :style="{padding: '0 24px 24px'}">
            <Content :style="{minHeight: '280px', background: '#fff',margin: '24px 0', borderRadius: '5px'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
  import Auth from "@/utils/auth"
  export default {

    data() {
      return {
        
      }
    },

    methods: {
      onExit() {
        Auth.removeToken();
        Auth.onExit();
        console.log(1)
      }
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
    }

    .layout-nav {
      width: 420px;
      margin: 0 auto;
      margin-right: 20px;
    }
  }
</style>