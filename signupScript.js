$(document).ready(function(){

$("#signup").click(function(){
	signup();			
});

$("#back").click(function(){
	window.location.href = "file:///C:/xampp/htdocs/Final%20Assignment%20ATP/Final-Assignment-Post-Comment-Client/index.html";		
});

var userLid=function(){

				$.ajax({
					url:"http://localhost:53091/api/Logins",
					method:"GET",
					complete:function(xmlhttp,status){
						
							if(xmlhttp.status==200){
								var data=xmlhttp.responseJSON;
								var str= data.length;
								$("#lid").val(str+1);
							}
						
							else{
								$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
							}
						
		}
	});
}

userLid();


var signup=function(){

				$.ajax({
					url:"http://localhost:53091/api/Logins",
					method:"POST",
					header:"Content-Type:application/json",
					data:{
						name:$("#name").val(),
						password:$("#password").val()
					},
					complete:function(xmlhttp,status){
						if($("#name").val()!="" && $("#password").val()!=""){
							if(xmlhttp.status==200){
								$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
								window.location.href = "file:///C:/xampp/htdocs/Final%20Assignment%20ATP/Final-Assignment-Post-Comment-Client/index.html";
							}
						
							else{
								$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
							}
						}
						else{
							$("#msg").html("Fill all fields");
						}
		}
	});
}


});

