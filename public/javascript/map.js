var map;
var sanJose = new google.maps.LatLng(37.335187,-121.881072);
var clickCount = 0;
var start;
var end;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var distanceInMiles;
var pointsArray=[];
var wayLat=[], wayLong=[];
var alertUsers=[];
var finalCluster=[];


//Function to add the polyLineForEmergency
function placePolyLineForEmergency()
{
	
  var flightPath=new google.maps.Polyline({
  path:pointsArray,
  strokeColor:"#FF0000",
  strokeOpacity:0.8,
  strokeWeight:3,
  map:map,
  });
}


function placeHazardMarker(reportLoc,nickname) {
var markerHazardLocation = reportLoc;
 var marker = new google.maps.Marker({
    position: markerHazardLocation,
    icon:'images/hazard.png',
    map: map,
    zIndex: 10

 });
  (function(marker) {
        // add click event
        google.maps.event.addListener(marker, 'click', function() {
            infowindow = new google.maps.InfoWindow({
                content:'Reported Hazard by: '+ nickname + '<br/>' + 'Latitude: '+markerHazardLocation.lat() + '<br/>' + 'Longitude: '+markerHazardLocation.lng()
            });
            infowindow.open(map, marker);
        });
    })(marker);
}

function placeAccidentMarker(reportLoc,nickname) {
var markerAccidentLocation = reportLoc;
 var marker = new google.maps.Marker({
    position: markerAccidentLocation,
    icon:'images/accident.png',
    map: map,
    zIndex: 10
  });
  (function(marker) {
        // add click event
        google.maps.event.addListener(marker, 'click', function() {
            infowindow = new google.maps.InfoWindow({
                content:'Reported Accident by: '+ nickname + '<br/>' + 'Latitude: '+markerAccidentLocation.lat() + '<br/>' + 'Longitude: '+markerAccidentLocation.lng()
            });
            infowindow.open(map, marker);
        });
    })(marker);
}

function placeEmergencyVehicleMarker(reportLoc,nickname) {

var markerEmergencyVehicleLocation = reportLoc;
 var marker = new google.maps.Marker({
    position: markerEmergencyVehicleLocation,
    icon:'images/emergencyVehicle.png',
    map: map,
    zIndex: 10
  });
  (function(marker) {
        // add click event
        google.maps.event.addListener(marker, 'click', function() {
            infowindow = new google.maps.InfoWindow({
                content:'Reported Emergency Vehicle by: '+ nickname + '<br/>' + 'Latitude: '+markerEmergencyVehicleLocation.lat() + '<br/>' + 'Longitude: '+markerEmergencyVehicleLocation.lng()
            });
            infowindow.open(map, marker);
        });
    })(marker);
}

function placeTrafficJamMarker(reportLoc,nickname) {
var markerTrafficJamLocation = reportLoc;
 var marker = new google.maps.Marker({
    position: markerTrafficJamLocation,
    icon:'images/trafficJam.png',
    map: map,
    zIndex: 10
  });
  (function(marker) {
        // add click event
        google.maps.event.addListener(marker, 'click', function() {
            infowindow = new google.maps.InfoWindow({
                content:'Reported Traffic Jam by: '+ nickname + '<br/>' + 'Latitude: '+markerTrafficJamLocation.lat() + '<br/>' + 'Longitude: '+markerTrafficJamLocation.lng()
            });
            infowindow.open(map, marker);
        });
    })(marker);
}

function placeClosedRoadsMarker(reportLoc,nickname) {
var markerClosedRoadsLocation = reportLoc;
 var marker = new google.maps.Marker({
    position: markerClosedRoadsLocation,
    icon:'images/closedRoads.png',
    map: map,
    zIndex: 10
  });
  (function(marker) {
        // add click event
        google.maps.event.addListener(marker, 'click', function() {
            infowindow = new google.maps.InfoWindow({
                content:'Reported Closed Roads by: '+ nickname + '<br/>' + 'Latitude: '+markerClosedRoadsLocation.lat() + '<br/>' + 'Longitude: '+markerClosedRoadsLocation.lng()
            });
            infowindow.open(map, marker);
        });
    })(marker);
}

function placeTrafficPoliceMarker(reportLoc,nickname) {
var markerPoliceLocation = reportLoc;
 var marker = new google.maps.Marker({
    position: markerPoliceLocation,
    icon:'images/trafficPolice.png',
    map: map,
    zIndex: 10
  });
  
  (function(marker) {
        // add click event
        google.maps.event.addListener(marker, 'click', function() {
            infowindow = new google.maps.InfoWindow({
                content:'Reported Traffic Police by: '+ nickname + '<br/>' + 'Latitude: '+markerPoliceLocation.lat() + '<br/>' + 'Longitude: '+markerPoliceLocation.lng()
            });
            infowindow.open(map, marker);
        });
    })(marker);
}

function setUserMarker(userPos,nickname) {
	 var name = nickname;
	 var marker = new google.maps.Marker({
	    position: userPos,
	    icon:img,
	    map: map,
        zIndex: 8
	  });
	  
	  (function(marker) {
        // add click event
        google.maps.event.addListener(marker, 'click', function() {
            infowindow = new google.maps.InfoWindow({
                content:'User: ' +nickname+  '<br/>' +'Latitude: '+userPos.lat() + '<br/>' + 'Longitude: '+userPos.lng()
            });
            infowindow.open(map, marker);
        });
    })(marker);
}

function setNormalMarker(normalPos,normalImg,latitude,longitude,name,mobileno,stAddress) {
	 var marker = new google.maps.Marker({
	    position: normalPos,
	    icon:normalImg,
	    map: map,
        zIndex: 5
	  });
	  
	  // process multiple info windows
    (function(marker, i) {
        // add click event
        google.maps.event.addListener(marker, 'click', function() {
            infowindow = new google.maps.InfoWindow({
            	content:'User: ' +name+  '<br/>' +'Latitude: '+latitude + '<br/>' + 'Longitude: '+longitude + '<br/>' +'StAddress: '+stAddress + '<br/>' + 'Mobile No: '+mobileno
            });
            infowindow.open(map, marker);
        });
    })(marker, i);
}
function setNormalMarker1(normalPos,normalImg,latitude,longitude,name,mobileno,stAddress) {
	//alert("reached" + latitude + longitude+name+stAddress+city+mobileno);
	 var marker = new google.maps.Marker({
	    position: normalPos,
	    icon:normalImg,
	    map: map,
        zIndex: 5
	  });
	  
	  // process multiple info windows
   (function(marker, i) {
       // add click event
       google.maps.event.addListener(marker, 'click', function() {
           infowindow = new google.maps.InfoWindow({
           	content:'User: ' +name+  '<br/>' +'Latitude: '+latitude + '<br/>' + 'Longitude: '+longitude + '<br/>' +'StAddress: '+stAddress + '<br/>' + 'Mobile No: '+mobileno
           });
           infowindow.open(map, marker);
       });
   })(marker, i);
}


function placeSrcDestMarker(location) // place src destination pins
{

  var marker;

	   start=userPos; // user location as start point
     // start = location; //location of start point
   	  /*marker = new google.maps.Marker({
    	position: location,
    	map: map,
    	icon:'images/greenPinIcon.png',
       zIndex: 15
  	  });*/
   if(clickCount == 1)
   {
   	  end = location;
      marker = new google.maps.Marker({
    	position: location,
    	map: map,
    	icon:'images/bluePinIcon.png',
        zIndex: 15
  	  });
   }
   
   (function(marker) {
       // add click event
       google.maps.event.addListener(marker, 'click', function() {
           infowindow = new google.maps.InfoWindow({
        	   content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
           });
           infowindow.open(map, marker);
       });
   })(marker);
    
  if(clickCount == 1)  //when two pointers call function
  {
	  
	calNoOfCluster();
	  setRoutes();
	 userPos=location;
	 
	  
  }
}

function calNoOfCluster() {
	
	var len,i;
	var clusterCenter=0;
	  var request = {
	      origin:start,
	      destination:end,
	      travelMode: google.maps.TravelMode.DRIVING
	  };
	 
	 directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) { 
	     pointsArray = response.routes[0].overview_path;
	     len=pointsArray.length;
	    // placePolyLineForEmergency();
	     for(i=0;i<len;i++)
	    	 {
	    	 wayLat.push(pointsArray[i].lat());
	    	 wayLong.push(pointsArray[i].lng());
	    	 }
	     for(clusterCenter=0; clusterCenter<pointsArray.length; clusterCenter++)
	     {
	    	 showPOIStart(pointsArray[clusterCenter].lat(),pointsArray[clusterCenter].lng(),0.5);
	    	 // calNPMGeoDistance(pointsArray[clusterCenter].lat(), pointsArray[clusterCenter].lng(), pointsArray[clusterCenter+1].lat(), pointsArray[clusterCenter+1].lng());
	     }
	    
	   console.log("length alerts"+alertUsers.length);
	  
	     isEmergency=false;
		  clickCount=0;
	    }           
	});
	 
}





function showPOIStart(lat,lng,distance)
{
	$.ajax({
		url : "http://localhost:3000/getPointsInDistance",
		type : 'GET',
		data :{
			"lat" : lat,
			"lng" : lng,
			"distance" : distance
		},
	dataType: 'json',
		success : function(data) {	
			if(data=="No result found"){
				
			}
			else{
				console.log("in POI");
				for(var i=0; i<data.length; i++)
				{
					if(alertUsers.indexOf(data[i].name) == -1){
					alertUsers.push(data[i].name);
					 console.log("length alerts"+alertUsers.length);
					 console.log("alertData----"+ data[i].name);
					 var normalPos=new google.maps.LatLng(data[i].latitude,data[i].longitude);
					 var normalImg='images/normalUser1.png';
					 setNormalMarker1(normalPos,normalImg,data[i].latitude,data[i].longitude,data[i].name,data[i].mobileNo,data[i].streetAddress);
					 socket.emit('sendAlert',data[i].name,wayLat,wayLong);
					} 
				}
				
				
			}
		},	
		error : function(jqXHR, textStatus, errorThrown) {
			alert('error hai' + textStatus + "" + errorThrown);
		}
	});
	
}


function calNPMGeoDistance(lat1,lon1,lat2,lon2)
{
	$.ajax({
        url:"http://localhost:3000/calNPMGeoDistance",
        type:'GET',
        data :{
				"lat1" : lat1,
				"lon1" : lon1,
				"lat2" : lat2,
				"lon2" : lon2
			},
        success: function(result) {
        	if(result == "Error")
        	{
        		alert('error' + textStatus + "" + errorThrown);
        	}else{
        		distanceInMiles = parseFloat(result,6);
        		showPOIStart(lat1,lon1,0.5);
        	}
        },
        error: function(jqXHR, textStatus, errorThrown) {
        	alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function initialize() {
	
	var flightPath=new google.maps.Polyline({
		  strokeColor:"#FF0000",
		  strokeOpacity:0.8,
		  strokeWeight:2,
		  });
		  
		  directionsDisplay = new google.maps.DirectionsRenderer(
		  {
		  	suppressMarkers: true,
		  	polylineOptions: flightPath,
		  	preserveViewprot: true
		  	
		  });
	
	
  var mapDiv = document.getElementById('googleMap');
  var myOptions = {
    zoom: 14,
    center: sanJose,
    mapTypeControl:false,
  	panControl:true,
  	zoomControl:true,
  	scaleControl:true,
  	streetViewControl:true,
  	overviewMapControl:true,
  	rotateControl:true,  
  	mapTypeId:google.maps.MapTypeId.ROADMAP
  }
  
  map = new google.maps.Map(mapDiv, myOptions); 

  directionsDisplay.setMap(map);
  google.maps.event.addListener(map, 'click', function(event) {
  	if(isEmergency == true && clickCount ==0)
  	{
  		clickCount = clickCount +1;
  		placeSrcDestMarker(event.latLng);
  	}else
  	{
  		isEmergency = false;
  		clickCount = 0;
  	}
  		
  });
 
}

google.maps.event.addDomListener(window, 'load', initialize);

