<template>
  <div id="app">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.back()">返回</el-button>
      </div>
      <div class="text item">
        <p>{{'名称:' + userInfo.name }}</p>
        <p>{{'年龄:' + userInfo.age }}</p>
        <p>{{'头衔:' + userInfo.position}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "@/components/utils/request.js";
export default {
  name: 'UserDetail',
  props:["id"],
  data(){
    return{
      userInfo:[]
    }
  },
  methods:{
    async initUserInfo(){
      const { data:res } = await this.$http.get("/api/users/"+this.id)
      if(res.status !==0 ) return this.$message.error("获取用户信息失败")
      this.userInfo = res.data
      console.log(res)
    }
  },
  created() {
    this.initUserInfo()
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
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
  clear: both
}

.box-card {
  width: 480px;
}
</style>
