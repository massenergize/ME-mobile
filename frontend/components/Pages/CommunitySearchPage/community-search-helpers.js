export const fetchNearbyCommunities = async (
  zipCode,
  maxDistance,
  communitiesList = []
) => {
  try {
    // retrieve the geographical coordinates for the provided zip code
    const { lat, lng } = await fetchCoordinatesByZipCode(zipCode);

    // retrieve the nearby communities
    const nearbyCommunities = await searchCommunitiesByCoordinates(
      lat,
      lng,
      maxDistance
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchCoordinatesByZipCode = async (zipCode) => {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
    const json = await response.json();
    const { latitude, longitude } = json.places[0];
    return { lat: latitude, lng: longitude };
  } catch (error) {
    console.log(error);
    return {};
  }
};
