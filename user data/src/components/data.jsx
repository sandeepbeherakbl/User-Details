import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faRefresh } from '@fortawesome/free-solid-svg-icons'
import "./data.css"
import { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";

export const Data = () => {
    const [data, setData] = useState([]);
    const [filterVal, setFilterVal] = useState('')
    const [searchApiData, setSearchApiData] = useState([]);
    
    const fetchData = async () => {
        let user = await fetch("https://gorest.co.in/public/v2/users?_start=0&_end=6")
        let d = await user.json()
        setData(d)
        setSearchApiData(d)
        // console.log(d)
    }
    useEffect(() => {
        fetchData();
    }, [])

    

    const handleFilter = (e) => {
        if (e.target.value == '') {
            setData(searchApiData)
        } else {
            const filterResult = searchApiData.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase()))
            if (filterResult.length > 0) {
                setData(filterResult)
            } else {
                setData([{
                    "id": "No User Found"
                }])
            }

        }
        setFilterVal(e.target.value)
    }

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
        // console.log(sortID)
    }

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
        // console.log(sortID)
    }

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
        // console.log(sortID)
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
                        data.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.status}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>

        </>
    )
}