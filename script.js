 // validate form inputs before adding data 
 function validateform(){
    var name=document.getElementById("name").value;
    var age=document.getElementById("age").value;
    var address=document.getElementById("address").value;
    var email=document.getElementById("email").value;

    if(name==""){
        alert("Name is required");
        return false;
    }
    if(age==""){
        alert("Age is required");
        return false;
    }
    else if(age < 1){
        alert("Age must not be zero  or less than zero");
        return false;
    }
    if(address==""){
        alert("Address is required");
        return false;
    }
    if(email==""){
        alert("Email is required");
        return false;
    }
    
    return true;
    
}
//function  to showdata
function showData(){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist=[];
    }
    else{
        peoplelist=JSON.parse(localStorage.getItem ("peoplelist"))
    }
    var html = "";
    peoplelist.forEach(function( element,index) {
        html +="<tr>";
        html +="<td>"+ element.name + "</td>";
        html +="<td>"+ element.age + "</td>";
        html +="<td>"+ element.address + "</td>";
        html +="<td>"+ element.email + "</td>";
        html +='<td><button onclick="deleteData('
        +index+
        ')" class="btn btn-danger">Delete </button><button onclick="updateData('
        +index+
        ')" class="btn btn-warning m-2">Edit</button></td>';
        html +="</tr>";
        
        
        
    });
    document.querySelector("#crudTable tbody").innerHTML = html;
}
// load all data
document.onload = showData();
//function  to add data 
function AddData(){
    //if form is varidate
    if(validateform() == true){
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        var peoplelist;
        if(localStorage.getItem("peoplelist") == null){
            peoplelist=[];
        }
        else{
            peoplelist=JSON.parse(localStorage.getItem ("peoplelist"))
        }
        peoplelist.push({
            name:name,
            age: age,
            address:address,
            email:email,
        });
        localStorage.setItem("peoplelist",JSON.stringify(peoplelist));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";


    

    }
}
//function to delete data  from local storage
function deleteData(index){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist=[];
    }
    else{
        peoplelist=JSON.parse(localStorage.getItem ("peoplelist"))
    }
    peoplelist.splice(index,1);
    localStorage.setItem("peoplelist",JSON.stringify(peoplelist));
    showData(); 
}
//function update/edit data from local storage
function updateData(index){
    document.getElementById("submit").style.display="none";
    document.getElementById("update").style.display="block";
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist=[];
    }
    else{
        peoplelist=JSON.parse(localStorage.getItem ("peoplelist"))
    }
    document.getElementById("name").value = peoplelist[index].name;
    document.getElementById("age").value = peoplelist[index].age;
    document.getElementById("address").value = peoplelist[index].address;
    document.getElementById("email").value = peoplelist[index].email;

    document.querySelector("#update").onclick = function(){
        if(validateform() == true ){
            peoplelist[index].name = document.getElementById("name").value;
            peoplelist[index].age = document.getElementById("age").value;
            peoplelist[index].address = document.getElementById("address").value;
            peoplelist[index].email = document.getElementById("email").value;

            localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
            showData();

            document.getElementById("name").value="";
            document.getElementById("age").value="";
            document.getElementById("address").value="";
            document.getElementById("email").value="";


            document.getElementById("submit").style.display="block";
            document.getElementById("update").style.display="none";


        }
    }

}
