  var ww=33.48;
	var bl=68;
	var bt=20;
	var cmd = "heatmap";
	var map1;
	var map2;


 
function init()
{
	backgroudlayer();
	///navigation/////////
	
   //create configuration object
   var config1 = {
      element: document.getElementById('heatmapCanvas1'),
      radius: 45,
      legend: {position: 'br',title: 'Occupancy Distribution'}
   };
   map1 = h337.create(config1);

   var config2 = {
      element: document.getElementById('heatmapCanvas2'),
      radius: 45,
      legend: {position: 'br',title: 'Occupancy Distribution'}
   };
   map1 = h337.create(config2);
	//map1 = h337.create({"element":document.getElementById("heatmapCanvas1"), "radius":45, legend: {position: 'br',title: 'Occupancy Distribution'}});
	//map2 = h337.create({"element":document.getElementById("heatmapCanvas2"), "radius":45, legend: {position: 'br',title: 'Occupancy Distribution'}});
	
	///location/////////////
	var canvasID="heatmapCanvas1";
	var host = "ws://172.19.13.9:1160";
	clearHeatmap(canvasID);
	try
  {
    socket = new WebSocket(host);
    socket.onopen = function() {
    	alert("Welcome To SinBerBEST WiFi Localization System!");
    	timerStart();
    	};
 		socket.onclose = function (evt) {alert("Server is Close")}; 
 		//onmessage event occurs when client receives data from server.   
      socket.onmessage = function (evt) {
 			
 			var pos= evt.data;
 			
			if (pos.length <10)
			{
				return;
			}
						
			if (pos=="clearToShown")
			{
				 if (canvasID=="heatmapCanvas1")
				 {
				 	  document.getElementById(canvasID).className = "CanvasToShow";
				 	  canvasID="heatmapCanvas2";
				 	  document.getElementById(canvasID).className = "CanvasToHidden";
				 	  clearHeatmap(canvasID);
				 }
				 else
				 {
				 		document.getElementById(canvasID).className = "CanvasToShow";
				 	  canvasID="heatmapCanvas1";
				 	  document.getElementById(canvasID).className = "CanvasToHidden";
				 	  clearHeatmap(canvasID);
				 }		 	
			}
		  else
		  {		 
				var str1 = pos.split("-");
				var id = str1[0];
				var posV = str1[1];
				var str2= posV.split(',');
				var posx = parseFloat(str2[0]);
				var posy = parseFloat(str2[1]);
			
				var x_pixel=posx*ww+bl;
				var y_pixel=posy*ww+bt;				
				
				addHeatmapData(x_pixel, y_pixel,canvasID);
			}
				
 		}; 
		socket.onerror = function (evt)
		 {
		 	 alert("Server is error");
		 	}; 
  }
  catch(ex){alert("Something is error");}
  
  
}

function timerStart()
{
	SendData();
	t=setTimeout("timerStart()",1000);
}

function SendData() {
            try{
                socket.send(cmd);
            }catch(ex){
               alert("Send is error");
            }
           
        };
   




function clearHeatmap(canvasID)
{
	if (canvasID=="heatmapCanvas1")
	{
		map1.store.clearDataSet();
	}
  else
	{
		map2.store.clearDataSet();
	}
}

function addHeatmapData(x,y,canvasID)
{	
	if (x>900 || y>500)
	{
		return;
	}
	
	if (canvasID=="heatmapCanvas1")
	{
		map1.store.addDataPoint(x,y,1);
	}
  else
	{
		map2.store.addDataPoint(x,y,1);
	}

}

	

	

        
