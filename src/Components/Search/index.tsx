import React, { useRef, useState } from "react";
import { debounce, setCurrentPinnedToLocalStorage } from "../../utils";
import { URL } from "../../utils/constants";
import styles from "./search.module.css";
import { SearchData, SearchProps } from "../../types";
const Search = ({ added, setAdded }: SearchProps) => {
  const [searchResult, setSearchResult] = useState<SearchData[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleAdd = (item: SearchData): void => {
    setAdded((prev: SearchData[]) => {
      return [...prev, item];
    });
    setCurrentPinnedToLocalStorage(JSON.stringify([...added, item]));
    if (inputRef?.current?.value) {
      inputRef.current.value = "";
      setSearchResult([]);
    }
  };

  console.log(searchResult, "searchResult");

  const isAlreadyInList = (id: number): boolean => {
    return added.some((item: SearchData) => item.id === id);
  };

  return (
    <div className={styles.search__wrapper}>
      <input
        id="search"
        type="search"
        name="search"
        className={styles.input}
        onChange={debouncedSearch}
        placeholder="Search any cities,places,etc.."
        ref={inputRef}
      />
      {!!searchResult?.length && !!inputRef?.current?.value && (
        <div className={styles.result_wrapper}>
          {searchResult?.map((item: SearchData) => {
            return (
              <div className={styles.result__item}>
                <div>
                  {item.name}, {item?.country} ({item.country_code})
                </div>
                {!isAlreadyInList(item.id) ? (
                  <button
                    className={styles.add__button}
                    onClick={() => handleAdd(item)}
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
      )}
    </div>
  );
};

export default Search;
