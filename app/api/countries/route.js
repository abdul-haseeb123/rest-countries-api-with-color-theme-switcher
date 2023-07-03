import { NextResponse } from "next/server"
import { getData } from "@/app/utils/getdata.mjs"
import { getDataByRegion } from "@/app/utils/getdata.mjs"
import { getDataByName, getDataByregionAndName } from "@/app/utils/getdata.mjs"

export function GET(request) {
    const { searchParams } = new URL(request.url)
    let data = {}
    if (searchParams.size == 0) {
        data = getData()

    } else {
        const region = searchParams.get('region')
        const name = searchParams.get('name')
        if (region && name) {
            data = getDataByregionAndName(region, name)
        }
        else if (region) {
            data = getDataByRegion(region)
        }
        else {
            data = getDataByName(name)
        }

    }


    return NextResponse.json({ data })

}