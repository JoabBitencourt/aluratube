import React  from "react";
import config from "../config.json";
import styled from "styled-components";
import {CSSReset} from "../src/components/CSSReset"
import Menu from "../src/components/Menu";
import {StyledTimeline} from "../src/components/TimeLine"

const StyledHome = styled.div`
  
`

const HomePage = () => {
  const estiloDaHomePage = { 
    // backgroundColor: "black"
 };
  const [valorDoFiltro, setValorDoFiltro] = React.useState("")
  // console.log(setValorDoFiltro);
  return (
    <>
      
      <StyledHome>
        {/* {Prop Drilling} */}
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header></Header>
        <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}></TimeLine>
      </StyledHome>
    </>
  );
};

export default HomePage;





const StyledHeader = styled.div`
  background-color: ${({theme})=> theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  background-color: blue;
  /* background-image: url(${config.bg}); */
  background: url(${({bg})=> bg}) center/ cover no-repeat;
  height: 230px;
`
const Header = () => {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      {/* <img src="banner"/> */}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
};

const TimeLine = ({searchValue, ...props}) => {
  const playlistsNames = Object.keys(props.playlists);
  //statement
  //retorno por expressão
  return (
    <StyledTimeline>
      {playlistsNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video)=>{
                return video.title.toLowerCase().includes(searchValue.toLowerCase())
              }).map((video) => {
                const Param = "./video?"+video.url
                return (
                  <a key={video.url} href={Param}>
                    <img src={video.thumb} />
                    <span>{video.title}</span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
};
