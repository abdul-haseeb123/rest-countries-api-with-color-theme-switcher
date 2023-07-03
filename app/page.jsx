'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from './components/navbar'

export default function Home() {
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        if ((filter.length === 0) && (search.length === 0)) {
          let res = await fetch('/api/countries')
          res = await res.json()
          setData(res.data)
          // setData(res.data)
        }
        else {
          if ((filter.length != 0) && (search.length != 0)) {
            let res = await fetch(`/api/countries?region=${filter}&name=${search}`)
            res = await res.json()
            setData(res.data)
          }
          else if ((filter.length != 0) && (search.length === 0)) {
            let res = await fetch(`/api/countries?region=${filter}`)
            res = await res.json()
            setData(res.data)
          }
          else {
            let res = await fetch(`/api/countries?name=${search}`)
            res = await res.json()
            setData(res.data)
          }
          // console.log(res)
        }
      } catch (e) {
        console.log(e.message)
      }

    }

    fetchData()

    return () => {
      console.log('is mounted')
    }
  }, [filter, search])

  const handleSelect = (e) => {
    if (e.target.value.length == 0) {
      setFilter('')
    } else {
      setFilter(e.target.value)
    }
  }



  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.section}>
        <div className={styles.filterCountry}>
          <div className={styles.searchbox}>
            <input type="text" placeholder='Search For a country' onChange={(e) => setSearch(e.target.value)} value={search} />
          </div>
          <div className={styles.filter}>
            <select name="filterRegion" className={styles.selection} onChange={handleSelect} defaultValue=''>
              <option value="">Filter By Region</option>
              <option value="africa">Africa</option>
              <option value="americas">America</option>
              <option value="africa">Africa</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div></div>
        <div className={styles.flags}>
          {
            data.map((country, index) => {
              return (
                <Link className={styles.flag} href={`/countries/${country.name}`} key={country.name}>

                  <Image src={country.flags.png} width={320} height={192} alt={country.name} className={styles.image} priority={true} />
                  <div>
                    <h3>{country.name}</h3>

                    <p><span>Population: </span>{country.population}</p>
                    <p><span>Region: </span>{country.region}</p>
                    <p><span>Capital: </span>{country.capital}</p>
                  </div>

                </Link>
              )
            })
          }

        </div>
      </section>
    </main>
  )
}
