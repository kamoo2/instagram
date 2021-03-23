import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "./SuggestionList.scss";
import Suggestion from "./Suggestion";
import { useAppContext } from "store";
import { axiosInstance } from "api";
import { useAxios } from "api";
const SuggestionList = props => {
  // const [userList, setUserList] = useState([]);
  const {
    store: { jwtToken },
  } = useAppContext();

  const [userList, setUserList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };
  const [{ data: origUserList, loading, error }, refetch] = useAxios({
    url: "/accounts/suggestions/",
    headers,
  });

  useEffect(() => {
    if (!origUserList) setUserList([]);
    else setUserList(origUserList.map(user => ({ ...user, is_follow: false })));
  }, [origUserList]);

  // useEffect(() => {
  //   async function fetchUserList() {
  //     try {
  //       const response = await axios.get(apiURL, { headers });
  //       const { data } = response;
  //       setUserList(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchUserList();
  // }, []);
  const toggleFollowUser = username => {
    axiosInstance
      .post("/accounts/follow/", { username }, { headers })
      .then(response => {
        setUserList(prevUserList =>
          prevUserList.map(user =>
            user.username !== username ? user : { ...user, is_follow: true }
          )
        );
      })
      .catch(error => {
        console.log(error);
      });
    // setUserList(prevUserList => {
    //   return prevUserList.map(user => {
    //     if (user.username === username) {
    //       if (user.is_follow === true) {
    //         return { ...user, is_follow: false };
    //       }
    //       return { ...user, is_follow: true };
    //     } else {
    //       return user;
    //     }
    //   });
    // });
  };
  return (
    <>
      <button
        onClick={() => {
          console.log("refetch");
          refetch();
        }}
      >
        REFRESH
      </button>
      <Card
        title="Suggestions for you"
        size="small"
        style={{ marginBottom: 10 }}
      >
        {userList.map((user, index) => (
          <Suggestion
            key={index}
            user={user}
            toggleFollowUser={toggleFollowUser}
          />
        ))}
      </Card>
    </>
  );
};

export default SuggestionList;
