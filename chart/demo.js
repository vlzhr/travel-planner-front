function prepareJSPlumb() {

    const color = "#cce";

    if (!instance) {
        instance = jsPlumb.getInstance({
            Connector: ["Bezier", {curviness: 50}],
            DragOptions: {cursor: "pointer", zIndex: 2000, stop: onPointDrag},
            PaintStyle: {stroke: color, strokeWidth: 2},
            EndpointStyle: {radius: 1, fill: color},
            HoverPaintStyle: {stroke: "#ec9f2e"},
            EndpointHoverStyle: {fill: "#ec9f2e"},
            Container: "canvas"
        });

        instance.bind("connection", function(connection) {
            const c = connection;
            connection = connection.connection;
            const arrowsss = [0, connection.sourceId.slice(11), connection.targetId.slice(11)];
            loadDest(arrowsss[1], arrowsss[2], (data) => {
                console.log(data);
                if (data['distance']) {
                    const text = String(data["distance"]) + "km<br>" + String(data["price"]) + "rub";
                    connection.addOverlay([ "Label", { label: text}]);
                }

            });
        });

    }

    instance.batch(function () {

        const windows = jsPlumb.getSelector(".chart-demo .fresh");
        for (let i = 0; i < windows.length; i++) {
            windows[i].classList.remove("fresh");
            instance.addEndpoint(windows[i], {
                uuid: windows[i].getAttribute("id") + "-bottom",
                anchor: "Bottom",
                maxConnections: -1
            });
            instance.addEndpoint(windows[i], {
                uuid: windows[i].getAttribute("id") + "-top",
                anchor: "Top",
                maxConnections: -1
            });
        }

        instance.draggable(windows);

    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);
}