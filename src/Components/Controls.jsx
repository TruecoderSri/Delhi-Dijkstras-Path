import { useEffect, useState } from "react";
import { Locations } from "../Methods/Locations.js";
import L from "leaflet";
import PropTypes from "prop-types";
import "../App.css";
import { graph, dijkstra } from "../Methods/Dijkstras.js";
import {
  calculateTotalDistance,
  calculateDistance,
} from "../Methods/distanceCalculator.js";
import RenderGraph from "../Methods/RenderGraph";
import Information from "./Information";

const Controls = ({ mapRef }) => {
  const [startLocation, setStartLocation] = useState("");
  const [viaLocation, setViaLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  const [shortestPath, setShortestPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [distance, setDistance] = useState(0);

  const [startMarker, setStartMarker] = useState(null);
  const [viaMarker, setViaMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  useEffect(() => {
    RenderGraph();
  }, []);

  const handleStartLocationChange = (e) => {
    setStartLocation(e.target.value);
    setViaLocation("");
    setShortestPath([]);
    resetMarkers();
    resetDistanceAndEta();
    clearMap();
  };

  const handleEndLocationChange = (e) => {
    setEndLocation(e.target.value);
    setShortestPath([]);
    resetMarkers();
    resetDistanceAndEta();
    clearMap();
  };

  const handleViaLocationChange = (e) => {
    setViaLocation(e.target.value);
    resetDistanceAndEta();
    clearMap();
  };

  const clearMap = () => {
    if (startMarker) {
      mapRef.current.removeLayer(startMarker);
      setStartMarker(null);
    }
    if (viaMarker) {
      mapRef.current.removeLayer(viaMarker);
      setViaMarker(null);
    }
    if (endMarker) {
      mapRef.current.removeLayer(endMarker);
      setEndMarker(null);
    }
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapRef.current.removeLayer(layer);
      }
    });
  };

  const resetMarkers = () => {
    if (startMarker) {
      mapRef.current.removeLayer(startMarker);
      setStartMarker(null);
    }
    if (viaMarker) {
      mapRef.current.removeLayer(viaMarker);
      setViaMarker(null);
    }
    if (endMarker) {
      mapRef.current.removeLayer(endMarker);
      setEndMarker(null);
    }
  };

  const resetDistanceAndEta = () => {
    setDistance(0);
  };

  const handleFindShortestRoute = () => {
    resetMarkers();

    let path;
    let visitedNodes = []; // Declare visitedNodes variable and initialize it as an empty array
    if (viaLocation) {
      const { shortestPath, visitedNodes: visitedNodes1 } = dijkstra(
        graph,
        startLocation,
        viaLocation
      );
      const { shortestPath: path2, visitedNodes: visitedNodes2 } = dijkstra(
        graph,
        viaLocation,
        endLocation
      );
      if (shortestPath && path2) {
        path = [...shortestPath, ...path2.slice(1)];
        visitedNodes = [...visitedNodes1, ...visitedNodes2];
        setVisitedNodes(visitedNodes);
      }
    } else {
      const { shortestPath: path1, visitedNodes: visitedNodes1 } = dijkstra(
        graph,
        startLocation,
        endLocation
      );
      if (path1) {
        path = path1;
        visitedNodes = visitedNodes1;
        setVisitedNodes(visitedNodes);
      }
    }

    if (path) {
      setShortestPath(path); // Update shortestPath state variable

      const latlngs = path.map((locationName) => {
        const location = Locations.find((loc) => loc.name === locationName);
        return [location.latitude, location.longitude];
      });

      const polyline = L.polyline(latlngs, { color: "blue" }).addTo(
        mapRef.current
      );

      mapRef.current.fitBounds(polyline.getBounds());

      // Render markers for visited nodes
      visitedNodes.forEach((node) => {
        const location = Locations.find((loc) => loc.name === node);
        L.marker([location.latitude, location.longitude], {
          icon: L.divIcon({ className: "visited-node-marker" }),
          html: `<b>${node}</b>`,
        }).addTo(mapRef.current);
      });

      // Render markers for start, via, and end locations
      if (startLocation) {
        renderLocationMarker(startLocation, "start-marker", true);
      }

      if (viaLocation) {
        renderLocationMarker(viaLocation, "via-marker", true);
      }

      if (endLocation) {
        renderLocationMarker(endLocation, "end-marker", true);
      }

      // Calculate total distance traveled
      const locationsVisited = visitedNodes.map((node) =>
        Locations.find((loc) => loc.name === node)
      );
      const totalDistance = calculateTotalDistance(locationsVisited);
      console.log("Total distance traveled:", totalDistance);
      calculateDistanceAndEta(path);
    }
  };

  const renderLocationMarker = (locationName, markerClass, bold = false) => {
    const location = Locations.find((loc) => loc.name === locationName);
    L.marker([location.latitude, location.longitude], {
      icon: L.divIcon({ className: markerClass }),
      html: bold ? `<b>${locationName}</b>` : locationName,
    }).addTo(mapRef.current);
  };

  const calculateDistanceAndEta = (path) => {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const source = Locations.find((loc) => loc.name === path[i]);
      const destination = Locations.find((loc) => loc.name === path[i + 1]);
      totalDistance += calculateDistance(source, destination);
    }
    setDistance(totalDistance);
  };

  const filteredViaLocations = Locations.filter(
    (location) =>
      location.name !== startLocation && location.name !== endLocation
  );

  const filteredEndLocations = Locations.filter(
    (location) =>
      location.name !== startLocation && location.name !== viaLocation
  );

  const handleReset = () => {
    setStartLocation("");
    setViaLocation("");
    setEndLocation("");
    setShortestPath([]);
    setVisitedNodes([]);
    setDistance(0);
    resetMarkers();
    resetDistanceAndEta();
    clearMap();
  };

  return (
    <div className="m-4 p-4 grid grid-rows-4 gap-4 justify-center">
      <div className="m-2 inputs">
        <label
          htmlFor="startLocation"
          className="text-lg text-semibold text-gray-800 opacity-85"
        >
          Start Location
        </label>
        <div className="relative mt-1">
          <select
            id="startLocation"
            value={startLocation}
            onChange={handleStartLocationChange}
            className="block appearance-none w-full border border-gray-400 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue focus:z-10 sm:text-sm sm:leading-5"
          >
            <option value="">Select Start Location</option>
            {Locations.map((location) => (
              <option key={location.name} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="m-2 inputs">
        <label
          htmlFor="viaLocation"
          className="text-lg text-semibold text-gray-800 opacity-85"
        >
          Via Location (Optional)
        </label>
        <div className="relative mt-1">
          <select
            id="viaLocation"
            value={viaLocation}
            onChange={handleViaLocationChange}
            className="block appearance-none w-full border border-gray-400 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue focus:z-10 sm:text-sm sm:leading-5"
          >
            <option value="">Select Via Location</option>
            {filteredViaLocations.map((location) => (
              <option key={location.name} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="m-2 inputs">
        <label
          htmlFor="endLocation"
          className="text-lg text-semibold text-gray-800 opacity-85"
        >
          End Location
        </label>
        <div className="relative mt-1">
          <select
            id="endLocation"
            value={endLocation}
            onChange={handleEndLocationChange}
            className="block appearance-none w-full border border-gray-400 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue focus:z-10 sm:text-sm sm:leading-5"
          >
            <option value="">Select End Location</option>
            {filteredEndLocations.map((location) => (
              <option key={location.name} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="button flex justify-around">
        <button
          onClick={handleFindShortestRoute}
          className="align-center bg-blue-600 text-white py-1 px-2 rounded-lg  hover:bg-blue-800 w-44 h-12 text-md ring-offset ring"
        >
          Find Shortest Route
        </button>
        <button
          onClick={handleReset}
          className="align-center bg-stone-600 text-white py-1 px-2 rounded-lg hover:bg-stone-800 w-44 h-12 text-lg "
        >
          Reset
        </button>
      </div>
      {shortestPath.length > 0 && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Shortest Path</h2>
          <div className="flex flex-wrap">
            {shortestPath.map((location, index) => (
              <div key={location} className="flex items-center">
                <span className="mr-1">{location}</span>
                {index < shortestPath.length - 1 && (
                  <span className="text-gray-400">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {visitedNodes.length > 0 && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Visited Nodes</h2>
          <div className="flex flex-wrap">
            {visitedNodes.map((node, index) => (
              <div key={node} className="flex items-center">
                <span className="mr-1">{node}</span>
                {index < visitedNodes.length - 1 && (
                  <span className="text-gray-400">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {distance > 0 && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Distance Travelled</h2>
          <p>{distance.toFixed(2)} km</p>
        </div>
      )}

      <Information />

      <div className="m-2">
        <h1 className="mb-4 flex justify-center font-bold text-2xl">
          Actual Graph of the Map
        </h1>
        <div
          className="  graph  rounded-lg p-2 flex justify-center md:h-60 h-60 "
          id="graph-container"
        ></div>
        <div className=" p-2 rounded-md mt-4 border-b-2 ">
          <p>
            {" "}
            <p className="font-semibold text-blue-900 text-lg p-2">
              This is an undirected graph with a total of 25 places depiciting
              nodes and each is connected to every other i.e 24 others so
              constitutes a total of 25*24 = 600 edges and 25 nodes
              respectively.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = {
  mapRef: PropTypes.object.isRequired,
};

export default Controls;
