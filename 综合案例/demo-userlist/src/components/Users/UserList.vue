<template>
  <div id="app">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="centerDialogVisible = true">添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="dataList" style="width: 100%">
      <!-- 索引项 -->
      <el-table-column type="index" width="50" label="#"></el-table-column>
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="age" label="年龄" ></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
      <el-table-column label="添加时间">
        <template #default="scoped">
          {{ scoped.row.addtime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <router-link :to="'/users/'+row.id" type="el-button primary">
            <el-button  size="mini" type="primary">详情</el-button>
          </router-link>&nbsp;
          <el-button size="mini" type="danger"  @click="delUser(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框提示 -->
    <el-dialog title="添加新用户" :visible.sync="centerDialogVisible" @close="resetForm" width="30%" center>
      <!-- 添加用户的表单  -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="用户头衔" prop="position">
          <el-input v-model="ruleForm.position"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import request from "@/components/utils/request";

export default {
  name: 'UserList',
  created() {
    this.initDataList()
  },
  data(){
    // 自定义验证规则
    let ageValidator = (rule, value, cb) => {
      if(!Number.isInteger(value)) cb(new Error("请输入整数"))
      if(value > 100 || value < 1) cb (new Error("请输入1-100的整数"))
      cb()
    }
    return{
      // 初始化获取的用户数据
      dataList: [],
      // 是否开启对话框
      centerDialogVisible: false,
      // 添加的用户信息
      ruleForm:{
        name: "",
        age: "",
        position: ""
      },
      // 验证规则
      rules:{
        name:[
          { required: true, message: '请输入用户名称', trigger: 'blur' },
        ],
        age:[
          { required: true, message: '请输入用户年龄', trigger: 'blur' },
          { validator: ageValidator, trigger: 'blur'}
        ],
        position:[
          { required: true, message: '请输入用户头衔', trigger: 'blur' },
        ]
      },
    }
  },
  methods:{
    // 初始化数据
    async initDataList(){
      const { data:res } = await this.$http.get("/api/users")
      if(res.status !== 0) return
      this.dataList = res.data
      console.log(res)
    },
    /*添加用户对话框按钮*/
    // 取消按钮--重置表单内容
    resetForm(){
      console.log("ok")
      this.$refs.ruleForm.resetFields()
    },
    // 确定按钮--添加用户信息
    addUser(){
      this.$refs.ruleForm.validate(async valid => {
        // 如果表单验证未通过
        if(!valid) return
        // 获取api接口添加用户信息
        const { data:res } = await this.$http.post("/api/users", this.ruleForm)
        // 添加失败提示
        if(res.status !== 0) return this.$message.error("添加用户失败")
        // 添加成功提示
        this.$message.success("添加用户成功")
        // 关闭对话框
        this.centerDialogVisible = false
        // 初始化数据
        this.initDataList()
      })
    },
    /*表格的按钮*/
    // 删除
    async delUser(id){
      // 弹出对话框
      const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(res !== "confirm") return this.$message.info("点击了取消")
      // 通过删除的api接口删除数据
      const { data } = await this.$http.delete("/api/users/"+id)
      if(data.status !==0 ) return this.$message.error("删除用户失败")
      // 初始化用户数据
      this.initDataList()
      this.$message.success("成功删除文件")
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>

</style>
