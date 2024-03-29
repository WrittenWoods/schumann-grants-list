export enum SearchFields {
    ApprovalDate,
    Amount,
    Organization,
    Location,
    GrantType,
    FundingType,
    ProgramArea,
    Strategy,
    Donor,
    KeywordSearch
  }

export enum IconClasses {
  iconLocation = "fa-solid fa-location-dot",
  iconGrantType = "fa-solid fa-calendar-day",
  iconFundingType = "fa-solid fa-gear",
  iconProgramArea = "fa-solid fa-folder",
  iconStrategy = "fa-solid fa-bullseye",
  iconDonor = "fa-solid fa-hand-holding-dollar",
  iconKeyword = "fa-solid fa-magnifying-glass",
  iconDate = "fa-solid fa-calendar-days",
  iconAmount = "fa-solid fa-circle-dollar-to-slot",
  iconOrg = "fa-solid fa-house",
}

export enum SortableColumns {
  ApprovalDate = "Approval Date",
  Amount = "Amount",
  Result = "Result"
}

export const DefaultSort:Array<{name: string, reversed: boolean}> = [
  { name: "Approval Date", reversed: true },
  { name: "Amount", reversed: false },
  { name: "Result", reversed: true }
]

export enum SortStatus {
  ArrowDown = "fa-solid fa-arrow-down",
  ArrowUp = "fa-solid fa-arrow-up",
  Close = "fa-solid fa-close"
}

export const Months = ["January", "February", "March",  "April", "May", "June",  "July", "August", "September", "October", "November", "December"]
