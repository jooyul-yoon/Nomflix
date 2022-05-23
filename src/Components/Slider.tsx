import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
} from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  position: relative;
  top: -220px;
  height: 183px;
  margin-bottom: 3vw;
`;

const RowTitle = styled.h2`
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  a {
    @media screen and (min-width: 1500px) {
      margin-left: 60px;
    }
    font-size: 1.4vw;
    color: ${(props) => props.theme.white.darker};
    font-weight: 700;
    margin: 0 4% 0.5em 4%;
    text-decoration: none;
    display: inline-block;
    min-width: 6em;
  }
  a:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Row = styled(motion.div)`
  @media screen and (min-width: 1500px) {
    padding: 0 60px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4%;
  margin-bottom: 3vw;
  position: absolute;
  width: 100%;
`;

const NowShowing = styled.div`
  display: flex;
  width: 100%;
`;

const ItemContainer = styled(motion.div)`
  width: 16.66667vw;
  margin: 0 0.2vw;
  height: 140px;
  width: 100%;
  white-space: normal;
  vertical-align: top;
  :first-child {
    padding-left: 0;
    transform-origin: left;
  }
  :last-child {
    padding-right: 0;
    transform-origin: right;
  }
  border-radius: 0.2vw;
`;

const ItemImage = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  height: 100%;
  border-radius: 0.2vw 0.2vw 0 0;
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.standard};
  opacity: 0;
  h4 {
    font-size: 16px;
  }
`;

const Handle = styled.div<{ isNext: Boolean; bgPhoto: string }>`
  height: 141px;
  width: 3.3vw;
  position: absolute;
  background-position-x: ${(props) => (props.isNext ? "left" : "right")};
  ${(props) => (props.isNext ? "right: 0" : "left: 0")};
  bottom: 0px;
  border: none;
  border-radius: 0.2vw;
  z-index: 20;
`;

const HandleBtn = styled.button`
  border-radius: 0.2vw;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
  background-color: rgba(20, 20, 20, 0.5);
  font-family: monospace;
  font-size: 2.2em;
  font-weight: 100;
  transition: background-color 0.3s;
  font-weight: bold;
  :hover {
    background-color: rgba(94, 94, 94, 0.3);
    font-size: 2.5em;
  }
`;

const rowVariants = {
  visible: { x: 0, opacity: 1 },
  hiddenNext: { x: window.innerWidth * 0.96, opacity: 0.3 },
  exitNext: { x: -window.outerWidth * 0.96, opacity: 0.3 },
  hiddenPrev: { x: -window.outerWidth * 0.96, opacity: 0.3 },
  exitPrev: { x: window.outerWidth * 0.96, opacity: 0.3 },
};

const ItemVariants = {
  hover: {
    scale: 1.5,
    zIndex: 100,
    cursor: "pointer",
    y: -50,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
  normal: {
    scale: 1,
    zIndex: 0,
  },
};

const InfoVariants = {
  hover: {
    opacity: 1,
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    transition: { delay: 0.5, duration: 0.1, type: "tween" },
  },
};

export interface ISlider {
  content: string;
}

function Slider(props: ISlider) {
  const { data } = useQuery<IGetMoviesResult>(
    ["movies", props.content],
    props.content === "nowPlaying"
      ? getNowPlayingMovies
      : props.content === "topRated"
      ? getTopRatedMovies
      : props.content === "upcoming"
      ? getUpcomingMovies
      : getNowPlayingMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const offset = 6;
  console.log(data);
  const increaseNowIndex = () => {
    setIsNext(true);
    if (leaving) return;
    setLeaving(true);
    setIndex((prev) => (prev + 1) % 3);
  };
  const decreaseNowIndex = () => {
    setIsNext(false);
    if (leaving) return;
    setLeaving(true);
    setIndex((prev) => (prev > 0 ? prev - 1 : 2));
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      <RowTitle>
        <a href="/">
          {props.content === "nowPlaying"
            ? "지금 뜨는 콘텐츠"
            : props.content === "topRated"
            ? "평점 높은 콘텐츠"
            : props.content === "upcoming"
            ? "출시 예정 콘텐츠"
            : null}
        </a>
      </RowTitle>
      <Handle
        isNext={false}
        bgPhoto={makeImagePath(
          data?.results.slice(1, 19)[
            offset * index - 1 < 0 ? offset * index + 17 : offset * index - 1
          ].backdrop_path!,
          "w200"
        )}
      >
        <HandleBtn onClick={decreaseNowIndex}>{"<"}</HandleBtn>
      </Handle>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial={isNext ? "hiddenNext" : "hiddenPrev"}
          animate="visible"
          exit={isNext ? "exitNext" : "exitPrev"}
          transition={{ type: "tween", duration: 0.7 }}
          key={index}
        >
          <NowShowing>
            {data?.results
              .slice(1, 19)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <ItemContainer
                  key={movie.id}
                  variants={ItemVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                >
                  <ItemImage
                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                  ></ItemImage>
                  <Info variants={InfoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </ItemContainer>
              ))}
          </NowShowing>
        </Row>
      </AnimatePresence>

      <Handle
        isNext={true}
        bgPhoto={makeImagePath(
          data?.results.slice(1, 19)[
            offset * index + offset === 18 ? 0 : offset * index + offset
          ].backdrop_path!,
          "w200"
        )}
      >
        <HandleBtn onClick={increaseNowIndex}>{">"}</HandleBtn>
      </Handle>
    </Wrapper>
  );
}

export default Slider;
