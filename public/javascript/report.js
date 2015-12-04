var url="http://apollo280-crowd.herokuapp.com/";var cluster;var input;var i;var isEmergency=false;function showOtherUser()
{var input="san";$.ajax({url:"http://apollo280-crowd.herokuapp.com/getPosition",type:'GET',data:{"input":input},dataType:'json',success:function(data){if(data=="Error"){alert("Something went wrong!");}else{for(var i=0;i<data.length;i++)
{normalPos=new google.maps.LatLng(data[i].latitude,data[i].longitude);normalImg='images/normalUser.png'
setNormalMarker(normalPos,normalImg,data[i].latitude,data[i].longitude,data[i].name,data[i].mobileNo,data[i].streetAddress);}}},error:function(jqXHR,textStatus,errorThrown){alert('error hai'+textStatus+""+errorThrown);}})}
function setPointer()
{var input=nickname;$.ajax({url:url+"getLatLong",type:'GET',data:{"input":input},dataType:'json',success:function(data){if(data=="Error"){alert("Something went wrong!");}else{latitude=data[0].latitude;longitude=data[0].longitude;img='images/blueUser.png';userPos=new google.maps.LatLng(latitude,longitude);setUserMarker(userPos,nickname);}},error:function(jqXHR,textStatus,errorThrown){alert('error hai'+textStatus+""+errorThrown);}})}
function report(value){clusterReport(latitude,longitude,2,value);}
function clusterReport(lat,lng,distance,value)
{$.ajax({url:"http://apollo280-crowd.herokuapp.com/getPointsInDistance",type:'GET',data:{"lat":lat,"lng":lng,"distance":distance},dataType:'json',success:function(data){for(var i=0;i<data.length;i++)
{var normalPos=new google.maps.LatLng(data[i].latitude,data[i].longitude);var normalImg='images/normalUser1.png';setNormalMarker1(normalPos,normalImg,data[i].latitude,data[i].longitude,data[i].name,data[i].mobileNo,data[i].streetAddress);}
socket.emit('messages',{report:value,lat:latitude,long:longitude},data);},error:function(jqXHR,textStatus,errorThrown){alert('error hai'+textStatus+""+errorThrown);}});}
function showEmergencyLine()
{src=new google.maps.LatLng(37.334812,-121.930692);inter=new google.maps.LatLng(37.353235,-121.903560);dest=new google.maps.LatLng(37.357875,-121.893775);pointsArray=[src,inter,dest];placePolyLineForEmergency();}
function checkInputsBeforeClosing(v1,report_stuff,modalId){if($(v1).val().length>0){$(modalId).modal('hide');if(report_stuff=="madhavWasHere"){isEmergency=true;return false;}
else{report(report_stuff);return false;}}}