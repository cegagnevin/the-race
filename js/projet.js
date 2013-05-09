Event.observe(window,'load',init);


/** Initialization of the coundown */
var nbSeconds = 3; 
/** Identifiers of cars */
var carsArray = ['blue_car', 'white_car', 'red_car'];
/** Contains cars to stop */
var carsStopped = new Array();
/** Minimum number of pixels to move a car */
var minMove = 20;
/** Maximum number of pixels to move a car */
var maxMove = 80;//80 default
/** Height (px) of an intermediary step */
var heightIntermediaryStep = 168;
/** Position of the start line (pixels) */
var linesPositions =  new Array(	{ 'name' : 'Start',      'position' : 180  },
									{ 'name' : 'Step1', 	 'position' : 907  },
									{ 'name' : 'Step2',      'position' : 1795 },
									{ 'name' : 'Step3',      'position' : 2685 },
									{ 'name' : 'Finish',     'position' : 3570 }
								);
								
								
function hideCars()
{
	//Hide the cars
	$('blue_car').hide();	
	$('white_car').hide();
	$('red_car').hide();
}
								
function showXmlRanking(xmlResponse)
{
	//Build the table
	var table_ranking = "<table id='ranking'>";
	var stepsNode = xmlResponse.firstChild.getElementsByTagName('step');
	
	table_ranking += '<tr><td></td><td>1<sup>st</sup></td><td>2<sup>nd</sup></td><td>3<sup>rd</sup></td></tr>';
	
	for(j=0 ; j<stepsNode.length ; j++)
	{
		var step_name = stepsNode[j].attributes.getNamedItem('name').nodeValue;
		
		if(step_name != "Finish")
			table_ranking += '<tr id="line_' + step_name + '"><td>'+step_name+'</td>';
		else table_ranking += '<tr onclick="show_final_rank();"><td>'+step_name+'</td>';
		//console.log(stepsNode[j].attributes.getNamedItem('name').nodeValue); //Name of steps
		
		var carsNode = stepsNode[j].getElementsByTagName('car');
		for(i=0 ; i<carsNode.length ; i++)
		{
			var car_name = carsNode[i].attributes.getNamedItem('name').nodeValue;
			table_ranking += '<td>'+car_name+'</td>';
			//console.log(carsNode[i].attributes.getNamedItem('name').nodeValue); //Name of car
			//console.log(carsNode[i].attributes.getNamedItem('position').nodeValue); //Position of car
		}
		table_ranking += '</tr>';
	}
	table_ranking += '</table';
	
	$('table_track').insert('<br/>'+table_ranking);
	
	//new Effect.Scale('table_track', 0, {duration:1, fps:25, from:1.0, to:0.0});
	
	$('table_track').setOpacity(0);
	$('table_track').setStyle({visibility: 'visible'});
	new Effect.Opacity(
	   'table_track', { 
		  from: 0.0, 
		  to: 1.0,
		  duration: 1.0
	   }
	);
	
	//Disable the show table button
	disable_button('show_table');
	
	Event.observe($('ranking'),'click',show_table_step);
}								
				
/**
* Show the button ranking.
*/
function showButtonRanking()
{
	//Display "Show results" button
	console.log('showXmlRanking');
	$('race_track').insert('<br/><br/><br/><br/><br/><a href="ranking.php" class="nyroModal" id="show_ranking" onclick="hideCars()">RANKING</a>');
	
	var width = 800;
	var height = 700;
	
	/*jQuery(function($){ 
		jQuery.noConflict();
		$('.nyroModal').nyroModal({
			  sizes: {
				initW: width, initH: height,
				minW: width, minH: height,
				w: width, h: height
			  },
			  callbacks: {
				beforeShowCont: function() { 
					width = $('.nyroModalCont').width();
					height = $('.nyroModalCont').height();
					$('.nyroModalCont iframe').css('width', width);
					$('.nyroModalCont iframe').css('height', height);
				}
			  }
			});
	});*/
	
	var $j = jQuery.noConflict();
     
     // Use jQuery via $j(...)
     $j(document).ready(function(){
       $j('.nyroModal').nyroModal({
			  sizes: {
				initW: width, initH: height,
				minW: width, minH: height,
				w: width, h: height
			  },
			  callbacks: {
				beforeShowCont: function() { 
					width = $j('.nyroModalCont').width();
					height = $j('.nyroModalCont').height();
					$j('.nyroModalCont iframe').css('width', width);
					$j('.nyroModalCont iframe').css('height', height);
				}
			  }
			});
     });
	
}


/**
* Send a request to the server to get the xml ranking of the race.
*/
function getXmlRanking()
{
	new Ajax.Request('../php/Race/ControllerRace.php', 
		{
			method: 'post',
			postBody:"action=XmlRanking", 
			onSuccess: function(response) 
			{
				showXmlRanking(response.responseXML);
			}
						
		});
}

/**
* Send cars's name to server when a car reached a step.
*/
function sendPosition(carName, step)
{
	new Ajax.Request('../php/Race/ControllerRace.php', 
	{
		method: 'post',
		postBody:"action=StoreCarRank&carName="+carName+"&step="+step, 
		onSuccess: function(response) {
			//alert("Car's position sent");
		}
					
	});
}

/**
* Send to the server to initialize the race.
*/
function sendInitRace()
{
	new Ajax.Request('../php/Race/ControllerRace.php', 
		{
			method: 'post',
			postBody:"action=InitRace", 
			onSuccess: function(response) {
				//alert("Session initialized");
			}
						
		});
}

/**
* Allows to know the top position of this element.
*/
function getVerticalPosition(idElement)
{
	var pos = Position.positionedOffset(idElement).toString();
	var indexOfComma = pos.indexOf(",");
	return parseInt(pos.substring(indexOfComma+1, pos.length-1));
}



/**
* Disable the button whose his identifier is given in params.
*/
function disable_button(idButton)
{
	$(idButton).writeAttribute( 'disabled', 'disabled');
	$(idButton).setStyle({ 'background' : 'lightgrey', 
						   'color'	   : 'grey'});
}

/**
* Enable the button whose his identifier is given in params.
*/
function enable_button(idButton)
{
	$(idButton).removeAttr('disabled');
}

/**
* Strip whitespace from the beginning and end of a string.
*/
function trim(myString)
{
	return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
} 

/**
* Return the index of the line name searched into the "linesPositions" array.
*/
function getIndexOfLineName(lineName)
{
	for(var i=0 ; i<linesPositions.length ; i++)
	{
		if(linesPositions[i]['name'] == lineName)
		{
			return i;
		}
	}
	return -1;
}

/**
* Display a countdown before the begin of the race.
*/
function launch_countdown(stop=false)
{	
	var colors = ['green','yellow','orange','red'];
	if(stop == false)
	{
		var myColor = (!parseInt(nbSeconds)) ? colors[0] : colors[nbSeconds];
		$('countdown').setStyle({color : myColor}).update(nbSeconds);
		if(nbSeconds != 'Go !')
		{
			if(nbSeconds == 1)
			{
				nbSeconds = 'Go !';
				color = 'green';
			}
			else nbSeconds = nbSeconds - 1;
			setTimeout("launch_countdown(false)",1000);
		}
		else setTimeout("launch_countdown(true)",1500);
	}
	else $('countdown').setStyle({display : 'none'});
}

/**
* Scroll the page in order to follow cars.
*/
function followCars(speed)
{
	setInterval("window.scrollBy(0,"+speed+")", 52);
}


/**
* Position the cars on the start line, launch a coundown and start the race. 
*/
function start_race()
{
	//Disable the start button
	disable_button('start_button');
	//Position cars on the start line
	//$('audio_player').writeAttribute('src', '../audio/f1loin_SF.ogg');
	var cars = $$('div.car');
	for (var i=0 ; i<cars.length ; i++)
	{
		new Effect.Move(cars[i], { x: 0, y: linesPositions[0][ 'position'] });
	}
	//Stop the sond played
	/*setTimeout	(	function() 
					{
						$('audio_player').writeAttribute('src', '')
					},
					1000
				);
	*/
	
	//Launch the countdown after 2 seconds
	setTimeout("launch_countdown(false)", 2000);
	
	//Launch the race when the countdown is finished
	setTimeout("moveTo(linesPositions[1]['position'], linesPositions[1]['name'], linesPositions[1]['position']+heightIntermediaryStep)", 5000);
	setTimeout("followCars(3)", 5000);
}



/**
* Return a number of pixels corresponding of the distance to move.
*/
function aleaLength(min, max)
{
	return (Math.random() * max)+min;
}


/**
* Move cars to step given in params and send the position of the cars to the server. It calls recursively with good params to go step to step.
*/
function moveTo(positionStep, nameStep, positionAfterEffect)
{
	var aleaArray = new Array();
	var effectCode = '';
	for(var i=0 ; i <carsArray.length ; i++)
	{
		aleaArray.push(aleaLength(minMove, maxMove));
		
		//Build the effect code
		if(getVerticalPosition(carsArray[i]) < parseInt(positionStep))
		{
			effectCode += 'new Effect.Move("'+carsArray[i]+'", { sync: true, x: 0, y: '+aleaArray[i]+', transition: Effect.Transitions.linear }),';
		}
		else //The car is stopped
		{
			if(carsStopped.indexOf(carsArray[i]) == -1 ) //if this car isn't ever stopped
			{
				carsStopped.push(carsArray[i]);
				//Send position to the server
				sendPosition(carsArray[i], nameStep);
				console.log('position of car '+carsArray[i]+' sended!');
			}
			
		}
	}
	var max = Math.min.apply(null, aleaArray);
	
	//Run the effet
	if(trim(effectCode).length > 0)
	{
		eval('new Effect.Parallel(['+effectCode+'], { duration: 1.0, afterFinish: function(){moveTo(positionStep, nameStep, positionAfterEffect)}  });'); 
	}
	else //Reposition and relaunch the race if it isn't finished
	{
		reposition(positionAfterEffect, nameStep);
	}
}

/**
* Reposition cars to the position specified in params.
*/
function reposition(position, nameStep)
{
	var effectCode = '';
	for(var i=0 ; i <carsArray.length ; i++)
	{
		var margin = position - getVerticalPosition(carsArray[i]);
		effectCode += 'new Effect.Move("'+carsArray[i]+'", { sync: true, x: 0, y: '+margin+', transition: Effect.Transitions.linear }),';
	} 

	carsStopped = new Array();
	var functionAfterFinish = 	//We call the function moveTo() with good params
								"var indexOfNextStep = parseInt(getIndexOfLineName(nameStep))+1;"+
								"if (typeof linesPositions[indexOfNextStep] == \"undefined\")"+ //Cars are arrived at the finish line
								"{"+
								"	showButtonRanking();"+
								"	return;"+
								"}"+
								//Move cars to the next step
								"moveTo(linesPositions[indexOfNextStep]['position'], linesPositions[indexOfNextStep]['name'], linesPositions[indexOfNextStep]['position']+heightIntermediaryStep);";	

	
	
	eval('new Effect.Parallel(['+effectCode+'], { afterFinish: (function(nameStep){'+functionAfterFinish+'})(nameStep)  });'); 
	
}


/**
* Create the racetrack, position the cars, set the game and set events.
*/
function init()
{
	//Initialize the race on server side
	sendInitRace();

	//Create the racetrack
	$('race_track').insert('<img alt="racetrack" src="../images/Race/racetrack.png" class="racetrack" />');
	$('container').setStyle({ 'height' : '4400px'});
	
	//Position the cars
	$('race_track').insert('<div id="blue_car"  class="car"><img src="../images/Race/blue_car.png"  /></div>');
	$('race_track').insert('<div id="white_car" class="car"><img src="../images/Race/white_car.png" /></div>');
	$('race_track').insert('<div id="red_car"   class="car"><img src="../images/Race/red_car.png"   /></div>');

	//Set events
	Event.observe($('start_button'),'click',start_race);

}


/**
* Show the table of the steps. 
*/
function show_table_step()
{
	/*
	//Position the cars
	$('podium').insert('<div id="car_podium"  class="car_podium"><img src="../images/Race/f1.jpg"/></div>');
	
	var car = $('car_podium');
	//Move the car to the right in the aim to get a transition
	new Effect.Move(car, { x: 2500, y: 0 });*/
		
	new Ajax.Request('../php/Race/ControllerRace.php', 
		{
			method: 'post',
			postBody:"action=FinalRank", 
			evalJSON: "force",
			onSuccess: function(response) 
			{
				showJsonRanking(response.responseJSON);
			}
		});
	
}

/**
* Show the ranking. 
*/					
function showJsonRanking(response)
{	
	var cars = response;

	/*$('line_Step1').remove();
	$('line_Step2').remove();
	$('line_Step3').remove();*/
	
	$('line_Step1').fade();
	$('line_Step2').fade();
	$('line_Step3').fade();
	
	if(cars)
	{
		var str = '';
		cars.each(
				function (car)
				{
					var today = new Date(), expires = new Date();
					expires.setTime(today.getTime() + (365*24*60*60*1000));
					
					document.cookie = car.name + "=" +  car.score + ";expires=" + expires.toGMTString();
				});
	}	
	else alert('Erreur dans le JSON');
}		

/**
* Show the place in the podium. 
*/
function show_final_rank()
{
	var scoreBlue = getCookie('blue_car');
	var scoreRed = getCookie('red_car');
	var scoreWhite = getCookie('white_car');
	
	var first;;
	var second;;
	var third;
	
	if(scoreBlue >= scoreRed)
	{
		if(scoreBlue>=scoreWhite)
		{
			first = "Blue";
			scoreFirst = scoreBlue;
			if(scoreWhite>=scoreRed)
			{
				second = "White";
				third = "Red";
				scoreSecond = scoreWhite;
				scoreThird = scoreRed;
			}
			else
			{
				second = "Red";
				third = "White";
				scoreSecond = scoreRed;
				scoreThird = scoreWhite;
			}
		}
		else
		{
			scoreFirst = scoreWhite;
			scoreSecond = scoreBlue;
			scoreThird = scoreRed;
			first = "White";
			second = "Blue";
			third = "Red";
		}
	}
	else if(scoreBlue >= scoreWhite)
	{
		if(scoreBlue >= scoreRed)
		{
			first = "Blue";
			if(scoreRed>=scoreWhite)
			{
				second = "Red";
				third = "White";
				scoreFirst = scoreBlue;
				scoreSecond = scoreRed;
				scoreThird = scoreWhite;
			}
			else
			{
				second = "White";
				third = "Red";
				scoreFirst = scoreBlue;
				scoreSecond = scoreWhite;
				scoreThird = scoreRed;
			}
		}
		else
		{
			scoreFirst = scoreRed;
			scoreSecond = scoreBlue;
			scoreThird = scoreWhite;
			first = "Red";
			second = "Blue";
			third = "White";
		}
	}
	else if(scoreRed >= scoreBlue)
	{
		if(scoreRed >= scoreWhite)
		{
			first = "Red";
			if(scoreWhite>=scoreBlue)
			{
				second = "White";
				third = "Blue";
				scoreFirst = scoreRed;
				scoreSecond = scoreWhite;
				scoreThird = scoreBlue;
			}
			else
			{
				second = "Blue";
				third = "White";
				scoreFirst = scoreRed;
				scoreSecond = scoreBlue;
				scoreThird = scoreWhite;
			}
		}
		else
		{
			scoreFirst = scoreWhite;
			scoreSecond = scoreRed;
			scoreThird = scoreBlue;
			first = "White";
			second = "Red";
			third = "Blue";
		}
	}
	else if(scoreRed >= scoreWhite)
	{
		if(scoreRed >= scoreBlue)
		{
			first = "Red";
			if(scoreWhite>=scoreBlue)
			{
				second = "White";
				third = "Blue";
				scoreFirst = scoreRed;
				scoreSecond = scoreWhite;
				scoreThird = scoreBlue;
			}
			else
			{
				second = "Blue";
				third = "White";
				scoreFirst = scoreRed;
				scoreSecond = scoreBlue;
				scoreThird = scoreWhite;
			}
		}
		else
		{
			scoreFirst = scoreRed;
			scoreSecond = scoreBlue;
			scoreThird = scoreWhite;
			first = "Red";
			second = "Blue";
			third = "White";
		}
	}
	else if(scoreWhite >= scoreBlue)
	{
		if(scoreWhite >= scoreRed)
		{
			first = "White";
			if(scoreRed>=scoreBlue)
			{
				second = "Red";
				third = "Blue";
				scoreFirst = scoreWhite;
				scoreSecond = scoreRed;
				scoreThird = scoreBlue;
			}
			else
			{
				second = "Blue";
				third = "Red";
				scoreFirst = scoreWhite;
				scoreSecond = scoreBlue;
				scoreThird = scoreRed;
			}
		}
		else
		{
			scoreFirst = scoreRed;
			scoreSecond = scoreWhite;
			scoreThird = scoreBlue;
			first = "Red";
			second = "White";
			third = "Blue";
		}
	}		
	else if(scoreWhite >= scoreRed)
	{
		if(scoreWhite >= scoreBlue)
		{
			first = "White";
			if(scoreRed>=scoreBlue)
			{
				second = "Red";
				third = "Blue";
				scoreFirst = scoreWhite;
				scoreSecond = scoreRed;
				scoreThird = scoreBlue;
			}
			else
			{
				second = "Blue";
				third = "Red";
				scoreFirst = scoreWhite;
				scoreSecond = scoreBlue;
				scoreThird = scoreRed;
			}
		}
		else
		{
			scoreFirst = scoreBlue;
			scoreSecond = scoreWhite;
			scoreThird = scoreRed;
			first = "Blue";
			second = "White";
			third = "Red";
		}
	}
	
	var today = new Date(), expires = new Date();
	expires.setTime(today.getTime() + (365*24*60*60*1000));
					
	document.cookie = "first=" +  first + ";expires=" + expires.toGMTString();
	document.cookie = "second=" +  second + ";expires=" + expires.toGMTString();
	document.cookie = "third=" +  third + ";expires=" + expires.toGMTString();
	
	//$('ranking').hide();
	Effect.Puff('ranking');
	
	
	//sleep between the displays
	$('table_track').insert("<div id='final_results' onclick='show_podium();'><br/><h1>Final results</h1><br/><h2>1st place : "+ first +"("+ scoreFirst +" points)<br/>2nd place : "+ second + "("+ scoreSecond +" points)<br/>3rd place : "+ third +"("+ scoreThird +" points)<br/></h2></div>");
	
	$('table_track').setOpacity(0);
	$('table_track').setStyle({visibility: 'visible'});
	new Effect.Opacity(
	   'table_track', { 
		  from: 0.0, 
		  to: 1.0,
		  duration: 2.0
	   }
	);
}

/**
* Show the podium. 
*/
function show_podium()
{
	Effect.Puff('final_results');
	$('table_track').insert("<img src='../images/Race/podium.jpg' id='podium'/>");
	
	$('table_track').setOpacity(0);
	$('table_track').setStyle({visibility: 'visible'});
	new Effect.Opacity(
	   'table_track', { 
		  from: 0.0, 
		  to: 1.0,
		  duration: 2.0
	   }
	);
	
	var first = getCookie('first');
	var second = getCookie('second');
	var third = getCookie('third');
	
	$('table_track').insert("<img id='carFirst' src='../images/Race/"+ first + "_front.png'/>");
	$('table_track').insert("<img id='carSecond' src='../images/Race/"+ second + "_front.png'/>");
	$('table_track').insert("<img id='carThird' src='../images/Race/"+ third + "_front.png'/>");
	
	new Effect.Grow(
	   'carFirst', { 
		  duration: 6.0
	   }
	);
	
	new Effect.Grow(
	   'carSecond', { 
		  duration: 4.0
	   }
	);
	
	new Effect.Grow(
	   'carThird', {
		  duration: 3.0
	   }
	);

	
	setTimeout("addRestartButton()",8000);
	$('restart').setOpacity(0);
	$('restart').setStyle({visibility: 'visible'});
	new Effect.Opacity(
	   'restart', { 
		  from: 0.0, 
		  to: 1.0,
		  duration: 2.0
	   }
	);
}

/**
* Add the restart button.
*/
function addRestartButton() {
	$('table_track').insert("<br/><br/><br/><br/><br/><a href='../TPs/projet_ajax.php' id='restart'>RESTART</a>");
}

function getCookie(sName) {
        var cookContent = document.cookie, cookEnd, i, j;
        var sName = sName + "=";
  
        for (i=0, c=cookContent.length; i<c; i++) {
                j = i + sName.length;
                if (cookContent.substring(i, j) == sName) {
                        cookEnd = cookContent.indexOf(";", j);
                        if (cookEnd == -1) {
                                cookEnd = cookContent.length;
                        }
                        return decodeURIComponent(cookContent.substring(j, cookEnd));
                }
        }      
        return null;
}

//SCROLLER
//setInterval("window.scrollBy(0,3)",10);
//POSITION
//Position.positionedOffset(carsArray[0]);