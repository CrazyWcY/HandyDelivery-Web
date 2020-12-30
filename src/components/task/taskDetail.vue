<template>
  <div>
    <Row>
      <Col :sm="{ span: 18, offset: 1 }" :md="{ span: 18, offset: 1 }" :lg="{ span: 18, offset: 1 }">
            <div style="border-bottom:2px solid #e6e6e6;height:48px;">
              <div style="border-bottom:2px solid #57a3f3;color:#57a3f3;width:100px;height:47px;font-size:17px;text-align:center;display:flex;flex-direction:column-reverse;padding-bottom:1px">
                订单详情
              </div>
            </div>
            <div class="form-container">
              <div class="form-form">
                <Row class="form-row">
                  <Col class="row-left" span="3">
                    发起日期:
                  </Col>
                  <Col span="18">
                    {{task.time}}
                  </Col>
                </Row>
                <Row class="form-row">
                  <Col class="row-left" span="3">
                    商品名称:
                  </Col>
                  <Col span="18">
                    {{task.good}}
                  </Col>
                </Row>
                <Row class="form-row">
                  <Col class="row-left" span="3">
                    具体需求:
                  </Col>
                  <Col span="18">
                    {{task.details}}
                  </Col>
                </Row>
                <Row class="form-row">
                  <Col class="row-left" span="3">
                    客户名称:
                  </Col>
                  <Col span="18">
                    {{task.author["name"]}}
                  </Col>
                </Row>
                <Row class="form-row">
                  <Col class="row-left" span="3">
                    客户电话:
                  </Col>
                  <Col span="18">
                    {{task.phone}}
                  </Col>
                </Row>
                <Row class="form-row">
                  <Col class="row-left" span="3">
                    商品照片:
                  </Col>
                  <Col span="18">
                    <img :src="task.image_url" style="height:200px;width:200px;border-radius:2px;cursor:pointer"/>
                  </Col>
                </Row>
                <Row class="form-row">
                  <Col class="row-left" span="3">
                    当前阶段:
                  </Col>
                  <Col span="18">
                    <div style="padding-left:20px" v-show="task.status!=='待发货'">
                      <Steps direction="vertical">
                          <Step v-if="task.status>0" status="finish" title="已接单"></Step>
                          <Step v-else-if="task.status==0" status="process" title="待接单"></Step>
                          <Step v-if="task.status>1" status="finish" title="已发货"></Step>
                          <Step v-else-if="task.status==1" status="process" title="待发货"></Step>
                          <Step v-if="task.status>2" status="finish" title="已送出"></Step>
                          <Step v-else-if="task.status==2" title="待送出"></Step>
                          <Step v-if="task.status>3" status="finish" title="已接单"></Step>
                          <Step v-else-if="task.status==3" status="process" title="待接单"></Step>
                          <Step v-if="task.status>4" status="finish" title="已完成"></Step>
                          <Step v-else-if="task.status==4" status="process" title="待评价"></Step>
                      </Steps>
                    </div>
                  </Col>
                </Row>
                <div style="width:100%;display:flex;align-items:center;justify-content:center;margin-top:40px;margin-bottom:40px">
                  <Button @click="returnToList" ghost type="primary">返回列表</Button>
                </div>
              </div>
            </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'taskDetail',
  data () {
    return {
      coding:"",
      tabChosen:"",
      task:{},
      logisticsInput:"",
      logisticsLookup: false,
    }
  },
  mounted(){
    this.task = this.$route.query.task
    console.log(this.task)
    this.task.logisticsInfo="已由上海交通大学光彪楼北侧菜鸟驿站签收",
    this.id = this.$route.query.id
    this.tabChosen = this.$route.query.tabChosen
  },
  methods:{
    handleLookup(){
      this.logisticsLookup = true
    },
    closeLookup(){
      this.logisticsLookup = false
    },
    returnToList(){
      this.$router.go(-1)
    },
    handleEnsure() {
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
          console.log(this.logisticsInput)
          const msg = this.$Message.loading({
            content: 'Loading...',
            duration: 0,
          });
          setTimeout(msg, 3000);
        }
      });
    },
  }
}
</script>

<style scoped>
.form-container{
  margin-top:20px;
  border:1px solid #e6e6e6;
  background:#ffffff;
  margin-bottom:50px
}

.form-form{
  margin-top:20px;
  padding-right:20px;
}

.form-row{
  font-size:16px;
  margin-bottom:15px
}

.form-row .row-left{
  padding-right:15px;
  display:flex;
  flex-direction:row-reverse
}

</style>
