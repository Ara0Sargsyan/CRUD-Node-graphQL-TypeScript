import {IPage, PagesAction, PagesActionTypes, pagesState} from "../../types/pages";


const initialState: pagesState = {
    pages: [
        {
            id: 1,
            name: "page-1",
            pageType: "text",
        }
    ]
}

export const pagesReducer = (state = initialState, action: PagesAction): pagesState => {
    switch (action.type) {
        case PagesActionTypes.FETCH_PAGE:
                return {
                    ...state,
                    pages: action.payload
                }
        case PagesActionTypes.ADD_PAGE:
            return {
                ...state,
                pages: [
                    ...state.pages,
                    {
                        id: Math.max(...state.pages.map(e => +e.id)) + 1,
                        name: action.name,
                        pageType: action.pageType
                    }
                ]

            }
        case PagesActionTypes.EDIT_PAGE:
            let newPages: IPage[] = state.pages.map(page => {
                if (page.id === action.id) {
                    return {
                        ...page,
                        name: action.name
                    }
                }
                return page
            })
            return {
                ...state,
                pages: newPages
            }
        case PagesActionTypes.DELETE_PAGE:
            return {
                ...state,
                pages: state.pages.filter(page => page.id !== action.id)
            }
        default:
            return state
    }
}