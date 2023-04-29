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
    let data = []
    let ul = document.querySelector(".data_ul")
    let type = document.querySelectorAll(".type")
    
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
        let value = prompt(`Введите тип элемента под номером `+i)
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
                generateUl(li, i, i)
                li.style.border = "none"
                break
            default:
                alert("ошибка введите заново")
                document.reload()
                break
        }
        li.style.background="./img/elastic.svg"
        ul.appendChild(li)
    }
})


function generateUl(parent, index){
    let ul = document.createElement("ul")
    let num = parseInt(prompt("Укажите количество подсистем"))
    let type = prompt("Укажите тип соединения") 
    ul.ariaLabel = type
    for(let i = 0; i < num; i++){
        let li = document.createElement("li")
        let value = prompt(`Введите тип элемента под номером ` +index+ " " + i)
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
                generateUl(li, i)
                li.style.border = "none"
                break
            default:
                alert("ошибка введите заново")
                break
        }
        ul.appendChild(li)
    }
    parent.appendChild(ul)
}