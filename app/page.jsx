import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Navbar from "./components/navbar";
import SearchFilterBox from "./SearchFilterBox";
import { getData } from "@/app/utils/getdata.mjs";
import { getDataByRegion } from "@/app/utils/getdata.mjs";
import { getDataByName, getDataByregionAndName } from "@/app/utils/getdata.mjs";

const getCountryData = (name, region) => {
  let data = {};
  if (name.length === 0 && region.length === 0) {
    data = getData();
  } else {
    if (region.length != 0 && name.length != 0) {
      data = getDataByregionAndName(region, name);
    } else if (region.length != 0) {
      data = getDataByRegion(region);
    } else {
      data = getDataByName(name);
    }
  }
  return data;
};

export default function Home({ searchParams }) {
  const name = searchParams["name"] ?? "";
  const region = searchParams["region"] ?? "";

  const data = getCountryData(name, region);

  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.section}>
        <SearchFilterBox />
        <div className={styles.flags}>
          {data.map((country, index) => {
            return (
              <Link
                className={styles.flag}
                href={`/countries/${country.name}`}
                key={country.name}
              >
                <Image
                  src={country.flags.png}
                  width={320}
                  height={192}
                  alt={country.name}
                  className={styles.image}
                  priority={true}
                />
                <div>
                  <h3>{country.name}</h3>

                  <p>
                    <span>Population: </span>
                    {country.population}
                  </p>
                  <p>
                    <span>Region: </span>
                    {country.region}
                  </p>
                  <p>
                    <span>Capital: </span>
                    {country.capital}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
