<template>
  <div>
    <el-container>
      <el-header>
        <el-col :span="6" class="sysName" :offset="1"> 弘石MIS系统 </el-col>
        <el-col :span="6" :offset="11">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-message"
            circle
            size="mini"
          ></el-button>
        </el-col>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#197379"
            text-color="#fff"
            active-text-color="#ffd04b"
            ref="asideMenu"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item
                index="1-1"
                @click="openMenu('/goods/create', '商品添加')"
                >商品添加</el-menu-item
              >
              <el-menu-item
                index="1-1"
                @click="openMenu('/goods/list', '商品管理')"
                >商品管理</el-menu-item
              >
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <sub-nav :menuname="menuname"></sub-nav>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import subNav from "../components/subnav.vue";

export default {
  components: {
    subNav,
  },
  data() {
    return {
      menuname: ''
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openMenu(linkurl, menuname) {
      this.menuname = menuname;
      this.$router.push(linkurl);
    },
  },
  mounted() {
    //this.$refs.asideMenu.uniqueOpened = true;
    this.$refs.asideMenu.open(1);
  },
};
</script>


<style>
.subnav {
  border-bottom: 1px solid rgb(219, 213, 213);
  padding-bottom: 26px;
  margin-bottom: 26px;
}

.el-form{
    width: 80%;
}

.sysName {
  font-size: 21px;
  font-weight: bold;
  text-align: left;
  color: #fff;
}
.el-submenu__title i,
.el-menu-item i {
  color: #fff;
}
.el-submenu,
.el-menu-item {
  text-align: left;
  width: 200px;
}
.el-header {
  background-color: #197379;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #197379;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  height: calc(100vh);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>