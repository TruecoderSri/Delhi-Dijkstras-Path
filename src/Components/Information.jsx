function Information() {
  return (
    <>
      <div className="mx-auto max-w-lg space-y-6 info">
        <div className="m-2 p-2 h-auto border-l-4 border-green-500 rounded-md">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Dijkstra&apos;s Algorithm
          </h2>
          <p className="text-sm text-green-600 font-semibold ">
            Dijkstras algorithm is an algorithm for finding the shortest paths
            between nodes in a graph, which may represent, for example, road
            networks. It was conceived by computer scientist Edsger W. Dijkstra
            in 1956 and published three years later. The algorithm exists in
            many variants; Dijkstras original variant found the shortest path
            between two nodes, but a more common variant fixes a single node as
            the source node and finds shortest paths from the source to all
            other nodes in the graph, producing a shortest-path tree.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-lg space-y-6 info">
        <div className="m-2 p-2 h-auto border-l-4 border-pink-500 rounded-md">
          <h2 className="text-lg font-semibold text-pink-700 mb-2">
            Inter-node Distance Calculation
          </h2>
          <p className="text-sm text-pink-600 font-semibold ">
            The inter-node distance of a graph can be calculated using the
            following formula:
            <br />
            Distance = √((x2 - x1)^2 + (y2 - y1)^2)
            <br />
            Where (x1, y1) and (x2, y2) are the coordinates of the two nodes in
            the graph. Here the Haversine formula is used to calculate the
            distance between two points (latitude and longitude) on the Earth
            &apos;s surface given their coordinates. It is given by:
            <br />
            Distance = 2 * R * arcsin(√(sin²((lat2 - lat1) / 2) + cos(lat1) *
            cos(lat2) * sin²((lon2 - lon1) / 2)))
            <br />
            Where:
            <br />
            R is the radius of the Earth (mean radius = 6,371 km)
            <br />
            lat1 and lon1 are the latitude and longitude of the first point,
            respectively
            <br />
            lat2 and lon2 are the latitude and longitude of the second point,
            respectively
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-lg space-y-6 info">
        <div className="m-2 p-2 h-auto border-l-4 border-purple-500 rounded-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">
            Applications of Dijkstra &apos;s Algorithm
          </h2>
          <p className="text-sm text-purple-600 font-semibold ">
            Dijkstras algorithm has various applications in real-world
            scenarios, including:
            <ul className="list-disc list-inside">
              <li>Routing algorithms in computer networks</li>
              <li>GPS navigation systems for finding the shortest route</li>
              <li>Robotics for path planning</li>
              <li>Flight path optimization in aviation</li>
              <li>Telecommunications for optimizing data packet routing</li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
}

export default Information;
