<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { NConfigProvider } from 'naive-ui';
</script>

<template>
  <NConfigProvider>
    <header>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      />
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </NConfigProvider>
</template>
