import {API_ROOT} from "../constants/API";
import {API_SEARCH_PARAMS} from "../constants/API";
import {API_ID} from "../constants/API";
import {API_PAGE} from "../constants/API";
import {API_TYPE} from "../constants/API";
import {API_KEY} from "../constants/API-key";

export const searchApi = (searchParams, currentPage, type) =>
  `${API_ROOT}?${
    searchParams ? API_SEARCH_PARAMS : ""
  }${searchParams}${API_KEY}${API_TYPE}${type}${API_PAGE}${currentPage}`;

export const movieApiWithId = (id) => `${API_ROOT}?${id ? API_ID : ""}${id}${API_KEY}`;

console.log(API_KEY);
