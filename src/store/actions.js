export default{
    initTasks({commit}) {
        axios({
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
            temp["image_url"] = temp["good_pictures"]
            // if (i == 1)
            //   temp["status"]=1
        }
        commit("taskList",data)
        console.log(data)
        })
        .catch(error => console.log(error, "error"))
    }
}