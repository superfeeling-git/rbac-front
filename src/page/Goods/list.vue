<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="分类选择">
                <el-cascader
                    v-model="value"
                    :options="options"
                    @change="handleChange"
                    clearable
                ></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称关键字">
                <el-input v-model="formInline.GoodsName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="danger" @click="BulkDelete"
                    >批量删除</el-button
                >
            </el-form-item>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="categoryName" label="商品分类" width="120">
            </el-table-column>
            <el-table-column label="商品名称" width="120">
                <template slot-scope="scope">{{
                    scope.row.goodsName
                }}</template>
            </el-table-column>
            <el-table-column prop="goodsPrice" label="商品数量" width="120">
            </el-table-column>
            <el-table-column
                prop="goodsPic"
                label="商品图片"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="添加时间"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="createByName"
                label="添加人"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
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
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            class="page"
            @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
import http from "../../util/httpreq";

export default {
    data() {
        return {
            total: 0,
            tableData: [],
            value: [],
            options: [],
            formInline: {
                GoodsName: "",
                CategoryId: 0,
            },
        };
    },
    methods: {
        BulkDelete() {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    axios
                        .post("/goods/BulkDelete", this.multipleSelection)
                        .then((m) => {
                            this.fetch();

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
            console.log(this.multipleSelection);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleCurrentChange(val) {
            this.fetch({ PageIndex: val });
        },
        handleEdit(index, row) {
            //query传参方式,如果提供了 path，params 会被忽略
            this.$router.push({
                path: "/Goods/Edit",
                query: { id: row.goodsID },
            });

            //也可以直接拼接
            //this.$router.push(`/Goods/Edit?id=${row.goodsID}`)

            //params传参方式
            //this.$router.push({ name: 'goodsEdit', params: { id: row.goodsID }})
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleChange(value) {
            this.formInline.CategoryId = value.slice(-1)[0];
        },
        onSubmit() {
            this.fetch(this.formInline);
        },
        fetch(params) {
            http("/Goods/PageList", params).then((res) => {
                this.total = res.data.item1;
                this.tableData = res.data.item2;
            });
        },
    },
    mounted() {
        this.fetch();

        http("/GoodsCategory/GetList").then((res) => {
            var reg = new RegExp('\\,"children":\\[]', "g");
            this.options = this.areaData = JSON.parse(
                JSON.stringify(res.data).replace(reg, "")
            );
        });
    },
};
</script>

<style>
.page {
    text-align: center;
    margin: 0 auto;
    margin-top: 2em;
}
</style>