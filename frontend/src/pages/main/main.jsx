// src/pages/main/main.jsx
import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { PostCard } from "./components/post-card/post-carg";
import { Pagination, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce } from "./utils";
import { request } from "../../utils";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState("");

  useEffect(() => {
    request(
      `/api/posts?search=${shouldSearch}&page=${page}&limit=${PAGINATION_LIMIT}`,
      "GET"
    ).then((response) => {
      if (!response.error) {
        setPosts(response.data.posts);
        setTotalPages(response.data.lastPage || 1);
      }
    });
  }, [page, shouldSearch]);

  const delayedSearch = useMemo(
    () =>
      debounce((value) => {
        setShouldSearch(value);
      }, 500),
    []
  );

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    delayedSearch(target.value);
  };

  return (
    <div className={className}>
      <Search searchPhrase={searchPhrase} onChange={onSearch} />
      {posts.length ? (
        <div className="post-list">
          {posts.map(({ id, imageUrl, title, publishedAt, comments }) => (
            <PostCard
              key={id}
              id={id}
              imageUrl={imageUrl}
              title={title}
              publishedAt={publishedAt}
              commentsCount={comments.length}
            />
          ))}
        </div>
      ) : (
        <div className="no-posts-found">
          <span>Keine Beiträge gefunden</span>
        </div>
      )}
      {totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  & .post-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
  & .no-posts-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 20px;
    color: #ffffff;
  }
`;
