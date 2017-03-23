$(function() {
    $('.datepicker').datepicker({
        inline: true,
        firstDay: 1,
        showOtherMonths: true,
        showMonthAfterYear: false,
        yearRange: "2017:2025",
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dateFormat: "yy-mm-dd",
        onSelect: function(date) {
     scheduler.updateView(new Date(date), "unit");
        }
    });
    /////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    //DHTMLX CONFIG//
    ////////////////////////////////////////////////////////////////
    scheduler.locale.labels.unit_tab = "Unit"
    scheduler.config.details_on_create = true;
    scheduler.config.details_on_dblclick = true;
    scheduler.config.limit_time_select = true;
    scheduler.config.first_hour = 8;
    scheduler.config.last_hour = 17;
    scheduler.config.time_step = 15;
    scheduler.config.multi_day = false;
    scheduler.config.collision_limit = 1;
	scheduler.config.start_on_monday = true;
	scheduler.locale.labels.new_event = "New Task";  
    scheduler.templates.event_class=function(start, end, event){
	var css = "";
	if(event.subject) 
	 css += "event_"+event.subject;
	 if(event.id == scheduler.getState().select_id){
	 css += " selected";}
				return css; 
			};
		var subject = [
            	{ key: '', label: 'Normal' },
				{ key: 'high', label: 'High' },
				{ key: 'science', label: 'Medium' },
                { key: 'math', label: 'Low' }];

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//test client name array of object and you can store collection on mongo database
///////////////////////////////////////////////////////////////////////////////////////////////////////////
	    var sections = [{
        key: 'Mike',
        label: "Mike"
     }, {
        key: 'Mr laith',
        label: "Mr laith"
     }, {
        key: 'Alex',
        label: "Alex"
     }, {
        key: 'hamza',
        label: "hamza"
     }, {
        key: 'razan',
        label: "razan"
     }, {
        key: 'jaap',
        label: "japp"
     }, {
        key: 'reds',
        label: "reds"
     }, {
        key: 'kaled',
        label: "kaled"
     }];
        scheduler.createUnitsView({  
        name: "unit",
        size:5,
        step:5,
        list: sections,
        property: "client",
    });
  	scheduler.config.lightbox.sections=[
				{name:"description", height:43, map_to:"text", type:"textarea" , focus:true},
				{name:"Priority", height:20, type:"select", options: subject, map_to:"subject" },
				{name:"time", height:72, type:"time", map_to:"auto" }];

	scheduler.init('scheduler_here',new Date(),"unit");
	scheduler.templates.xml_date = function(value){
        return new Date(value); };
		scheduler.load("/data", "json");	
        var dp = new dataProcessor("/data");
		dp.init(scheduler);
		dp.setTransactionMode("POST", false);
/////////////////////////////////////////////////////////////////////////////////////////////
$('.datepicker').draggable();
$('#piemenu').draggable();
var piemenu = new wheelnav('piemenu');
piemenu.clockwise = false;
piemenu.wheelRadius = piemenu.wheelRadius * 0.83;
piemenu.createWheel();  
})

  