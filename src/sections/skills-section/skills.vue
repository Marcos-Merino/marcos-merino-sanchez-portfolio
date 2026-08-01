<template>
  <section id="skills-section">
    <h2 class="skills-title">{{ $t("skills.title") }}</h2>

    <div class="skills-category" v-for="(category, catIdx) in $tm('skills.categories')" :key="catIdx">
      <h3 class="skills-subtitle">{{ $rt(category.title) }}</h3>
      <div class="skills-grid">
        <SkillComponent v-for="(skill, skillIdx) in category.items" :key="skillIdx" :name="$rt(skill.name)"
          :description="$rt(skill.description)" />
      </div>
    </div>
  </section>
</template>

<script setup>
import SkillComponent from '@/components/skill-component.vue';
</script>

<style scoped>
#skills-section {
  padding: 3rem 0;
  text-align: center;
}

.skills-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.5rem;
}

.skills-subtitle {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 0.85rem;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 640px) {
  #skills-section {
    padding: 2rem 0;
  }

  .skills-title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .skills-subtitle {
    font-size: 1.1rem;
    margin-top: 1.5rem;
  }

  .skills-grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.6rem;
    padding: 0 1.25rem;
  }
}
</style>