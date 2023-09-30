
import { Character } from '../../types/types'; 
interface CharacterCardProps {
  character: Character;
}

function CharacterCard(props: CharacterCardProps) {
  const { character } = props;

  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
    </div>
  );
}

export default CharacterCard;

