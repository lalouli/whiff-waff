import HistoryIcon from "../../../public/historyIcon.svg";
import { useEffect, useState } from "react";
import Image from "next/image";
import MatchComponent from "./matchComponent";
import { Pagination } from "../ui/pagination/pagination";
import { useRecoilState } from "recoil";
import {
  loggedUserAtom,
  matchHistoryAtom,
  userAtom,
} from "@/context/RecoilAtoms";
import { loggedUserType, matchHistoryType, userType } from "@/types/userType";
import { api } from "../axios/instance";
import { IconBallFootballOff } from "@tabler/icons-react";

export default function MatchComponents() {
  const [activePage, setActivePage] = useState(1);
  const [matchHistory, setMatchHistory] = useRecoilState(matchHistoryAtom);
  const [displayedMatchHistory, setDisplayedHistory] = useState(matchHistory);
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const fetchMatchHistoryPage = async () => {
    console.log("-> ", (user as userType).userName);
    console.log("->", activePage);
    console.log("-> historyLenght", matchHistory.length);

	console.log('-> pageNumber', Math.ceil(matchHistory.length / 5));
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await api.get(
        `/users/historyGame/${
          (user as userType).id
        }?page=${activePage - 1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
		console.log('matchHistory before  : ', matchHistory);
		console.log("matchHistory after : ", res.data);
	  	setMatchHistory(res.data);
		setDisplayedHistory(res.data);
    } catch (error) {

	}
  };

  useEffect(() => {
    console.log(activePage);
    fetchMatchHistoryPage();
  }, [activePage]);

  return (
    <div className="w-full h-full flex flex-col bg-[#606060]/[12%] rounded-[12px] md:rounded-[20px]">
      <div className="w-full h-[7%] md:h-[12%] flex flex-row items-center space-x-2 md:space-x-4 px-3 md:px-10 md:py-2  ">
        <Image
          src={HistoryIcon}
          alt="match history icon"
          className="w-7 md:w-10"
        />
        <div className="font-semibold font-teko text-2xl md:text-3xl tracking-wide text-Mercury md:pt-1">
          GAME HISTORY
        </div>
      </div>
      <div className="w-full h-[90%] md:h-[95%] flex flex-col items-center justify-start ">
        {displayedMatchHistory.length > 0 ? (
          <div className="w-full min-h-1 flex items-center justify-center flex-col space-y-4">
            {displayedMatchHistory.map((item: matchHistoryType, index) => {
              return (
                <MatchComponent
                  key={index}
                  Mode={
                    (loggedUser as loggedUserType).userName ===
                    (user as userType).userName
                      ? item.scoreLeft < item.scoreRight
                        ? "Lose"
                        : "Win"
                      : item.scoreLeft > item.scoreRight
                      ? "Lose"
                      : "Win"
                  }
                  firstUserName={
                    item.scoreLeft < item.scoreRight
                      ? item.game.playerTwo.userName
                      : item.game.playerOne.userName
                  }
                  secondUserName={
                    item.scoreLeft < item.scoreRight
                      ? item.game.playerOne.userName
                      : item.game.playerTwo.userName
                  }
                  firstUserAvatar={
                    item.scoreLeft < item.scoreRight
                      ? item.game.playerTwo.avatar
                      : item.game.playerOne.avatar
                  }
                  secondUserAvatar={
                    item.scoreLeft < item.scoreRight
                      ? item.game.playerOne.avatar
                      : item.game.playerTwo.avatar
                  }
                  firstScore={
                    item.scoreLeft > item.scoreRight
                      ? item.scoreLeft
                      : item.scoreRight
                  }
                  secondScore={
                    item.scoreLeft < item.scoreRight
                      ? item.scoreLeft
                      : item.scoreRight
                  }
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center flex-row space-x-2 md:space-x-6">
            <IconBallFootballOff className="w-8 md:w-12 h-8 md:h-12" />
            <div className="font-semibold font-teko text-xl md:text-3xl pt-2">
              {" "}
              No match history found
            </div>
          </div>
        )}
        {matchHistory.length > 0 && (
          <div className="w-full h-full py-2 flex items-center justify-center ">
            <Pagination
              max={Math.round(matchHistory.length / 5)}
              active={activePage}
              setActive={setActivePage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
