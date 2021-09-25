<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="subnav">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
                {{menuname}}
            </el-breadcrumb-item>
          </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props:{
        menuname:{
            type:String
        }
    }
}
</script>