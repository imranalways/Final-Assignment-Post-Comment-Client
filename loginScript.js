$(document).ready(function(){
$("#login").click(function(){
	login();			
});

$("#createAccount").click(function(){
	window.location.href = "file:///C:/xampp/htdocs/Final%20Assignment%20ATP/Final-Assignment-Post-Comment-Client/signup.html";		
});
var login=function(){

				$.ajax({
					url:"http://localhost:53091/api/Posts",
					method:"GET",
					headers:{
						Authorization:"Basic "+ btoa($("#username").val()+ ":"+$("#password").val())
					},
					complete:function(xmlhttp,status){
						if($("#username").val()!="" && $("#password").val()!=""){
							if(xmlhttp.status==200){
								$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
								console.log("okk");
								
								$.session.set('user', $("#username").val());
								$.session.set('pass', $("#password").val());
								
								window.location.href = "file:///C:/xampp/htdocs/Final%20Assignment%20ATP/Final-Assignment-Post-Comment-Client/posts.html";
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

