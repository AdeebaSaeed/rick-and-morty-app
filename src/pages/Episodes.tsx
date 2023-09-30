import { useState, useEffect, useMemo } from 'react';
import { Character, EpisodeType } from '../types/types'; // Import types as needed
import './Episodes.css';

function Episode() {
  const [episodeData, setEpisodeData] = useState<EpisodeType | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<string>('1'); // Default to episode 1
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch episode data from the API based on selected episode
  useEffect(() => {
    setIsLoading(true);

    // Fetch episode data
    fetch(`https://rickandmortyapi.com/api/episode/${selectedEpisode}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodeData(data);
        const characterUrls: string[] = data.characters;
        return Promise.all(characterUrls.map((url) => fetch(url).then((response) => response.json())));
      })
      .then((characterData) => {
        setCharacters(characterData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching episode and character data:', error);
        setIsLoading(false);
      });
  }, [selectedEpisode]);

  // Function to handle episode selection
  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(event.target.value);
  };

  // Create an array of episode numbers (1 to 51)
  const episodeOptions = Array.from({ length: 51 }, (_, index) => (index + 1).toString());

  function getStatusColor(status: string): string {
    switch (status) {
      case 'Dead':
        return '#dc3545';
      case 'Alive':
        return '#198754';
      default:
        return '#6c757d';
    }
  }

  // Use useMemo to limit results to 20 characters
  const limitedCharacters = useMemo(() => characters.slice(0, 20), [characters]);

  return (
    <div className='episode-info-container'>
      {episodeData && (
        <div className='episode-name-container'>
          <h2>Episode Name: {episodeData.name}</h2>
          <p>Air Date: {episodeData.air_date}</p>
        </div>
      )}
      <div className="episode-filter-container">
        <div className="episode-filter-field">
          <label>Select an Episode:</label>
          <select id="episodeFilter" onChange={handleEpisodeChange} value={selectedEpisode}>
            {episodeOptions.map((episodeNumber) => (
              <option key={episodeNumber} value={episodeNumber}>
                Episode {episodeNumber}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="character-container">
        <h2>Characters from Episode {selectedEpisode}</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid-container">
            {limitedCharacters.map((character) => (
              <div key={character.id} className="cardContainer">
                <img className="cardImage" src={character.image} alt={character.name} />
                <div className="cardContent">
                  <div className="cardTitle">{character.name}</div>
                  <div
                    className="cardStatus"
                    style={{
                      backgroundColor: getStatusColor(character.status),
                    }}
                  >
                    {character.status}
                  </div>
                  <div className="cardLocation">
                    <div>Last Location</div>
                    <div>{character.location.name}</div>
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

export default Episode;



