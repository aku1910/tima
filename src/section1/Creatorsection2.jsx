import React, { useEffect, useState } from 'react'
import { MdOutlinePerson } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import axios from 'axios';
import debounce from 'lodash/debounce';



const Creatorsection2 = () => {
    const [apiUsers, setApiUsers] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchNotFound, setSearchNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setApiUsers(response.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const debouncedHandleInputChange = debounce((searchTerm) => {
        setSearchItem(searchTerm);
        if (!searchTerm) {
            setFilteredUsers([]);
        } else {
            const filteredItems = apiUsers.filter((user) =>
                user.name.toLowerCase().includes(searchTerm)
            );
            setFilteredUsers(filteredItems);
            setSearchNotFound(filteredItems.length === 0);
        }
    }, 0.50364626                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        debouncedHandleInputChange(searchTerm);
    };


  return (
         
      <div>
      <div className='flex justify-center mb-[50px]'>
                <select id="">
                <option value="">Qrafik Dizayn</option>
                <option value="">Web Dizayn</option>
                <option value="">Programlasdirma</option>
                </select>
                <input 
                    className="w-[60%] h-[40px] text-center"
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder='Search'

/>
            </div>
            <div className='flex justify-center gap-5 flex-wrap'>
                {searchNotFound ? (
                    <p>No users found</p>
                ) : (
                    (filteredUsers.length === 0 ? apiUsers : filteredUsers).map((user) => (
                        <div key={user.id} className='userinfo'>
                            <img className='image' src={user.image} alt={user.name} />
                            <h1 className='name'>{user.name}</h1>
                            <p className='info'>{user.info}</p>
                            <div className='supporter'>
                                <MdOutlinePerson />
                                <span>{user.supporter}</span>
                            </div>
                            <div className='location'>
                                <BsGlobe />
                                <span>{user.location}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
                
            </div>
  )
}

export default Creatorsection2