import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGithub,
	faStackOverflow,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

// import Logo from "../components/common/logo";
import Footer from "./profileFooter";
import NavBar from "./profileNavBar";
// import Article from "../components/homepage/article";
// import Works from "../components/homepage/works";
// import AllProjects from "../components/projects/allProjects";

// import INFO from "../data/user";
// import SEO from "../data/seo";
// import myArticles from "../data/articles";
import useUserProfileStore from "../../store/userProfileStore";

import "./profile.css";

const Profile = () => {
	const { userProfile } = useUserProfileStore();
	// console.log(userProfile)

	const [stayLogo, setStayLogo] = useState(false);
	const [logoSize, setLogoSize] = useState(80);
	const [oldLogoSize, setOldLogoSize] = useState(80);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			let scroll = Math.round(window.pageYOffset, 2);

			let newLogoSize = 80 - (scroll * 4) / 10;

			if (newLogoSize < oldLogoSize) {
				if (newLogoSize > 40) {
					setLogoSize(newLogoSize);
					setOldLogoSize(newLogoSize);
					setStayLogo(false);
				} else {
					setStayLogo(true);
				}
			} else {
				setLogoSize(newLogoSize);
				setStayLogo(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [logoSize, oldLogoSize]);

	// const currentSEO = SEO.find((item) => item.page === "home");

	// const logoStyle = {
	// 	display: "flex",
	// 	position: stayLogo ? "fixed" : "relative",
	// 	top: stayLogo ? "3vh" : "auto",
	// 	zIndex: 999,
	// 	border: stayLogo ? "1px solid white" : "none",
	// 	borderRadius: stayLogo ? "50%" : "none",
	// 	boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
	// };

	return (
		<React.Fragment>
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
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						{/* <div style={logoStyle}>
							<Logo width={logoSize} link={false} />
						</div> */}
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<div className="title homepage-title">
									{/* {INFO.homepage.title} */}
									{ userProfile.username }
								</div>

								<div className="subtitle homepage-subtitle">
									{/* {INFO.homepage.description} */}
									{ userProfile.bio }
								</div>
							</div>

							<div className="homepage-first-area-right-side">
								<div className="homepage-image-container">
									<div className="homepage-image-wrapper">
										<img
											src={userProfile.profilePicURL}
											alt="about"
											className="homepage-image"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="homepage-socials">
						{userProfile.twitterURL ? (
								<a
								href={userProfile.twttierURL}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faTwitter}
									className="homepage-social-icon"
								/>
							</a>
							) : (<></>)}
							{userProfile.twitterURL && (
        <a
          href={userProfile.twitterURL}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faTwitter}
            className="homepage-social-icon"
          />
        </a>
      )}
      {userProfile.instagramURL && (
        <a
          href={userProfile.instagramURL}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="homepage-social-icon"
          />
        </a>
      )}
      {userProfile.facebookURL && (
        <a
          href={userProfile.facebookURL}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            className="homepage-social-icon"
          />
        </a>
      )}
      {userProfile.githubURL && (
        <a
          href={userProfile.githubURL}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="homepage-social-icon"
          />
        </a>
      )}
						</div>

						<div className="homepage-projects">
							{/* <AllProjects /> */}
						</div>

						<div className="homepage-after-title">
							{/* <div className="homepage-articles">
								{myArticles.map((article, index) => (
									<div
										className="homepage-article"
										key={(index + 1).toString()}
									>
										<Article
											key={(index + 1).toString()}
											date={article().date}
											title={article().title}
											description={article().description}
											link={"/article/" + (index + 1)}
										/>
									</div>
								))}
							</div> */}

							<div className="homepage-works">
								{/* <Works /> */}
							</div>
						</div>

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Profile;
