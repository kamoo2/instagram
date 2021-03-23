import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";
// import useAxios from "axios-hooks";
// import axios from "axios";
import { useAxios, axiosInstance } from "api";
import { useEffect, useState } from "react";

const PostList = () => {
  // const [postLists, setPostLists] = useState([]);
  const {
    store: { jwtToken },
  } = useAppContext();

  const [postList, setPostList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "/api/posts/",
    headers,
  });

  useEffect(() => {
    setPostList(originPostList);
    console.log("??");
  }, [originPostList]);
  // useEffect(() => {
  //   axios
  //     .get(apiURL, { headers })
  //     .then(response => {
  //       const { data } = response;
  //       setPostLists(data);
  //     })
  //     .catch(error => {
  //       //error.response;
  //     });
  // }, []);

  const handleLike = async ({ post, isLike }) => {
    const method = isLike ? "POST" : "DELETE";
    try {
      const response = await axiosInstance({
        url: `/api/posts/${post.id}/like/`,
        method,
        headers,
      });
      console.log("response : ", response);
      // 화면 전체를 refetch 해주는것
      // refetch();

      // 상태값을 이용한 부분적 refetch
      // 전체 PostList를 state로서 생성해주고
      // axios로 가져오는 data를 origPostList로 지정해준다음
      // useEffect로 origPostList가 변경될때마다 setPostList(originPostList) 해준다.
      setPostList(prevList => {
        return prevList.map(currentPost =>
          currentPost === post
            ? { ...currentPost, is_like: isLike }
            : currentPost
        );
      });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다. " />
      )}
      {postList &&
        postList.map(post => {
          const { id } = post;
          return <Post key={id} post={post} handleLike={handleLike} />;
        })}
    </div>
  );
};

export default PostList;
