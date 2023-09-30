
import { useCharacterGlobalState } from './GlobalState'; 

export const useGlobalState = () => {
  const { state, setState } = useCharacterGlobalState();
  return { state, setState };
};
