import { RemoveRedEyeTwoTone } from '@material-ui/icons';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './Results.css'

export default function Results() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const searchUser = useParams().userID;
  const [searches, setSearches] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchSearches() {
      const payload = {
        search: searchUser
      }
      const response = await axios.post(`/search/user`, { "search": searchUser }, { withCredentials: true });
      console.log("response: ", response, payload);
      setSearches(response.data);
    };
    searchUser && fetchSearches();
  }, [searchUser]);

  return (
    <>
      <div className="resultsContainer">
        <div className="resultsWrapper">
          <h2 className='resultsHeading'>{`Search Results (${searches.length})`}</h2>
          {
            searches.length > 0 && searches.map(user => (
              <div className="searchResult" key={user._id}>
                <div className="searchResultLeft">
                  <img className="searchResultProfilePic" src={user.profilePicture ? user.profilePicture : PF + 'NoProfilePic.png'} alt="profile" />
                  <span className="searchResultName">{user.firstName + ' ' + user.lastName}</span>
                </div>
                <div className="searchResultRight">
                  <div className="searchResultStatus">{currentUser.following.includes(user._id) ? 'Following' : 'Not Following'}</div>
                  <Link to={`/profile/${user._id}`} style={{textDecoration: 'none'}}>
                    <RemoveRedEyeTwoTone className='searchResultView' />
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}