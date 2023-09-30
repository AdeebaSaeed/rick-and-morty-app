

  
	export interface Character {
    episode: unknown;
		id: number;
		name: string;
		image: string;
		location: {
         name: string;
		};
		origin: {
			name: string;
			url: string;
 };
		status: string;
		species: string
		gender: string
	}

	export interface CardProps {
		characterId: number
  }

  export interface Info {
	count: number
	nextPage: string | null
	previousPage: string | null
}

	export interface InfoTypes {
		count: number
		pages: number
		next: string
    } 
	export interface PaginationProps {
		totalItems: number;
		itemsPerPage: number;
		onPageChange: (newPage: number) => void;
		currentPage: number;
	}




     export interface CharacterTypes {
		id: number
		created: string
		episodes: string[]
		gender: string
		image: string
		name: string
		origin: { name: string }
		status: string
		species: string
		url: string
    }

	export interface CharactersResponse {
		info: InfoTypes
		results: CharacterTypes[]
    }
	
     export interface EpisodeType {
		id: number
		created: string
		episodes: string[]
		gender: string
		image: string
		name: string
		status: string
		species: string
		url: string
		air_date: number
 }

	export interface EpisodesResponse {
		info: InfoTypes
		results: EpisodeType[]
   }

   export interface LocationType {
	id: number;
	created: string;
	locations: string[];
	dimension: string;
	image: string;
	name: string;
	status: string;
	type: string;
	url: string;
	origin: string;
  }
  
  export interface LocationResponse {
	info: InfoTypes;
	results: LocationType[];
  }
  
  export interface InfoTypes {
	count: number;
	pages: number;
	next: string;
	prev: string;
  }
  
  export interface Filters {
	status: string | undefined;
	gender: string | undefined;
	species: string | undefined;
  }
  
  export interface FilterProps {
	onFilterChange: (filterName: string, selectedValue: string | undefined) => void;
	onApplyFilters: (filters: Filters) => void; // Include onApplyFilters in FilterProps
  }