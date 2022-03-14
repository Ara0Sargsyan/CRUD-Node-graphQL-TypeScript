

export interface IPage {
    id: number;
    pageType: string;
    name: string;
}

export interface pagesState {
    pages: IPage[];
}

export enum PagesActionTypes {
    ADD_PAGE = "ADD_PAGE",
    EDIT_PAGE = "EDIT_PAGE",
    DELETE_PAGE = "DELETE_PAGE",
    FETCH_PAGE = "FETCH_PAGE",
}

interface FetchPageAction {
    type: PagesActionTypes.FETCH_PAGE;
    payload: IPage[];
}

interface AddPageAction {
    type: PagesActionTypes.ADD_PAGE;
    pageType: string;
    name: string;
}

interface EditPageAction {
    type: PagesActionTypes.EDIT_PAGE;
    name: string;
    id: number;
}

interface DeletePageAction {
    type: PagesActionTypes.DELETE_PAGE;
    id: number;
}

export type PagesAction = AddPageAction | EditPageAction | DeletePageAction | FetchPageAction
