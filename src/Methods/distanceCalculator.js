function calculateTotalDistance(locations) {
  let totalDistance = 0;
  for (let i = 0; i < locations.length - 1; i++) {
    totalDistance += calculateDistance(locations[i], locations[i + 1]);
  }
  return totalDistance;
}

function calculateDistance(loc1, loc2) {
  const R = 6371; // Earth radius in kilometers
  const lat1 = loc1.latitude * (Math.PI / 180);
  const lon1 = loc1.longitude * (Math.PI / 180);
  const lat2 = loc2.latitude * (Math.PI / 180);
  const lon2 = loc2.longitude * (Math.PI / 180);
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export { calculateTotalDistance, calculateDistance };
