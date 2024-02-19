import React from "react";
import Navbar from "@/app/components/navbar";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { getCountry } from "@/app/utils/getdata.mjs";
import countries from "@/app/utils/data2.js";

export function generateStaticParams() {
  return countries.map((country) => ({
    name: country.name,
  }));
}

function transformDomains(list) {
  let string = "";
  list.forEach((element) => {
    string += String(element) + " ";
  });
  return string;
}

function transformCurrenciesAndLanguages(list) {
  let string = "";
  list.forEach((element) => {
    string += String(element.name) + " ";
  });
  return string;
}

const getCountryData = (name) => {
  const data = getCountry(name);
  // if (data.borderCountries) {
  //   for (let i = 0; i < data.borderCountries.length; i++) {
  //     data.borderCountries[i] = getCountryByAlpha3Code(data.borderCountries[i]);
  //   }
  // }
  return data;
};

function Page({ params }) {
  const data = getCountryData(decodeURIComponent(params.name.toLowerCase()));
  return (
    <main className={styles.detailsMain}>
      <Navbar />
      <div className={styles.detailsBody}>
        <div className={styles.top}>
          <Link type="button" className={styles.backButton} href="/">
            Back
          </Link>
        </div>
        <div className={styles.bottom}>
          <div className={styles.image}>
            <Image
              src={data.flags.svg}
              width={320}
              height={260}
              className={styles.img}
              alt={data.name}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.detailsParent}>
              <div className={styles.details}>
                <h1>{data.name}</h1>
                <p>
                  <span>Native Name: </span>
                  {data.nativeName}
                </p>
                <p>
                  <span>Population: </span>
                  {data.population.toLocaleString()}
                </p>
                <p>
                  <span>Region: </span>
                  {data.region}
                </p>
                <p>
                  <span>Sub Region: </span>
                  {data.subRegion}
                </p>
              </div>
              <div className={styles.secondDetails}>
                <p>
                  <span>top Level Domain: </span>
                  {transformDomains(data.topLevelDomain)}
                </p>
                <p>
                  <span>Currencies: </span>
                  {data.currencies &&
                    transformCurrenciesAndLanguages(data.currencies)}
                </p>
                <p>
                  <span>Languages: </span>
                  {data.languages &&
                    transformCurrenciesAndLanguages(data.languages)}
                </p>
              </div>
            </div>
            <div className={styles.borderCountries}>
              <h1>Border Countries</h1>
              <div className={styles.buttonGroup}>
                {data.borderCountries &&
                  data.borderCountries.map((c, index) => {
                    return (
                      <Link
                        key={c + index}
                        href={`/countries/${c}`}
                        className={styles.ncLink}
                      >
                        {c}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
