<template>
  <Card class="text-left m-3 p-3">
    <template #header>
      <div class="text-3xl font-bold text-center">About CollegeFootballData.com</div>
    </template>
    <template #content>
      <p><strong>CollegeFootballData.com (CFBD)</strong> is an independent sports statistics and analytics site with no official affiliation to the NCAA, its conferences, or member teams.</p>

      <p>All data is unofficial and may be updated at any time. While we strive for accuracy, no guarantees are made regarding the completeness or correctness of the data.</p>

      <p>Have a question or notice an issue? Reach out via <a href="mailto:admin@collegefootballdata.com">email</a>, <span class="font-mono">BlueSCar</span> on Discord, <a href="https://bsky.app/profile/collegefootballdata.com" target="_blank">Bluesky</a>, <a href="https://twitter.com/cfb_data" target="_blank">Twitter</a>, or <span class="font-mono">/u/BlueSCar</span> on Reddit.</p>

      <Divider></Divider>

      <div class="text-lg font-bold text-center">Data Update Frequency</div>
      <p>Data is updated at varying intervals depending on type:</p>
      <ul>
        <li>Game-level data (scores, box scores, drives, plays): within minutes after game completion</li>
        <li>Betting lines: every 15 minutes</li>
        <li>Polls: same day they're released</li>
        <li>Rosters, team talent, returning production: each August before the season starts</li>
        <li>Recruiting: several times per cycle</li>
        <li>NFL Draft: shortly after the draft concludes</li>
      </ul>

      <Divider></Divider>

      <div class="text-lg font-bold text-center">Historical Coverage</div>
      <ul>
        <li>Scores and schedules: since 1869</li>
        <li>Plays, drives, stats, box scores: since 2001</li>
        <li>Rosters: since ~2004</li>
        <li>Polls: since 1936</li>
        <li>Recruiting: since 2000</li>
        <li>NFL Draft: since 1967</li>
      </ul>

      <Divider></Divider>

      <div class="text-lg font-bold text-center">API Usage & Costs</div>
      <p>The website and public API are free to use with generous monthly limits. Higher limits and additional features are available via <a href="https://www.patreon.com/CFBD" target="_blank">Patreon</a>.</p>

      <p>To optimize API usage, prefer bulk ("chunky") requests over repetitive ("chatty") ones. For example:</p>
      <ul>
        <li>Need all games for a season? Use a single request with the <code>year</code> filter instead of hundreds of per-game requests.</li>
        <li>Need data week-by-week? Loop over ~15 weeks rather than 130+ teams.</li>
      </ul>

      <Divider></Divider>

      <div class="text-lg font-bold text-center">Submitting Data or Corrections</div>
      <p>Have data to contribute or correct? Send it via one of the contact methods above. CSV format is preferred. Include identifiers like <code>game_id</code>, <code>play_id</code>, or <code>athlete_id</code> when possible for fastest processing. This is a solo project. Thank you for your patience!</p>

      <Divider></Divider>

      <div class="text-lg font-bold text-center">Ways to Contribute</div>
      <ul>
        <li><strong>Programming:</strong> CFBD is open-source! PRs welcome on the <a href="https://github.com/cfbd" target="_blank">GitHub org</a>. The stack is NodeJS/Postgres using JavaScript/TypeScript.</li>
        <li><strong>Data:</strong> Have historical or niche datasets? Send them in CSV with IDs where applicable.</li>
        <li><strong>Writing:</strong> Pitch an article or series for the <a href="https://blog.collegefootballdata.com" target="_blank">CFBD Blog</a>. Writers of all experience levels welcome: fans, programmers, data scientists alike.</li>
        <li><strong>Ideas & Feedback:</strong> Join the CFBD community on <a href="https://bsky.app/profile/collegefootballdata.com" target="_blank">Bluesky</a>, <a href="https://twitter.com/CFB_Data" target="_blank">Twitter</a>, <a href="https://discord.gg/Eb3ex5a" target="_blank">Discord</a>, or <a href="https://www.reddit.com/r/CFBAnalysis" target="_blank">Reddit</a>.</li>
      </ul>
    </template>
  </Card>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
