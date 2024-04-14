import Maps from "./Components/Maps";
import Controls from "./Components/Controls";
import { useRef } from "react";

function App() {
  const mapRef = useRef(null); // Create a ref for the map instance

  return (
    <>
      <h1 className="text-4xl font-bold flex justify-center align-center p-2 m-2">
        <i className="mr-3 font-semibold"> Dijkstra&apos;s </i> algorithm for
        shortest distances in Delhi
      </h1>
      <div className=" parent flex flex-row flex-wrap h-screen m-4 p-2 overflow-hidden  ">
        <div className=" w-3/5 bg-gray-200">
          <Maps mapRef={mapRef} />
        </div>
        <div
          className=" controls w-2/5  h-full"
          style={{ overflowY: "scroll" }}
        >
          <Controls mapRef={mapRef} />
        </div>
      </div>
    </>
  );
}

export default App;
