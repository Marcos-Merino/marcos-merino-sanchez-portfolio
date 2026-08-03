<template>
  <div class="page-layout">
    <HeaderSection />
    <main class="main-content">
      <AboutMeSection />
      <SkillsSection />
    </main>
    <footer>
      <ContactSection />
    </footer>
  </div>
</template>

<script setup>
import HeaderSection from '@/sections/header/header.vue';
import AboutMeSection from '@/sections/about-me-section/about-me-section.vue';
import ContactSection from '@/sections/contact/contact.vue';
import SkillsSection from '@/sections/skills-section/skills.vue';
</script>

<style scoped>
.main-content {
  padding-top: 3rem;
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
