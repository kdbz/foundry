/* interaction.js
 * ---------------------------------------------
 * Code that manages the interactions (collaborations and handoffs)
 * Drawing from scratch, drag response on (popovers.js)
 */
var DRAWING_HANDOFF = false;
var DRAWING_COLLAB = false;
var INTERACTION_TASK_ONE_IDNUM = 0;
var interaction_counter = undefined;

//For Interactions
/*timeline_svg.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("refX", 1)
    .attr("refY", 2)
    .attr("markerWidth", 3) 
    .attr("markerHeight", 2)
    .attr("stroke", "pink")
    .attr("fill", "gray")
    .append("path")
        .attr("d", "M 0,0 V 2 L2,2 Z");*/

//Called when a user clicks a task rectangle (aka event)
//Determines if the user is trying to draw an interaction and if so, what type
function eventMousedown(task2idNum) {
    var task1idNum = INTERACTION_TASK_ONE_IDNUM;

    if (DRAWING_HANDOFF == true) $("#handoff_btn_" + task1idNum).popover("hide");
    if (DRAWING_COLLAB == true) $("#collab_btn_" + task1idNum).popover("hide");
 
   //show modal if handoff or collaboration is NOT being drawn
    if (DRAWING_HANDOFF != true && DRAWING_COLLAB != true){
       var modal_body = '<p id="task-text"></p>' +
       '<p><span id="task-edit-link"></span></p>';

       var modal_footer =  '<button class="btn " id="hire-task" style="float :left " onclick="hireForm('+task2idNum+')">Hire</button>' +
       '<button class="btn " id="start-end-task" style="float :right " onclick="confirm_show_docs('+task2idNum+')">Start</button>'+
       '<button class="btn " id="pause-resume-task" style="float :right " onclick="pauseTask('+task2idNum+')">Pause</button>'+
       '<button class="btn" id="edit-save-task" onclick="editTaskOverview(true,'+task2idNum+')">Edit</button>' +
       '<button type="button" class="btn btn-danger" id="delete" onclick="confirmDeleteEvent(' + task2idNum +');">Delete</button>';
     
       $('#task_modal').modal('show'); 
       $('.task-modal-footer').html(modal_footer);
       $('.task-modal-body').html(modal_body);

      showTaskOverview(task2idNum);
    }

    //Check if interaction already exists
    if (DRAWING_COLLAB == true || DRAWING_HANDOFF == true) {
        timeline_svg.on("mousemove", null);
        $(".followingLine").remove();

        //Swap if task2 starts first
        if(firstEvent(task1idNum, task2idNum) == task2idNum)  {
            var t2Id = task2idNum;
            task2idNum = task1idNum;
            task1idNum = t2Id;
        }
        
        for (var i = 0; i < flashTeamsJSON["interactions"].length; i++) {
            var inter = flashTeamsJSON["interactions"][i];
            if ((inter.event1 == task1idNum && inter.event2 == task2idNum) 
                || (inter.event1 == task2idNum && inter.event2 == task1idNum)) {
                alert("Sorry, this interaction already exists.");
                DRAWING_COLLAB = false;
                DRAWING_HANDOFF = false;
                return;
            }
        }
    }

    //The user has cancelled the drawing
    if (task1idNum == task2idNum) {
        DRAWING_COLLAB = false;
        DRAWING_HANDOFF = false;
    //Draw a handoff from task one to task two
    } else if (DRAWING_HANDOFF == true) {
        if (interaction_counter == undefined) {
            interaction_counter = initializeInteractionCounter();
        } 
        interaction_counter++;
        updateStatus();
        var ev1 = flashTeamsJSON["events"][getEventJSONIndex(task1idNum)];
        var ev2 = flashTeamsJSON["events"][getEventJSONIndex(task2idNum)];
        var task1End = ev1.startTime + ev1.duration;
        
        if (task1End <= ev2.startTime) {
            var color = "gray";
            var handoffData = {"event1":task1idNum, "event2":task2idNum, 
                "type":"handoff", "description":"", "id":interaction_counter, "color":color};
            flashTeamsJSON.interactions.push(handoffData);
            updateStatus(false);
            drawHandoff(handoffData);
            DRAWING_HANDOFF = false;
            $(".task_rectangle").popover("hide");
            //d3.event.stopPropagation();
            INTERACTION_TASK_ONE_IDNUM = 0; // back to 0
        } else {
            alert("Sorry, the second task must begin after the first task ends.");
            DRAWING_COLLAB = false;
            DRAWING_HANDOFF = false;
        }
    //Draw a collaboration link between task one and task two
    } else if (DRAWING_COLLAB == true) {
        var ev1 = flashTeamsJSON["events"][getEventJSONIndex(task1idNum)];
        var ev2 = flashTeamsJSON["events"][getEventJSONIndex(task2idNum)];
        var task1X = ev1.x;
        var task1Width = getWidth(ev1);
        var task2X = ev2.x;
        var task2Width = getWidth(ev2);

        var overlap = eventsOverlap(task1X, task1Width, task2X, task2Width);
        if (overlap > 0) {
            if (interaction_counter == undefined) {
                interaction_counter = initializeInteractionCounter();
            }
            interaction_counter++;
            updateStatus();
            var collabData = {"event1":task1idNum, "event2":task2idNum, 
                "type":"collaboration", "description":"", "id":interaction_counter};
            flashTeamsJSON.interactions.push(collabData);
            updateStatus(false);
            drawCollaboration(collabData, overlap);
            DRAWING_COLLAB = false;
            $(".task_rectangle").popover("hide");
            //d3.event.stopPropagation();
            INTERACTION_TASK_ONE_IDNUM = 0; // back to 0
        } else {
            alert("These events do not overlap, so they cannot collaborate.");
            DRAWING_COLLAB = false;
            DRAWING_HANDOFF = false;
        }
    //There is no interation being drawn
    } else {
        return;
    }
}


//Called when we find DRAWING_HANDOFF
//initializes creating a handoff b/t two events
function startWriteHandoff() {
    if(isUser) { // user page
        return;
    }

    d3.event.stopPropagation();

    INTERACTION_TASK_ONE_IDNUM = this.getAttribute('groupNum');
    DRAWING_HANDOFF = true;
    var m = d3.mouse(this);
    //console.log("x: " + m[0] + " y: " + m[1]);
    
    var timelineSvg = window._foundry.timeline.timelineSvg;
    var handoffLayerSvg = window._foundry.timeline.handoffLayer;
    line = handoffLayerSvg.append("line")
        .attr("class", "followingLine")
        .attr("x1", m[0])
        .attr("y1", m[1])
        .attr("x2", m[0])
        .attr("y2", m[1])
        .attr("stroke-width", 3)
        .attr("stroke", "gray");
    timelineSvg.on("mousemove", interMouseMove);
};

function handoffStart(firstEvent){
    var x1 = firstEvent.x;
    var width = getWidth(firstEvent);
    return x1+width;

}

// Draw a handoff for the first time
// Don't call this directly. Call 'drawEachHandoffForEvent' in events.js instead.
function drawHandoff(handoffData) {
    var task1Id = handoffData["event1"];
    var task2Id = handoffData["event2"];
    var handoffId = handoffData["id"];

    //Find end of task 1
    var ev1 = flashTeamsJSON["events"][getEventJSONIndex(task1Id)];
    var x1 = handoffStart(ev1);
    var y1 = ev1.y + 50;
    
    //Find beginning of task 2
    var ev2 = flashTeamsJSON["events"][getEventJSONIndex(task2Id)];
    var x2 = ev2.x + 3;
    var y2 = ev2.y + 50;

    var handoffLayerSvg = window._foundry.timeline.handoffLayer;
    var path = handoffLayerSvg.selectAll("path.handoffLine")
       .data(flashTeamsJSON["interactions"]);

    path.enter().insert("svg:path")
       .attr("class", "link")
       .style("stroke", "#ccc");

    path = handoffLayerSvg.append("path")
        .attr("class", "handoffLine")
        .attr("id", function () {
            return "interaction_" + handoffId;
        })
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("d", function(d) {
            return routeHandoffPath(ev1, ev2, x1, x2, y1, y2);

        })
        .attr("stroke", function() {
            if (isWorkerInteraction(handoffId)) return WORKER_TASK_NOT_START_COLOR; //highlight for workers
            else return "gray";
        })
        .attr("stroke-width", 3)
        .attr("stroke-opacity", ".45")
        .attr("fill", "none")
        .attr("marker-end", "url(#arrowhead)")
        .on("mouseover", function() { 
            d3.select(this).style("stroke-opacity", .95);
            d3.select(this).style("stroke", TASK_START_BORDER_COLOR);
        })
        .on("mouseout", function() { 
            d3.select(this).style("stroke-opacity", .45);
            if (isWorkerInteraction(handoffId)) d3.select(this).style("stroke", WORKER_TASK_NOT_START_COLOR);
            else d3.select(this).style("stroke", "gray");
        });

    $("#interaction_" + handoffId).popover({
        class: "handoffPopover", 
        id: '"handoffPopover_' + handoffId + '"',
        html: "true",
        trigger: "click",
        title: "Handoff",
        content: 'Description of Handoff Materials: '
        + getHandoffInfo(handoffId),
        container: $("#timeline-container")
    });
}

function getHandoffInfo(handoffId){
	if(in_progress != true && (current_user == "Author" || memberType =="author" || memberType == "pc" || memberType == "client") ) {
		content = '<textarea rows="2.5" id="interactionNotes_' + handoffId + '">'
		+ flashTeamsJSON["interactions"][getIntJSONIndex(handoffId)].description 
		+ '</textarea><br />'
		+ '<button type="button" class="btn btn-success" id="saveHandoff' + handoffId + '"'
        +' onclick="saveHandoff(' + handoffId +');">Save</button>'
        + '<button type="button" class="btn" onclick="hideHandoffPopover(' + handoffId +');">Cancel</button> '
        + '<button type="button" class="btn btn-danger" id="deleteInteraction_' + handoffId + '"'
        +' onclick="deleteInteraction(' + handoffId +');">Delete</button>';
      } else{
	      content = '<p id="interactionNotes_' + handoffId + '">'
	      +flashTeamsJSON["interactions"][getIntJSONIndex(handoffId)].description 
	      + '</p><br />'
	      + '<button type="button" class="btn" onclick="hideHandoffPopover(' + handoffId +');">Close</button><br /> ';
      }
	return content;
}

//Route circuit-like paths for the handoffs
//Use d3 path to route from event 1 end to event 2 beginning
function routeHandoffPath(ev1, ev2, x1, x2, y1, y2) {
    //OLD CURVE CODE
    /*var dx = x1 - x2,
        dy = y1 - y2,
        dr = Math.sqrt(dx * dx + dy * dy);
    //For ref: http://stackoverflow.com/questions/13455510/curved-line-on-d3-force-directed-tree
    return "M " + x1 + "," + y1 + "\n A " + dr + ", " + dr 
        + " 0 0,0 " + x2 + "," + (y2+15);*/

    //Line out from first event to gutter
    var pathStr = "M " + (x1) + "," + y1 + "\n"; // + "L " + x2 + ", " + y2
    pathStr += "L " + (x1+4) + ", " + y1 + "\n";3
    //Route path either to the horizontal gutter above or below
    //Then route to second event horizontally
    if (y1 <= y2) { //Event 1 is higher
        pathStr += "L " + (x1+4) + ", " + (y1+25) + "\n";
        pathStr += "L " + (x2+1) + ", " + (y1+25) + "\n"; 
    } else { //Event 2 is higher
        pathStr += "L " + (x1+4) + ", " + (y1-55) + "\n";
        pathStr += "L " + (x2+1) + ", " + (y1-55) + "\n";
    }
    //Route to second event vertically
    pathStr += "L " + (x2+1) + ", " + y2 + "\n";
    //Line from gutter to second event
    pathStr += "L " + (x2+5) + ", " + y2 + "\n";

    //Arrowhead
    pathStr += "L" + (x2+6) + ", " + (y2+2) + "\n";
    pathStr += "L" + (x2+8) + ", " + (y2) + "\n";
    pathStr += "L" + (x2+6) + ", " + (y2-2) + "\n";
    
    return pathStr;
}

//Close the popover on a member to "cancel" the edit
function hideHandoffPopover(handoffId) {
    $('#interaction_' + handoffId).popover("hide");
}

//Save handoff notes and update popover
function saveHandoff(intId) {
    //Update Popover Content
    var notes = $("#interactionNotes_" + intId).val()
    $("#interaction_" + intId).data('popover').options.content = 'Description of Handoff Materials: '
        +'<textarea rows="2" id="interactionNotes_' + intId + '">' + notes + '</textarea><br />'
        + '<button type="button" class="btn btn-success" class="btn" id="saveHandoff' + intId + '"'
        +' onclick="saveHandoff(' + intId +');">Save</button>          '
        + '<button type="button" class="btn" onclick="hideHandoffPopover(' + intId +');">Cancel</button> '
        + '<button type="button" class="btn btn-danger" id="deleteInteraction_' + intId + '"'
        +' onclick="deleteInteraction(' + intId +');">Delete</button>';

    //Update JSON
    var indexOfJSON = getIntJSONIndex(intId);
    flashTeamsJSON["interactions"][indexOfJSON].description = notes;
    updateStatus();

    //Hide Popover
    $("#interaction_" + intId).popover("hide");
}


//Called when we click the collaboration button initializes creating 
//a collaboration b/t two events
function startWriteCollaboration(ev) {
    if(isUser) { // user page
        return;
    }
    
    d3.event.stopPropagation();

    INTERACTION_TASK_ONE_IDNUM = this.getAttribute('groupNum'); 
    DRAWING_COLLAB = true;
    var m = d3.mouse(this);
    var timelineSvg = window._foundry.timeline.timelineSvg;
    var collabLayerSvg = window._foundry.timeline.collabLayer;
    line = collabLayerSvg.append("line")
        .attr("class", "followingLine")
        .attr("x1", m[0])
        .attr("y1", m[1])
        .attr("x2", m[0])
        .attr("y2", m[1])
        .attr("stroke-width", 3)
        .attr("stroke", "black")
        .attr("stroke-dasharray", (4,4));
    timelineSvg.on("mousemove", interMouseMove);
};

//Draw collaboration between two events, calculates which event 
//comes first and what the overlap is
function drawCollaboration(collabData, overlap) {
    var task1Id = collabData["event1"];
    var task2Id = collabData["event2"];
    var collabId = collabData["id"];

    var ev1 = flashTeamsJSON["events"][getEventJSONIndex(task1Id)];
    var y1 = ev1.y; // padding on the top and bottom of timeline rows + height of x-axis labels

    var ev2 = flashTeamsJSON["events"][getEventJSONIndex(task2Id)];
    var x2 = ev2.x + 3;
    var y2 = ev2.y;

    var firstTaskY = 0;
    var taskDistance = 0;
    if (y1 < y2) {
        firstTaskY = y1 + RECTANGLE_HEIGHT;
        taskDistance = y2 - firstTaskY;
    } else {
        firstTaskY = y2 + RECTANGLE_HEIGHT;
        taskDistance = y1 - firstTaskY;
    }
    var collabLayerSvg = window._foundry.timeline.collabLayer;
    collabLine = collabLayerSvg.append("rect")
        .attr("class", "collaborationRect")
        .attr("id", function () {
            return "interaction_" + collabId;
        })
        .attr("x", x2)
        .attr("y", firstTaskY-9) //AT hack to fix overlap w/ tab members
        .attr("height", taskDistance+9)
        .attr("width", overlap) //START HERE, FIND REAL OVERLAP
        .attr("fill", "#B0BBBF")
        .attr("fill-opacity", .7)
        .on("mouseover", function() { d3.select(this).style("fill-opacity", .9)})
        .on("mouseout", function() { d3.select(this).style("fill-opacity", .7)});

    drawCollabPopover(collabId);
}

//Add a popover to the collaboration rect so the user can add notes and delete
function drawCollabPopover(collabId) {
    $("#interaction_" + collabId).popover({
        class: "collabPopover", 
        id: '"collabPopover_' + collabId + '"',
        html: "true",
        trigger: "click",
        title: "Collaboration",
        content: 'Description of Collaborative Work: '
        + getCollabInfo(collabId),
        container: $("#timeline-container")
    });
}

function getCollabInfo(collabId){
	
	if(in_progress != true && (current_user == "Author" || memberType =="author" || memberType == "pc" || memberType == "client") ) {
		content = '<textarea rows="2.5" id="collabNotes_' + collabId + '">'
		+ flashTeamsJSON["interactions"][getIntJSONIndex(collabId)].description
        +'</textarea><br />'
        + '<button type="button" class="btn btn-success" id="saveCollab' + collabId + '"'
        +' onclick="saveCollab(' + collabId +');">Save</button>          '
        + '<button type="button" class="btn" onclick="hideCollabPopover(' + collabId +');">Cancel</button> '
        + '<button type="button" class="btn btn-danger" id="deleteInteraction_' + collabId + '"'
        +' onclick="deleteInteraction(' + collabId +');">Delete</button>';
      } else{
	      content = '<p id="collabNotes_' + collabId + '">'
	      + flashTeamsJSON["interactions"][getIntJSONIndex(collabId)].description
        +'</p><br />'
        + '<button type="button" class="btn" onclick="hideCollabPopover(' + collabId +');">Close</button><br /> ';
      }
	
	return content;
}

//Saves the new notes text in the collab
function saveCollab(intId) {
    //Update Popover's Content
    var notes = $("#collabNotes_" + intId).val()
    $("#interaction_" + intId).data('popover').options.content =   'Description of Collaborative Work: '
        +'<textarea rows="2.5" id="collabNotes_' + intId + '">' + notes + '</textarea><br />'
        + '<button type="button" class="btn btn-success" id="saveCollab' + intId + '"'
        +' onclick="saveCollab(' + intId +');">Save</button>          '
        + '<button type="button" class="btn" onclick="hideCollabPopover(' + intId +');">Cancel</button> '
        + '<button type="button" class="btn btn-danger" id="deleteInteraction_' + intId + '"'
        +' onclick="deleteInteraction(' + intId +');">Delete</button>';

    //Update JSON
    var indexOfJSON = getIntJSONIndex(intId);
    flashTeamsJSON["interactions"][indexOfJSON].description = notes;
    updateStatus();

    //Hide Popover
    $("#interaction_" + intId).popover("hide");
}

function hideCollabPopover(intId){
	 $("#interaction_" + intId).popover("hide");
}

//Deletes the interaction from the timeline and the JSON
function deleteInteraction(intId) {
    //Destroy Popover
    $("#interaction_" + intId).popover("destroy");

    //Delete from JSON
    var indexOfJSON = getIntJSONIndex(intId);
    flashTeamsJSON["interactions"].splice(indexOfJSON, 1);
    updateStatus();

    //Delete Arrow or Rectangle
    $("#interaction_" + intId).remove();
}

//Returns the event that begins first
function firstEvent(task1idNum, task2idNum) {
    //console.log(arguments);
    var task1Rect = $("#rect_" + task1idNum)[0];
    var x1 = task1Rect.x.animVal.value + 3;
    var task2Rect = $("#rect_" + task2idNum)[0];
    var x2 = task2Rect.x.animVal.value + 3;

    if (x1 <= x2) return task1idNum;
    else return task2idNum;
}

//Calculate the overlap of two events
function eventsOverlap(task1X, task1Width, task2X, task2Width) {
    var task1End = task1X + task1Width;
    var task2End = task2X + task2Width;

    //Task2 starts after the end of Task1
    if ((task1End <= task2X) || (task2End <= task1X)) {
        return 0;
    } else {
        var overlapStart;
        if (task1X <= task2X) overlapStart = task2X;
        else overlapStart = task1X;
            var overlapEnd = 0;
        //Task 1 Ends first or they end simultaneously
        if (task1End <= task2End) overlapEnd = task1End;
        //Task 2 Ends first
        else overlapEnd = task2End;
        return overlapEnd-overlapStart;
    }
}

//Follow the mouse movements after a handoff is initialized
function interMouseMove() {
    var m = d3.mouse(this);
    line.attr("x2", m[0]-3)
        .attr("y2", m[1]-3);
}

//Retrieve index of the JSON object using its id
function getIntJSONIndex(idNum) {
    for (var i = 0; i < flashTeamsJSON["interactions"].length; i++) {
        if (flashTeamsJSON["interactions"][i].id == idNum) {
            return i;
        }
    }
}

function initializeInteractionCounter() {
    if (flashTeamsJSON["interactions"].length == 0) return 0; 
    else {
        var highestId = 0;
        for (i = 0; i < flashTeamsJSON["interactions"].length; i++) {
            if (flashTeamsJSON["interactions"][i].id > highestId) {
                highestId = flashTeamsJSON["interactions"][i].id;
            }
        }
        return highestId;
    }
}

function isWorkerInteraction(id) {
    //Get all events related to a worker
    var events = window._foundry.events;
    var workerEvents = []; 
    for (var i = 0; i<flashTeamsJSON["events"].length; i++) {
        var eventObj = flashTeamsJSON["events"][i];
        if (events.isWorkerTask(eventObj)) {
            workerEvents.push(eventObj["id"]);
        }
    }
    //Find out if a worker's events are linked to the specified handoff
    for (var i = 0; i<workerEvents.length; i++) {
        if (flashTeamsJSON["interactions"][getIntJSONIndex(id)].event1 == workerEvents[i]) return true;
        else if (flashTeamsJSON["interactions"][getIntJSONIndex(id)].event2 == workerEvents[i]) return true;
    }
    return false;
}


