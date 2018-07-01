$(document).ready(function() {
	var name, data;
	var create = false;
	
	loadUserProjects();
	
	$("#createProjectButton").click(function() {
		if ($("#projectInput").val() == "") {
			$(".error").html("<p><em>Ingresa el nombre del proyecto</em></p>");
			create = false;
		} else {
			name = $("#projectInput").val();
			create = true;
			$(".error").html("");
		}

		if (create) {
			data = {
				'project': {
					'name': name
				}	
			}

			$.ajax({
				type: "POST",
				url: '/new_project',
				data: data,
				dataType: "JSON",
				success: function(data) {
					$("#projectInput").val("");
					loadUserProjects();
				},
				error: function(jqXHR, textStatus, errorMessage) {
					console.log("Hubo errores en el proceso: " + errorMessage);
				}
			});
		}
	
	});

	$(".getData").click(function(event) {
		var id = $(this).attr('id');

		var data = {
			'project': {
				'id': id
			}
		}

		$.ajax({
			type: "GET",
			url: '/projects_times',
			data: data,
			dataType: "JSON",
			success: function(data) {
				showProjectTasks(data);
			},
			error: function(jqXHR, textStatus, errorMessage) {
				console.log("Hubo errores en el proceso: " + errorMessage);
			}
		});
	});

	function loadUserProjects() {
		$.ajax({
			type: "GET",
			url: "/user_projects",
			dataType: "JSON",
			success: function(data) {
				drawProjectSelect(data);
			},
			error: function(jqXHR, textStatus, errorMessage) {
				console.log("Hubo errores en el proceso: "+errorMessage);
			}
		});
	}

	function drawProjectSelect(list) {
		$("#projectLIst").html("");
		var name, id;
		var html ="<option value=no>Sin proyecto</option>";	

		for (var key in list){
			//console.log(list[key]);
			id = list[key].id;
			name = list[key].name;
			html += "<option value=" + id + ">" + name + "</option>";
		}
		$(".projectLIst").append(html);
	}

	function showProjectTasks(data) {
		var html = "", description, td, id;

		for (var key in data) {
			//console.log(data[key].description+data[key].timediff);
			id = data[key].pid;
			description = data[key].description;
			td = data[key].timediff;
			td = moment(td).format('mm:ss');
			html += "<p><span>" + description + "</span> | <i>" + td + "</i></p>";
		}

		$("#projectTask-"+id).html(html);
	}
});
