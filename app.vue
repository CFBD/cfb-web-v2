<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  html {
    margin: 0;
    height: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-image: url('https://cdn.collegefootballdata.com/assets/football-field-bg.jpg');
    background-size: cover;
    background-attachment: fixed;
  }

  #__nuxt {
    background: hsla(0, 0%, 100%, 0.75);
    margin: 0;
    min-height: 100%;
  }

  .dark-mode {
    & #__nuxt {
      background: hsla(0, 0%, 0%, 0.75);
    }
  }

  #main-container {
    padding: 2em;
  }
</style>
