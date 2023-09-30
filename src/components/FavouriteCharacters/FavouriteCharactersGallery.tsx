
import { Character } from '../../types/types';
import './FavouriteCharactersGallery.css'

interface FavoriteCharactersGalleryProps {
  favorites: Character[];
}

function FavoriteCharactersGallery({ favorites }: FavoriteCharactersGalleryProps) {
  return (
    <div className="favorite-characters-gallery">
      {favorites.map((character) => (
        <img
          key={character.id}
          src={character.image}
          alt={character.name}
          className="favorite-character-image"
        />
      ))}
    </div>
  );
}

export default FavoriteCharactersGallery;


