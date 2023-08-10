import React, { useState, useEffect } from 'react'
import './Volunteer.css'
import {auth} from '../../firebase.js'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListIcon from '@mui/icons-material/List';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import VolunteerNeeds from '../VolunteerNeeds/VolunteerNeeds';
import NeedTypeLogo from '../../assets/phNeedType.png'

function Volunteer() {
  const [ntypeData,setNtypeData] = useState([])
  const [sortedNTs,setSortedNTs] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://ecs-integrated-239528663.ap-south-1.elb.amazonaws.com/api/v1/needtype/?offset=0&limit=10&status=New');
        setNtypeData(response.data); // Assuming the API response is an array of objects
        setIsLoading(false); // Data fetch complete, set loading state to false
      } catch (error) {
        console.error('Error fetching ntypeData:', error);
      }
    };

    fetchData();

    /*
    axios.get('http://localhost:3031/NeedType').then (
      response => setNtypeData(Object.values(response.data)),
      //function (response) {console.log(response.data)}
      ).catch(function (error) {
      console.log(error)
    })
    */

    /*
    axios.post('http://43.204.25.161:8081/api/v1/NeedType/search',
    {
        "offset": 0,
        "limit": 10,
        "filters": {
          "status": {
            "eq": "New"
          }
        }
      }).then(
        response => setNtypeData(Object.values(response.data))
    
    )
    */
  },[]);
  useEffect(()=> {
    const sortedList = [...ntypeData].sort((a,b)=>a.name.localeCompare(b.name));
    setSortedNTs(sortedList)
  },[ntypeData]);

  const [needsCount, setNeedsCount ] = useState([])
  const [countFetched, setCountFetched] = useState(false)
  useEffect(() => {
    const fetchNeedsCountForItem = async (item) => {    //item come from function call just below
      try {
        const response = await axios
        .post("http://43.204.25.161:8081/api/v1/Need/search", {
          offset: 0,
          limit: 100,
          filters: {
            needTypeId: {
              eq: item.osid,
            },
          },
        })
        const numberOfNeeds = response.data.length;
        setNeedsCount(prevNeedsCount => ({
          ...prevNeedsCount,
          [item.osid]: numberOfNeeds,
        })) 
      } catch (error) {
        console.error('Error fetch needs count',Error)
      }
    };
    ntypeData.forEach(item => {
        fetchNeedsCountForItem(item)
    })
    setCountFetched(true)
  },[ntypeData])

  console.log(needsCount)

  const [sortRev, setSortRev] = useState('')
  const handleSort = (e) => {
    setSortRev(e.target.value);
    console.log(sortRev)
    setSortedNTs(sortedNTs.reverse())
  };
  //console.log(sortedNTs.length)

  const groupByFirstAlphabet = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const firstAlphabet = item.name[0].toUpperCase();
      if(!groupedData[firstAlphabet]){
        groupedData[firstAlphabet] = [];
      }
      groupedData[firstAlphabet].push(item);
    });
    return groupedData;
  };

  const groupedNTs = groupByFirstAlphabet(sortedNTs);
  //console.log(groupedNTs)
     
  const [ needsList,setNeedsList ] = useState(false)
  const [ selectedNeedTypeId, setSelectedNeedTypeId ] = useState(null)

  const handleNTClick = (typeId) => {
    setNeedsList(true)
    setSelectedNeedTypeId(typeId)
  }
 
  return (
    <div className="wrapVolunteer">
      {/* display need types (NTs) when needList is unset*/}
      {!needsList && (
      <div className="vNeedType">
        {/* Header */}
        <div className="vHeader">
          <div className="vleftHeader">
            <div className="vGreetNT">Welcome Back, {auth.currentUser.displayName}</div>
            <div className="vTitleNT">Volunteer Need Type </div>
            <div className="vCaptionNT">Select a need type to view needs </div>
          </div>
          <div className="vrightHeader">
            <div className="vSearchNT">
              <i><SearchIcon /></i>
              <input type="search" name="nsearch" placeholder="Search need type" ></input>
              
            </div>
            <div className="vSortNT">
              <select value={sortRev} onChange={handleSort}>
                <option value="" disabled hidden select>Sort By</option>
                <option value="true">Sort A to Z</option>
                <option value="false">Sort Z to A</option>
              </select>
            </div>
            <div className="vline"></div>
            <div className="toggleView">
              <i className="vGrid"><GridOnIcon /></i>
              <i className="vList"><ListIcon /></i>
            </div>
          </div>
        </div>
        {/* List of need types in grid view */}
        <div className="wrapAllNT">
          {Object.entries(groupedNTs).map(
            ([firstAlphabet, groupedList]) => (
              <div key={firstAlphabet} className="wrapGrid">
                <div className="alphabetNT">{firstAlphabet}</div>
                {groupedList.map((item) => ( 
                  <div key={item.name} className="gridItem" onClick={() => handleNTClick(item.osid)}>
                    <div className="imgGridNT">
                      <img src={NeedTypeLogo} alt="SunBirdLogo" height="118px" />
                    </div>
                    {item.name}
                    <div className="numNeedsNT">
                      <i><StickyNote2Icon style={{height:"12px"}} /></i>
                      <span>
                        {needsCount[item.osid] } Needs
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )) 
          }
        </div>
      </div>    
      )}

  {needsList && <VolunteerNeeds needTypeId={selectedNeedTypeId}/>}

    </div>
  )
}

export default Volunteer
