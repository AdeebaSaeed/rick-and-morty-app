import { useState, useEffect } from 'react';
import { Character, LocationType } from '../types/types';
import './Location.css';

function Location() {
  const [locationData, setLocationData] = useState<LocationType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('1'); 
  const [residents, setResidents] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationType[]>([]);

  useEffect(() => {
    setIsLoading(true);

  
    fetch('https://rickandmortyapi.com/api/location')
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

   
    fetch(`https://rickandmortyapi.com/api/location/${selectedLocation}`)
      .then((response) => response.json())
      .then((data) => {
        setLocationData(data);
        const residentUrls = data.residents;
        return Promise.all(residentUrls.map((url:string) => fetch(url).then((response) => response.json())));
      })
      .then((residentData) => {
        setResidents(residentData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching location and resident data:', error);
        setIsLoading(false);
      });
  }, [selectedLocation]);

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };
  

  const getStatusColor = (status:string) => {
    switch (status) {
      case 'Dead':
        return '#dc3545';
      case 'Alive':
        return '#198754';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className='location-info-container'>
      {locationData && (
        <div className='location-name-container'>
          <h2>Location Name: {locationData.name}</h2>
          <p>Type: {locationData.type}</p>
        </div>
         )}
      <div className="location-filter-container">
        <div className="location-filter-field">
          <label>Select a Location:</label>
          <select id="locationFilter" onChange={handleLocationChange} value={selectedLocation}>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      
     

   
      <div className="resident-container">
        <h2>Residents of Location {selectedLocation}</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid-container">
            {residents.map((resident) => (
              <div key={resident.id} className="cardContainer">
                <img className="cardImage" src={resident.image} alt={resident.name} />
                <div className="cardContent">
                  <div className="cardTitle">{resident.name}</div>
                  <div className="cardStatus" style={{ backgroundColor: getStatusColor(resident.status) }}>
                    {resident.status}
                  </div>
                  <div className="cardLocation">
                    <div>Origin</div>
                    <div>{resident.origin.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Location;



