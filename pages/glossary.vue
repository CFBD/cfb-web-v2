<template>
  <Card class="text-left m-3 p-3">
    <template #header>
      <div class="text-3xl font-bold text-center">Glossary</div>
    </template>
    <template #content>
      <div>
        <p><strong>DB Havoc</strong> - Percentage of plays where the defense either defended or intercepted a pass.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Excitement Index</strong> - Measures the game's entertainment value by tracking swings in win probability. Larger swings result in a higher score.</p>
      </div>
      <Divider />

      <div id="ExpectedPoints">
        <p><strong>Expected Points (EP)</strong> - Assigns point values to field positions based on down, distance, and yard line. A negative value means the opponent is expected to score next.</p>
      </div>
      <Divider />

      <div id="ExpectedPointsAdded">
        <p><strong>Expected Points Added (EPA)</strong> - Uses <a href="#ExpectedPoints">EP</a> to measure play impact by calculating the change in EP from the start to end of a play.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Explosiveness</strong> - Average <a href="#ExpectedPointsAdded">EPA</a> on <a href="#SuccessRate">successful</a> plays. Uses the site's custom <a href="#PPA">PPA</a> model.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Front Seven Havoc</strong> - Percentage of plays where the front seven forced a fumble or recorded a tackle for loss (TFL).</p>
      </div>
      <Divider />

      <div>
        <p><strong>Garbage Time</strong> - When one of the following is true:</p>
        <ul>
          <li>Lead > 38 points in 2nd quarter</li>
          <li>Lead > 28 points in 3rd quarter</li>
          <li>Lead > 22 points in 4th quarter</li>
        </ul>
        <p>Games can occasionally exit garbage time if extreme comebacks occur.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Havoc</strong> - Percentage of plays where the defense recorded a TFL, forced a fumble, intercepted, or broke up a pass.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Line Yards</strong> - Estimates rushing yards attributable to the offensive line using weighted yardage:</p>
        <ul>
          <li>Losses: 120%</li>
          <li>0–4 yards: 100%</li>
          <li>5–10 yards: 50%</li>
          <li>11+ yards: 0%</li>
        </ul>
      </div>
      <Divider />

      <div>
        <p><strong>Open Field Yards</strong> - Average yards per carry gained more than 10 yards beyond the line of scrimmage.</p>
      </div>
      <Divider />

      <div id="PassingDowns">
        <p><strong>Passing Downs</strong> - Defined as 2nd down with 7+ yards to go or 3rd/4th down with 5+ yards to go.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Postgame Win Probability</strong> - Estimates how often each team would win if the game were replayed using the same stats, shuffled in a different order.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Power Success</strong> - Percentage of short-yardage runs (≤2 yards on 3rd/4th down or inside the 2-yard line on 1st/2nd) converted to a 1st down or touchdown.</p>
      </div>
      <Divider />

      <div id="PPA">
        <p><strong>Predicted Points (PP)</strong> - Equivalent to <a href="#ExpectedPoints">EP</a>, calculated using CFBD's custom model.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Predicted Points Added (PPA)</strong> - Equivalent to <a href="#ExpectedPointsAdded">EPA</a>, calculated using CFBD's custom model.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Scoring Opportunities</strong> - All offensive drives that cross the opponent’s 40-yard line.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Second Level Yards</strong> - Average yards per carry gained between 5 and 10 yards beyond the line of scrimmage.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Simple Rating System (SRS)</strong> - Combines scoring margin and strength of schedule to rate teams. The rating indicates expected margin vs. an average team, adjusting for home field advantage.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Standard Downs</strong> - All downs that are not <a href="#PassingDowns">Passing Downs</a>.</p>
      </div>
      <Divider />

      <div id="SuccessRate">
        <p><strong>Success Rate</strong> - Measures play efficiency. A play is considered successful if it:</p>
        <ul>
          <li>Results in a touchdown</li>
          <li>Gains ≥50% of yards needed on 1st down</li>
          <li>Gains ≥70% of yards needed on 2nd down</li>
          <li>Gains 100% of yards needed on 3rd/4th down</li>
        </ul>
      </div>
      <Divider />

      <div>
        <p><strong>Stuff Rate</strong> - Percentage of rushing plays stopped at or behind the line of scrimmage.</p>
      </div>
      <Divider />

      <div>
        <p><strong>Usage</strong> - Percentage of plays in which a player was directly involved. Includes passes, rushes, receptions, incompletions, and targets.</p>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
