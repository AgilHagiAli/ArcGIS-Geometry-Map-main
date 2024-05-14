import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import type { PermissionState } from '@capacitor/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Compass from '@arcgis/core/widgets/Compass';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';
import Search from '@arcgis/core/widgets/Search';
import TileLayer from '@arcgis/core/layers/TileLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import ImageryTileLayer from '@arcgis/core/layers/ImageryTileLayer'
import Polygon from '@arcgis/core/geometry/Polygon'
import Point from '@arcgis/core/geometry/Point'
import Measurement from '@arcgis/core/widgets/Measurement';
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from "@arcgis/core/Graphic";
import Editor from '@arcgis/core/widgets/Editor';
import Track from '@arcgis/core/widgets/Track';
import Expand from '@arcgis/core/widgets/Expand';
import Locate from '@arcgis/core/widgets/Locate';
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class HomePage implements OnInit {

  constructor() {}
  ngOnInit(): void {
    

      const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current position:', coordinates.coords.latitude);
      };
      
      printCurrentPosition();
      Geolocation.checkPermissions();
      Geolocation.requestPermissions();
     
      

      const url = "https://tiledimageservices6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/WartnaNabadaOrtophoto/ImageServer?token=Z7hXviWYOjpJhK9UoV1ppHH6YP7sh9l4jibg2pxj7n12jsf9hKk_ZudPpgf4QGNZM6vauN42jIFPCXcjjcqJ-Rgtqis0JLCHrmqvNQFMjPsY7jYbi-X5S-gRpHp0pwexi7iyfKHkcqqj-tqY-8wrlsGj9IlQrLugLIyepkKwY_WpadNHSOwOlf393kBhjugR7Bm3ojy6Gbcw32c9BpBQVVAsas2gb8kpUQAYmEj4AuU''https://tiledimageservices6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Warta_Nabada_Ortophoto/ImageServer/?token=Z7hXviWYOjpJhK9UoV1ppHH6YP7sh9l4jibg2pxj7n12jsf9hKk_ZudPpgf4QGNZM6vauN42jIFPCXcjjcqJ-Rgtqis0JLCHrmqvNQFMjPsY7jYbi-X5S-gRpHp0pwexi7iyfKHkcqqj-tqY-8wrlsGj9IlQrLugLIyepkKwY_WpadNHSOwOlf393kBhjugR7Bm3ojy6Gbcw32c9BpBQVVAsas2gb8kpUQAYmEj4AuU"
      // Create a TileLayer using the link you provided
      const OrtoPhoto = new ImageryTileLayer  ({
        url: url
      });
  
  
       const Hamarbile_Informal_Zone_Houses = new FeatureLayer({
        url: "https://services6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Warta_Nabada/FeatureServer/5?token=CT8N7iIpmTZx27n6PhEdoxftpcIlpVftIMGfU-bcPFshHFsfScdcsSjeFtSJem3XGkvIy1DDKx1z5E4cuoakvJ_FdvLRT8MN8AgZvglVrggn3fzZL8ovYaIV1OfRief0NNOZ1W5BmciznmtCjgGpZxaCrWtJSK2n3rmCOy_KIyMYxfgtQfA4-rIWLEHNN4Wz75_wngGu0SHn3TBiWC9WAG88iWFrsux2w3kEZEqbSHo",
        popupTemplate: {
              // autocasts as new PopupTemplate()
              title: "Address: {Address} ", //</br>{Address}
              overwriteActions: true
            },
        outFields: ["*"],
      });
      
  
      const Informal_Zone_Num = new FeatureLayer({
        url: "https://services6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Warta_Nabada/FeatureServer/4?token=CT8N7iIpmTZx27n6PhEdoxftpcIlpVftIMGfU-bcPFshHFsfScdcsSjeFtSJem3XGkvIy1DDKx1z5E4cuoakvJ_FdvLRT8MN8AgZvglVrggn3fzZL8ovYaIV1OfRief0NNOZ1W5BmciznmtCjgGpZxaCrWtJSK2n3rmCOy_KIyMYxfgtQfA4-rIWLEHNN4Wz75_wngGu0SHn3TBiWC9WAG88iWFrsux2w3kEZEqbSHo",
        popupTemplate: {
              // autocasts as new PopupTemplate()
             title: "Grid No: {GridNo}",
              overwriteActions: true
            },
       outFields: ["*"],
      });
      
  
      const HouseNum = new FeatureLayer({
        url: "https://services6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Warta_Nabada/FeatureServer/2?token=CT8N7iIpmTZx27n6PhEdoxftpcIlpVftIMGfU-bcPFshHFsfScdcsSjeFtSJem3XGkvIy1DDKx1z5E4cuoakvJ_FdvLRT8MN8AgZvglVrggn3fzZL8ovYaIV1OfRief0NNOZ1W5BmciznmtCjgGpZxaCrWtJSK2n3rmCOy_KIyMYxfgtQfA4-rIWLEHNN4Wz75_wngGu0SHn3TBiWC9WAG88iWFrsux2w3kEZEqbSHo",
        popupTemplate: {
     //autocasts: new PopupTemplate(), // Corrected the syntax here
      title: "Address: {Address} ", //</br>{Address}
      overwriteActions: true
    },
    outFields: ["*"],
      });
      
        
      const Roads = new FeatureLayer({
        url: "https://services6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Warta_Nabada/FeatureServer/1?token=Arow_6yPzBWfqXw9JaCruZmwP6-7yySg_xl-pnq6Q5wde-BCnhzG5tdU1pBSdjZm7PbS0Pa3Di-rbfg1tMzmUnkqv0KhfoQ1IK8EhoHs49mU_DKRoa2wRNGEFeghkfB1BLgtxjnYgeZwWd2vOYzpoqkhxPyy4P-e-F8aAsyIxZeUDFzS0ALpmkoFJPlaGPFyAhFV4xwDo6ZWonaiZm1J3JJ4rcEiqDXzkoNhdnJFMD8",
        popupTemplate: {
          // autocasts as new PopupTemplate()
          title: "Road type: {Road_Type},  " + "Road name: {Road_Name},",
          overwriteActions: true
        },
        outFields: ["*"],
      });
  
  
      const HamarBile_Informal_Zone = new FeatureLayer({
        url: "https://services6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Warta_Nabada/FeatureServer/3?token=CT8N7iIpmTZx27n6PhEdoxftpcIlpVftIMGfU-bcPFshHFsfScdcsSjeFtSJem3XGkvIy1DDKx1z5E4cuoakvJ_FdvLRT8MN8AgZvglVrggn3fzZL8ovYaIV1OfRief0NNOZ1W5BmciznmtCjgGpZxaCrWtJSK2n3rmCOy_KIyMYxfgtQfA4-rIWLEHNN4Wz75_wngGu0SHn3TBiWC9WAG88iWFrsux2w3kEZEqbSHo",
        //popupTemplate: {
              // autocasts as new PopupTemplate()
             // title: "District boundary: {boundaryna}",
             // overwriteActions: true
           // },
       // outFields: ["*"],
      });
   
  
      const Parcel_Registration = new FeatureLayer({
        url: "https://services6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Parcel_Registration/FeatureServer/?token=CT8N7iIpmTZx27n6PhEdoxftpcIlpVftIMGfU-bcPFshHFsfScdcsSjeFtSJem3XGkvIy1DDKx1z5E4cuoakvJ_FdvLRT8MN8AgZvglVrggn3fzZL8ovYaIV1OfRief0NNOZ1W5BmciznmtCjgGpZxaCrWtJSK2n3rmCOy_KIyMYxfgtQfA4-rIWLEHNN4Wz75_wngGu0SHn3TBiWC9WAG88iWFrsux2w3kEZEqbSHo",
        popupTemplate: {
          title: "Parcel registration information",
          content: [
          {
            type: "fields", // Autocasts as new FieldsContent()
            // Autocasts as new FieldInfo[]
            fieldInfos: [
            {
              fieldName: "ParcelID",
              label: "Parcel ID",
            },
            {
              fieldName: "Neighboring_North",
              label: "Neighboring north",
            },
            {
              fieldName: "Neighboring_South",
              label: "Neighboring south",
            },
            {
              fieldName: "Neighboring_East",
              label: "Neighboring east",
            },
            {
              fieldName: "Neighboring_West",
              label: "Neighboring west",
            },
            {
              fieldName: "Address",
              label: "Adsress",
            },
          ],
            dockEnabled: true, // Enable docking
            dockOptions: {
              buttonEnabled: false, // Hide the dock button
              breakpoint: false // Disable breakpoint docking
            }
          }],
        },
        outFields: ["*"],
      });
   
  
      const Side_length = new FeatureLayer({
        url: "https://services6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Side_length/FeatureServer/?token=CT8N7iIpmTZx27n6PhEdoxftpcIlpVftIMGfU-bcPFshHFsfScdcsSjeFtSJem3XGkvIy1DDKx1z5E4cuoakvJ_FdvLRT8MN8AgZvglVrggn3fzZL8ovYaIV1OfRief0NNOZ1W5BmciznmtCjgGpZxaCrWtJSK2n3rmCOy_KIyMYxfgtQfA4-rIWLEHNN4Wz75_wngGu0SHn3TBiWC9WAG88iWFrsux2w3kEZEqbSHo",
        //popupTemplate: {
              // autocasts as new PopupTemplate()
              //title: "Length: {Shape__Length}",
              //overwriteActions: true
            //},
       //outFields: ["*"],
      });
     
      const Villa_Somalia_Area = new FeatureLayer({
        url: "https://services6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Warta_Nabada/FeatureServer/6?token=CT8N7iIpmTZx27n6PhEdoxftpcIlpVftIMGfU-bcPFshHFsfScdcsSjeFtSJem3XGkvIy1DDKx1z5E4cuoakvJ_FdvLRT8MN8AgZvglVrggn3fzZL8ovYaIV1OfRief0NNOZ1W5BmciznmtCjgGpZxaCrWtJSK2n3rmCOy_KIyMYxfgtQfA4-rIWLEHNN4Wz75_wngGu0SHn3TBiWC9WAG88iWFrsux2w3kEZEqbSHo",
        popupTemplate: {
              // autocasts as new PopupTemplate()
              title: "Address: {Address} ", //</br>{Address}
              overwriteActions: true
            },
        outFields: ["*"],
      });
      
      
      const WartaNabada_houses = new FeatureLayer({
        url: "https://services6.arcgis.com/zQ20N5y05zp7QDy4/arcgis/rest/services/Warta_Nabada/FeatureServer/0?token=CT8N7iIpmTZx27n6PhEdoxftpcIlpVftIMGfU-bcPFshHFsfScdcsSjeFtSJem3XGkvIy1DDKx1z5E4cuoakvJ_FdvLRT8MN8AgZvglVrggn3fzZL8ovYaIV1OfRief0NNOZ1W5BmciznmtCjgGpZxaCrWtJSK2n3rmCOy_KIyMYxfgtQfA4-rIWLEHNN4Wz75_wngGu0SHn3TBiWC9WAG88iWFrsux2w3kEZEqbSHo",
        popupTemplate: {
              // autocasts as new PopupTemplate()
              title: "Address: {Address} ", //</br>{Address}
              overwriteActions: true
            },
        outFields: ["*"],
      });
  
  
      // Create graphicsLayer and add it to the Sketch widget.
      const graphicsLayer = new GraphicsLayer();
  
  
      const map = new Map({
        basemap: 'satellite',
        layers: [OrtoPhoto, WartaNabada_houses, Villa_Somalia_Area, Parcel_Registration, Side_length, HamarBile_Informal_Zone, Roads, HouseNum, Hamarbile_Informal_Zone_Houses, Informal_Zone_Num, graphicsLayer],
      });
  
        const mapView = new MapView({
          container: 'mapView',
          map: map,
          center: [46.1996, 5.1521],
          zoom: 12,
        });
  
  
        // Zoom to the extent of the feature layer when it's loaded
        WartaNabada_houses.when(() => {
          WartaNabada_houses.queryExtent().then((response:any) => {
              mapView.goTo(response.extent);
          });
        });
  
        const sketchWidget = new Sketch({
          layer: graphicsLayer,
          view: mapView,
          
          // Set up the sketch to create polygons
          creationMode: 'update', // 'update' mode allows both creation and update of geometries
        });
        
        // Add the Sketch widget to the bottom-right corner of the view
        //mapView.ui.add(sketchWidget, 'bottom-right');
  
  
        //const startDrawingButton = document.getElementById('startDrawingButton') as HTMLButtonElement;
        const undoDrawingButton = document.getElementById('undoDrawingButton') as HTMLButtonElement;
        const submitDrawingButton = document.getElementById('submitDrawingButton') as HTMLButtonElement;
        const clearDrawingButton = document.getElementById('clearDrawingButton') as HTMLButtonElement;
        const addvertex =  document.getElementById('addVertexButton') as HTMLButtonElement
        const addPolygon =  document.getElementById('addPolygon') as HTMLButtonElement
        let coordinatesArray: any[] = [];
        let tempgraphic = false;
  
  
         //let isDrawing = false; // Flag to track if polygon drawing is active
        let drawnGraphic: __esri.Graphic | null = null; // To store the drawn graphic
  
        // Add a sketch-create event listener to capture the drawn graphic
         //sketchWidget.on('create', (event: any) => {
           //if (event.state === 'complete' && event.graphic) {
            // drawnGraphic = event.graphic;
  
            // if(isDrawing){// continue drawing if the isdrawing is true.  This helps me to not deactivate the drawing sketch when i finish drawing my first polygon. it used to deactivate it before as soon i finish my drawing by double clicking the mouse
              // sketchWidget.create('polygon');
              // isDrawing = true;
             //}
           //}
         //});
  
        
  
         //startDrawingButton.addEventListener('click', () => {
          // if (!isDrawing) {
            // Start the sketch widget for polygon drawing
             //sketchWidget.create('polygon');
             //isDrawing = true;
            // startDrawingButton.textContent = 'Stop Drawing'; // Update button text
           //} else {
            // Deactivate the sketch widget
            // sketchWidget.cancel();
           //  isDrawing = false;
           //  startDrawingButton.textContent = 'Start Drawing'; // Update button text
           //}
        // });
  
  
  
        undoDrawingButton.addEventListener('click', () => {
          // Get the length of the graphics in the graphics layer
          const graphicsLength = graphicsLayer.graphics.length;
  
          // Remove the last graphic if there are any graphics in the layer
          if (graphicsLength > 0 && !tempgraphic) {
              const lastGraphic = graphicsLayer.graphics.getItemAt(graphicsLength - 1);
              graphicsLayer.remove(lastGraphic);
              coordinatesArray.pop();
          }
          else{
            alert('No drawing to undo.');
          }  
           //if (isDrawing) {
             //sketchWidget.undo();
           //} else {
             //alert('No drawing to undo.');
           //}
        });
  
        clearDrawingButton.addEventListener('click', () => {
          // Get all graphics from the graphics layer
          const allGraphics = graphicsLayer.graphics.toArray();
        
          if (allGraphics.length > 0) {
            // Iterate through the array and remove each graphic
            for (const graphic of allGraphics) {
              graphicsLayer.remove(graphic);
              drawnGraphic = null
            }
        
            alert('All drawings removed.');
          } else {
            alert('No drawings to clear.');
          }
        });
  
  
        
        mapView.on('click', (event:any) => {
              // Extract latitude and longitude from the event object
              const latitude = event.mapPoint.latitude;
              const longitude = event.mapPoint.longitude;
              // Push the coordinates into the global array
              coordinatesArray.push({ latitude, longitude });
  
              // Log the array for testing (optional)
              console.log(coordinatesArray);
        
              // Create a point feature using the current location
              const point = new Point({
                  latitude: latitude,
                  longitude: longitude
              });
        
              // Create a new graphic object with the polygon geometry
              const newGraphic = new Graphic({
                  geometry: point
              });
              // Add the graphic to the graphics layer
              graphicsLayer.add(newGraphic);
              
              map.add(graphicsLayer)  
        });
        
        
        const GetLocation = async () => {
          const position= await Geolocation.getCurrentPosition();
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              alert(latitude + " , " +  longitude)
              
        
               //Create a point feature using the current location
              const point = new Point({
                latitude: latitude,
                longitude: longitude
              });
              coordinatesArray.push( {latitude, longitude} );
              console.log(coordinatesArray)
  
              // Create a new graphic object with the polygon geometry
              const newGraphic = new Graphic({
                  geometry: point
              });
              // Add the graphic to the graphics layer
              graphicsLayer.add(newGraphic);
              
              map.add(graphicsLayer)  
  
          
              
        };
  
        function Addpolygon(){
          // If there are enough points to create a polygon (e.g., four points), create a polygon geometry
           // Get all graphics from the graphics layer
           const allGraphics = graphicsLayer.graphics.toArray();
        
           if (allGraphics.length > 0) {
                  const polygonGeometry = new Polygon({
                    rings: [
                        coordinatesArray.map(coord => [coord.longitude, coord.latitude]) // Convert points to coordinates
                    ]
                });
  
                const newGraphic = new Graphic({
                  geometry: polygonGeometry,
                  symbol: {
                      type: "simple-fill",  // You might want to change this based on your requirements
                      color: [227, 139, 79, 0.8],
                      outline: {
                          color: [255, 255, 255],
                          width: 1
                      }
                  }
              });
  
              drawnGraphic = newGraphic  // MOST IMPORTANT
              graphicsLayer.removeAll();
              // Add the graphic to the graphics layer
              graphicsLayer.add(drawnGraphic);
              tempgraphic = true
              console.log(graphicsLayer.graphics.toArray())
  
            // Add the graphics layer to the map if not already added
              if (!map.layers.includes(graphicsLayer)) {
                map.add(graphicsLayer);
              }
           }
           else{
            alert("No polygons to add");
           }
        }
  
        if(addvertex){
          addvertex.addEventListener('click', () => {
            GetLocation();
           });
        }
        if(addPolygon){
          addPolygon.addEventListener('click', () => {
            Addpolygon();
            coordinatesArray = [];
           });
        }
        
        
        // Define the coordinates of four points to create a square around Somalia
        /*const point1 = [41, 10]; // Upper-left corner
        const point2 = [51, 10]; // Upper-right corner
        const point3 = [51, -2]; // Lower-right corner
        const point4 = [41, -2]; // Lower-left corner
  
       // Define the polygon geometry with the coordinates of the four points
        const polygonGeometry = new Polygon({
          rings: [
            [
              point1,
              point2,
              point3,
              point4,
              point1 // Closing point to complete the polygon
            ]
          ]
        });
      // Create a new graphic object with the polygon geometry
      const newGraphic = new Graphic({
        geometry: polygonGeometry
      });*/
  
        submitDrawingButton.addEventListener('click', () => {
          if (drawnGraphic && drawnGraphic.geometry) {
            // Create a new Graphic object with the geometry and attributes
            const newFeature = new Graphic({
              geometry: drawnGraphic.geometry,
              attributes: {
                ParcelID: 'TR' // Set the value of the ParcelID field
              }
            });
            // Add the drawn polygon to the WartaNabada_houses feature layer
            Parcel_Registration.applyEdits({
              addFeatures: [newFeature],
            }).then((result: any) => {
              if (result.addFeatureResults.length > 0 && !result.addFeatureResults[0].error) {
                alert('Polygon added successfully to WartaNabada_houses.');
                //isDrawing = false;
                //startDrawingButton.textContent = 'Start Drawing';
                tempgraphic = false;
                const allGraphics = graphicsLayer.graphics.toArray();
                for (const graphic of allGraphics) {
                  graphicsLayer.remove(graphic);
                }
              } else {
                alert('Error adding polygon to WartaNabada_houses: ' + result.addFeatureResults[0].error);
              }
  
              // Clear the sketch widget, reset the drawing flag, and clear the stored graphic
              sketchWidget.cancel();
              //isDrawing = false;
              drawnGraphic = null;
            });
          } else {
            alert('No drawing to submit.');
          }
        });
  
  
        const editor = new Editor({
          view: mapView,
          //allowedWorkflows: ["update"], // allows only updates and no adds,
          layerInfos: [{
            layer: Parcel_Registration, // pass in the feature layer,
            enabled: true, // Default is true, set to false to disable editing functionality.
            addEnabled: false, // Default is true, set to false to disable the ability to add a new feature.
            updateEnabled: true, // Default is true, set to false to disable the ability to edit an existing feature.
            deleteEnabled: true, // Default is true, set to false to disable the ability to delete features.
            attributeUpdatesEnabled: true, // Default is true, set to false to disable the ability to edit attributes in the update workflow.
            geometryUpdatesEnabled: true, // Default is true, set to false to disable the ability to edit feature geometries in the update workflow.
            attachmentsOnCreateEnabled: true, //Default is true, set to false to disable the ability to work with attachments while creating features.
            attachmentsOnUpdateEnabled: true, //Default is true, set to false to disable the ability to work with attachments while updating/deleting features.
          },
        {
          layer: Side_length, // pass in the feature layer,
          enabled: true, // Default is true, set to false to disable editing functionality.
          addEnabled: false, // Default is true, set to false to disable the ability to add a new feature.
          updateEnabled: true, // Default is true, set to false to disable the ability to edit an existing feature.
          deleteEnabled: true, // Default is true, set to false to disable the ability to delete features.
          attributeUpdatesEnabled: true, // Default is true, set to false to disable the ability to edit attributes in the update workflow.
          geometryUpdatesEnabled: true, // Default is true, set to false to disable the ability to edit feature geometries in the update workflow.
          attachmentsOnCreateEnabled: true, //Default is true, set to false to disable the ability to work with attachments while creating features.
          attachmentsOnUpdateEnabled: true, //Default is true, set to false to disable the ability to work with attachments while updating/deleting features.
        }]
        });
        
        const ExpandEditor = new Expand({
          view: mapView,
          content: editor
        })
        mapView.ui.add(ExpandEditor, 'top-right');
          
  
  
        
  
  
  
        const locate = new Locate({
          view: mapView,
          useHeadingEnabled: false,
          graphic: new Graphic ({
            symbol: new SimpleMarkerSymbol({
              style: "cross",
              size: "25px",  // pixels
              color: "blue", // The color property does not apply to marker symbols defined with the cross or x style.
              outline: {  // autocasts as new SimpleLineSymbol()
                color: [ 255, 255, 0 ],
                width: 3  // points
              } 
            })
          }),
          goToOverride: function(view:any, options:any) {
            options.target.scale = 1500;
            return view.goTo(options.target);
          }
        });
        mapView.ui.add(locate, "top-left");
  
  
  
  
        // Create an instance of the Track widget
        const track = new Track({
          view: mapView,
          
          graphic: new Graphic ({
            symbol: new SimpleMarkerSymbol({
              style: "cross",
              size: "50px",  // pixels
              color: "blue", // The color property does not apply to marker symbols defined with the cross or x style.
              outline: {  // autocasts as new SimpleLineSymbol()
                color: [ 255, 255, 0 ],
                width: 3  // points
              } 
            })
          })
          
        });
        mapView.ui.add(track, 'top-left');
  
        // The sample will start tracking your location
        // once the view becomes ready
        mapView.when(() => {
          // Start tracking
          track.start();
            // If tracking is active, show the Editor tool
            if (track) {
              alert("tracking")
              mapView.ui.add(ExpandEditor, 'top-right');
            } else {
              // If tracking is not active, remove the Editor tool
              mapView.ui.add(ExpandEditor, 'top-right');
            }
         
        });
  
  
        // Create and add the Compass widget to the map view
        const compassWidget = new Compass({
          view: mapView,
        });
        mapView.ui.add(compassWidget, 'top-left');
    
  }
}
