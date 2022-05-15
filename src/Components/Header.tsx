import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 4%;
  width: 100%;
  height: 68px;
  position: fixed;
  top: 0;
  font-size: 10px;
  line-height: 1.4;
  @media screen and (min-width: 1500px) {
    padding: 0 60px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 14px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  width: 92.52px;
  height: 31px;
  margin-right: 5px;
  fill: ${(props) => props.theme.red};
  @media screen and (min-width: 1150px) {
    margin-right: 25px;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 18px;
  a {
    display: flex;
    align-items: center;
    height: 100%;
  }
  @media screen and (min-width: 1330px) {
    margin-left: 20px;
  }
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 3px;
  bottom: -7px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.white.lighter};
`;

const Search = styled(motion.span)`
  color: white;
  display: flex;
  align-items: center;
  padding: 2px 5px;
  svg {
    width: 25px;
    height: 25px;
    margin: 2px 0;
    cursor: pointer;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.white.lighter};
  margin-left: 3px;
  ::placeholder {
    color: ${(props) => props.theme.white.darker};
  }
`;

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();

  const navVariants = {
    top: {
      backgroundImage:
        "linear-gradient(to bottom, rgb(0,0,0, 0.8),rgb(0,0,0,0))",
    },
    scroll: {
      backgroundImage:
        "linear-gradient(to bottom, rgb(20,20,20, 1),rgb(20,20,20,1))",
    },
  };

  const openSearch = () => setSearchOpen((prev) => !prev);
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 0) {
        navAnimation.start("scroll", [scrollY]);
      } else {
        navAnimation.start("top", [scrollY]);
      }
    });
  });

  return (
    <Nav variants={navVariants} animate={navAnimation} initial="top">
      <Col>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Items>
          <Item>
            <Link style={{ fontWeight: homeMatch ? 800 : 500 }} to={"/"}>
              홈{homeMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link style={{ fontWeight: tvMatch ? 800 : 500 }} to={"/Tv"}>
              시리즈
              {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link style={{ cursor: "default" }} to={"/"}>
              영화
            </Link>
          </Item>
          <Item>
            <Link style={{ cursor: "default" }} to={"/"}>
              NEW! 요즘 대세 콘텐츠
            </Link>
          </Item>
          <Item>
            <Link style={{ cursor: "default" }} to={"/"}>
              내가 찜한 콘텐츠
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search
          animate={{
            outline: searchOpen
              ? "1px whitesmoke solid"
              : "0px whitesmoke solid",
            width: searchOpen ? "250px" : "35px",
          }}
          transition={{ type: "linear" }}
        >
          <motion.svg
            onClick={openSearch}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            transition={{ type: "linear", delapy: 0.5, duration: 0.5 }}
            animate={{
              display: searchOpen ? "block" : "none",
              opacity: searchOpen ? 1 : 0,
            }}
            placeholder="제목, 사람, 장르"
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
