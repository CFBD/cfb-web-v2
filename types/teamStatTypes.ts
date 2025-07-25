export interface TeamStats {
  season: number;
  team: string;
  conference: string;
  offense: Offense;
  defense: Defense;
}

export interface Offense {
  plays: number;
  drives: number;
  ppa: number;
  totalPPA: number;
  successRate: number;
  explosiveness: number;
  powerSuccess: number;
  stuffRate: number;
  lineYards: number;
  lineYardsTotal: number;
  secondLevelYards: number;
  secondLevelYardsTotal: number;
  openFieldYards: number;
  openFieldYardsTotal: number;
  totalOpportunies: number;
  pointsPerOpportunity: number;
  fieldPosition: FieldPosition;
  havoc: Havoc;
  standardDowns: StandardDowns;
  passingDowns: PassingDowns;
  rushingPlays: RushingPlays;
  passingPlays: PassingPlays;
}

export interface FieldPosition {
  averageStart: number;
  averagePredictedPoints: number;
}

export interface Havoc {
  total: number;
  frontSeven: number;
  db: number;
}

export interface StandardDowns {
  rate: number;
  ppa: number;
  successRate: number;
  explosiveness: number;
}

export interface PassingDowns {
  rate: number;
  ppa: number;
  successRate: number;
  explosiveness: number;
}

export interface RushingPlays {
  rate: number;
  ppa: number;
  totalPPA: number;
  successRate: number;
  explosiveness: number;
}

export interface PassingPlays {
  rate: number;
  ppa: number;
  totalPPA: number;
  successRate: number;
  explosiveness: number;
}

export interface Defense {
  plays: number;
  drives: number;
  ppa: number;
  totalPPA: number;
  successRate: number;
  explosiveness: number;
  powerSuccess: number;
  stuffRate: number;
  lineYards: number;
  lineYardsTotal: number;
  secondLevelYards: number;
  secondLevelYardsTotal: number;
  openFieldYards: number;
  openFieldYardsTotal: number;
  totalOpportunies: number;
  pointsPerOpportunity: number;
  fieldPosition: FieldPosition;
  havoc: Havoc;
  standardDowns: StandardDowns;
  passingDowns: PassingDowns;
  rushingPlays: RushingPlays;
  passingPlays: PassingPlays;
}

export interface PlayerUsage {
  season: number;
  id: string;
  name: string;
  position: string;
  team: string;
  conference: string;
  usage: Usage;
}

export interface Usage {
  overall: number;
  pass: number;
  rush: number;
  firstDown: number;
  secondDown: number;
  thirdDown: number;
  standardDowns: number;
  passingDowns: number;
}

export interface PlayerPPA {
  season: number;
  id: string;
  name: string;
  position: string;
  team: string;
  conference: string;
  countablePlays: number;
  averagePPA: AveragePPA;
  totalPPA: TotalPPA;
}

export interface AveragePPA {
  all: number;
  pass?: number;
  rush?: number;
  firstDown?: number;
  secondDown?: number;
  thirdDown?: number;
  standardDowns?: number;
  passingDowns?: number;
}

export interface TotalPPA {
  all: number;
  pass?: number;
  rush?: number;
  firstDown?: number;
  secondDown?: number;
  thirdDown?: number;
  standardDowns?: number;
  passingDowns?: number;
}
