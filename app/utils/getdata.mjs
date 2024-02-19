// import data from './data2.js'
import mydata from "./data2.js";

export const getData = () => {
  const countries = mydata.map((c) => {
    return {
      name: c.name,
      population: c.population,
      region: c.region,
      flags: c.flags,
      capital: c.capital,
    };
  });

  return countries;
};

export const getDataByRegion = (region) => {
  const data = getData();
  const filteredcountries = data.filter((c) => {
    if (c.region.toLowerCase() === region.toLowerCase()) {
      return c;
    }
  });
  return filteredcountries;
};

export const getDataByName = (name) => {
  const data = getData();
  const filteredcountries = data.filter((c) => {
    if (c.name.toLowerCase().startsWith(name)) {
      return c;
    }
  });
  return filteredcountries;
};

export const getDataByregionAndName = (region, name) => {
  const data = getData();
  const filteredcountries = data.filter((c) => {
    if (
      c.region.toLowerCase() === region.toLowerCase() &&
      c.name.toLowerCase().startsWith(name)
    ) {
      return c;
    }
  });

  return filteredcountries;
};

export const getCountry = (name) => {
  let result = {};
  const country = mydata.map((c) => {
    if (c.name.toLowerCase() === name.toLowerCase()) {
      let borderCountries = c.borders == undefined ? [] : c.borders;
      let bc;
      if (borderCountries.length > 0) {
        bc = borderCountries.map((b) => {
          return getCountryByAlpha3Code(b);
        });
      }
      return (result = {
        name: c.name,
        nativeName: c.nativeName,
        topLevelDomain: c.topLevelDomain,
        population: c.population,
        currencies: c.currencies,
        region: c.region,
        subRegion: c.subregion,
        languages: c.languages,
        capital: c.capital,
        borderCountries: bc,
        flags: c.flags,
      });
    }
  });

  // for (let i = 0; i < mydata.length; i++) {
  //     const c = mydata[i]
  //     if (c.name.toLowerCase() === name.toLowerCase()) {
  //         return {
  //             name: c.name, nativeName: c.nativeName, topLevelDomain: c.topLevelDomain,
  //             population: c.population, currencies: c.currencies, region: c.region, subRegion: c.subregion,
  //             languages: c.languages, capital: c.capital, borderCountries: c.borders
  //         }
  //     }
  //     else {
  //         continue
  //     }
  // }

  return result;
};

export const getCountryByAlpha3Code = (alpha3Code) => {
  let result = "";
  const r = mydata.map((c) => {
    if (c.alpha3Code === alpha3Code) {
      result = c.name;
    }
  });

  return result;
};

// console.log(getDataByRegion('asia'));
// console.log(getCountryByAlpha3Code('AFG'))
