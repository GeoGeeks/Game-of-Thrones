idmap = "d469bc9456124f7f9985ac97204fb9a4"

var  getQueryVariable = ()=>
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       console.log("lo que trae la variable "+query)
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               //if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Bookmarks",
  "esri/widgets/Home"
], function(WebMap, MapView, Bookmarks, Home) {
  let baseExtent = {
    xmin: -2588034.141,
    ymin: -1467944.146,
    xmax: 4334103.14,
    ymax: 2690230.193,
    spatialReference: 3857
  };
getQueryVariable();
  const webmap = new WebMap({
    portalItem: {
      // autocasts as new PortalItem()
      id: idmap
    }
  });

  const view = new MapView({
    container: "viewDiv",
    map: webmap,
    extent: baseExtent,
    constraints: {
      rotationEnabled: false
    }
  });
  const homeBtn = new Home({
    view: view
  });
  const bookmarks = new Bookmarks({
    view: view
  });
  console.log(webmap);
  // Add the widget to the top-right corner of the view
  view.ui.add(bookmarks, {
    position: "top-right"
  });
  view.ui.add(homeBtn, "top-left");

  view.on("drag", function(event) {
    console.log(view.extent);
    // prevents zooming with the mouse-wheel event
    if (view.extent.xmin < baseExtent.xmin) event.stopPropagation();
    if (view.extent.xmax > baseExtent.xmax) event.stopPropagation();
    if (view.extent.ymin < baseExtent.ymin) event.stopPropagation();
    if (view.extent.ymax > baseExtent.ymax) event.stopPropagation();

    event.st;
  });

  // bonus - how many bookmarks in the webmap?
  webmap.when(function() {
    if (webmap.bookmarks && webmap.bookmarks.length) {
      console.log("Bookmarks: ", webmap.bookmarks.length);
    } else {
      console.log("Este mapa no tiene marcas");
    }
  });
});
