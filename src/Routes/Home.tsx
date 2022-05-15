import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import ReactLoading from "react-loading";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 200vh;
  background-color: ${(props) => props.theme.black.standard};
`;

const Loader = styled.div`
  margin-top: 50vh;
`;

const Banner = styled.div<{ url: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media screen and (min-width: 1500px) {
    padding: 0 60px;
    padding-top: 40vh;
  }
  padding: 4%;
  padding-top: 40vh;
  height: 100vh;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5) 90%, rgba(20, 20, 20, 1)),
    url(${(props) => props.url});
`;

const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 1.2vw;
`;

const Overview = styled.p`
  width: 44%;
  font-size: 1.2vw;
  margin: 0.5vw 0 0 0;
`;

function Home() {
  const { isLoading, data } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
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
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
