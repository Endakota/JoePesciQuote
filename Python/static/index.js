let generateBtn = document.getElementsByClassName("generate")[0]
let collectBtn = document.getElementsByClassName("collect")[0]

let copy2Par = document.getElementById("copyPar")
let copy2Ser = document.getElementById("copySer")
let confirm = document.getElementById("confirm")

confirm.addEventListener("click",()=>{
    document.getElementById("res").value = JSON.parse(document.getElementById("result").innerText)
})
copy2Par.addEventListener("click", ()=>{
    document.getElementsByClassName("paral")[0].innerText = document.getElementById("result").innerText
})
copy2Ser.addEventListener("click", ()=>{
    document.getElementsByClassName("serial")[0].innerText = document.getElementById("result").innerText
})
collectBtn.addEventListener("click", ()=>{
    document.querySelectorAll("ul").forEach((ul)=>{
        console.log(ul.ariaLabel)
    })
    let data = []
    let ul = document.querySelector(".data_ul")
    let type = document.querySelectorAll(".type")
    let allTypes = []
    if(type[0].checked){
        let data1 = []
        for(let li of ul.children){
            console.log(li.children.length)
            if(li.children.length > 0){
                data1.push(anotherData(li.children[0]))
            }else{
                data1.push(li.innerHTML)
            }
            
        }
        console.log("parallel", data1)
        data.push(data1)
        allTypes.push("parallel")
    }else{
        let data1 = []
        for(let li of ul.children){
            
            if(li.children.length > 0){
                data1.push(anotherData(li.children[0]))
            }else{
                data1.push([li.innerHTML])
            }
            console.log("serial", data1)
        }
        // data.push(data1)
        data = data1
    }
    console.log(typeof(data[0]))
    allTypes.push("serial")
    console.log(document.querySelector(".debug"))
    document.querySelector("#debug").innerText = JSON.stringify(data)
    // console.log(data.toString())
})

function anotherData(ul){
    let data = []
    let type = ul.ariaLabel

    if(type == "parallel"){
        let data1 = []
        for(let li of ul.children){
            if(li.children.length > 0){
                data1.push(anotherData(li.children[0]))
            }else{
                data1.push(li.innerHTML)
            }
        }
        console.log("parallel", data1)
        data.push(data1)
    }else{
        let data1 = []
        for(let li of ul.children){
            if(li.children.length > 0){
                data1.push(anotherData(li.children[0]))
            }else{
                data1.push([li.innerHTML])
            }
        }
        data.push(data1)
        console.log("serial", data1)
    }
    console.log(typeof(data[0]))
    if(data.length == 1 && typeof(data[0])=="object"){
        data = data[0]
    }
    return data
}


generateBtn.addEventListener("click", ()=>{
    let ul = document.querySelector(".data_ul")
    let num = parseInt(document.querySelector(".num").value)
    let type = document.querySelectorAll(".type")
    console.log(type.value)
    if(type[0].checked){
        type = "parallel"
        
    }else{
        type = "serial"
        
    }
    ul.ariaLabel = type
    for(let i = 0; i < num; i++){
        let li = document.createElement("li")
        let value = prompt("Введите тип элемента ")
        li.style.width = "50px";
        li.style.height = "50px"
        switch(value){
            case "elastic":
                value = "e"
                li.innerText=value
                li.style.backgroundImage = "url('./static/img/elastic.svg')"
                li.style.backgroundSize = "cover"
                li.style.border = "1px solid black"
                break
            case "viscous":
                value = "v"
                li.style.backgroundImage = "url('./static/img/viscous.svg')"
                li.style.backgroundSize = "cover"
                li.innerText=value
                li.style.border = "1px solid black"
                break
            case "thermal":
                value = "T"
                li.style.backgroundImage = "url('./static/img/thermal.svg')"
                li.style.backgroundSize = "cover"
                li.innerText=value
                li.style.border = "1px solid black"
                break
            case "another":
                li.style.width = ""
                li.style.height = ""
                generateUl(li, i, i)
                
                li.style.border = "none"
                break
            default:
                
                break
        }
        li.style.background="./img/elastic.svg"
        ul.appendChild(li)
    }
})


async function generateUl(parent, index){
    let ul = document.createElement("ul")
    // let result = await openModal2()
    let num = parseInt(prompt("Количество подсистем"))
    let type = prompt("Тип соединении")
    ul.ariaLabel = type
    console.log(num, type)
    for(let i = 0; i < num; i++){
        let li = document.createElement("li")
        let value = prompt("Введите тип элемента ")
        console.log(value)
        li.style.width = "50px";
        li.style.height = "50px"
        switch(value){
            case "elastic":
                value = "e"
                li.innerText=value
                li.style.border = "1px solid black"
                li.style.backgroundImage = "url('./static/img/elastic.svg')"
                li.style.backgroundSize = "cover"
                
                break
            case "viscous":
                value = "v"
                li.style.border = "1px solid black"
                li.style.backgroundImage = "url('./static/img/viscous.svg')"
                li.style.backgroundSize = "cover"
                li.innerText=value
                break
            case "thermal":
                value = "T"
                li.style.border = "1px solid black"
                li.style.backgroundImage = "url('./static/img/thermal.svg')"
                li.style.backgroundSize = "cover"
                li.innerText=value
                break
            case "another":
                li.style.width = "";
                li.style.height = ""
                generateUl(li, i)
                li.style.border = "none"
                break
            default:
                
                break
        }
        ul.appendChild(li)
    }
    parent.appendChild(ul)
}
function openModal2(){
    return new Promise((resolve, reject) => {
        const modal = document.createElement('div');
        modal.innerHTML = `
          <label for="input1">Количество подсистем</label>
          <input type="number" id="input1">
          <br>
          <label for="input2">Тип соединения</label>
          <input type="text" id="input2">
          <br>
          <button id="submit">Submit</button>
        `;
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, 0)';
        modal.style.padding = '20px';
        modal.style.border = '1px solid black';
        modal.style.background = '#fff';
        modal.style.zIndex = "1"
        document.body.appendChild(modal);
    
        const input1 = document.querySelector('#input1');
        const input2 = document.querySelector('#input2');
       
        const submit = document.querySelector('#submit');
    
        submit.addEventListener('click', () => {
          const value1 = input1.value;
          const value2 = input2.value;
          
          document.body.removeChild(modal);
          resolve({value1, value2});
        });
      });
}
function openModal() {
    return new Promise((resolve, reject) => {
      const modal = document.createElement('div');
      modal.innerHTML = `
        <label for="input1">Введите тип элемента</label>
        <input type="text" id="input1">
        <br>
        <button id="submit">Submit</button>
      `;
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '50%';
      modal.style.transform = 'translate(-50%, 0)';
      modal.style.padding = '20px';
      modal.style.border = '1px solid black';
      modal.style.background = '#fff';
      document.body.appendChild(modal);
  
      const input1 = document.querySelector('#input1');
     
      const submit = document.querySelector('#submit');
  
      submit.addEventListener('click', () => {
        const value1 = input1.value;
        console.log(value1)
        document.body.removeChild(modal);
        resolve(value1);
      });
    });
  }