$(document).ready(function(){

	var name, data;
	var create = false;
	
	loadUserProjects();
	
	$("#createProjectButton").click(function(){

		if ($("#projectInput").val() == ""){
			$(".error").html("<p>Ingresa el nombre del proyecto</p>");
			create = false;
		}else{
			name = $("#projectInput").val();
			create = true;
			$(".error").html("");
		}

		if (create){
			
			data = {
				'project':{
					'name': name
				}	
			}

			$.ajax({
				type: "POST",
				url: '/newp',
				data: data,
				dataType: "JSON",
				success: function(data){
					console.log("Proyecto creado");
					//console.log(data);
					$("#projectInput").val("");
					loadUserProjects();
				},
				error: function(jqXHR, textStatus, errorMessage){
					console.log("Hubo errores en el proceso: "+errorMessage);
				}
			});
		}
	
	});

	function loadUserProjects(){
		$.ajax({
			type: "GET",
			url: "/userp",
			dataType: "JSON",
			success: function(data){
				console.log("Los proyectos");
				drawProjectSelect(data);
			},
			error: function(jqXHR, textStatus, errorMessage){
				console.log("Hubo errores en el proceso: "+errorMessage);
			}
		});
	}

	function drawProjectSelect(list){
		$("#projectLIst").html("");
		var name, id;
		var html ="<option value=no>Sin proyecto</option>";	
		for (var key in list){
			//console.log(list[key]);
			id = list[key].id;
			name = list[key].name;
			html += "<option value="+id+">"+name+"</option>";
		}

		$("#projectLIst").append(html);
	}

});