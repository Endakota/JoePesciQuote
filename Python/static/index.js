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


generateBtn.addEventListener("click", async ()=>{
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

        let value = await createPrompt()
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
        
        ul.appendChild(li)
    }
    const liElements = document.querySelectorAll('li:not(:has(ul))');
    liElements.forEach((li) => {
    li.addEventListener('dblclick', async (event) => {
        let value = await createPrompt()
        console.log(value)
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
    });
    });
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
        let value = await createPrompt()
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
function selectPrompt(options=[
    { value: 'elastic', label: 'elastic' },
    { value: 'viscous', label: 'viscous' },
    { value: 'thermal', label: 'thermal' },
    { value: 'another', label: 'another' },
  ]) {
    return new Promise((resolve, reject) => {
      const inputElement = document.createElement('select');
      options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.text = option.label;
        inputElement.appendChild(optionElement);
      });
  
      const okButton = document.createElement('button');
      okButton.innerText = 'OK';
      okButton.addEventListener('click', () => {
        resolve(inputElement.value);
        document.body.removeChild(promptContainer);
      });
  
      const cancelButton = document.createElement('button');
      cancelButton.innerText = 'Cancel';
      cancelButton.addEventListener('click', () => {
        reject();
        document.body.removeChild(promptContainer);
      });
  
      const promptContainer = document.createElement('div');
      promptContainer.classList.add("prompt-container")
      promptContainer.appendChild(inputElement);
      promptContainer.appendChild(okButton);
      promptContainer.appendChild(cancelButton);
      document.body.appendChild(promptContainer);
    });
  }
  function createPrompt(options=[
    { value: 'elastic', label: 'elastic' },
    { value: 'viscous', label: 'viscous' },
    { value: 'thermal', label: 'thermal' },
    { value: 'another', label: 'another' },
  ]) {
    // создаем новый контейнер для prompt
    const promptContainer = document.createElement("div");
    promptContainer.className = "prompt-container";
  
    // создаем элементы для ввода данных
    const inputElement = document.createElement('select');
      options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.text = option.label;
        inputElement.appendChild(optionElement);
      });
    const button = document.createElement("button");
    button.textContent = "OK";
  
    // добавляем элементы на контейнер
    promptContainer.appendChild(inputElement);
    promptContainer.appendChild(button);

    // добавляем контейнер на страницу
    document.body.appendChild(promptContainer);
  
    // // анимация входа
    // promptContainer.classList.add("show");
  
    // возвращаем Promise, который зарезолвится при нажатии на кнопку OK
    return new Promise((resolve, reject) => {
      button.addEventListener("click", () => {
        // удаляем контейнер и очищаем слушатели событий
        promptContainer.remove();
        console.log(inputElement.value)
        resolve(inputElement.value);
      });
    });
  }