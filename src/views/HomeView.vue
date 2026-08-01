<template>
  <div class="page-layout">
    <HeaderSection />
    <main class="main-content">
      <hero-section></hero-section>
    </main>
    <footer>
      <ContactSection />
    </footer>
  </div>
</template>

<script setup>
import HeaderSection from '@/sections/header/header.vue';
import HeroSection from '@/sections/hero-section/hero-section.vue';
import ContactSection from '@/sections/contact/contact.vue';
</script>

<style scoped>
.main-content {
  padding-top: 100px;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-top: 2rem;
}
</style>
