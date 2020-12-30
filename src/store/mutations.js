
export default {
    getData (state, data) {
        state[data.name] = data.result;
    },
    // 设置当前用户
    setCurrUser (state, user) {
        state.currUser = user;
    },
    // 当前用户退出登录
    logoutAccount (state) {
        state.currUser = {
            name: '未登录',
            avatar: ''
        };
    },

    initTasks(state, obj) {
      state.taskList = obj;
    },

    selectTasks(state,select){
      switch (select) {
        case "allTab":
            state.selectedTasks = state.taskList
          break;
        case "privateTab":
            state.selectedTasks = state.specialTaskList
          break;
        default:

      }
    },
    

}
