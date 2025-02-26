<template>
    <Card class="text-left m-3 p-3">
        <template #header>
            <div class="text-3xl font-bold text-center">
                Glossary
            </div>
        </template>
        <template #content>
            <div>
                <p class="font-light"><strong>DB Havoc</strong> is the percentage of plays in which the defense defended or
                    intercepted a
                    pass.</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Excitement Index</strong> is a measure of how exciting a game was to watch. It
                    accomplishes
                    this by measuring
                    swings in win probability throughout the course of the game. The more extreme swings between both
                    teams, the higher the
                    excitement index will be.</p>
            </div>
            <Divider></Divider>
            <div id="ExpectedPoints">
                <p class="font-light"><strong>Expected Points (EP)</strong> assumes that not all yard lines are created
                    equal. In other
                    words, each yardline is
                    assigned a point value and measures the number of points that would be expected to be scored based
                    on down, distance, and field
                    position. A negative value means that the opposing team would be expected to score the next points
                    in the game.</p>
            </div>
            <Divider></Divider>
            <div id='ExpectedPointsAdded'>
                <p class="font-light"><strong>Expected Points Added (EPA)</strong> uses <a href='#ExpectedPoints'>Expected
                        Points</a> to
                    measure the outcome of a play.
                    It takes the EP value from the beginning of a play (e.g. 2nd and 5 at the 50) and subtracts it from
                    the EP value resulting from the play
                    (e.g. rush for 10 yards results in 1st and 10 from the 40).</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Explosiveness</strong> measures the average <a
                        href='#ExpectedPointsAdded'>EPA</a> on plays
                    which were marked as
                    <a href='#SuccessRate'>successful</a>. It uses this site's EPA implementation (known as <a
                        href='#PPA'>PPA</a>).
                </p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Front Seven Havoc</strong> is the percentage of plays in which the defense
                    forced a fumble or
                    a TFL.</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Garbage Time</strong> occurs when one of the following scenarios is met:</p>
                <ul>
                    <li>Scoring margin over 38 points in the 2nd quarter</li>
                    <li>Scoring margin over 28 points in the 3rd quarter</li>
                    <li>Scoring margin over 22 points in the 4th quarter</li>
                </ul>
              <p>
                Note that, although not a common occurence, it is possible for a game that was in garbage time to come
                out garbage time
                during extreme comeback scenarios.
                </p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Havoc</strong> refers to the percentage of plays in with the defense recorded
                    a TFL, forced a
                    fumble, intercepted a pass
                    or broke up a pass.</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Line Yards</strong> attempts to measure the number of running yards which are
                    attributed to
                    the offensive line.
                    Yards are weighted as follows:
                  </p>
                <ul>
                    <li>losses - 120%</li>
                    <li>0-4 yards from LOS - 100%</li>
                    <li>5-10 yards from LOS - 50%</li>
                    <li>11+ yards from LOW - 0+</li>
                </ul>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Open Field Yards</strong> measures average yards per carry that comes from
                    over 10 yards past
                    the LOS.</p>
            </div>
            <Divider></Divider>
            <div id='PassingDowns'>
                <p class="font-light"><strong>Passing Downs</strong> are defined as 2nd downs with 7 or more yards to go or
                    3rd and 4th
                    downs with 5 or more yards to go.</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Post game win probability</strong> looks at advanced metrics like
                    success rates, PPA, and scoring opportunities and assesses the probability of each team winning
                    should the game
                    be played again with equivalent stats. In other words, if you take all of the plays in a game and
                    shuffle them into
                    a random order, how often would each team be expected to win?</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Power Success</strong> measures the percentage of running plays on 3rd or 4th
                    down from 2
                    yards or less in which an offense
                    either converted into a 1st down or scored a TD. 1st and 2nd down and goal plays within the 2 yard
                    line are also included.</p>
            </div>
            <Divider></Divider>
            <div id="PPA">
                <p class="font-light"><strong>Predicted Points (PP)</strong> are the same thing as <a
                        href='#ExpectedPoints'>Expected
                        Points</a>. There are
                    various different models used to calculate EP. Predicted Points is this site's own custom EP model.
                </p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Predicted Points Added (PPA)</strong> is the same thing as <a
                        href='#ExpectedPointsAdded'>EPA</a>. There are
                    various different models for calculating EPA and EPA. PPA uses this site's custom EPA model.</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Scoring Opportunities</strong> consist of all offensive drives in which the
                    ball has been
                    advanced past the defense's
                    40 yard line.</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Second Level Yards</strong> measures the average yards per carry that are
                    between 5 and 10
                    yards from the LOS.</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Simple Rating System (SRS)</strong> is a team rating mechanism which takes
                    into account
                    scoring margin and SOS. A team's
                    SRS rating is how much they would be expected to win (or lose) by to a perfectly average team. You
                    can calculate the expected score margin
                    between two teams by calculating the difference in their SRS ratings, after accounting for home
                    field advantage.</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Standard Downs</strong> are anything that is not considered to be a <a
                        href='#PassingDowns'>passing down</a>.</p>
            </div>
            <Divider></Divider>
            <div id='SuccessRate'>
                <p class="font-light"><strong>Success Rate</strong> is an efficiency metric that determines the success of a
                    play.
                    Successful plays meet one of the
                    following criteria:
                  </p>
                <ul>
                    <li>the offense scored</li>
                    <li>1st downs which gain at least 50% of the yards to go</li>
                    <li>2nd downs which gain at least 70% of the yards to go</li>
                    <li>3rd and 4th downs which gain at least 100% of the yards to go</li>
                </ul>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Stuff Rate</strong> is the percentage of running plays stopped at or behind
                    the line of
                    scrimmage.</p>
            </div>
            <Divider></Divider>
            <div>
                <p class="font-light"><strong>Usage</strong> is the percentage of plays on which a player was involved.
                    Recordable events
                    include passes,
                    incompletions, rushes, receptions, and targets.</p>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
</script>

<style scoped ></style>
