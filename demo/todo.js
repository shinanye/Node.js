console.log("欢迎使用todo应用")

var fs = require("fs")
var path = require('path')
var list = []
const verb = process.argv[2]
const currentPath = path.join(__dirname,"db")

isFileExists(currentPath)
main(currentPath)//主入口
function main(currentPath){
    switch(verb){
        case 'list':
            fetch(currentPath,false)
        break
        case 'add':
            fetch(currentPath)
            const taskContent = dataFormat(process.argv[3])
            list.push(taskContent)
            saveData(currentPath)
            fetch(currentPath,false)
        break
        case 'done':
            fetch(currentPath)
            list[process.argv[3]-1].taskStatus = true
            saveData(currentPath)
            fetch(currentPath,false)
        break;
        case 'delete':
            fetch(currentPath)
            list.splice(process.argv[3] - 1,1)
            saveData(currentPath)
            fetch(currentPath,false)
            
        break
        case 'edit':
            fetch(currentPath)
            list[process.argv[3] -1 ].taskName = process.argv[4]
            saveData(currentPath)
            fetch(currentPath,false)
        break
        default:
            console.log("你当前操作无法进行")
        break;
    }
}

//帮助函数
function isFileExists(filePath){
    try {
        fs.statSync(filePath)
      } catch (err) {
        // 处理错误
        fs.writeFileSync(filePath,JSON.stringify(list))
    }
}

function fetch(currentPath,flag = true){
    
    const fileContent = fs.readFileSync(currentPath).toString()
    list = JSON.parse(fileContent)
    if(!flag){
        console.log(list);
    }
}
function saveData(currentPath){
    fs.writeFileSync(currentPath,JSON.stringify(list))
}
function dataFormat(content){
    const taskContent = {
        taskName:content,
        taskStatus:false
    }
    return taskContent
}



