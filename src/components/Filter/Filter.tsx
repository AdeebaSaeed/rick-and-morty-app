/* Filter.tsx */
import{ useState,useRef } from 'react';
import './Filter.css'

interface FilterProps {
  onFilterChange: (filterName: string, value: string | undefined) => void;
}

function Filter({ onFilterChange }: FilterProps) {
  const [status, setStatus] = useState<string | undefined>('');
  const [gender, setGender] = useState<string | undefined>('');
  const [species, setSpecies] = useState<string | undefined>('');

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    onFilterChange('status', event.target.value === 'all' ? undefined : event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
    onFilterChange('gender', event.target.value === 'all' ? undefined : event.target.value);
  };

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecies(event.target.value);
    onFilterChange('species', event.target.value === 'all' ? undefined : event.target.value);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resetFilters = () => {
    setStatus(undefined);
    setGender(undefined);
    setSpecies(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    // You can also notify the parent component that the filters have been reset here if needed.
    onFilterChange('status', undefined);
    onFilterChange('gender', undefined);
    onFilterChange('species', undefined);
  };


  return (
    <div className='filter-container'>
      
      <div className="filter-field-status">
      
        <select value={status} onChange={handleStatusChange}>
        <option value="" disabled hidden>
      Status
    </option>
          <option value="all">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="filter-field-gender">
    
        <select value={gender} onChange={handleGenderChange}>
        <option value="" disabled hidden>
      Gender
    </option>
          <option value="all">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className="filter-field-species">
        <select value={species} onChange={handleSpeciesChange}>
        <option value="" disabled hidden>
      Species
    </option>
          <option value="all">All</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="animal">Animal</option>
          <option value="robot">Robot</option>
          <option value="humanoid">Humanoid</option>
          <option value="mythological">Mythological</option>
          <option value="disease">Disease</option>
          <option value="planet">Planet</option>
          <option value="cronenberg">Cronenberg</option>
        </select>
      </div>
      <button className='reset-button' onClick={resetFilters}>Reset Filter</button>
    </div>
  );
}

export default Filter;
