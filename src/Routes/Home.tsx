import { useQuery } from "react-query";
import styled from "styled-components";
import { getNowPlayingMovies, IGetMoviesResult } from "../api";
import ReactLoading from "react-loading";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black.standard};
  height: 200vh;
`;

const Loader = styled.div`
  margin-top: 50vh;
`;

const Banner = styled.div<{ url: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  @media screen and (min-width: 1500px) {
    padding: 0 60px;
    padding-bottom: 35vh;
  }
  padding: 4%;
  padding-bottom: 30vh;
  height: 100vh;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5) 90%, rgba(20, 20, 20, 1)),
    url(${(props) => props.url});
`;

const Title = styled.h2`
  width: 44%;
  margin-bottom: 1.2vw;
  color: #fff;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 80px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1;
  font-style: italic;
`;

function Home() {
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>
          <ReactLoading
            type={"spinningBubbles"}
            color={"red"}
            height={"100px"}
            width={"100px"}
          />
        </Loader>
      ) : (
        <>
          <Banner url={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
          </Banner>
          <Slider content="nowPlaying" />
          <Slider content="topRated" />
          <Slider content="upcoming" />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
