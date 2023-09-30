import type { SetURLSearchParams } from 'react-router-dom'
import type { Info } from '../../types/types'

export interface PaginationProps {
	info?: Info
	page?: string | null
	query?: string | null
	onSetSearchParams: SetURLSearchParams
}

export interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (newPage: number) => void;
    currentPage: number;
  }