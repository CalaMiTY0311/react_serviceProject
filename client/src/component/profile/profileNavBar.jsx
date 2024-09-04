import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./profileNavBar.css";

import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useFollowUser from "../../hooks/useFollowUser";

import { Button, ButtonGroup } from '@chakra-ui/react';

import ProfileEditor from "./profileEditor";

const ProfileNavBar = (props) => {
    const { active } = props;

    const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);

    const [isModalOpen, setIsModalOpen] = useState(false);
	const onOpen = () => setIsModalOpen(true);
	const onClose = () => setIsModalOpen(false);

    return (
        <React.Fragment>
            <div className="nav-container">
                <nav className="navbar">
                    <div className="nav-background">
                        <ul className="nav-list">
                        <li
                                className={
                                    active === "home"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/">Home</Link>
                            </li>
                        {
            visitingOwnProfileAndAuth ? (

                <li
                    className={
                        active === "home"
                            ? "nav-item active"
                            : "nav-item"
                    }
                    onClick={onOpen}
                >   
                    <Link>EditProfile</Link>
                </li>
            ) : visitingAnotherProfileAndAuth ? (
                <li
                    className={
                        active === "home"
                            ? "nav-item active"
                            : "nav-item"
                    }
                >
                    <Button onClick={handleFollowUser}
                            isLoading={isUpdating}>
                                {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                </li>
            ) : null
        }
                            {/* <li
                                className={
                                    active === "projects"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/projects"></Link>
                            </li> */}
                            {/* <li
                                className={
                                    active === "articles"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/articles">Articles</Link>
                            </li>
                            <li
                                className={
                                    active === "contact"
                                        ? "nav-item active"
                                        : "nav-item"
                                }
                            >
                                <Link to="/contact">Contact</Link>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            </div>

            <ProfileEditor isOpen={isModalOpen} onOpen={onOpen} onClose={onClose} />
        </React.Fragment>
    );
};

export default ProfileNavBar;