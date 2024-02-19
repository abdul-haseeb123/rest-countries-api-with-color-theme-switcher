"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import styles from "./page.module.css";

function SearchFilterBox() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [query] = useDebounce(search, 500);

  useEffect(() => {
    if (!query && filter === "") {
      router.push(`/`);
    } else {
      if (filter === "") {
        router.push(`/?name=${query}`);
      } else if (query === "") {
        router.push(`/?region=${filter}`);
      } else {
        router.push(`/?name=${query}&region=${filter}`);
      }
    }
  }, [query, filter, router]);

  const handleSelect = (e) => {
    if (e.target.value.length == 0) {
      setFilter("");
    } else {
      setFilter(e.target.value);
    }
  };

  return (
    <div className={styles.filterCountry}>
      <div className={styles.searchbox}>
        <input
          type="text"
          placeholder="Search For a country"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className={styles.filter}>
        <select
          name="filterRegion"
          className={styles.selection}
          onChange={handleSelect}
          defaultValue=""
        >
          <option value="">Filter By Region</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilterBox;
