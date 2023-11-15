window.addEventListener("load",start);
const API =  "http://localhost:3000/posts"
const render =  document.getElementById("render")
let users = [];


 async function start() {
   await fetch_api ()
   render_api(users)
   create_api()
   delete_api()
}

async function fetch_api (){
    const response = await fetch(API);
    users =  await response.json()
    console.log(users);
}

function render_api(data) {
    render.innerHTML = data.map(item =>{
        return `
        <tr >
                    <td >${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.author}</td>
                    <td>${item.age}</td>
                    <td>
                        <button data-id ="${item.id}" class="btn btn_dl btn-danger btn-sm">xóa</button>
                        <button data-id ="${item.id}" class="btn btn-primary btn-sm">sửa</button>
                    </td>
        `
    }).join("")
}

function create_api (){
 const title =  document.getElementById("title")
 const author =  document.getElementById("author")
 const age =  document.getElementById("age")
 const btn =  document.getElementById("btn")
 btn.addEventListener("click", async()=>{
 
    if(title.value === "" || author.value === "" || age.value ===""){
        alert("không được để trống ")
    }
    else{

        const newdata ={
            title : title.value,
            author : author.value,
            age : age.value

        }
    
        const method ={
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(newdata)
        }

        fetch(API,method)
        await fetch_api()
       render_api(users)
    }

 })
}

function delete_api(){
    const button_dl = document.querySelectorAll(".btn_dl")
    for(let btn_dl of button_dl){
        let id = btn_dl.dataset.id ;
    
        btn_dl.addEventListener("click",async() => {
            const is_confirmed = confirm("Bạn có chắc xóa sp này không")
            if(is_confirmed){
            const method = {
                method: "DELETE",
            }

           fetch(`${API}/${id}`,method)
           render_api(users)
           alert("bạn đã xóa thành công")
            }
        })
    }
}