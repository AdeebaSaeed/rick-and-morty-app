import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Characters.css';
import { Character } from '../../types/types';
import Pagination from '../Pagination';
import Filter from '../Filter/Filter';
import { Link } from 'react-router-dom';
import FavoriteCharactersGallery from '../FavouriteCharacters/FavouriteCharactersGallery';
import SearchForm from '../Search/SearchForm';
import errorImage from '../../assets/images/errorImage.jpg';
import Loader from '../Loader/Loader';
import { useGlobalState } from '../Context/UseGlobalState';


function Characters() {
  const { pageNumber } = useParams();

  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(pageNumber ? parseInt(pageNumber) : 1);
  const itemsPerPage = 20;
  const totalItems = 826;

  useGlobalState();

  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<string | undefined>('');
  const [gender, setGender] = useState<string | undefined>('');
  const [species, setSpecies] = useState<string | undefined>('');

  const [charactersFound, setCharactersFound] = useState(true);
  const [loading, setLoading] = useState(false);
  

  const handleFilterChange = useCallback(
    (filterName: string, selectedValue: string | undefined) => {
      switch (filterName) {
        case 'status':
          setStatus(selectedValue);
          break;
        case 'gender':
          setGender(selectedValue);
          break;
        case 'species':
          setSpecies(selectedValue || '');
          break;
        default:
          break;
      }
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParameters = new URLSearchParams();
        queryParameters.set('page', currentPage.toString());
        if (searchTerm) queryParameters.set('name', searchTerm);
        if (status) queryParameters.set('status', status);
        if (gender) queryParameters.set('gender', gender);
        if (species) queryParameters.set('species', species);

        const response = await fetch(
          
          `https://rickandmortyapi.com/api/character/?${queryParameters.toString()}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json() as { results: Character[] };
        if (data && data.results) {
          setCharacters(data.results);
          setCharactersFound(data.results.length > 0);
        } else {
          setCharacters([])
          setCharactersFound(false);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setCharacters([])
        setCharactersFound(false)
        setLoading(false);
      }
    };
   
    fetchData().catch((error) => {
      console.error('Error in fetchData:', error);
    });

    navigate(`/characters/${currentPage}`);
  }, [currentPage, searchTerm, status, gender, species, navigate]);
  
  
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



  const [favorites, setFavorites] = useState<Character[]>([]);
  const toggleFavorite = (character: Character, event: React.MouseEvent) => {
    event.stopPropagation();
    if (favorites.some((fav) => fav.id === character.id)) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== character.id);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, character]);
    }
  };

  
  return (
   
      
    <div className="container">
    
      <h1 className="text-center">Rick and Morty Characters</h1>
      
      <SearchForm onSearch={setSearchTerm} noCharacterFound={!charactersFound} suggestions={[]} />
  
      {loading ? (
        <Loader /> 
        
          ) : (
            <>
              <div>
                <Filter onFilterChange={handleFilterChange} />
              </div>
              <div className="favorite-characters">
                <h2>Favorite Characters</h2>
                {favorites.length === 0 ? (
                  <p>No favorite characters yet.</p>
                ) : (
                  <FavoriteCharactersGallery favorites={favorites} />
                )}
              </div>
              {(characters.length === 0 && charactersFound) ? (
              
                <div className="no-character-found">
                  <p>No Characters Found</p>
                  <img src={errorImage} alt="Error" />
                </div>
              ) : (
                <div className="grid-container">
                   
                  {characters.map((character) => (
                    <div key={character.id} className="cardContainer">
                      <span
                        className={`favorite-icon ${
                          favorites.some((fav) => fav.id === character.id) ? 'favorite' : ''
                        }`}
                        onClick={(e) => toggleFavorite(character, e)}
                      >
                        {favorites.some((fav) => fav.id === character.id) ? '❤️' : '🤍'}
                      </span>
                      <Link to={`/characters/${character.id}`} className="cardImageLink" >
                        
                        <img
                          className="cardImage"
                          src={character.image}
                          alt={character.name}
                        />
                   
                      </Link>
      

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
              {characters.length > 0 && (
                <Pagination
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={(newPage) => {
                    setCurrentPage(newPage);
                    navigate(`/characters/${newPage}`);
                  }}
                />
          
              )}
            </>
    
      )}
    </div>
  );
                }
                
                export default Characters;





