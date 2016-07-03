<!doctype html>
<html>
	<head>
	  	<meta charset="utf-8">
	  	<meta name="viewport" content="width=device-width, initial-scale=1">
			
		<title>Wanderer Map</title>
		
		<link href="https://fonts.googleapis.com/css?family=Elsie+Swash+Caps:400,900|Open+Sans:400,700" rel="stylesheet">
		<link rel="stylesheet" href="style.css">
		
	</head>
	
	<body>
	
		<header>
		    <h1>Wanderer JS</h1>
            <h2>A Google Maps API Travel Map</h2>
		</header>
		
		<div id="wanderer-map"></div>
				
		<article>
        		
    		<div class="column">
        		<h3>Finished Features</h3>
        		
        		<ol>
            		<li><strong>Starting Locations</strong> - Paths can start from multiple home bases</li>
                    <li><strong>Single Stops</strong> - Only two connected locations (i.e Nashville -> San Francisco)</li>
                    <li><strong>Multiple Stops</strong> - Three or more connected locations (i.e Nashville -> Barcelona -> Palma -> Marseilles)</li>
                    <li><strong>Map Legend</strong></li>
        		</ol>
    		</div>
    		
    		<div class="column">
        		<h3>Dev Goals</h3>
        		
        		<ol>
            		<li><strong>Standalone functions</strong> - Change the script so the 'addMarker' becomes a standalone function that can be used on a separate file</li>
                    <li><strong>Single vs Multi Stops</strong> - Rewrite code so we're not repeating ourselves in the single vs multi type coordinates. Get rid of if/else statements</li>
                    <li><strong>Cleanup JS</strong> - This can be rewritten in a better way.</li>
        		</ol>
    		</div>
        		
		</article>
		
		<!--Scripts-->
		
		<script src="js/scripts.js"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJc2trcHcLVmjJ2nORRl0KcCIegp9hDIA&callback=initMap&libraries=places" async defer></script>
			
	</body>
</html>
