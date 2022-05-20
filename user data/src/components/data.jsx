import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faMale, faFemale, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./data.css"
import { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";

export const Data = () => {
    const [data, setData] = useState([]);
    const [filterVal, setFilterVal] = useState('')
    const [searchApiData, setSearchApiData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    // pagination
    const usersPerPage = 6;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(data.length / usersPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    //Fetching Data From API
    const fetchData = async () => {
        let user = await fetch("https://gorest.co.in/public/v2/users")
        let d = await user.json()
        setData(d)
        setSearchApiData(d)
        // console.log(d)
    }
    useEffect(() => {
        fetchData();
    }, [])


    //Seaarch Filter
    const handleFilter = (e) => {
        if (e.target.value == '') {
            setData(searchApiData)
        } else {
            const filterResult = searchApiData.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase()))
            if (filterResult.length > 0) {
                setData(filterResult)
            }
            else {
                setData([{
                    "id": "No User Found"
                }])
            }

        }
        setFilterVal(e.target.value)
    }

    // Sort by ID
    const handleSortId = () => {
        const sortID = data.sort((a, b) => {
            if (a.id > b.id) {
                return 1
            } else if (a.id < b.id) {
                return -1;
            }
            return 0;
        })
        setData([...sortID]);
    }

    // Sort by Name
    const handleSortname = () => {
        const sortname = data.sort((a, b) => {
            if (a.name > b.name) {
                return 1
            } else if (a.name < b.name) {
                return -1;
            }
            return 0;
        })
        setData([...sortname]);
    }

    // Sort by Email
    const handleSortemail = () => {
        const sortemail = data.sort((a, b) => {
            if (a.email > b.email) {
                return 1
            } else if (a.email < b.email) {
                return -1;
            }
            return 0;
        })
        setData([...sortemail]);
    }



    return (
        <>
            <div>
                <div className='head'>
                    <div>
                        <h2>USERS</h2>
                    </div>
                    <div className='form'>
                        <input
                            type='search'
                            placeholder='search name & email'
                            value={filterVal}
                            onInput={(e) => handleFilter(e)}
                        />
                    </div>
                </div>

                <table cellPadding="0" cellSpacing="0">
                    <th
                        onClick={handleSortId}
                    >ID
                        <FontAwesomeIcon className='sort' icon={faSort} />
                    </th>
                    <th
                        onClick={handleSortname}
                    >Name
                        <FontAwesomeIcon className='sort' icon={faSort} />
                    </th>
                    <th
                        onClick={handleSortemail}
                    >Email
                        <FontAwesomeIcon className='sort' icon={faSort} />
                    </th>
                    <th>Gender</th>
                    <th>Status</th>
                    {
                        data.slice(pagesVisited, pagesVisited + usersPerPage)
                            .map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <FontAwesomeIcon className='disIcon' icon={faEnvelope} />
                                            {item.email}</td>
                                        <td>
                                            <FontAwesomeIcon className='disIcon' icon={item.gender == "male" ? faMale : faFemale} />
                                            {item.gender}</td>
                                        <td
                                            className={item.status == "active" ? "green" : "red"}
                                        >{item.status}</td>
                                    </tr>
                                )
                            })
                    }
                </table>
                <div className="page-flex">
                    <ReactPaginate
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>
        </>
    )
}