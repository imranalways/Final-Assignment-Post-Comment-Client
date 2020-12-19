$(document).ready(function(){
	$("#saveBtn").click(function(){
	createPost();
});
$(".searchComment").keyup(function(){
searchList();
});

$("#refreshBtn").click(function(){
	$("#postId").val("");
	$("#msg").html("");
	$("#msg2").html("");
	$("#upPostId").val("");
	$("#upPostDetails").val("");
	$(".addComment").val("");
	$("#upPost").val("");
	$("#upCommentDetails").val("");
	listPost();
});

$("#logout").click(function(){
	$("#postId").val("");
	$("#msg").html("");
	$("#msg2").html("");
	$("#upPostId").val("");
	$("#upPostDetails").val("");
	$(".addComment").val("");
	$("#upPost").val("");
	$("#upCommentDetails").val("");
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('pass');
	window.location.href = "file:///C:/xampp/htdocs/Final%20Assignment%20ATP/Final-Assignment-Post-Comment-Client/index.html";
});

$("#commentRefreshBtn").click(function(){
	$("#commentList tbody").html("");
	$("#getPost").val("");
	$("#msg2").html("");
	$("#hiddenPostId").val("");
	$(".addComment").val("");
	$(".searchComment").val("");
	$("#upPost").val("");
	$("#upCommentDetails").val("");
});



	
	var listPost=function(){
	$.ajax({
		url:"http://localhost:53091/api/Posts",
		method:"GET",
		headers:{
				Authorization:"Basic "+ btoa($.session.get('user') + ":"+$.session.get('pass'))
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				var str;
				for (var i = 0; i < data.length; i++) {

					str+="<tr><td>"+data[i].postId+"</td><td>"+data[i].postDetails+"</td><td><button btn-id-user="+data[i].lid+" btn-id-post="+data[i].postId+" id='DeleteBtn'>Delete</button></td><td><button btn-id-postId="+data[i].postId+" id='loadBtn'>Load</button></td><td><button btn-id-postId="+data[i].postId+" id='viewBtn'>Comments</button></td></tr>"
				}
				$("#postList tbody").html(str);
				$("#welcome").html("<b>Welcome! "+ $.session.get('user')+"</b>");
			}
			else{
				
				window.location.href = "file:///C:/xampp/htdocs/Final%20Assignment%20ATP/Final-Assignment-Post-Comment-Client/index.html";
			}
		}
	});
}


listPost();
/*
var userDetails=function(){
	$.ajax({
		url:"http://localhost:53091/api/Logins",
		method:"GET",
		headers:{
				Authorization:"Basic "+ btoa($.session.get('user') + ":"+$.session.get('pass'))
		},
		complete:function(xmlhttp,status){

			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				var str;
				for (var i = 0; i < data.length; i++) {
					str+="<tr><td>"+data[i].postId+"</td><td>"+data[i].postDetails+"</td><td><button btn-id-post="+data[i].postId+" id='DeleteBtn'>Delete</button></td><td><button btn-id-postId="+data[i].postId+" id='loadBtn'>Load</button></td><td><button btn-id-postId="+data[i].postId+" id='viewBtn'>Comments</button></td></tr>"
				}
				$("#postList tbody").html(str);
			}
			else{
				
				window.location.href = "file:///C:/xampp/htdocs/Final%20ATP2%20Assignment%20-%20Copy/Final-ATP2-Assignment-CLIENT/index.html";
			}
		}
	});
}
*/

var createPost=function(){
	$.ajax({
		url:"http://localhost:53091/api/Posts",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			postDetails:$("#postDetails").val(),
			lid:$.session.get('user')
		},
		complete:function(xmlhttp,status){
			if($("#postDetails").val()!=""){
				if(xmlhttp.status==201){
					$("#msg").html("Post Successfully added");
					listPost();
					$("#postDetails").val("");
				}
				else{
					$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
				}
			}
			else{
				$("#msg").html("<b>Enter Post Details</b>");
			}
		}
	});
}

	//Delete Function starts from here
	
		$("#postList").on("click","#DeleteBtn",function(){
			var button=$(this);
			if(confirm("Are you sure you want to delete this Post?")) {
			if(button.attr("btn-id-user")==$.session.get('user')){
			$.ajax({
			url:"http://localhost:53091/api/Posts/"+button.attr("btn-id-post"),
			method:"Delete",
			/*header:"Content-Type:application/json",
			data:{
				lid:$.session.get('user')
			},*/
			complete:function(xmlhttp,status){

			if(xmlhttp.status==204){
				$("#msg").html("Post Successfully Deleted");
				listPost();
				$("#postId").val("")
				$("#commentList tbody").html("");
				$("#upPostId").val("");
				$("#upPostDetails").val("");
				$("#msg").html("");
				$("#msg2").html("");


			}
			else{
				$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
				
				
			}
		}
		});
	}
	else{
		$("#msg").html("<b>You are not allowed to delete someones post</b>");
	}
		
		}
		
	});
//Delete Function Ends here

//Search Function for posts starts from here
	
		$(".search").keyup(function(){
			var button=$(this);
			$.ajax({
			url:"http://localhost:53091/api/Posts/"+ $("#postId").val(),
			method:"Get",
			complete:function(xmlhttp,status){
				
				if($("#postId").val()!=""){
			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				var str;
				str="<tr><td>"+data.postId+"</td><td>"+data.postDetails+"</td><td><button btn-id-user="+data[i].lid+" btn-id-post="+data.postId+" id='DeleteBtn'>Delete</button></td><td><button btn-id-postId="+data.postId+" id='loadBtn'>Load</button></td><td><button btn-id-postId="+data.postId+" id='viewBtn'>Comments</button></td></tr>"
				$("#postList tbody").html(str);
				$("#msg").html("");
			}
			else{
				
				$("#postList tbody").html("No Data Found");
			}
			}
			else{
				listPost();
			}
			}
		});
		
		
		
	});
//Search Function for posts Ends here

//Update Function starts from here
	
		$("#update").on("click","#updateBtn",function(){
			
		$.ajax({
		url:"http://localhost:53091/api/Posts/"+ $("#upPostId").val(),
		method:"PUT",
		header:"Content-Type:application/json",
		data:{
			postDetails:$("#upPostDetails").val(),
			lid:$.session.get('user')
		},
		complete:function(xmlhttp,status){
			if($("#upPostDetails").val()!=""){
				if(xmlhttp.status==200){
					$("#msg").html("Post Successfully Updated");
					listPost();
					$("#msg").html("Post Successfully Updated");
					$("#postId").val("")
					
					$("#upPostId").val("");
					$("#upPostDetails").val("");
				}
				else{
					$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
				}
			}
			else{
				$("#msg").html("<b>Fields can't be empty</b>");
			}
		}
		});
	});
//Update Function Ends here


//Loads Function starts from here
$("#postList").on("click","#loadBtn",function(){
	var button=$(this);
			$.ajax({
			url:"http://localhost:53091/api/Posts/"+ button.attr("btn-id-postId") ,
			method:"Get",
			complete:function(xmlhttp,status){
			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				//var Lid=($.session.get('user'));
				if(data.lid == $.session.get('user')){
				GetTable(event, 'update');
				$("#upPostId").val(data.postId);
				$("#upPostDetails").val(data.postDetails);
				$("#msg2").html("");
				$("#msg").html("");
			}
			else{
				$("#msg").html("<b>You are not allowed</b>");
			}
			}
			else{
				$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
			}
			}
			
		});
	
});
//Loads Function Ends here


//View comments Function starts from here
$("#postList").on("click","#viewBtn",function(){
	var button=$(this);
			$.ajax({
			url:"http://localhost:53091/api/Posts/"+ button.attr("btn-id-postId")+"/Comments" ,
			method:"Get",
			complete:function(xmlhttp,status){
			if(xmlhttp.status!=204){
			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				var str;
				$("#getPost").val(data[0].post.postDetails);
				$("#hiddenPostId").val(data[0].post.postId);
				for (var i = 0; i < data.length; i++) {
					str+="<tr><td>"+data[i].commentId+"</td><td>"+data[i].commentDetails+"</td><td><button btn-lid-user="+data[i].lid+" btn-id="+data[i].commentId+" id='DeleteBtn'>Delete</button></td><td><button btn-id-commentId="+data[i].commentId+" id='loadBtn'>Load</button></td></tr>"
				}
				$("#commentList tbody").html(str);
				$("#msg").html("");
			}
			else{
				$("#commentList tbody").html("");
				$("#getPost").val("");
				$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
			}
			}
			else
			{
				
				$.ajax({
					url:"http://localhost:53091/api/Posts/"+ button.attr("btn-id-postId"),
					method:"Get",
					complete:function(xmlhttp,status){
						var data=xmlhttp.responseJSON;
						
						$("#getPost").val(data.postDetails);
						$("#hiddenPostId").val(data.postId);
						$("#commentList tbody").html("<b>How lucky!! You can do the first comment</b>");
					}
				});
			}
		
		}
			
		});
	
});
//View Comments Function Ends here


//Search Function for comments starts from here
	
		

	var searchList=function(){
			$.ajax({
			url:"http://localhost:53091/api/Posts/"+ $("#hiddenPostId").val() +"/Comments/"+ $("#commentId").val(),
			method:"Get",
			complete:function(xmlhttp,status){
			
			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				var str;
				for (var i = 0; i < data.length; i++) {
					str+="<tr><td>"+data[i].commentId+"</td><td>"+data[i].commentDetails+"</td><td><button btn-lid-user="+data[i].lid+" btn-id="+data[i].commentId+" id='DeleteBtn'>Delete</button></td><td><button btn-id-commentId="+data[i].commentId+" id='loadBtn'>Load</button></td></tr>"
				}
				
				$("#commentList tbody").html(str);
				$("#msg").html("");
			}
			else{
				//$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
				
				$("#commentList tbody").html("No data Found");
			}
		}
		});
		
		
		
	}
//Search Function for comments Ends here


//Delete Function for Comments starts from here
	
		$("#commentList").on("click","#DeleteBtn",function(){
			var button=$(this);
			
			if(confirm("Are you sure you want to delete this Comment?")) {
				console.log(button.attr("btn-lid-user"));
				console.log($.session.get('user'));
			if(button.attr("btn-lid-user")==$.session.get('user')){
			$.ajax({
			url:"http://localhost:53091/api/Posts/"+ $("#hiddenPostId").val() +"/Comments/"+ button.attr("btn-id"),
			method:"Delete",
			complete:function(xmlhttp,status){
				
			if(xmlhttp.status==204){
					
					searchList();
					$("#msg").html("Post Successfully Deleted");
					$("#postId").val("")
					$("#commentList tbody").html("");
					$("#upPost").val("");
					$("#upCommentDetails").val("");
					$("#msg2").html("");
				}
				else{
					$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
					
				}
			}
		});
		}
		else{
		$("#msg").html("<b>You are not allowed to delete someones Comment</b>");
		}
		}
	});
//Delete Function for comments Ends here


//Add comment Function for Comments starts from here
	
		$("#searchComment").on("click","#addCommentBtn",function(){
		$.ajax({
		url:"http://localhost:53091/api/Posts/"+ $("#hiddenPostId").val() +"/Comments",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			commentDetails:$(".addComment").val(),
			lid:$.session.get('user')
		},
		complete:function(xmlhttp,status){
			if($(".addComment").val()!=""){
				if(xmlhttp.status==201){
					$("#msg").html("Post Successfully added");
					searchList();
					$(".addComment").val("");
				}
				else{
					$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
				}
			}
			else{
				$("#msg").html("<b>Enter Comment First</b>");
			}
		}
	});
		
	});
//Add comment Function for comments Ends here


//Loads Function for comments starts from here
$("#commentList").on("click","#loadBtn",function(){
	var button=$(this);
			$.ajax({
			url:"http://localhost:53091/api/Posts/"+ $("#hiddenPostId").val() +"/Comments/"+ button.attr("btn-id-commentId"),
			method:"Get",
			complete:function(xmlhttp,status){
			if(xmlhttp.status==200){
				var data=xmlhttp.responseJSON;
				if(data[0].lid == $.session.get('user')){
				GetTable(event, 'Modify');
				
				$("#upPost").val(data[0].post.postDetails);
				$("#upCommentDetails").val(data[0].commentDetails);
				$("#hiddenCommentId").val(data[0].commentId);
				$("#msg").html("");
				$("#msg2").html("");
				}
				else{
						$("#msg").html("<b>You are not allowed</b>");
				}
			}
				else{
					$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
				}
			}
			
		});
	
});
//Loads Function for comments Ends here

//Update Function for comment starts from here
	
		$("#Modify").on("click","#modifyBtn",function(){
			
		$.ajax({
		url:"http://localhost:53091/api/Posts/"+ $("#hiddenPostId").val()+"/Comments/"+ $("#hiddenCommentId").val(),
		method:"PUT",
		header:"Content-Type:application/json",
		data:{
			commentDetails:$("#upCommentDetails").val(),
			lid:$.session.get('user')
		},
		complete:function(xmlhttp,status){
			if($("#upCommentDetails").val()!=""){
				if(xmlhttp.status==200){
					$("#msg").html("Comment Successfully Updated");
					searchList();
					$("#upPost").val("");
					$("#upCommentDetails").val("");
					$("#hiddenCommentId").val("");
				}
				else{
					$("#msg").html(xmlhttp.status+":"+ xmlhttp.statusText);
				}
			}
			else{
				$("#msg").html("<b>Fields can't be empty</b>");
			}
		}
		});
	});
//Update Function for comment Ends here



});
