import { NextResponse } from "next/server"
import { getCountry, getCountryByAlpha3Code } from "@/app/utils/getdata.mjs"

export function GET(request, {params}) {
    
    const res = getCountry(params.name)
    for (let i=0; i<res.borderCountries.length; i++) {
        res.borderCountries[i] = getCountryByAlpha3Code(res.borderCountries[i])
    }
    return NextResponse.json({data:res})
}