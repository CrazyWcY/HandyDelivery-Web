<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible width=210 :collapsed-width="78" v-model="isCollapsed">
        <Menu
          :active-name="this.$store.state.activeName"
          :open-names="this.$store.state.openNames"
          theme="light"
          width="auto"
          @on-select="menuSelect"
          @on-open-change="changeSubMenu"
          ref="side_menu"
          accordion
          class="sideBar"
          :class="menuitemClasses">
            <MenuItem name="user" class="person">
              <div class="account">
                <img src="https://pic1.zhimg.com/80/v2-ccfdc90c69dce8e0227960b45aa53c02_720w.jpg?source=1940ef5c"
                style="height:40px;width:40px" />
                <span style="margin-left:10px">{{this.$store.state.currUser.name}}</span>
              </div>
            </MenuItem>
            <Submenu name="task">
              <template slot="title"  style="display:flex;flex-direction:row;align-items:center;justify-content:center">
                <i class="iconfont icon-dingdandaifukuan"></i>
                <span>任务池管理</span>
              </template>
              <MenuItem class="sub-title" name="task1" style="padding-left:0px;display:flex;
              align-items:center;justify-content:center;height:48px">
                <span>任务池</span>
                <p style="font-size:8px" v-show="isCollapsed">任务池</p>
              </MenuItem>
            </Submenu>
            <Submenu name="user">
              <template slot="title"  style="display:flex;flex-direction:row;align-items:center;justify-content:center">
                <i  class="iconfont icon-UserSettings"></i>
                <span>用户管理</span>
              </template>
              <MenuItem class="sub-title" name="user1" style="padding-left:0px;display:flex;
              align-items:center;justify-content:center;height:48px">
                <span>用户列表</span>
                <p style="font-size:10px" v-show="isCollapsed">用户列表</p>
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout>
          <!--Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header-->
          <Content :style="{padding: '0 16px 16px'}">
            <div class="route">
              <router-view />
            </div>
          </Content>
        </Layout>
      </Layout>

    </div>
</template>

<script>
  export default {
    data () {
      return {
        isCollapsed: false,
        currUserFlag:true//用户状态，待完善
      };
    },
    methods:{
      menuSelect:function(name){
        if(name==="user"){
          return;
        }
        this.$store.state.activeName = name
        this.$router.push({ path: '/' + this.$store.state.openNames[0] + '/'+ name })
      },
      changeSubMenu:function(name){
        if(name.length==1){
          this.$store.state.openNames = name;
        }
      },
      logOutAccount:function(){},
      changeAccount:function(){}
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : '',
        ]
      }
    },
    mounted(){
      //页面刷新时手动更新menu中的选项
      this.$store.state.openNames = []
      this.$store.state.openNames.push(this.$route.path.slice(1).split("/")[0])
      this.$store.state.activeName = this.$route.path.slice(1).split("/").length===2?this.$route.path.slice(1).split("/")[1]:"task1"
      if(this.$route.path.slice(1).split("/").length===2){
        if(this.$route.path.slice(1).split("/")[0]==="users" && this.$route.path.slice(1).split("/")[1]==="detail"){
          this.$store.state.activeName = "users1"
        }
        else if(this.$route.path.slice(1).split("/")[0]==="task" && this.$route.path.slice(1).split("/")[1]==="detail"){
          this.$store.state.activeName = "task1"
        }
      }
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      })
    }
  }
</script>

<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }

    .sideBar{
      overflow-y: auto;
      height: 100%;
    }

    .ivu-menu-vertical .ivu-menu-item{
      padding-left: 14px;
      padding-right: 14px;
      padding-top: 14px;
      padding-bottom:8px
    }



    .ivu-menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 140px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
        text-align:center;
        font-size:17px;
    }

   .ivu-menu-submenu-title span{
        display: inline-block;
        overflow: hidden;
        width: 100px;
        vertical-align: middle;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
        text-align:center;
        font-size:18px;
    }

    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 20px;
    }

    .menuitem-font{
      padding-left:0px;
      display:flex;
      align-items:center;
      justify-content:center;
      height:48px;
    }



    .person:hover .change-account {
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .person:hover .collapsed-change-account{
      flex-direction:column;
    }

    .person .change-account {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(73, 80, 96, 0.8);
        display: none;
    }
    .change-account button {
        margin: 5px;
    }

    .account {
      display: flex;
      align-items: center;
    }

    .collapsed-account{
      display: flex;
      justify-content:center;
      flex-direction:column;
      align-items:center
    }

    .collapsed-menu span{
        height:0px;
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 30px;
    }


    .route{
      width: 100%;
      height: 100%;
      background-color: #f8f8f9;
      padding: 0 10px;
      overflow-y: auto;
    }

</style>
