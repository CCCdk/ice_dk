<script setup lang="ts">
import { ref,onMounted } from 'vue';
import add from './components/add.vue';
import {get,del} from './http/index'; 
import { ElMessage } from "element-plus";
const searchVal = ref('');
const enterSearch = async() => {
  await load()
};
const load = async() => {
  let data=(await get(searchVal.value)).data
  tableData.value=data
};

onMounted(async()=>{
  await load();
}
)
const openAdd = () => { 
  isShow.value=true;
};
const info=ref({});

const handleEdit = (index:number,row:any) => {
  info.value=row;
  isShow.value=true
  console.log(index);
 };
const handleDelete= async(index:number,row:any) => {
  let msg=(await del(row.Id)).data
  ElMessage.success(msg)
  console.log(index,row) 
};

const tableData =ref([]);
const isShow =ref(false);

const closeAdd=()=>{
  isShow.value=false;
  info.value={}
}

const success =async(message:string)=>{
  isShow.value=false
  info.value={}
  ElMessage.success(message);
  await load()
}


</script>

<template>
  <div class="main">
    <el-row>
      <el-col :span="12">
        <el-input v-model="searchVal" placeholder="请输入要搜索的关键字" class="input-with-select" @keyup.enter="enterSearch">
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="load">查询</el-button>
        <el-button type="primary" @click="openAdd">新增</el-button>
      </el-col>
    </el-row> 
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column type="index" width="50"/>
      <el-table-column prop="BookName" label="名称" width="180"/>
      <el-table-column prop="Author" label="作者" width="180"/>
      <el-table-column prop="TypeName" label="类别"/>
      <el-table-column prop="Remarks" label="备注"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-table-column size="small" @click="handleEdit(scope.$index,scope.row)">Edit</el-table-column>
          <el-table-column size="small" type="danger" @click="handleDelete(scope.$index,scope.row)">Delette</el-table-column>
        </template>
      </el-table-column>
    </el-table>

  </div>
  <add :isShow="isShow" :info="info" @closeAdd="closeAdd" @success="success"></add>
</template>

<style scoped>
.main{
  width: 60%;
  margin: 100px auto;
}
.el-button{
  margin-left: 12px;
}
</style>
