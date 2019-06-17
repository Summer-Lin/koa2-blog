<template>
  <div class="classify-box">
    <title-box>
      <span slot="title">分类列表</span>

      <Button type="primary" slot="rightBtn" size="small" @click="$router.push({name: 'classifyCreate'})">添加分类</Button>

    </title-box>
    <Table border :columns="table.cols" :data="table.data"></Table>
  </div>
</template>

<script>
  import titleBox from "@/pages/backend/components/titleBox.vue"
  import {
    getCategoryList,
    categoryDelete
  } from "@/api/backend/index"

  export default {
    components: {
      titleBox
    },
    data() {
      return {
        table: {
          data: [],
          cols: [{
              type: 'index',
              width: 60,
              align: 'center'
            },
            {
              title: '分类名称',
              key: 'name'
            },
            {
              title: '图标',
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('img', {
                    attrs: {
                      src: params.row.icon,
                    },
                    style: {
                      maxWidth: '35px'
                    }
                  }),

                ]);
              }
            },
            {
              title: '父分类',
              key: 'parent_id'
            },
            {
              title: '层级',
              key: 'z_index'
            },
            {
              title: 'Action',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.$router.push({name: 'classifyEdit',query: {id:params.row.id}})
                      }
                    }
                  }, '编辑'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row.id)
                      }
                    }
                  }, '删除')
                ]);
              }
            }
          ]
        }
      }

    },
    created() {
      this.getCategoryList()
    },

    methods: {
      getCategoryList() {
        getCategoryList().then(res => {
          if (res.code === 200) {
            this.table.data = res.data
          } else {
            this.$Message.error(res.message)
          }
        })
      },
      //删除分类
      remove(id){
        console.log(id)
        this.$Modal.confirm({
          title: "删除",
          content: `<p>是否确认删除</p>`,
          onOk: () => {
            categoryDelete(id).then(res => {
              if (res.code === 200) {
                this.$Message.success(res.message)
                this.getCategoryList()
              } else {
                this.$Message.error(res.message)
              }
            })
          }
        })
      },
      edit(id){
        categoryDetail(id).then(res => {
         
        })
      }
    }
  }

</script>

<style lang="less">
  .classify-box {}

</style>
