export default {
  activeName:"",
  openNames:[],

  // 当前用户
  currUser: {
    name: 'ROOT',
    avatar: ''
  },

  serviceUrl: 'http://127.0.0.1:5000',

  taskList:[],

  selectedTasks:[],

  userList:[
    {
    "id": "root",
    "name": "WCY",
    "signature": "胡博头号粉丝",
    "avatar": "https://www.gx8899.com/uploads/allimg/2016062815/yddciyonaq3.jpg",
    "friends": ['hjh', 'lxr', 'lh', 'wyx', 'csd'],
    "address": "上海交通大学软件学院",
    "receiveNum": 124,
    "sendNum": 523,
    "star": 608
    },{
      "id": "hjh",
      "name": "HJH",
      "signature": "胡博本人",
      "avatar": "https://tse2-mm.cn.bing.net/th/id/OIP.vRY1U0-rSP2pXM-5qIQIuAAAAA?pid=Api&rs=1",
      "friends": ['root', 'lxr', 'lh'],
      "address": "上海交通大学软件学院",
      "receiveNum": 124,
      "sendNum": 523,
      "star": 608
    },{
      "id": "lxr",
      "name": "LXR",
      "signature": "胡博二号粉丝",
      "avatar": "https://www.keaidian.com/uploads/allimg/180927/co1P92F95035-0-9.jpg",
      "friends": ['root', 'hjh', 'lh'],
      "address": "上海交通大学软件学院",
      "receiveNum": 124,
      "sendNum": 523,
      "star": 608
    },{
      "id": "lh",
      "name": "HUGE",
      "signature": "情商单位",
      "avatar": "http://ist.sjtu.edu.cn/getpic/20200907140708090_lihu.png",
      "friends": ['root', 'hjh', 'lxr'],
      "address": "上海交通大学软件学院",
      "receiveNum": 124,
      "sendNum": 523,
      "star": 608
    },{
      "id": "wyx",
      "name": "真·王博",
      "signature": "IST之光",
      "avatar": "http://ist.sjtu.edu.cn/getpic/20200907142605254_wangyuxiao.png",
      "friends": ['root', 'hjh', 'lxr'],
      "address": "上海交通大学软件学院",
      "receiveNum": 124,
      "sendNum": 523,
      "star": 608
    },{
      "id": "csd",
      "name": "真·蔡少",
      "signature": "屏东之光",
      "avatar": "http://ist.sjtu.edu.cn/getpic/20200907154122023_caishengdong.png",
      "friends": ['root', 'hjh', 'lxr'],
      "address": "上海交通大学软件学院",
      "receiveNum": 124,
      "sendNum": 523,
      "star": 608
    }
  ],

  filterGoodsList: [],


}
