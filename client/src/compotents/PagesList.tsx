import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_PAGES} from "../query/pages";
import {CREATE_PAGE, DELETE_PAGE, EDIT_PAGE} from "../mutation/pages";


const PagesList: FC = () => {
    const [name, setName] = useState<string>("")
    const [changedName, setChangedName] = useState<string>("")
    const [editedPageId, setEditedPageId] = useState<number>(0)
    const [selectedPageType, setSelectedPageType] = useState<string>("text")

    const {pages} = useTypedSelector(state => state.pages)
    const { fetchPage} = useActions()
    const pageTypes: string[] = ["text", "number"]
    const {data, loading, refetch} = useQuery(GET_ALL_PAGES)
    const [ createPage ] = useMutation(CREATE_PAGE)
    const [ deletePage ] = useMutation(DELETE_PAGE)
    const [ editPage ] = useMutation(EDIT_PAGE)

    useEffect(() => {
        if (!loading) {
            fetchPage(data.getAllPages)
        }
    }, [data])


    const nameChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const changedNameChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangedName(e.target.value)
    }

    const addPageFnc = () => {
        createPage({
            variables: {
                input: {
                    name,
                    pageType: selectedPageType
                }
            }
        }).then((res) => {
            refetch()
        })
        // addPage(name, selectedPageType)
        setName("")
    }

    const editPageFnc = (id: number) => {
        editPage({
            variables: {
                input: {
                    name: changedName,
                    id
                }
            }
        })
        // editPage(changedName, id)
        setChangedName("")
        setEditedPageId(0)
    }

    const deletePageFnc = (id: number) => {
        deletePage({
            variables: {
                input: {
                    id
                }
            }
        }).then(e => {
            refetch()
        })
        setChangedName("")
        setEditedPageId(0)
    }

    const typeSelectChanger = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPageType(e.target.value)
    }

    if (loading) {
        return <h1>...Loading</h1>
    }

    return (
        <div>
            <div>
                <select value={selectedPageType} onChange={typeSelectChanger}>
                    {pageTypes.map((type, index) => {
                        return <option key={type + index} value={type}>{type}</option>
                    })}
                </select>
                <input type="text" value={name} onChange={nameChanger}/>
                <button onClick={addPageFnc}>Add</button>
            </div>
            <div style={{marginTop: "20px"}}>
                {pages.map(page => {
                    return <div
                        key={page.id}
                        onDoubleClick={() => {
                            setEditedPageId(page.id)
                            setChangedName(page.name)
                        }}
                        style={{
                            display: "flex",
                            padding: "10px",
                            border: "1px solid gray",
                            marginBottom: "10px"
                        }}
                    >
                        <span style={{marginRight: "10px"}}>{page.id}</span>
                        {
                            page.id === editedPageId ? <div>
                                <input type="text" value={changedName} onChange={changedNameChanger}/>
                                <span
                                    style={{
                                        marginLeft: "15px",
                                        border: "1px solid gray",
                                        padding: "5px",
                                        background: "red",
                                    }}
                                    onClick={() => setEditedPageId(0)}
                                >
                                    X
                                </span>
                                <span
                                    style={{
                                        marginLeft: "15px",
                                        border: "1px solid gray",
                                        padding: "5px",
                                        background: "green",
                                    }}
                                    onClick={() => {
                                        editPageFnc(page.id)
                                    }}
                                >
                                    +
                                </span>
                            </div> : <div>
                                <span>{page.name}</span>
                                <span
                                    style={{
                                        marginLeft: "15px",
                                        border: "1px solid gray",
                                        padding: "5px",
                                        background: "red",
                                    }}
                                    onClick={() => deletePageFnc(page.id)}
                                >
                                    X
                                </span>
                            </div>
                        }
                    </div>
                })}
            </div>
        </div>
    );
};

export default PagesList;