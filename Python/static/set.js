function set_arr(arr, depth="0",workspace){
    for(let i = 0; i<arr.length;i++){
        if(arr[i] instanceof Array){
            depth += i.toString()
            set_arr(arr[i], depth,workspace)
        }else if(typeof(arr[i]) === "string"){
            if(arr[i]=="e"){
                arr[i]=`sigma_${depth}(t)=E_${depth}_${i}*x_${depth}(t)`
                workspace.push(`E_${depth}_${i}`)
            }else if(arr[i] == "v"){
                arr[i] = `sigma_${depth}(t)=eta_${depth}_${i}*diff(x_${depth}(t),t)`
                workspace.push(`eta_${depth}_${i}`)
            }else if(arr[i] == "T"){
                arr[i] = `T_${depth}_${i}`
                workspace.push(`T_${depth}_${i}`)
            }
        }
    }
    document.querySelector(".workspace").value = ""
    for(let i of workspace){
        document.querySelector(".workspace").value += i + "=\n"
    }
    return arr
}
document.querySelector(".get_arr").addEventListener("click",()=>{
    let array = JSON.parse(document.querySelector("#debug").value)
    document.querySelector("#result").innerHTML=JSON.stringify(set_arr(array,0,[]))
})
document.querySelector(".change").addEventListener("click",()=>{
    let workspace = document.querySelector(".workspace").value.split("\n")
    let output = document.querySelector("#result").innerHTML
    for(let variable of workspace){
        console.log(variable)
        if(variable != ""){
            if(output.includes(variable.split("=")[0])){
                output = output.replace(variable.split("=")[0],variable.split("=")[1])
            }
        }
        
    }
    document.querySelector("#result").innerHTML = output
})