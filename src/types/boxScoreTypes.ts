export interface BoxScoreData {
    gameInfo: GameInfo
    teams: Teams
    players: Players
}

export interface GameInfo {
    homeTeam: string
    homePoints: number
    homeWinProb: number
    awayTeam: string
    awayPoints: number
    awayWinProb: number
    homeWinner: boolean
    excitement: number
}

export interface Teams {
    ppa: Ppa[]
    cumulativePpa: CumulativePpa[]
    successRates: SuccessRate[]
    explosiveness: Explosiveness[]
    rushing: Rushing3[]
    havoc: Havoc[]
    scoringOpportunities: ScoringOpportunity[]
    fieldPosition: FieldPosition[]
}

export interface Ppa {
    team: string
    plays: number
    overall: Overall
    passing: Passing
    rushing: Rushing
}

export interface Overall {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface Passing {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface Rushing {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface CumulativePpa {
    team: string
    plays: number
    overall: Overall2
    passing: Passing2
    rushing: Rushing2
}

export interface Overall2 {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface Passing2 {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface Rushing2 {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface SuccessRate {
    team: string
    overall: Overall3
    standardDowns: StandardDowns
    passingDowns: PassingDowns
}

export interface Overall3 {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface StandardDowns {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface PassingDowns {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface Explosiveness {
    team: string
    overall: Overall4
}

export interface Overall4 {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
}

export interface Rushing3 {
    team: string
    powerSuccess: string
    stuffRate: string
    lineYards: string
    lineYardsAverage: string
    secondLevelYards: string
    secondLevelYardsAverage: string
    openFieldYards: string
    openFieldYardsAverage: string
}

export interface Havoc {
    team: string
    total: string
    frontSeven: string
    db: string
}

export interface ScoringOpportunity {
    team: string
    opportunities: number
    points: number
    pointsPerOpportunity: number
}

export interface FieldPosition {
    team: string
    averageStart: string
    averageStartingPredictedPoints: string
}

export interface Players {
    usage: Usage[]
    ppa: Ppa2[]
}

export interface Usage {
    player: string
    team: string
    position: string
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
    rushing: number
    passing: number
}

export interface Ppa2 {
    player: string
    team: string
    position: string
    average: Average
    cumulative: Cumulative
}

export interface Average {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
    rushing: number
    passing: number
}

export interface Cumulative {
    total: number
    quarter1: number
    quarter2?: number
    quarter3?: number
    quarter4?: number
    rushing: number
    passing: number
}
