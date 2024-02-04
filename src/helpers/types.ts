import { SortableColumns } from "./enums"

export type GrantRecord = {
    amount:number
    description:string
    donor:string
    fundingType:string
    grantType:string
    month:number
    orgCity:string
    orgName:string
    orgState:string
    programArea:string
    strategy:string
    strategy2:string
    year:number
}

export type ProcessedData = {
    data:Array<GrantRecord>
    uniqueOptions:UniqueOptions
}

type Options<T> = Array<T>;

export type ProgramArea = {
    name: string,
    finalYear: number
}

export type UniqueOptions = {
    grantType: Options<string>
    orgCity: Options<string>
    orgState: Options<string>
    orgName: Options<string>
    fundingType: Options<string>
    programArea: Options<ProgramArea>
    strategy: Options<string>
    donor: Options<string>
}

export type Inputs = {
    minMonth: number 
    maxMonth: number 
    minYear: number 
    maxYear: number
    minVal: string 
    maxVal: string 
    orgNames: Array<string>
    orgCities: Array<string>
    orgStates: Array<string>
    grantTypes: Array<string>
    fundingTypes: Array<string>
    programAreas: Array<string>
    strategies: Array<string>
    donors: Array<string>
    anyTerms: boolean 
    searchQueries: Array<string>
}

export type Tallies = {
    resultsNum: string,
    granteesNum: string,
    grantsTotal: string
}

export type Column = {
    column:SortableColumns,
    reversed:boolean
}