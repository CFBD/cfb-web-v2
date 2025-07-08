<template>
  <Card class="text-left m-3 p-3">
    <template #header>
      <div class="text-3xl font-bold text-center">Terms and Conditions</div>
    </template>
    <template #content>
      <p><strong>Effective Date:</strong> July 1, 2025</p>
      <br />

      <p>
        Welcome to CollegeFootballData.com (CFBD). By accessing or using the CFBD API,
        you agree to be bound by the following terms and conditions. If you do not agree
        to these terms, please refrain from using the API.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-2">1. API Access and Key Registration</h3>
      <ul class="list-disc ml-6">
        <li>Each user is issued a unique API key tied to their verified email address.</li>
        <li>API keys are non-transferable and may only be used by the individual or organization to whom they are issued.</li>
        <li>You are responsible for keeping your API key secure. Do not embed it in public repositories or client-side code.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-2">2. Usage Limits</h3>
      <ul class="list-disc ml-6">
        <li>Free-tier users are limited to <strong>1,000 API calls per calendar month</strong>.</li>
        <li>Higher usage tiers are available via <a href="https://www.patreon.com/collegefootballdata" target="_blank" class="text-blue-600 underline">Patreon subscription</a>.</li>
        <li>Rate limits are enforced per key. Exceeding your quota may result in temporary or permanent suspension of access.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-2">3. Prohibited Behavior</h3>
      <ul class="list-disc ml-6">
        <li>Using multiple or alias email accounts to obtain additional free API keys.</li>
        <li>Circumventing or attempting to bypass rate limits, authentication mechanisms, or access restrictions.</li>
        <li>Registering with disposable or temporary email services.</li>
        <li>Reselling or redistributing data obtained from the API without explicit permission.</li>
        <li>Engaging in scraping, excessive polling, or any activity that degrades system performance.</li>
      </ul>
      <p class="mt-2">Violation of these terms may result in immediate revocation of API access without notice.</p>

      <h3 class="text-xl font-semibold mt-6 mb-2">4. Data Accuracy and Availability</h3>
      <p>
        All data is provided “as-is” and without warranty. While we strive for accuracy,
        we make no guarantees about the completeness, correctness, or timeliness of the data.
        We reserve the right to modify, limit, or discontinue the API or its features at any time without notice.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-2">5. Attribution</h3>
      <p>
        While not required, it is <strong>strongly encouraged</strong> that users credit
        <a href="https://collegefootballdata.com" target="_blank" class="text-blue-600 underline">CollegeFootballData.com</a>
        as the data source when using the API in published products, academic papers, visualizations, or social media content.
        This helps support continued development and visibility of the platform.
      </p>
      <p class="mt-2">
        If you are using an unofficial third-party client library or wrapper to access the API, please note that:
      </p>
      <ul class="list-disc ml-6">
        <li>We are not responsible for bugs, missing features, or performance issues related to unofficial libraries.</li>
        <li>Official libraries maintained by CFBD are available in Python, TypeScript, and .NET.</li>
      </ul>
      <p class="mt-2">
        We appreciate attribution where appropriate and ask that all users act in good faith when using the data and tools provided.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-2">6. Termination</h3>
      <p>
        We reserve the right to revoke API access at our discretion, especially in cases of abuse,
        violation of these terms, or behavior that negatively impacts the platform or community.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-2">7. Changes to These Terms</h3>
      <p>
        We may update these terms from time to time. Changes will be posted on this page and will take effect immediately.
        Continued use of the API after such changes constitutes your acceptance of the new terms.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-2">8. Contact</h3>
      <p>
        Questions or concerns? Join our
        <a href="https://discord.gg/Eb3ex5a" target="_blank" class="text-blue-600 underline">Discord community</a>
        or reach out <a href="mailto:admin@collegefootballdata.com">via email</a>.
      </p>
    </template>
  </Card>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
