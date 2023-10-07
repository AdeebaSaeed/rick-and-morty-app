import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../Loader/Loader';
import './CharacterDetails.css';
import { Character } from '../../types/types';

function CharacterDetails() {
  const { characterId } = useParams();
  
  const { data: character, isLoading, error } = useFetch<Character>(
    `https://rickandmortyapi.com/api/character/${characterId}`
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid-detail-container">
      <div className="cardDetailContainer">
        <img src={character?.image} alt={character?.name} className="cardDetailImage" />
        <h2 className="cardDetailTitle">{character?.name}</h2>
        <p className="cardDetail">Gender: {character?.gender}</p>
        <p className="cardDetail">Location: {character?.location.name}</p>
        <p className="cardDetail">Origin: {character?.origin.name}</p>
        <p className="cardDetail">Species: {character?.species}</p>
        
        <div className={`cardDetailStatus status-${character?.status.toLowerCase()}`}>
          {character?.status}
        </div>
      </div>
     
      <Link to="/characters" className="backButton">
        Back
      </Link>
    </div>
  );
}

export default CharacterDetails;

