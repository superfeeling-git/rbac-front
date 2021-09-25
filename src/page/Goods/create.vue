<template>
    <div>
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="分类选择" prop="name">
                <el-cascader
                    v-model="value"
                    :options="options"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称" prop="GoodsName">
                <el-input v-model="ruleForm.GoodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="GoodsPrice">
                <el-input-number
                    v-model="ruleForm.GoodsPrice"
                ></el-input-number>
            </el-form-item>
            <el-form-item label="商品图片" prop="GoodsPic">
                <el-upload
                    class="avatar-uploader"
                    :action="UploadFile"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="活动时间" required>
                <el-form-item prop="CreateTime">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.CreateTime"
                        style="width: 100%"
                    ></el-date-picker>
                </el-form-item>
            </el-form-item>
            <el-form-item label="商品介绍" prop="Details">
                <div id="Details"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >立即创建</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
import { baseUrl } from "../../util/config";
import E from "wangeditor";

export default {
    data() {
        return {
            UploadFile: `${baseUrl}/Goods/UploadPic`,
            GoodsDesc: "",
            dialogImageUrl: "",
            dialogVisible: false,
            imageUrl: "",
            editor: null,
            ruleForm: {
                CategoryId: 0,
                GoodsName: "",
                GoodsPrice: "",
                GoodsPic: "",
                CreateTime: "",
                Details: "",
            },
            rules: {
                GoodsName: [
                    {
                        required: true,
                        message: "请输入商品名称",
                        trigger: "blur",
                    },
                ],
                CreateTime: [
                    {
                        type: "date",
                        required: true,
                        message: "请选择日期",
                        trigger: "change",
                    },
                ],
            },
            value: [],
            options: [],
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.Details = this.editor.txt.html();
                    axios.post("/goods/create", this.ruleForm).then((res) => {
                        this.$message({
                            message: "商品添加成功",
                            type: "success",
                            onClose: () => {
                                this.imageUrl = null; //上传图片
                                this.editor.txt.clear(); //富文本
                                this.value = [];
                                this.$refs[formName].resetFields();
                            },
                        });
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleChange(value) {
            this.ruleForm.CategoryId = value.slice(-1)[0];
        },
        handleAvatarSuccess(res, file) {
            this.ruleForm.GoodsPic = res.fileName;
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
    },
    mounted() {
        axios.get("/GoodsCategory/GetList").then((res) => {
            var reg = new RegExp('\\,"children":\\[]', "g");
            this.options = this.areaData = JSON.parse(
                JSON.stringify(res.data).replace(reg, "")
            );
        });

        const editor = new E("#Details");
        editor.create();
        this.editor = editor;
    },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.w-e-menu {
    z-index: 2 !important;
}
.w-e-text-container,
.w-e-toolbar {
    z-index: 1 !important;
}
</style>