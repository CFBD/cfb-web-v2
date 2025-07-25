export interface BoxScoreData {
  gameInfo: GameInfo;
  teams: Teams;
  players: Players;
}

export interface GameInfo {
  homeTeam: string;
  homePoints: number;
  homeWinProb: number;
  awayTeam: string;
  awayPoints: number;
  awayWinProb: number;
  homeWinner: boolean;
  excitement: number;
}

export interface Teams {
  ppa: TeamPPA[];
  cumulativePpa: TeamCumulativePPA[];
  successRates: SuccessRate[];
  explosiveness: Explosiveness[];
  rushing: RushingStats[];
  havoc: Havoc[];
  scoringOpportunities: ScoringOpportunity[];
  fieldPosition: FieldPosition[];
}

export interface TeamPPA {
  team: string;
  plays: number;
  overall: Overall;
  passing: Passing;
  rushing: Rushing;
}

export interface Overall {
  total: number;
  quarter1: number;
  quarter2?: number;
  quarter3?: number;
  quarter4?: number;
}

export interface Passing {
  total: number;
  quarter1: number;
  quarter2?: number;
  quarter3?: number;
  quarter4?: number;
}

export interface Rushing {
  total: number;
  quarter1: number;
  quarter2?: number;
  quarter3?: number;
  quarter4?: number;
}

export interface TeamCumulativePPA {
  team: string;
  plays: number;
  overall: Overall;
  passing: Passing;
  rushing: Rushing;
}

export interface SuccessRate {
  team: string;
  overall: Overall;
  standardDowns: StandardDowns;
  passingDowns: PassingDowns;
}

export interface StandardDowns {
  total: number;
  quarter1: number;
  quarter2?: number;
  quarter3?: number;
  quarter4?: number;
}

export interface PassingDowns {
  total: number;
  quarter1: number;
  quarter2?: number;
  quarter3?: number;
  quarter4?: number;
}

export interface Explosiveness {
  team: string;
  overall: Overall;
}

export interface RushingStats {
  team: string;
  powerSuccess: string;
  stuffRate: string;
  lineYards: string;
  lineYardsAverage: string;
  secondLevelYards: string;
  secondLevelYardsAverage: string;
  openFieldYards: string;
  openFieldYardsAverage: string;
}

export interface Havoc {
  team: string;
  total: string;
  frontSeven: string;
  db: string;
}

export interface ScoringOpportunity {
  team: string;
  opportunities: number;
  points: number;
  pointsPerOpportunity: number;
}

export interface FieldPosition {
  team: string;
  averageStart: string;
  averageStartingPredictedPoints: string;
}

export interface Players {
  usage: Usage[];
  ppa: PlayerPPA[];
}

export interface Usage {
  player: string;
  team: string;
  position: string;
  total: number;
  quarter1: number;
  quarter2?: number;
  quarter3?: number;
  quarter4?: number;
  rushing: number;
  passing: number;
}

export interface PlayerPPA {
  player: string;
  team: string;
  position: string;
  average: PlayerPPAAverages;
  cumulative: PlayerPPACumulative;
}

export interface PlayerPPAAverages {
  total: number;
  quarter1: number;
  quarter2?: number;
  quarter3?: number;
  quarter4?: number;
  rushing: number;
  passing: number;
}

export interface PlayerPPACumulative {
  total: number;
  quarter1: number;
  quarter2?: number;
  quarter3?: number;
  quarter4?: number;
  rushing: number;
  passing: number;
}
