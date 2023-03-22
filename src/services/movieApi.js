import {API_ROOT} from "../constants/API";
import {API_SEARCH_PARAMS} from "../constants/API";
import { API_ID } from "../constants/API";
import { API_PAGE } from "../constants/API";
import {API_KEY} from "../constants/API-key";

export const searchApi = (searchParams, currentPage) =>
	`${API_ROOT}?${API_SEARCH_PARAMS}${searchParams}${API_KEY}${API_PAGE}${currentPage}`;
  
export const movieApiWidthId = (id) => `${API_ROOT}?${API_ID}${id}${API_KEY}`;
