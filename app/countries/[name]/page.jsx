import React from 'react'
import Navbar from '@/app/components/navbar'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'


function transformDomains(list) {
  let string = ''
  list.forEach(element => {
    string += String(element) + ' '
  });
  return string
}



function transformCurrenciesAndLanguages(list) {
  let string = ''
  list.forEach(element => {
    string += String(element.name) + ' '
  })
  return string
}

const getData = async (name) => {
  try {
    const res = await fetch(`http://localhost:3000/api/country/${name.toLowerCase()}`,
      {
        cache: 'no-store'
      })
    let data = await res.json()

    return data.data
  } catch (e) {
    console.error(e)
  }
}

async function Page({ params }) {
  const data = await getData(params.name)


  // console.log(window.innerWidth)

  return (
    <main className={styles.detailsMain}>
      <Navbar />
      <div className={styles.detailsBody}>
        <div className={styles.top}>
          <Link type='button' className={styles.backButton} href="/">Back</Link>
        </div>
        <div className={styles.bottom}>
          <div className={styles.image}>
            <Image src={data.flags.svg} width={320} height={260} className={styles.img} alt={data.name} style={{
              width: '100%',
              height: 'auto',
            }} />
          </div>

          <div className={styles.content}>
            <div className={styles.detailsParent}>
              <div className={styles.details}>
                <h1>{data.name}</h1>
                <p><span>Native Name: </span>{data.nativeName}</p>
                <p><span>Population: </span>{data.population.toLocaleString()}</p>
                <p><span>Region: </span>{data.region}</p>
                <p><span>Sub Region: </span>{data.subRegion}</p>
              </div>
              <div className={styles.secondDetails}>
                <p><span>top Level Domain: </span>{transformDomains(data.topLevelDomain)}</p>
                <p><span>Currencies: </span>{transformCurrenciesAndLanguages(data.currencies)}</p>
                <p><span>Languages: </span>{transformCurrenciesAndLanguages(data.languages)}</p>
              </div>
            </div>
            <div className={styles.borderCountries}>
              <h1>Border Countries</h1>
              <div className={styles.buttonGroup}>
                {
                  data.borderCountries.map((c) => {
                    return <Link href={`/countries/${c}`} className={styles.ncLink}>{c}</Link>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page