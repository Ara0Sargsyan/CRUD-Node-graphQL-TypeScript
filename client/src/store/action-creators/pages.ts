import {IPage, PagesAction, PagesActionTypes} from "../../types/pages";

export const fetchPage = (data: IPage[]): PagesAction => {
    return {
        type: PagesActionTypes.FETCH_PAGE,
        payload: data
    }
}

export const addPage = (name: string, pageType: string): PagesAction => {
    return {
        type: PagesActionTypes.ADD_PAGE,
        name: name,
        pageType: pageType,
    }
}

export const editPage = (name: string, id: number): PagesAction => {
    return {
        type: PagesActionTypes.EDIT_PAGE,
        name: name,
        id: id
    }
}

export const deletePage = (id: number): PagesAction => {
    return {
        type: PagesActionTypes.DELETE_PAGE,
        id: id
    }
}
