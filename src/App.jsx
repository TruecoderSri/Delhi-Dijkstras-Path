import Maps from "./Components/Maps";
import Controls from "./Components/Controls";
import { useRef } from "react";

function App() {
  const mapRef = useRef(null);
  return (
    <>
      <h1 className="text-4xl font-bold text-center p-2 m-2">
        <i className="mr-3 font-semibold"> Dijkstra&apos;s </i> algorithm for
        shortest distances in Delhi
      </h1>
      <div className="hidden md:flex flex-row flex-wrap h-screen m-4 p-2 overflow-x-hidden ">
        <div className="w-3/5 bg-gray-200 h-full">
          <Maps mapRef={mapRef} />
        </div>
        <div className="controls w-2/5 h-full overflow-y-scroll">
          <Controls mapRef={mapRef} />
        </div>
      </div>
      <div className="md:hidden">
        <div className="bg-gray-200 h-1/2">
          <Maps mapRef={mapRef} />
        </div>
        <div className="bg-gray-100 h-1/2">
          <Controls mapRef={mapRef} />
        </div>
      </div>
      <h4 className="text-2xl font-semibold text-center p-2 m-2">
        Source code
        <a
          href="https://github.com/TruecoderSri/dijkstras-path"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 m-0 font-medium"
        >
          👉<u>here</u>
        </a>
      </h4>
    </>
  );
}

export default App;
