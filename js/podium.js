Event.observe(window,'load',init);


var leftPosition = 0;
var rightPosition = 300;


/**
* 
*/
function init()
{
	//Position the cars
	$('podium').insert('<div id="car_podium"  class="car_podium"><img src="../images/Race/f1.jpg"/></div>');
	
	//Set events
	Event.observe($('podium_button'),'click',show_podium);
}

/**
* Position the cars on the start line, launch a coundown and start the race. 
*/
function show_podium()
{
	
	var car = $('car_podium');
	//Move the car to the right in the aim to get a transition
	new Effect.Move(car, { x: 2500, y: 0 });
	
}



