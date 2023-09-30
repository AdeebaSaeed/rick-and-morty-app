/* eslint-disable react-refresh/only-export-components */
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';


type Character = {
  id: number;
  name: string;
  image: string;
  location: {
    name: string;
  };
  status: string;
};


type CharacterState = {
  characters: Character[];
  searchTerm: string;
  statusFilter: string | undefined;
  genderFilter: string | undefined;
  speciesFilter: string | undefined;
  favorites: Character[];
};


interface CharacterGlobalStateProviderProps {
  children: ReactNode;
}


const CharacterGlobalStateContext = createContext<
  { state: CharacterState; setState: Dispatch<SetStateAction<CharacterState>> } | undefined
>(undefined);


export const useCharacterGlobalState = () => {
  const context = useContext(CharacterGlobalStateContext);
  if (!context) {
    throw new Error('useCharacterGlobalState must be used within a CharacterGlobalStateProvider');
  }
  return context;
};


export default function CharacterGlobalStateProvider({ children }: CharacterGlobalStateProviderProps) {
  const [state, setState] = useState<CharacterState>({
    characters: [],
    searchTerm: '',
    statusFilter: undefined,
    genderFilter: undefined,
    speciesFilter: undefined,
    favorites: [],
  });

  return (
    <CharacterGlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </CharacterGlobalStateContext.Provider>
  );
}
