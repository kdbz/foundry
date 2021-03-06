/* tour.js
 * ---------------------------------------------
 * 
 * 
 */

//A tour that walks a user through the team authoring process
var authoringTour = new Tour({
	autoscroll: true,
	steps: [
	{
		orphan: true, 
		title: "<b>Welcome to Foundry</b>",
		backdrop: true,
		html: true,
		content: "<div class='tour-content-wrapper'>Foundry is an online platform that allows you " 
		+"to create and manage teams of experts.<img src=''> </img></div>" //USED TO BE OVERVIEW.GIF, BUT TOO SMALL
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	}, 
	{
		element: "#member-container",
		title: "<b>Team Roles</b>",
		content: "<div class='tour-content-wrapper'>In this panel, you can add role-based "
		+"members to the team.",
		onShow: function(authoringTour) {
			if(!$("#foundry-header .menu-button").hasClass("active")) $("#foundry-header .menu-button").click();
			if($("#member-container").hasClass("active") == false) {
				$("#left-sidebar .sidebar-item .header")[0].click();
			}
		}
	},
	{
		element: "#member-container",
		title: "<b>Customize Each Role</b>",
		html: true,
		content: "<div class='tour-content-wrapper'>Roles can be given privileges of an author/client, "
		+"project coordinator, or a worker. You can also assign each role a category "
		+"and specify the necessary skills for that role based on the oDesk platform." 
		+"<img src='/assets/addWorker.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
		onShow: function(authoringTour) {
			if(!$("#foundry-header .menu-button").hasClass("active")) $("#foundry-header .menu-button").click();
			if($("#member-container").hasClass("active") == false) {
				$("#left-sidebar .sidebar-item .header")[0].click();
			}
		}
	},
	{
		orphan: true,
		title: "<b>Interactive Task-Based Timeline</b>",
		content: "Drag to add an event on the timeline. <br><img src='/assets/drawEvent.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Customize the Events</b>",
		content: "<div class='tour-content-wrapper'>Add details to each event so workers "
		+"can easily complete their tasks. Add a title, assign workers, specify inputs and ouputs "
		+"of the task, write a description, and specify questions for task documentation."
		+"<img src='/assets/editTask.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		element: "#search-events-container" ,
		title: "<b>Event Library</b>", 
		content: "<div class='tour-content-wrapper'>This is the event library. Here you can search over " 
		+"all previously created events by entering in keywords, inputs, "
		+"and outputs, and drag them to your timeline."
		+"<img src='/assets/eventlibrary.png'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
		onShow: function(authoringTour) {
			if(!$("#foundry-header .menu-button").hasClass("active")) $("#foundry-header .menu-button").click();
			if($("#search-events-container").hasClass("active") == false) {
				$("#left-sidebar .sidebar-item .header")[2].click();
			}
		}
	},
	{
		orphan: true,
		title: "<b>Handoffs</b>",
		content: "<div class='tour-content-wrapper'>Draw a handoff between events "
		+"to show that one task depends on the output of another. Click to add notes "
		+" or delete the handoffs. <img src='/assets/handoff.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Collaborations</b>",
		content: "<div class='tour-content-wrapper'>Draw a collaboration to show that members from "
		+"both events should collaborate while working. Click to add notes or delete the collaboration."
		+"<img src='/assets/collab.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		element: "#project-overview-container",
		title: "<b>Project Overview</b>",
		html: true,
		content: "<div class='tour-content-wrapper'>Finally, add a description of the overall project "
		+"here in the project overview. This will give workers a understanding of the scope of the project. " 
		+"<img src='/assets/projectOverview.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
		onShow: function(authoringTour) {
			if(!$("#foundry-header .menu-button").hasClass("active")) $("#foundry-header .menu-button").click();
			if($("#project-overview-container").hasClass("active") == false) {
				$("#left-sidebar .sidebar-item .header")[1].click();
			}
		}
	},
	{
		orphan: true,
		title: "<b>Google Drive Integration</b>",
		content: "<div class='tour-content-wrapper'>When the team has been started, a shared " 
		+"Google Drive folder is created for the project. The link will appear on the sidebar. " 
		+"<img src='/assets/gdrive.png'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Google Drive Integration</b>",
		content: "<div class='tour-content-wrapper'>Google Drive folders are automatically created for "
		+"each event, workers can open the folder by clicking the Upload icon." 
		+"<img src='/assets/upload.png'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Open in Drive</b>",
		content: "<div class='tour-content-wrapper'>After clicking the link, click on the "
		+"'Open in Drive' button on the top right side of the Google Drive to add the project "
		+"folder or a specific event folder to your personal Drive so you can upload or download items."
		+"<img src='/assets/openInDrive.png'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		element: "#flashTeamStartBtn",
		title: "<b>Start the Team</b>",
		content: "When you are done creating your workflow and hiring team members "
		+"click here to begin the team! ",
		placement: "left"
	},
	{
		orphan: true,
		title: "<b>Hiring</b>",
		content: "<div class='tour-content-wrapper'> Foundry can also help you reach out to and "
		+"hire workers for each event quickly. Click 'Hire' on each event to see the Hiring page "
		+"and learn more.<img src='/assets/hire.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
	},
	{
		orphan: true,
		title: "<b>Start the Team</b>",
		content: "<div class='tour-content-wrapper'>Now that the team has started working, "
		+"workers can click 'Start' on events to begin the event timer to track progress in the workflow. "
		+"Workers see their tasks highlighted in yellow."
		+"<img src='/assets/startTask.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
	},
	{
		orphan: true,
		title: "<b>Manage the Live Team</b>",
		content: "<div class='tour-content-wrapper'> In progress events are blue, completed events "
		+"are green, and delayed events are red. "
		+"<img src='/assets/liveTeam.png'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
	},
	{
		element: "#chat-box-container" ,
		title: "<b>Chat With the Team</b>", 
		content: "<div class='tour-content-wrapper'>Once the team has started working, you can chat with " 
		+"all of the team members in this group chat box."
		+"<img src='/assets/chat.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
		placement: "left"
	},
	{
		orphan: true,
		title: "<b>Good luck! </b>", 
		content: "Good luck with your project and please enjoy the use of Foundry!"
	}]
});



$("#tourBtn").click(function(){
	//Initialize the tour
	authoringTour.init();
    authoringTour.start(true);
    authoringTour.goTo(0); //Always start tour at the first step
});


//A tour to walk the team members / experts through the use of Foundry
var expertTour = new Tour({
	steps: [
	{
		orphan: true, 
		title: "<b>Welcome to Foundry</b>", 
		content: "View your upcoming tasks, communicate with the team "
		+ "track the progress of the project, "
		+ "and upload and download files from a shared Google Drive folder.",
		backdrop: true
	},
	{
		element: "#project-status-container",
		title: "<b>Project Status</b>", 
		content: "This panel contains information about this project including "
		+"the progress of the whole team as well as your next upcoming task. ",
		onShow: function(authoringTour) {
			if(!$("#foundry-header .menu-button").hasClass("active")) $("#foundry-header .menu-button").click();
		}
	},
	{
		element: ".welcome" ,
		title: "<b>Your Role</b>", 
		content: "This is your role in the project.",
		onShow: function(authoringTour) {
			if(!$("#foundry-header .menu-button").hasClass("active")) $("#foundry-header .menu-button").click();
		}
	},
	{
		element: ".google-drive-button" ,
		title: "<b>Google Drive Project Folder</b>", 
		content: "This is a link to the shared Google Drive folder for the entire project. "
		+"You will need to add the folder to your personal Drive to upload and download files.",
		onShow: function(authoringTour) {
			if(!$("#foundry-header .menu-button").hasClass("active")) $("#foundry-header .menu-button").click();
		}
	},
	{
		element: "#project-overview-container",
		title: "<b>Project Overview</b>",
		html: true,
		content: "<div class='tour-content-wrapper'>This is the project overview. "
		+"Here you will see the author's description of the scope of the entire project. " 
		+"<img src=''> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
		onShow: function(authoringTour) {
			if(!$("#foundry-header .menu-button").hasClass("active")) $("#foundry-header .menu-button").click();
			if($("#project-overview-container").hasClass("active") == false) {
				$("#left-sidebar .sidebar-item .header")[0].click();
			}
		}
	},
	{
		orphan: true,
		title: "<b>Timeline</b>", 
		content: "<div class='tour-content-wrapper'>This is the timeline. Here you can "
		+"view the entire project. Your tasks have been highlighted in yellow. "
		+"<img src='/assets/highlightTasks.png'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
		placement: "left"
	},
	{
		orphan: true,
		title: "<b>View Task Details</b>", 
		content: "<div class='tour-content-wrapper'> Click on the task to see details such as: "
		+"start time, estimated duration, workers, deliverables of the task, etc."
		+"<img src='/assets/viewTask.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Handoffs</b>",
		content: "<div class='tour-content-wrapper'>Some tasks have handoffs between them. "
		+"Handoffs indicate that the downstream task requires outputs from the upstream task before "
		+"it can begin. Click to see notes the author may have added. <img src='/assets/handoff.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Collaborations</b>",
		content: "<div class='tour-content-wrapper'>Similarly, collaborations indiciate that "
		+"workers from both tasks should collaborate together while working on their separate tasks. "
		+"Click to see notes the author may have added. <img src='/assets/collab.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Start Your Task</b>", 
		content: "<div class='tour-content-wrapper'>Click 'Start' to begin your task. "
		+"Live tasks turn blue and the timer begins."
		+"<img src='/assets/startTask.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
	},
	{
		orphan: true,
		title: "<b>Complete Your Events</b>", 
		content: "<div class='tour-content-wrapper'>If you are the DRI, complete the task "
		+"on the timeline and complete the documentation questions. There will be a checklist for "
		+"each deliverable of the task. "
		+"<img src='/assets/completeTask.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Open in Drive</b>",
		content: "<div class='tour-content-wrapper'>After clicking on 'Upload' on the event, click on the "
		+"'Open in Drive' button on the top right side of the Google " 
		+"drive page so that you can upload to the drive."
		+"<img src='/assets/openInDrive.png'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Early and On-Time Events</b>", 
		content: "<div class='tour-content-wrapper'>When completed, the event will be marked in green, "
		+"and downstream workers will be notified that they can begin working "
		+"<img src='/assets/regTask.png'> </img></div><nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		orphan: true,
		title: "<b>Delayed Events</b>", 
		content: "<div class='tour-content-wrapper'>If your work takes longer than expected, the event "
		+"will be marked red as delayed. Foundry will email you to request "
		+"a new estimated complete time so the PC can plan accordingly." 
		+"<img src='/assets/delay.png'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>"
	},
	{
		element: "#chat-box-container" ,
		title: "<b>Chat With the Team</b>", 
		content: "<div class='tour-content-wrapper'>You can use this chat feature to commmunicate with the " 
		+"members of the team as well as the project coordinator (PC)."
		+"<img src='/assets/chat.gif'> </img></div>"
		+"<nav class='popover-navigation'><div class='btn-group'>"
		+"<button class='btn btn-default' data-role='prev'>« Prev</button>"
		+"<button class='btn btn-default' data-role='next'>Next »</button></div>"
		+"<button class='btn btn-default' data-role='end'>End tour</button></nav></div>",
		template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-title'></h3>"
		+"<div class='popover-content'></div>",
		placement: "left"
	},
	{
		orphan: true,
		title: "<b>Good luck! </b>", 
		content: "Good luck with your project and please enjoy the use of Foundry!"
	}
]});




$("#expertTourBtn").click(function(){
	//Initialize the expert tour
	expertTour.init();
    expertTour.start(true);
    expertTour.goTo(0); //Always start the tour at the first step 
});

//TODO: PC Tour
//SHELL FOR THE PC TOUR
//A tour to walk the PCs through the use of Foundry
var pcTour = new Tour({
	steps: [
	{
		orphan: true, 
		title: "<b>Welcome to Foundry</b>", 
		content: "View your upcoming tasks, communicate with the team "
		+ "track the progress of the project, "
		+ "and upload and download files from a shared Google Drive folder. //GIF: OVERVIEW PC",
		backdrop: true
	}
]});
	
//Initialize the PC tour
pcTour.init();

/*$("#").click(function(){
    pcTour.start(true);
    pcTour.goTo(0); //Always start the tour at the first step 
});*/


