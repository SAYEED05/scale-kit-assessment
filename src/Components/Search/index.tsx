import React, { useState } from "react";
import { debounce, setCurrentPinnedToLocalStorage } from "../../utils";
import { URL } from "../../utils/constants";
import styles from "./search.module.css";
const Search = ({ added, setAdded }: any) => {
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const fetchSearchResult = async (value: string) => {
    try {
      const res = await fetch(`${URL.SEARCH}${value}`);
      const data = await res.json();
      setSearchResult(data?.results);
    } catch (error) {
      window.alert("Search API Failed, please try again later");
      console.log(`SEARCH_ERROR-->${error}`);
    }
  };

  const debouncedSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    fetchSearchResult(e.target.value);
  }, 250);

  const isAlreadyInList = (id: number) => {
    return added.some((item: any) => item.id === id);
  };

  return (
    <div className={styles.search__wrapper}>
      {/* <label htmlFor="search">Search</label> */}
      <input
        id="search"
        type="search"
        name="search"
        className={styles.input}
        onChange={debouncedSearch}
        placeholder="Search any cities,places,etc.."
      />
      <div className={styles.result_wrapper}>
        {searchResult?.map((item: any) => {
          return (
            <div className={styles.result__item}>
              <div>
                {item.name}, {item?.country} ({item.country_code})
              </div>
              {!isAlreadyInList(item.id) ? (
                <button
                  onClick={() => {
                    setAdded((prev: any) => {
                      return [...prev, item];
                    });
                    setCurrentPinnedToLocalStorage(
                      JSON.stringify([...added, item])
                    );
                  }}
                >
                  Add
                </button>
              ) : (
                <div>Pinned</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
