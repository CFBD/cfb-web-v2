interface DataObject {
    [key: string]: string | number | boolean | object
}

export function flattenData(key: string | undefined, data: any) {
    let flattened = [];

    switch (key) {
        case '/coaches':
            for (const coach of data) {
                flattened.push(...coach.seasons.map((s: DataObject) => {
                    s.first_name = coach.first_name;
                    s.last_name = coach.last_name;
                    s.hire_date = coach.hire_date;

                    return s;
                }));
            }
            break;
        case '/games/players':
            for (const game of data) {
                for (const team of game.teams) {
                    for (const category of team.categories) {
                        for (const type of category.types) {
                            flattened.push(...type.athletes.map((a: DataObject) => {
                                return {
                                    game_id: game.id,
                                    school: team.school,
                                    conference: team.conference,
                                    homeAway: team.homeAway,
                                    points: team.points,
                                    stat_category: category.name,
                                    stat_type: type.name,
                                    athlete: a.name,
                                    stat: a.stat
                                }
                            }));
                        }
                    }
                }
            }
            break;
        case '/games/teams':
            for (const game of data) {
                for (const team of game.teams) {
                    flattened.push(...team.stats.map((s: DataObject) => {
                        return {
                            game_id: game.id,
                            school: team.school,
                            conference: team.conference,
                            homeAway: team.homeAway,
                            points: team.points,
                            stat_category: s.category,
                            stat: s.stat
                        }
                    }));
                }
            }
            break;
        case '/rankings':
            for (const week of data) {
                for (const poll of week.polls) {
                    for (const rank of poll.ranks) {
                        flattened.push({
                            season: week.season,
                            seasonType: week.seasonType,
                            week: week.week,
                            poll: poll.poll,
                            rank: rank.rank,
                            school: rank.school,
                            conference: rank.conference,
                            firstPlaceVotes: rank.firstPlaceVotes,
                            points: rank.points
                        })
                    }
                }
            }
            break;
        case '/teams/matchup':
            flattened = data.games.map((g: DataObject) => flatten(g));
            break;
        case '/lines':
            for (const game of data) {
                for (const line of game.lines) {
                    flattened.push({
                        id: game.id,
                        homeTeam: game.homeTeam,
                        homeScore: game.homeScore,
                        awayTeam: game.awayTeam,
                        awayScore: game.awayScore,
                        lineProvider: line.provider,
                        overUnder: line.overUnder,
                        spread: line.spread,
                        formattedSpread: line.formattedSpread,
                        openingSpread: line.spreadOpen,
                        openingOverUnder: line.overUnderOpen,
                        homeMoneyline: line.homeMoneyline,
                        awayMoneyline: line.awayMoneyline
                    });
                }
            }
            break;
        // case '/game/box/advanced':
        //     if (this.boxSelected == 'Teams') {
        //         flattened = data.teams.ppa.map(t => {
        //             let successRates = data.teams.successRates.find(s => s.team == t.team);
        //             let explosiveness = data.teams.explosiveness.find(s => s.team == t.team);
        //             return {
        //                 team: t.team,
        //                 ppa_quarter_1: t.overall.quarter1,
        //                 ppa_quarter_2: t.overall.quarter2,
        //                 ppa_quarter_3: t.overall.quarter3,
        //                 ppa_quarter_4: t.overall.quarter4,
        //                 ppa_total: t.overall.total,
        //                 ppa_passing_quarter_1: t.passing.quarter1,
        //                 ppa_passing_quarter_2: t.passing.quarter2,
        //                 ppa_passing_quarter_3: t.passing.quarter3,
        //                 ppa_passing_quarter_4: t.passing.quarter4,
        //                 ppa_passing_total: t.passing.total,
        //                 ppa_rushing_quarter_1: t.rushing.quarter1,
        //                 ppa_rushing_quarter_2: t.rushing.quarter2,
        //                 ppa_rushing_quarter_3: t.rushing.quarter3,
        //                 ppa_rushing_quarter_4: t.rushing.quarter4,
        //                 ppa_rushing_total: t.rushing.total,
        //                 success_rate_quarter1: successRates.overall.quarter1,
        //                 success_rate_quarter2: successRates.overall.quarter2,
        //                 success_rate_quarter3: successRates.overall.quarter3,
        //                 success_rate_quarter4: successRates.overall.quarter4,
        //                 success_rate_total: successRates.overall.total,
        //                 success_rate_standard_downs_quarter1: successRates.standardDowns.quarter1,
        //                 success_rate_standard_downs_quarter2: successRates.standardDowns.quarter2,
        //                 success_rate_standard_downs_quarter3: successRates.standardDowns.quarter3,
        //                 success_rate_standard_downs_quarter4: successRates.standardDowns.quarter4,
        //                 success_rate_standard_downs_total: successRates.standardDowns.total,
        //                 success_rate_passing_downs_quarter1: successRates.passingDowns.quarter1,
        //                 success_rate_passing_downs_quarter2: successRates.passingDowns.quarter2,
        //                 success_rate_passing_downs_quarter3: successRates.passingDowns.quarter3,
        //                 success_rate_passing_downs_quarter4: successRates.passingDowns.quarter4,
        //                 success_rate_passing_downs_total: successRates.passingDowns.total,
        //                 explosiveness_quarter1: explosiveness.overall.quarter1,
        //                 explosiveness_quarter2: explosiveness.overall.quarter2,
        //                 explosiveness_quarter3: explosiveness.overall.quarter3,
        //                 explosiveness_quarter4: explosiveness.overall.quarter4,
        //                 explosiveness_total: explosiveness.overall.total
        //             };
        //         });
        //     } else {
        //         flattened = data.players.usage.map(p => {
        //             let ppa = data.players.ppa.find(s => p.player == s.player && p.team == s.team &&
        //                 p.position == s.position);
        //             return {
        //                 player: p.player,
        //                 team: p.team,
        //                 position: p.position,
        //                 usage_quarter1: p.quarter1,
        //                 usage_quarter2: p.quarter2,
        //                 usage_quarter3: p.quarter3,
        //                 usage_quarter4: p.quarter4,
        //                 usage_rushing: p.rushing,
        //                 usage_passing: p.passing,
        //                 usage_total: p.total,
        //                 avg_ppa_quarter1: ppa.average.quarter1,
        //                 avg_ppa_quarter2: ppa.average.quarter2,
        //                 avg_ppa_quarter3: ppa.average.quarter3,
        //                 avg_ppa_quarter4: ppa.average.quarter4,
        //                 avg_ppa_rushing: ppa.average.rushing,
        //                 avg_ppa_passing: ppa.average.passing,
        //                 avg_ppa_total: ppa.average.total,
        //                 cum_ppa_quarter1: ppa.cumulative.quarter1,
        //                 cum_ppa_quarter2: ppa.cumulative.quarter2,
        //                 cum_ppa_quarter3: ppa.cumulative.quarter3,
        //                 cum_ppa_quarter4: ppa.cumulative.quarter4,
        //                 cum_ppa_rushing: ppa.cumulative.rushing,
        //                 cum_ppa_passing: ppa.cumulative.passing,
        //                 cum_ppa_total: ppa.cumulative.total
        //             };
        //         });
        //     }
        //     break;
        default:
            flattened = data.map((d: DataObject) => flatten(d));
    }

    return flattened;
}

const flatten = (data: DataObject) => {
    const result: DataObject = {};

    function recurse(cur: DataObject, prop: string) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            const l = cur.length;
            for (let i = 0; i < l; i++)
                recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            let isEmpty = true;
            for (const p in cur) {
                isEmpty = false;
                // eslint-disable-next-line
                // @ts-ignore
                recurse(cur[p], prop ? prop + "_" + p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
};