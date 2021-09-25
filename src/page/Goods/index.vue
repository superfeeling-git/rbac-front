<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="menuID" label="菜单ID" width="180">
      </el-table-column>
      <el-table-column prop="menuName" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="menuLink" label="菜单链接" :formatter="formatData">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "../../util/config";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    formatData(row, column, cellValue, index) {
      return row.menuLink != undefined ? row.menuLink : "-";
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.get("/SysMenu/Delete?id=" + row.menuID).then((res) => {
            //数据表格刷新
            this.tableData = this.tableData.filter((o) => {
              return o.menuID != row.menuID;
            });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async query() {
      //method1执行完成后执行method2
      await this.method1();
      await this.method2();
    },
    //必须返回一个Promise
    method1() {
      return new Promise((resolve, reject) => {
        console.log(1);
        axios.post("/SysMenu/QueryMenu", {}).then((res) => {
          console.log(2);
          this.tableData = res.data;
          resolve();
        });
      });
    },
    //必须返回一个Promise
    method2() {
      return new Promise((resolve, reject) => {
        console.log(3);
        axios.post("/SysMenu/QueryMenu", {}).then((res) => {
          console.log(4);
          this.tableData = res.data;
          resolve();
        });
      });
    },
  },
  mounted() {},
};
</script>