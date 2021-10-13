<template>
  <div class="todo-layout">
    <h4 class="title">任务计划列表</h4>
    <el-form ref="form" :model="form" :inline="true" :rules="rules" class="fliter" label-position="left" @submit.prevent>
      <el-form-item style="width: 90%"  label="添加任务: " prop="mission">
        <el-input  v-model="form.mission" size="small" placeholder="请输入任务, 按回车Enter即可添加任务" @keyup.enter="submit('form')" />
      </el-form-item>
    </el-form>

    <el-table class="list" height="80%" :data="list" :header-cell-style="{'text-align':'center'}">
      <el-table-column width="100" align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" label="任务名" prop="mission"></el-table-column>
      <el-table-column align="center" label="状态" prop="status">
        <template #default="scope">
          <el-tag :type="scope.row.status === 0 ? 'warning' : 'success' ">
             {{scope.row.status === 0 ? '待办' : '完成'}} 
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button 
            type="primary"
            size="mini"
            @click="handleSubmit(scope.row)"
            :disabled="scope.row.status === 0 ? false : true"
          >标记完成</el-button>
          <el-button 
            type="danger"
            size="mini"
            @click="handleDelete(scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  emits: ['keyup'],
  name: "todolist",
  data () {
    return {
      form: {
        mission: '',
        status: 0
      },
      list: null,

      rules: {
        mission: [
          {
            required: true,
            message: '请输入任务名称',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.getList()
  },
  watch: {
    list: {
      handler: function() {
        this.save('list', this.list)
      },
      deep: true
    }
  },
  methods: {
    // 存储list到localStorage
    save(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
    },
    // 从localStorage获取list
    fetch(key) {
    return JSON.parse(window.localStorage.getItem(key)) || []
    },
    getList() {
      this.list = this.fetch('list')
    },
    saveList() {
      this.save('list', this.list)
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.list.push(Object.assign({},this.form))
          
          this.$nextTick(() => {
            this.$refs.form.resetFields()
            this.$refs.form.clearValidate()
            })
        }
      })
      
    },

    handleSubmit(row) {
      row.status = 1
    },

    handleDelete(index) {
      this.list.splice(index,1)
    }
  },
}
</script>

<style scoped>
  .todo-layout {
    width: 800px;
    height: 500px;
    padding: 0;
    box-sizing: border-box;
    background-color: blueviolet;
  }

  .todo-layout .title {
    background-color: brown;
    text-align: center;
    color: cornsilk;
    padding: 3px;
    margin: 0;
  }

  .todo-layout .list {
    z-index: 0;
  }

  .todo-layout .fliter {
    width: 100%;
    height: 15%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
  }
  
</style>