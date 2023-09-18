import React from "react";
import FriendGame from "./friendGame";
import { Pagination } from "../ui/pagination/pagination";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDataAtom} from "../../atom/atomStateuser";
import { userType } from "./../../types/userType";
import { loggedUserFriendsAtom } from "@/context/RecoilAtoms";

import { friendDataAtom} from "../../atom/atomStateFriend";
import { FriendsProps, User, UserData, UserFriend } from "./../../types/userFriendType";
import axios from "axios";
import { IconFriendsOff } from "@tabler/icons-react";
const friendsComponent = () => {
  const [active, setActive] = useState(1);
  const [friendData, setFriendData] = useRecoilState(friendDataAtom);
  const [friendState, setFriendState] = useState<User[]>(friendData as User[]);
  const [user, setUser] = useRecoilState(userDataAtom);
  const [userState, setUserState] = useState<userType>(user as userType);

  const [loggedUserFriends, setloggedUserFriends] = useRecoilState(loggedUserFriendsAtom);


  useEffect(() => {
      setFriendState(friendData as User[]);
  }, [friendData]);

  const fetchFriendData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`http://34.173.232.127/api/v1/users/friends?page=${active -1}&elementsNumber=${7}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userId = (loggedUserFriends as any).userName ;
      const accepted = res.data.response.friends.acceptedFriends;
      const filteredAccepted = accepted
        .filter(
          (friend:any) => friend.receiver.userName === userId
        )
        .map((friends:any) => friends.sender);
        setFriendData(filteredAccepted );
        setFriendState(filteredAccepted);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFriendData();
  }, [active]);
  return (
    <div className="w-full h-[90%] flex items-center rounded-[12px] md:rounded-[20px]  ">
      <div className="w-full h-full  flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-center space-y-10 " >
      <div className="w-full h-[80%] flex flex-col rounded-[12px] md:rounded-[20px] items-center justify-start space-y-10 ">
      {friendState.length === 0 ? (
      <div className=" w-full h-full flex items-center justify-center">
        <div>
       <IconFriendsOff className="w-8 md:w-24 h-8 md:h-24 "/>
        </div>
      </div>
    ) : (Array.isArray(friendState) &&
       friendState.map((request, index) => (
        <FriendGame friends={request} key={index} AcceptedFriends={friendState} setAcceptedFriends={setFriendState} />
      )))}
    </div>

    {friendState.length !== 0 && (
        <Pagination
          max={Math.ceil((friendState as any).elementsNumber / 7)}
          active={active}
          setActive={setActive}
        />
    )}
      </div>
    </div>
  );
};

export default friendsComponent;
