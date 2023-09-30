import { FormEvent, useRef, useState } from 'react';
import { CharacterSearchModel } from '../../models';
import './SearchForm.css';
import errorImage from '../../assets/images/errorImage.jpg';

interface SearchFormProps {
  onSearch: (searchTerm: string, charactersFound: boolean) => void;
  noCharacterFound: boolean; // Include this prop
  suggestions: CharacterSearchModel[];
}

function SearchForm({ onSearch }: SearchFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showErrorImage, setShowErrorImage] = useState(false);

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = event.currentTarget.search.value;

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}`);
      if (!response.ok) {
        throw new Error(`Error fetching characters: ${response.statusText}`);
      }
      const data = await response.json();

      const charactersFound = data.results.length > 0;
      onSearch(search, charactersFound);
      setShowErrorImage(!charactersFound);
    } catch (error) {
      console.error('Error fetching character data:', error);
      onSearch(search, false);
      setShowErrorImage(true);
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={onSubmitHandler}>
        <label className="search-form-label">
          <input
            ref={inputRef}
            className="search-input"
            autoComplete="off"
            type="text"
            name="search"
            placeholder="Search characters by name..."
          />
        </label>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {/* Move the error display logic to this component */}
      {showErrorImage && (
        <div className="no-character-found">
          <p>No Character Found</p>
          <img src={errorImage} alt="Error" />
        </div>
      )}
    </div>
  );
}

export default SearchForm;













