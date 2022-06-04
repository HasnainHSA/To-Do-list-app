const firebaseConfig = {
    apiKey: "AIzaSyDq_QRFxIuiiE_WgtZMQuwrs4-8u7hZ3xo",
    authDomain: "to-do-list-app-f5e8a.firebaseapp.com",
    databaseURL: "https://to-do-list-app-f5e8a-default-rtdb.firebaseio.com",
    projectId: "to-do-list-app-f5e8a",
    storageBucket: "to-do-list-app-f5e8a.appspot.com",
    messagingSenderId: "331361247317",
    appId: "1:331361247317:web:68bc3b71e49834fb99f4dc",
    measurementId: "G-JQN883542Y"
  };

  var app = firebase.initializeApp(firebaseConfig);




  var table = document.getElementById("table");


  firebase.database().ref('todos').on('child_added',function(data){  
  
        var tasktd = document.createElement("td")
        var edittd = document.createElement("td")
        var deltd = document.createElement("td")
        var editBtn = document.createElement("button")
        var delBtn = document.createElement("button")
    
        tasktd.setAttribute("class","firstTd")
        edittd.setAttribute("class","secondTd")
        deltd.setAttribute("class","thirdTd")
    
        var taskText = document.createTextNode(data.val().value)
        var editText = document.createTextNode("Edit")
        var delText = document.createTextNode("Delete")
    
        editBtn.appendChild(editText)
        delBtn.appendChild(delText)
    
        editBtn.setAttribute("class","editBtn")
        editBtn.setAttribute('id',data.val().key)
        editBtn.setAttribute("onclick","editItem(this)")
        delBtn.setAttribute("class","delBtn")
        delBtn.setAttribute('id',data.val().key)
        delBtn.setAttribute("onclick","delItem(this)")
    
        tasktd.appendChild(taskText)
        edittd.appendChild(editBtn)
        deltd.appendChild(delBtn)
    
        var row = document.createElement("tr")
        row.appendChild(tasktd)
        row.appendChild(edittd)
        row.appendChild(deltd)
    
        table.appendChild(row)
  })


function addItem(){
    var todo_item = document.getElementById("item")
    
    
    // makin a refrence for todo and key pushing data in database
    var database = firebase.database().ref('todos')
    var key = database.push().key;
    var todo = {
        value : todo_item.value,
        key : key
    }
    database.child(key).set(todo)

       todo_item.value = ""
  }
// }

function deleteAll(){
    table.innerHTML = ""
}

function editItem(e){
    var val =  prompt("Enter new value",e.parentNode.parentNode.firstChild.innerText);

    
        
    
   var editTodo = {
       value: val,
       key:e.id
   }
   firebase.database().ref('todos').child(e.id).set(editTodo)
  
   e.parentNode.parentNode.firstChild.innerText = val

} 

function delItem(e){
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.parentNode.remove()
}