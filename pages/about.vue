<template>
  <Card class="text-left m-3 p-3">
    <template #header>
      <div class='text-3xl font-bold text-center'>About this site</div>
    </template>
    <template #content>
      <p>CollegeFootballData.com (CFBD) is a sports statistics and analytics website with no
        direct affiliation to the NCAA, its member conferences, or its member teams.</p>
      <p>All data is unofficial and subject to change at any time. No guarantees are made regarding
        the accuracy of any data.</p>
      <p>If you have any questions or notice any issues you can reach me via Twitter (<b-link
          href='https://twitter.com/cfb_data' target='_blank'>@CFB_Data</b-link>), email (<b-link
          href='mailto:admin@collegefootballdata.com'>admin@collegefootballdata.com</b-link>), Discord (BlueSCar), or
        reddit
        (/u/BlueSCar).</p>
      <Divider></Divider>
      <div class="text-lg font-bold text-center">Data Updates</div>
      <p>Update frequency depends on the type of data. Generally, game level data is updated within
        minutes
        of a game being completed. This includes box score data, scores, drive data, and play data. Betting line
        data is updated every 15 minutes. Poll data usually goes live on the same day a new poll is released.
        Rosters, team talent, and returning production usually go live in August right before the start of a new season.
        Recruiting data is currently updated a few times a cycle. Draft data goes live right after completion of the NFL
        Draft.
      </p>
      <Divider></Divider>
      <div class="text-lg font-bold text-center">Timeframes</div>
      <ul>
        <li>Game schedules and scores go back 1869</li>
        <li>Drive, play, stats, and box score data generally go back to 2001</li>
        <li>Historical rosters go back to around 2004</li>
        <li>Polling data goes back to 1936</li>
        <li>Recruiting data goes back to 2000</li>
        <li>NFL Draft data starts in 1967</li>
      </ul>
      <Divider></Divider>
      <div class="text-lg font-bold text-center">Cost and Usage</div>
      <p>This website and its companion API are completely free to use without restrictions.
        Attribution
        is always greatly appreciated. Some functionality may be available exclusively to Patreon subscribers. Patreon
        subscribers are alotted a greater number of monthly calls based on tier.</p>
      <p>In order to make efficient use of your monthly calls, it is recommended to prefer "chunky" requests over "chatty" requests.
        For example, if an endpoint only requires a "year" filter and you need data for every single team or every single game, it is better to make
        a single request specifying only the "year" parameter and returning all needed data in a single call rather than making a request for each team (130+ requests) or game (800+ requests).
        Similarly, if an endpoint requires a "week" parameter, you can grab an entire season's worth of data for all teams in ~15 calls (one for each week) contrasted with 130+ calls required to loop team-by-team.
      </p>
      <Divider></Divider>
      <div class="text-lg font-bold text-center">Data Corrections and New Data</div>
      <p>If you have data corrections or even some new data you would like to submit for inclusion,
        please reach out to me at any of the methods mentioned at the top of the page. CSV files works best. To ensure
        speediest inclusion of your submission, please be sure to include any relevant id fields (e.g. game id, play id,
        athlete id, etc). This is a one-person operation and I try to get things included as quickly as I am able. Your
        patience is very much appreciated.</p>
      <Divider></Divider>
      <div class="text-lg font-bold text-center">Contributions</div>
      <p>
        There are many different ways to contribute:
      </p>
      <ul>
        <li>Programming - Most of the infrastructure is open-sourced. Pull requests on repos <a
            href='https://github.com/cfbd'>
            in the CFBD GitHub org</a> are always welcome! CFBD is programmed in JavaScript using a NodeJS/Postgres stack.
        </li>
        <li>Data - If you have some data you would like to see included, please send it to me using one of the methods
          listed above.
          Again, it is best to send datasets in CSV format listing any related id fields (e.g. game id, play id, etc).
        </li>
        <li>Writing - The <a href='https://blog.collegefootballdata.com'>CFBD blog</a> is always looking for writers,
          whether
          for a single article or for a series. We are looking for people of all backgrounds and skill levels, whether
          your
          are
          a programmer, a data scientist, or CFB analytics enthusiast. We look to reach as wide an audience as possible.
          If
          you are
          interested, please reach out to me on reddit (/u/BlueSCar), in the Discord chat (BlueSCar), on Twitter
          (@CFB_Data),
          or <a href='mailto:admin@collegefootballdata.com' target='_blank'>shoot me an email</a>.</li>
        <li>Ideas and suggestions - Please join the CFBD community. We are on Twitter (@CFB_Data), <a
            href="https://discord.gg/Eb3ex5a" target='_blank'>Discord</a>, and reddit (/r/CFBAnalysis)</li>
      </ul>
    </template>
  </Card>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
