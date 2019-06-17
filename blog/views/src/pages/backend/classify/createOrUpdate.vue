<template>
  <div class="classify-createOrupdate-box">
     <title-box>
      <span slot="title">{{titleText}}</span>
    </title-box>
    <div>
      <Form 
            class="form"
            ref="form" 
            :model="form" 
            :rules="ruleValidate" 
            :label-width="80">

        <FormItem label="分类名称" prop="name">
            <Input v-model="form.name"></Input>
        </FormItem>

        <FormItem label="图片" prop="icon">
            <div class="demo-upload-list" v-if="form.icon">
              <template>
                <img :src="form.icon">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="form.icon = ''"></Icon>
                </div>
              </template>
            </div>
            <Upload
              v-if="!form.icon"
              ref="upload"
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError"
              :before-upload="handleBeforeUpload"
              type="drag"
              action=""
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
              </div>
             </Upload>
    
        </FormItem>

         <FormItem label="父级分类" prop="parent_id">
             <Select v-model="form.parent_id">
                <Option :value="item.id" 
                        v-for="(item, index) in parentArray"
                        :key="index"
                        >{{item.name}}</Option>
            </Select>
        </FormItem>

        <FormItem label="层级" prop="z_index">
            <Input v-model="form.z_index"></Input>
        </FormItem>
           <FormItem>
            <Button @click="$router.push({name: 'classifyList'})" style="margin-left: 8px">取消</Button>
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
        </FormItem>
      </Form>
    </div>

  </div>
</template>

<script>
  import titleBox from "@/pages/backend/components/titleBox.vue"
  import {upload, 
          getCategoryList, 
          categoryCreate,
          categoryDetail,
          categoryUpdate
          } from "@/api/backend/index"

  export default {
   components: { titleBox },
    data() {
      return {
          titleText: "新增分类",

          form: {
            id: "",
            name: "",//分类名称
            icon: "",
            parent_id: "", //父级分类
            z_index: "" //层级
          },

          parentArray: [],

          ruleValidate: {
            name: [
                { required: true, message: '请输入分类名称', trigger: 'blur' }
            ],
            icon: [
                { required: true, message: '请上传图片', trigger: 'change' }
            ],
          }
      }
    },

    created(){
     
      this.getCategoryList()
    },

    methods: {
      //获取父级列表
      getCategoryList() {
        getCategoryList().then(res => {
          if(res.code === 200) {
            this.parentArray = res.data
  console.log(res)
          // 编辑
            if(this.$route.query.id) {
              this.form.id = this.$route.query.id
              this.categoryDetail()
            } 
          }
        })
      },
      //上传图片格式错误提示
      handleFormatError (file) {
        this.$Notice.warning({
            title: '文件格式错误!',
            desc: '文件 ' + file.name + ' 不正确, 请选择 jpeg,jpg或png.'
        });
      },
      //上传图片
      handleBeforeUpload (files) {
        let formData = new FormData()
        formData.append("file", files)
      
        upload(formData).then(res=> {
          if (res.code === 200) {
            this.form.icon = res.imgUrl
            this.$Message.success(res.message);
          } else {
            if(res.message.code){
              this.$Message.error(res.message.code);
            }else{
              this.$Message.error(res.message);
            }
            
          }
        })
        return false
      },
      //提交
      handleSubmit() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            // 编辑
           if(this.form.id) {
              categoryUpdate(this.form).then(res => {
                  if(res.code === 200) {
                    this.$Message.success(res.message);
                    setTimeout(() => {
                      this.$router.push({name: "classifyList"})
                    }, 1500);
                  } else {
                    this.$Message.error(res.message);
                  }
                })
           } else {
              // 新建
              categoryCreate(this.form).then(res => {
                if(res.code === 200) {
                  this.$Message.success(res.message);
                  setTimeout(() => {
                    this.$router.push({name: "classifyList"})
                  }, 1500);
                } else {
                  this.$Message.error(res.message);
                }
              })
            }
          } else {
            this.$Message.warning("请输入必填项");
          }
        })
      },
      //获取详情
      categoryDetail(){
        categoryDetail(this.form.id).then(res => {
          if(res.code === 200) {
            this.form = res.data
          } else {
            this.$Message.error(res.message);
          }
        })
      }

    }
  }
</script>

<style lang="less">
  .classify-createOrupdate-box {
    .form {
      width: 30%;
      padding: 20px;
    }

    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

  }
</style>