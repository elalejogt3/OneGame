var baseURL ="https://gamestore20210520100344.azurewebsites.net/";
//var baseURL ="https://localhost:44376/";
$( document ).ready(function() {
  
        // ..
        getCustomersFromService();
        $('#btnCreateCus').click(function(e){
          sendCus(e);
        });
        // ..
  
   
});

function deleteCus(id){
  $.ajax({
    url: baseURL+"api/customers/"+id,   
    type: "delete",
    contentType: "application/json",  
    success: function (result, status, xhr) {
      getCustomersFromService();
    },
    error: function (xhr, status, error) {
        //console.log(xhr)
    }
});
}
function sendCus(e){
  e.preventDefault();
  console.log("i am here")
  var name=$("#cusName").val();
  var email=$("#cusEmail").val();
  var address=$("#cusAddress").val();
  var phone=$("#cusPhone").val();

  var data= {
    "name":name,
    "email":email,
    "addresss":address,
    "phone":phone
  }
  console.log("data", data);
  $.ajax({
    url: baseURL+"api/customers",   
    type: "post",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (result, status, xhr) {
       window.location="index.html"
    },
    error: function (xhr, status, error) {
        //console.log(xhr)
    }
});


 
}
function getCustomersFromService(){
  $('#customerDataRender').html("");
    $.get( baseURL+"api/customers", function( data ) {
        console.log("testing_response", data);
        var html ="";        
        for(i = 0; i < data.length ; i++) {
          console.log(data[i]);
         
          html += "<tr><td>"+data[i].name+"</td>"+"<td>"+data[i].email+"</td>"+"<td>"+data[i].addresss+"</td>"+"<td>"+data[i].phone+"</td><td><button onClick='deleteCus("+data[i].id+")' class='btn btn-danger'>Delete</button></td></tr>"
        }
        $('#customerDataRender').append(html);
        $('#dataTable').DataTable();
      });
}