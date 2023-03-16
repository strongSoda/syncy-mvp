import API from "global/constants/api";

const getInfluencerProfile = async (email: string) => {
    // setFetchingProfile(true);
    try {
      const res = await fetch(`${API}/influencer-profile?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      const profile = data?.data
      return profile;
      // setLoading(false);
      // setFetchingProfile(false);
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.code;
      const errorMessage = error?.message;
      // setFetchingProfile(false);
    }      
}

export default getInfluencerProfile;
