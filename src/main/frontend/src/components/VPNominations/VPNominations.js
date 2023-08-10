import React, { useState } from 'react'
import './VPNominations.css'
import VNeedsNominated from '../../assets/needsNominated.png';
import VNeedsApproved from '../../assets/needsApproved.png';
import VNeedsInProgress from '../../assets/needsInProgress.png';
import VPlansDelivered from '../../assets/plansDelivered.png';
import VVolunteerHrs from '../../assets/volunteerHrs.png';

function VPNominations() {
  const [activeTab, setActiveTab] = useState('tabN');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }


  return (
    <div>
      <div className="headerVPNoms">
        <div className="titleVPNoms"> Nominations</div>
        <div className="tagVPNoms">Check your nominations and metrics</div>
      </div>
      <div className="statsVPNoms">
        <div className="statsVPNomsItem">
          <div className="statsVPNomsCount">
            <img src={VNeedsNominated} alt="Nominated Needs" height="35px" />
            <span>24</span>
          </div>
          <div className="statsVPNomsName">Needs Nominated</div>
        </div>
        <div className="statsVPNomsItem">
          <div className="statsVPNomsCount">
            <img src={VNeedsApproved} alt="Approved Needs" height="35px" />
            <span>6</span>
          </div>
          <div className="statsVPNomsName">Needs Approved</div>
        </div>
        <div className="statsVPNomsItem">
          <div className="statsVPNomsCount">
            <img src={VNeedsInProgress} alt="Needs In Progress" height="35px" />
            <span>8</span>
          </div>
          <div className="statsVPNomsName">Needs In Progress</div>
        </div>
        <div className="statsVPNomsItem">
          <div className="statsVPNomsCount">
            <img src={VPlansDelivered} alt="Nominated Needs" height="35px" />
            <span>120</span>
          </div>
          <div className="statsVPNomsName">Total Volunteer Hrs</div>
        </div>
        <div className="statsVPNomsItem">
          <div className="statsVPNomsCount">
            <img src={VVolunteerHrs} alt="Nominated Needs" height="35px" />
            <span>120</span>
          </div>
          <div className="statsVPNomsName">Total Plans Delivered</div>
        </div>
      </div>
      <div className="vnomTabs">
        <div className={`${activeTab === 'tabN' ? 'VNomTabN selectedVNomTab' : 'VNomTabN'}`} onClick={() => handleTabClick('tabN')}>Nominated</div>
        <div className={`${activeTab === 'tabP' ? 'VNomTabP selectedVNomTab' : 'VNomTabP'}`} onClick={() => handleTabClick('tabP')}>In Progress</div>
        <div className={`${activeTab === 'tabR' ? 'VNomTabR selectedVNomTab' : 'VNomTabR'}`} onClick={() => handleTabClick('tabR')}>Requested</div>
        <div className={`${activeTab === 'tabA' ? 'VNomTabA selectedVNomTab' : 'VNomTabA'}`} onClick={() => handleTabClick('tabA')}>Approved</div>
      </div>


    </div>
  )
}

export default VPNominations