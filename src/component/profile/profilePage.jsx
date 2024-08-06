import React, { useState, useEffect } from "react";

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGithub,
	faStackOverflow,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import { Button, ButtonGroup } from '@chakra-ui/react';
import { MdBuild, MdCall } from "react-icons/md"
import { SlUserFollow } from "react-icons/sl";

import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";

import NavBar from "./profileNavbar";
import ProfileEditor from './profileEditor';

// import INFO from "../data/user";
// import SEO from "../data/seo";
import default_img from "../../assets/profile/default.jpg"

import useFollowUser from "../../hooks/useFollowUser";

import "./styles/profilePage.css";

const ProfilePage = () => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const onOpen = () => setIsModalOpen(true);
	const onClose = () => setIsModalOpen(false);

	const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);

	console.log("authUser :", authUser)
	console.log("userProfile :", userProfile)

	return (
		<>
			{/* <Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet> */}

			<div className="page-content">
				<NavBar active="home" />
				<br /><br /><br /><br /><br />
				<div className="content-wrapper">

					{/* <div className="homepage-logo-container">
						<div style={logoStyle}>
							<Logo width={logoSize} link={false} />
						</div>
					</div> */}

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<br /><br /><br /><br /><br /><br />
								<div className="title homepage-title">
									{userProfile.username}
								</div>

								<div className="subtitle homepage-subtitle">
									{userProfile.bio ? (
										<>{userProfile.bio}</>
									) : (
										<div>please Add Comment</div>
									)}
								</div>
							</div>

							<div className="homepage-first-area-right-side">
								<div className="homepage-image-container">
									<div className="homepage-image-wrapper">
										{userProfile.profilePicURL ? (
											<img
												src={userProfile.profilePicURL}
												alt="about"
												className="homepage-image"
												style={{ width: "300px", height: "300px", objectFit: "cover" }}
											/>
										) : (
											<img
												src={default_img}
												alt="about"
												className="homepage-image"
											/>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="homepage-socials">
							{visitingOwnProfileAndAuth ? (
								<Button onClick={onOpen}
									leftIcon={<MdBuild />}
									colorScheme='pink'
									variant='solid'>
									Settings
								</Button>
							) : (
								<></>
							)}
							{visitingAnotherProfileAndAuth ? (
								<Button
									leftIcon={<SlUserFollow />}
									colorScheme='green'
									variant='solid'
									onClick={handleFollowUser}
									isLoading={isUpdating}
								>
									{isFollowing ? "Unfollow" : "Follow"}
								</Button>
							) : (
								<></>
							)}
							{/* <Button onClick={onOpen} leftIcon={<MdBuild />} colorScheme='pink' variant='solid'>
    							Settings
  							</Button> */}
						</div>

						<div className="homepage-socials">
							<a
								// href={INFO.socials.twitter}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faTwitter}
									className="homepage-social-icon"
								/>
							</a>
							<a
								// href={INFO.socials.github}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faGithub}
									className="homepage-social-icon"
								/>
							</a>
							<a
								// href={INFO.socials.stackoverflow}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faStackOverflow}
									className="homepage-social-icon"
								/>
							</a>
							<a
								// href={INFO.socials.instagram}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faInstagram}
									className="homepage-social-icon"
								/>
							</a>
							<a
								// href={`mailto:${INFO.main.email}`}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faMailBulk}
									className="homepage-social-icon"
								/>
							</a>
						</div>

						{/* <div className="homepage-projects">
							<AllProjects />
						</div> */}
						<br /><br /><br /><br /><br /><br /><br />
					</div>
				</div>
				<ProfileEditor isOpen={isModalOpen} onOpen={onOpen} onClose={onClose} />
			</div>
		</>
	);
};

export default ProfilePage;
