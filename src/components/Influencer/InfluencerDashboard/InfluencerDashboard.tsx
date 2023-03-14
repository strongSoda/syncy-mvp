import React, { useContext, useEffect } from 'react';
import SideBar from 'components/Influencer/SideBar/SideBar.lazy';

import InfluencerDashboardWrapper from './InfluencerDashboard.styles';
import CSSVARIABLES from 'global/constants/variables';
import API from 'global/constants/api';
import { AuthContext } from 'global/context/AuthContext';
import { Avatar, Heading, Pane, Paragraph, Spinner } from 'evergreen-ui';

import EyeIcon from '../../../assets/icons/eye.svg';
import EmailIcon from '../../../assets/icons/email.svg';
import { CardWrapper } from 'components/ManageRequests/ManageRequests.styles';
import { useHistory } from 'react-router';
import ROUTES from 'global/constants/routes';
import logUsage from 'global/functions/usage-logs';
// import PhoneIcon from '../../assets/icons/phone.svg';
// import SaveIcon from '../../assets/icons/save.svg';
// import loadingGif from '../../assets/images/loading.gif';
import Syncy from '../../../assets/images/syncy.png';

// declare interface IInfluencerDashboardProps {}

const InfluencerDashboard: React.FC = () => {
  
  const user = useContext(AuthContext)

  const [loading, setLoading] = React.useState(true);
  const [invites, setInvites] = React.useState<any[]>([]);

  const [showBrandProfile, setShowBrandProfile] = React.useState(false);
  const [selectedInvite, setSelectedInvite] = React.useState<any>(null);

  // get invites by influencer email
  const getInvites = async () => {
    try {
      setLoading(true);
      // /influencer-invites
      const response = await fetch(`${API}/influencer-invites?email=${user?.email}`)
      const data = await response.json();
      console.log('invites', data);
      setInvites(data?.body?.invites);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user?.email) {
      getInvites();
    }
  }, [user])


  return (
  <InfluencerDashboardWrapper data-testid="InfluencerDashboard">
    <Pane display="flex" padding={16} background={CSSVARIABLES.COLORS.YELLOW_GREEN_1} borderRadius={3}>
      <img src={Syncy} alt="Syncy" width="50" height="50" />
      <Pane>
        <Heading size={800} flex={1} alignItems="center" display="flex">
          Syncy
        </Heading>
        <Heading size={400}>
          Where brands connect with quality micro-influencers
        </Heading>
      </Pane>
      <Pane>
      </Pane>
    </Pane>
    
    <SideBar lightColor={CSSVARIABLES.COLORS.PURPLE_1} darkColor={CSSVARIABLES.COLORS.PURPLE_2} />
    <h1>Campaign Invites</h1>

    {loading ? 
      <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
        <Spinner />
      </Pane>
    :
      <>
        {invites?.length > 0 ?
          <div>
            {invites?.map((invite: any) => (
              <Card invite={invite} setSelectedInvite={setSelectedInvite} setShowBrandProfile={setShowBrandProfile} />
            ))}
          </div>
        :
          <div>
            <span>No invites</span>
          </div>
        }
      </>
    }

  {showBrandProfile && <BrandProfile brand={selectedInvite} setShowBrandProfile={setShowBrandProfile} />}
  </InfluencerDashboardWrapper>
)};

interface ICardProps {
  invite: any;
  setShowBrandProfile: any;
  setSelectedInvite: any;
}

const Card: React.FC<ICardProps> = ({invite, setShowBrandProfile, setSelectedInvite}: ICardProps) => {
  const history = useHistory();

  useEffect(() => {
    console.log('invite', invite);
  }, [invite]);

  return (
  <CardWrapper data-testid="Card">
    <Avatar src={invite?.companyLogo} alt="profile" size={80} name={invite?.fullName} />
    <div className="card-body">
      <div className='card-header'>
        <p className="card-title">
          {invite?.brandName}
          {/* <Paragraph>{invite?.contactName}</Paragraph> */}
        </p>
        <div className='actions'>          
          {/* {invite?.bookCallInfo && <img className='icon' src={PhoneIcon} alt="eye" onClick={() => setShowBookCall(true) } />} */}
          <img className='icon' src={EyeIcon} alt="eye" onClick={() => {
            // logUsage('InfluencerDashboard', 'VIEW Brand Profile');
            setShowBrandProfile(true);
            setSelectedInvite(invite);
          } } />
          <img className='icon' src={EmailIcon} alt="eye" onClick={() => {
            // go to Messages route and pass invite channel id
            // history.push(ROUTES.INFLUENCER.MESSAGES + '?invite=' + invite?.channelId)
          } } />
          {/* <img className='icon' src={SaveIcon} alt="eye" /> */}
        </div>
      </div>
      <Paragraph className="card-desc">{invite?.companyDescription}</Paragraph>
      {/* <small>{formatNumber(invite?.followersCount)} Followers</small>         */}
      <div className="card-footer">
        {/* eye icon svg */}
        {/* <Button text="View" backgroundColor={CSSVARIABLES.COLORS.GREEN_0} onClick={() => setShowInfluencerProfile(true)} /> */}
      </div>
    </div>
    {/* {showInfluencerProfile && <InfluencerProfile influencer={invite} setShowInfluencerProfile={setShowInfluencerProfile} setShowBookCall={setShowBookCall} setShowReachout={setShowReachout} />}
    {showReachout && <Reachout influencer={invite} setShowReachout={setShowReachout} />} */}
  </CardWrapper>
)};

declare interface IBrandProfileProps {
  brand: any;
  setShowBrandProfile: any;
}
const BrandProfile: React.FC<IBrandProfileProps> = ({brand, setShowBrandProfile}: IBrandProfileProps) => {

  const user = useContext(AuthContext)

  useEffect(() => {
    if(brand) {
      console.log('brand', brand);
      // logUsage('INFLUENCER VIEW BRAND PROFILE', { user: {email: user?.email}, brand: brand?.brandName });
    }
  }, [brand]);

  return (
    <div className='brand-profile'>
      
      <div className='profile-header'>
      {/* cross icon to close sidebar on click */}
      <img className='cross-icon' src='https://www.svgimages.com/svg-image/s3/close-icon-256x256.png' alt="cross" onClick={() => setShowBrandProfile(false) } />
      </div>

      {/* <iframe title={influencer?.fullName} src={`${influencer?.profileUrl ? influencer?.profileUrl : `https://www.instagram.com/${influencer?.instagram_username}/` }embed`} name="myiFrame" scrolling="yes" frameBorder="0" height="900" width="100%" allowFullScreen={true}></iframe> */}
      {/* <Button text="X" backgroundColor={CSSVARIABLES.COLORS.RED} onClick={() => setShowInfluencerProfile(false) } /> */}
      <div className='container'>  
        <Avatar src={brand?.companyLogo} alt="profile" name={brand?.brandName} size={80} />
        <h1 className='name'>{brand?.brandName}</h1>
        <p className='bio'>{brand?.companyDescription}</p>
        <p className='bio'>Contacted by: {brand?.contactName}</p>
        <a className='website' href={brand?.companyWebsite} target="_blank" rel='noreferrer'>{brand?.companyWebsite}</a>
      </div>      
    </div>
  );
}


export default InfluencerDashboard;
