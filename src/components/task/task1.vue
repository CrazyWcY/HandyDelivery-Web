<template>
  <div class="task" style="padding-top:20px">
    <Tabs type="card" @on-click="changeTab">
      <TabPane label="公共任务池" name="allTab">
        <Table
         :columns="allTab"
         :data="taskList"
        ></Table>
      </TabPane>
      <TabPane label="专属任务池" name="privateTab">
        <Table
         :columns="privateTab"
         :data="taskList"
        ></Table>
      </TabPane>
    </Tabs>
    <Modal
      title="物流信息"
      v-model="modalShow"
      style="color:#fe5400">
        <p>送货人：{{deliver}}</p>
        <p>购买人：{{purchaser}}</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'task1',
  data () {
    return {
      currPage: 1,
      deliver:"",
      purchaser:"",
      tabChosen:"allTab",
      modalShow:false,
      logistics:"",
      logisticsEnterprise:"",
      taskPool:this.$store.state.taskList,
      allTab:[
        {
          title:" ",
          // width:'120px',
          align:'center',
          render:(h,params)=>{
            return h('div',
              {
                attrs:{
                  style:"padding-left:20px;height:70px;width:100px;display:flex;align-items:center;justify-content:center;"
                }
              },
              [
                h("img", {
                  on:{
                    click:()=>{
                      this.$router.push({ path: '/task/detail',query:{ task:params.row, tabChosen:"allTab" } })
                    }
                  },
                  attrs: {
                    src: params.row.image_url,
                    style: "height:70px;width: 70px;border-radius: 2px;cursor:pointer"
                  }
                })
              ]
              )
          }
        },
        {
          title:'任务名称',
          key:'p_title',
          // width:'140px',
          render:(h,params)=>{
            return h("div", [
              h(
                "div",
                {
                  style: {
                    color: "#2d8cf0",
                    fontSize:"15px"
                  },

                },
                params.row.title
              )
            ])
          }
        },
        {
          title:'交货地点',
          // width:'150px',
          key:'destination',
          align:'center'
        },
        {
          title:'截止日期',
          key:'deadline',
          // width:'150px',
          align:'center',
          sortable:true
        },
        {
          title:'手机',
          key:'phone',
          // width:'120px',
          align:'center',
          sortable:true
        },
        {
          title:"订单状态",
          key:'status',
          // width:'80px',
          align:'center',
          render:(h,params)=>{
            if(params.row.status==0){
              return h('div',{
                attrs:{
                  style:"color:gray;font-weight:600;cursor:pointer"
                }
              },"待接单")
            }
            else if(params.row.status==1){
              return h('div',{
                attrs:{
                  style:"color:#B0e063;font-weight:600;cursor:pointer"
                },
                on:{
                  click:()=>{
                    this.modalShow = true
                    this.deliver = params.row.deliver
                    this.purchaser = params.row.purchaser
                  },
                }
              },"待发货")
            }
            else if(params.row.status==2){
              return h('div',{
                attrs:{
                  style:"color:#1AAC19;font-weight:600;cursor:pointer"
                },
                on:{
                  click:()=>{
                    this.modalShow = true
                    this.deliver = params.row.deliver
                    this.purchaser = params.row.purchaser
                  },
                }
              },"待送出")
            }
            else if(params.row.status==3){
              return h('div',{
                attrs:{
                  style:"color:#7DDEF0;font-weight:600;cursor:pointer"
                },
                on:{
                  click:()=>{
                    this.modalShow = true
                    this.deliver = params.row.deliver
                    this.purchaser = params.row.purchaser
                  },
                }
              },"待评价")
            }
            else {
              return h('div',{
                attrs:{
                  style:"color:blue;font-weight:600;cursor:pointer"
                },
                on:{
                  click:()=>{
                    this.modalShow = true
                    this.deliver = params.row.deliver
                    this.purchaser = params.row.purchaser
                  },
                }
              },"已完成")
            }
          }
        },
        {
          title:'操作',
          align: 'center',
          // width: '200px',
          render:(h,params)=>{
            if(params.row.status!=="待发货"){
              return h('div',
                {
                  attrs:{
                    style:"height:70px;width:200px;display:flex;flex-direction:row;align-items:center;justify-content:center"
                  }
                },
                [
                h('Button',{
                  attrs:{
                    style:"width:80px;font-size:13px"
                  },
                  props:{
                    icon:'ios-paper-outline',
                  },
                  on:{
                    click:()=>{
                      this.$router.push({ path: '/task/detail',query:{ task:params.row,id:params.row.id,tabChosen:"allTab" } })
                    }
                  }
                },'详情'),
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
                      this.taskList.splice(params.index,1)
                      //以下发送一个请求
                    }
                  }
                },'删除')
              ])
            }
            else{
              return h('div',
                {
                  attrs:{
                    style:"width:200px;display:flex;flex-direction:row;align-items:center;justify-content:center"
                  }
                },
                [
                h('Button',{
                  attrs:{
                    style:"width:80px;font-size:13px"
                  },
                  props:{
                    type:"success",
                    icon:'ios-send-outline',
                  },
                  on:{
                    click:()=>{
                      this.$Modal.confirm({
                        render: (h) =>{
                          return h('Input', {
                            props: {
                              autofocus: true,
                              placeholder: '请输入物流单号',
                            },
                            on: {
                              input: (val) => {
                                this.logisticsInput = val
                              }
                            }
                          })
                        },
                        onOk:()=>{
                          this.$store.state.taskList[params.index].status="待收货";
                        }
                      });
                    }
                  }
                },'发货')
              ])
            }
          }
        }
      ],
      privateTab:[
        {
          title:" ",
          // width:'120px',
          align:'center',
          render:(h,params)=>{
            return h('div',
              {
                attrs:{
                  style:"padding-left:20px;height:70px;width:100px;display:flex;align-items:center;justify-content:center;"
                }
              },
              [
                h("img", {
                  on:{
                    click:()=>{
                      this.$router.push({ path: '/task/detail',query:{ task:params.row, tabChosen:"allTab" } })
                    }
                  },
                  attrs: {
                    src: params.row.image_url,
                    style: "height:70px;width: 70px;border-radius: 2px;cursor:pointer"
                  }
                })
              ]
              )
          }
        },
        {
          title:'任务名称',
          key:'p_title',
          // width:'140px',
          render:(h,params)=>{
            return h("div", [
              h(
                "div",
                {
                  style: {
                    color: "#2d8cf0",
                    fontSize:"15px"
                  },

                },
                params.row.title
              )
            ])
          }
        },
        {
          title:'交货地点',
          // width:'150px',
          key:'destination',
          align:'center'
        },
        {
          title:'截止日期',
          key:'deadline',
          // width:'150px',
          align:'center',
          sortable:true
        },
        {
          title:'手机',
          key:'phone',
          // width:'120px',
          align:'center',
          sortable:true
        },
        {
          title:"订单状态",
          key:'status',
          // width:'80px',
          align:'center',
          render:(h,params)=>{
            if(params.row.status==0){
              return h('div',{
                attrs:{
                  style:"color:gray;font-weight:600;cursor:pointer"
                }
              },"待接单")
            }
            else if(params.row.status==1){
              return h('div',{
                attrs:{
                  style:"color:#B0e063;font-weight:600;cursor:pointer"
                },
                on:{
                  click:()=>{
                    this.modalShow = true
                    this.deliver = params.row.deliver
                    this.purchaser = params.row.purchaser
                  },
                }
              },"待发货")
            }
            else if(params.row.status==2){
              return h('div',{
                attrs:{
                  style:"color:#1AAC19;font-weight:600;cursor:pointer"
                },
                on:{
                  click:()=>{
                    this.modalShow = true
                    this.deliver = params.row.deliver
                    this.purchaser = params.row.purchaser
                  },
                }
              },"待送出")
            }
            else if(params.row.status==3){
              return h('div',{
                attrs:{
                  style:"color:#7DDEF0;font-weight:600;cursor:pointer"
                },
                on:{
                  click:()=>{
                    this.modalShow = true
                    this.deliver = params.row.deliver
                    this.purchaser = params.row.purchaser
                  },
                }
              },"待评价")
            }
            else {
              return h('div',{
                attrs:{
                  style:"color:blue;font-weight:600;cursor:pointer"
                },
                on:{
                  click:()=>{
                    this.modalShow = true
                    this.deliver = params.row.deliver
                    this.purchaser = params.row.purchaser
                  },
                }
              },"已完成")
            }
          }
        },
        {
          title:'操作',
          align: 'center',
          // width: '200px',
          render:(h,params)=>{
            if(params.row.status!=="待发货"){
              return h('div',
                {
                  attrs:{
                    style:"height:70px;width:200px;display:flex;flex-direction:row;align-items:center;justify-content:center"
                  }
                },
                [
                h('Button',{
                  attrs:{
                    style:"width:80px;font-size:13px"
                  },
                  props:{
                    icon:'ios-paper-outline',
                  },
                  on:{
                    click:()=>{
                      this.$router.push({ path: '/task/detail',query:{ task:params.row,id:params.row.id,tabChosen:"allTab" } })
                    }
                  }
                },'详情'),
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
                      this.taskList.splice(params.index,1)
                      //以下发送一个请求
                    }
                  }
                },'删除')
              ])
            }
            else{
              return h('div',
                {
                  attrs:{
                    style:"width:200px;display:flex;flex-direction:row;align-items:center;justify-content:center"
                  }
                },
                [
                h('Button',{
                  attrs:{
                    style:"width:80px;font-size:13px"
                  },
                  props:{
                    type:"success",
                    icon:'ios-send-outline',
                  },
                  on:{
                    click:()=>{
                      this.$Modal.confirm({
                        render: (h) =>{
                          return h('Input', {
                            props: {
                              autofocus: true,
                              placeholder: '请输入物流单号',
                            },
                            on: {
                              input: (val) => {
                                this.logisticsInput = val
                              }
                            }
                          })
                        },
                        onOk:()=>{
                          this.$store.state.taskList[params.index].status="待收货";
                        }
                      });
                    }
                  }
                },'发货')
              ])
            }
          }
        }
      ],
    }
  },

  methods:{
    changeTab(name){
      this.currPage = 1;
      this.tabChosen = name
      this.$store.commit('selectTasks',name)
    }
  },
  computed:{
    taskList:function(){
      return this.$store.state.selectedTasks;
    },
  },
  mounted(){
    this.$axios({
      method: "get",
      url: '/getAllTasks',
    })
    .then(response => {
      console.log(response, "success")
      let data = response.data.data
      for (let i = 0; i < data.length; ++i){
        let temp = data[i]
        temp["money"] = temp["p_money"]
        delete temp["p_money"]
        temp["destination"] = temp["d_destination"]["name"]
        delete temp["d_destination"]
        temp["title"] = temp["p_title"]
        delete temp["p_title"]
        temp["image_url"] = temp["good_pictures"][0]
        // if (i == 1)
        //   temp["status"]=1
      }
      this.$store.state.selectedTasks = data
      this.$store.state.taskList = data
      console.log(this.$store.state.taskList)
    })
    .catch(error => console.log(error, "error"))
    this.$store.commit('selectTasks',this.tabChosen)

    this.$axios({
      method: "get",
      url: '/getSpecialTasks',
    })
    .then(response => {
      console.log(response, "success")
      let data = response.data.data
      for (let i = 0; i < data.length; ++i){
        let temp = data[i]
        temp["money"] = temp["p_money"]
        delete temp["p_money"]
        temp["destination"] = temp["d_destination"]["name"]
        delete temp["d_destination"]
        temp["title"] = temp["p_title"]
        delete temp["p_title"]
        temp["image_url"] = temp["good_pictures"][0]
        // if (i == 1)
        //   temp["status"]=1
      }
      console.log(data)
      this.$store.state.specialTaskList = data
      console.log(this.$store.state.specialTaskList)
    })
    .catch(error => console.log(error, "error"))
    this.$store.commit('selectTasks',this.tabChosen)
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
