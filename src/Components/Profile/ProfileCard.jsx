import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";

const ProfileCard = () => {

    const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
    
    return (
    <div className="lg:fixed lg:top-7 lg:left-14 lg:w-3/12 md:fixed md:w-5/12">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mb-4">
            {/* <!-- Banner Profile --> */}
            <div className="relative">
                <img src={authUser.profilePicURL} alt="Banner Profile" className="w-full rounded-t-lg" />
                {/* <img src={authUser.profilePicURL} alt="Profile Picture" className="absolute bottom-0 left-2/4 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white" /> */}
            </div>
            {/* <!-- User Info with Verified Button --> */}
            <div className="flex items-center mt-4">
                <h2 className="text-xl font-bold text-gray-800">{authUser.username}</h2>
            </div>
            {/* <!-- Bio --> */}
            <p className="text-gray-700 mt-2"> followers :  {authUser.followers.length}</p>
            <p className="text-gray-700 mt-2"> following :  {authUser.following.length}</p>
            {/* <!-- Social Links --> */}
            {/* <div className="flex items-center mt-4 space-x-4">
                <a href="#" className="text-blue-500 hover:underline"> Twitter </a>
                <a href="#" className="text-blue-500 hover:underline"> GitHub </a>
                <a href="#" className="text-blue-500 hover:underline"> LinkedIn </a>
            </div> */}
        </div>
    </div>
    )
}
export default ProfileCard;