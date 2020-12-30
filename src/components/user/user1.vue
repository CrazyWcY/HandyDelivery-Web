<template>
  <div class="task" style="padding-top:20px">
    <Tabs type="card" @on-click="changeTab">
      <TabPane label="所有用户" name="allTab">
        <Table
         :columns="allTab"
         :data="userList"
        ></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'user1',
  data () {
    return {
      currPage: 1,
      tabChosen:"allTab",
      users: [],
      allTab:[
        {
          title:'用户名称',
          key:'name',
          align:'center'
          // width:'140px',
        },
        {
          title:'地址',
          // width:'150px',
          key:'address',
          align:'center'
        },
        {
          title:'收件数',
          key:'receiveNum',
          // width:'150px',
          align:'center',
          sortable:true
        },
        {
          title:'发件数',
          key:'sendNum',
          // width:'120px',
          align:'center',
          sortable:true
        },
        {
          title:"好评数",
          key:'star',
          // width:'80px',
          align:'center',
          sortable:true
        },
        {
          title:'操作',
          align: 'center',
          // width: '200px',
          render:(h,params)=>{
            return h('div',
            {
                attrs:{
                style:"height:70px;width:200px;display:flex;flex-direction:row;align-items:center;justify-content:center"
                }
            },
            [
            h('Button',{
                attrs:{
                style:"margin-left:10px;width:80px;font-size:13px"
                },
                props:{
                ghost:true,
                type:"error",
                icon:'md-close'
                },
                on:{
                    click:()=>{
                        console.log(params.row.id)
                        this.userList.splice(params.index,1)
                        //以下发送一个请求
                    }
                }
            },'删除')
            ])
          }
        }
      ],
    }
  },

  methods:{
    changeTab(name){
      this.currPage = 1;
      this.tabChosen = name
    }
  },
  computed:{
    userList:function(){
      return this.$store.state.userList;
    },
  },
  mounted(){
    console.log(this.$store.state.userList)
    this.$axios({
      method: "get",
      url: '/getAllUsers',
    })
    .then(response => {
      console.log(response, "success")
      let data = response.data.data
      console.log(data)
      this.$store.state.userList = data
    })
    .catch(error => console.log(error, "error"))
  }

}
</script>

<style>
.ivu-table-tip{
  overflow-x:hidden
}

.ivu-table-cell{
  padding-left:0px;
  padding-right:0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  box-sizing: border-box;
  font-size:15px
}

.ivu-table-overflowX{
  overflow-x:hidden
}

.ivu-tabs-bar{
  margin-bottom:0px;
}
</style>
