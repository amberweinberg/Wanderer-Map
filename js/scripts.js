function initMap() {
        
    var yellow = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'; // Home
    var red = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; // Visited
    var green = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'; // Planned
            
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: .4,
      scale: 2
    };
    
    var nashville = {lat: 36.1868683, lng: -87.065436};
    var london = {lat: 51.5287718, lng: -0.2416821};
    
    var stops;

    var bounds = new google.maps.LatLngBounds();
    
    // Create a map object and specify the DOM element for display.
    
    var map = new google.maps.Map(document.getElementById('wanderer-map'), {
        scrollwheel: false,
        zoom: 3,
        styles: [
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f5f5f2"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#71c8d4"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "color": "#e5e8e7"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "color": "#8ba129"
                    }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c7c7c7"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                    {
                        "color": "#a0d3d3"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "color": "#91b65d"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                    {
                        "gamma": 1.51
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            }
        ]
});
        
    // Display multiple markers on a map
    
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    function addMarker(locations,startingPoint,stops) {
        
        var flightPlanCoordinates = [];
        
        for( i = 0; i < locations.length; i++ ) {
            var position = new google.maps.LatLng(locations[i][1], locations[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                icon: locations[i][3]
            });
            
            // Allow each marker to have an info window    
            
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(locations[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));
    
            // Automatically center the map fitting all markers on the screen
            
            map.fitBounds(bounds);
            
            // Add coordinates to lines
            
            if(stops == "single") {
                flightPlanCoordinates[i] = [{lat: locations[i][1], lng: locations[i][2]}];
            } else if(stops == "multi") {
                flightPlanCoordinates[i] = {lat: locations[i][1], lng: locations[i][2]};
            }
        }
        
        if(stops == "single") {
            for( i = 0; i < flightPlanCoordinates.length; i++ ) {
                var line = new google.maps.Polyline({   
                    path: [startingPoint, flightPlanCoordinates[i][0]],
                    strokeOpacity: 0,
                    icons: [{
                        icon: lineSymbol,
                        offset: '0',
                        repeat: '10px'
                    }],
                    map: map
                });
            }
            
        } else if(stops == "multi") {
            
            flightPlanCoordinates.unshift(startingPoint);
            
            var line = new google.maps.Polyline({   
                path: flightPlanCoordinates,
                strokeOpacity: 0,
                icons: [{
                    icon: lineSymbol,
                    offset: '0',
                    repeat: '10px'
                }],
                map: map
            });
        }
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(3);
        google.maps.event.removeListener(boundsListener);
    });
    
    // Custom Legend

    var legend = document.createElement('div');
    legend.id = 'map-legend';
    var content = [];
    content.push('<h3>Legend</h3>');
    content.push('<p><img src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" alt="Yellow pins are home Bases"/> Home Base(s)</p>');
    content.push('<p><img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" alt="Red pins are visited places"/>Visited</p>');
    content.push('<p><img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png" alt="Green pins are planned to visit this year"/>Planned</p>');
    legend.innerHTML = content.join('');
    legend.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
      
    // Location Sets
      
    addMarker([
        ['<strong>Nashville, TN</strong> (Home)', 36.1868683,-87.065436, yellow],
        ['<strong>Bath, ME</strong> (2016)', 43.9261727,-69.9111862, red],
        ['<strong>Madison, NH</strong> (2016)', 43.8971038,-71.2169391, red],
        ['<strong>Cincinnati, OH</strong> (2015)', 39.1365225,-84.6804872, red],
        ['<strong>Atlanta, GA</strong> (2015)', 33.7679192,-84.5606904, red],
        ['<strong>New York City, NY</strong> (2015)', 40.6976701,-74.2598716, red],
        ['<strong>San Franciso, CA</strong> (2014)', 37.757815,-122.5076402, red],
        ['<strong>Salem, MA</strong> (2014)', 42.5157007,-70.9172737, red],
        ['<strong>Washington, DC</strong> (2013)', 38.89378,-77.1546618, red],
        ['<strong>New Orleans, LA</strong> (2013)', 30.0332195,-90.0226503, red],
        ['<strong>London, England</strong> (Second Home) (2012, 2013, 2015)', 51.5287718,-0.2416821, yellow],
        ['<strong>Mammoth Cave, KY</strong>', 37.186176,-86.1087301, red],
        ['<strong>Gatlinburg, TN</strong>', 35.7273147,-83.533036, red],
        ['<strong>Myrtle Beach, SC</strong>', 33.1454389,-80.0957878, red],
        ['<strong>Memphis, TN (2008)</strong>', 35.1294252,-90.250978, red],
    ],nashville,'single');
    
    addMarker([
        ['<strong>Bath, England</strong> (2012)', 51.3801748,-2.3995494, red],
        ['<strong>Paris, France</strong> (2012)', 48.8589507,2.2770199, red],
        ['<strong>Swansea, Wales</strong> (2012)', 51.6255408,-3.9655064, red],
        ['<strong>Brighten, England</strong> (2012)', 50.8375054,-0.1762296, red],
        ['<strong>Cardiff, Wales</strong> (2014)', 51.5023268,-3.2694495, red],
        ['<strong>Nottingham, England</strong> (2014)', 52.9541053,-1.2401016, red],
        ['<strong>Leigh-on-Sea, England</strong> (2012)', 51.548048,0.6300103, red],
        ['<strong>Eastbourne, England</strong> (2012)', 50.7825347,0.2525859, red]
    ],london,'single');
    
    addMarker([
        ['<strong>Barcelona, Spain</strong> (2016)', 41.3948976,2.0787277, green],
        ['<strong>Palma de Mallorca, Spain</strong> (2016)', 39.570064,2.6107149, green],
        ['<strong>Marseille, France</strong> (2016)', 43.280555,5.2650544, green],
        ['<strong>Pisa, Italy, Spain</strong> (2016)', 43.7068534,10.3253381, green],
        ['<strong>Rome, Italy, Spain</strong> (2016)', 41.9102416,12.2558103, green],
        ['<strong>Pompeii, Italy, Spain</strong> (2016)', 40.7466793,14.4586626, green],
    ],nashville, 'multi');
    
    addMarker([
        ['<strong>Edinburgh, Scotland</strong> (2015)', 55.9411418,-3.2754232, red],
        ['<strong>Glasgow, Scotland</strong> (2015)', 55.8555734,-4.3725413, red],
        ['<strong>Dublin, Ireland</strong> (2015)', 53.3244431,-6.3857872, red],
        ['<strong>York, England</strong> (2015)', 53.9586419,-1.115611, red],
        ['<strong>London, England</strong> (Second Home) (2012, 2013, 2015)', 51.5287718,-0.2416821, yellow],
    ],nashville, 'multi');
    
    addMarker([
        ['<strong>Tulum, Mexico</strong>', 20.2096594,-87.4893856, red],
        ['<strong>Grand Caymen</strong>', 19.3301467,-81.3925165, red],
        ['<strong>Jamaica</strong>', 18.1160128,-77.8364914, red],
    ],nashville, 'multi');
    
    addMarker([
        ['<strong>Nassau, Bahamas</strong> (2011)', 25.0326645,-77.4763358, red],
        ['<strong>St. Thomas</strong> (2011)', 18.3430473,-65.0069724, red],
        ['<strong>St. Maarten</strong> (2011)', 18.0347444,-63.1031311, red],
    ],nashville, 'multi');
}