<template>
  <div id="contact-section">
    <div class="footer-container">
      <h3 class="footer-title">{{ $t("contact.title") }}</h3>

      <div class="links-row">
        <a :href="`mailto:${email}`" class="contact-link">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span>{{ email }}</span>
        </a>

        <a :href="`tel:${phone.replace(/\s+/g, '')}`" class="contact-link">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>{{ phone }}</span>
        </a>

        <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer" class="contact-link">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          <span>LinkedIn</span>
        </a>

        <a :href="githubUrl" target="_blank" rel="noopener noreferrer" class="contact-link">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          <span>GitHub</span>
        </a>
      </div>

      <div class="copyright">
        <p>&copy; {{ currentYear }} Marcos Merino Sánchez</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const email = import.meta.env.VITE_EMAIL;
const phone = import.meta.env.VITE_PHONE;
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
const githubUrl = import.meta.env.VITE_GITHUB_URL;

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
#contact-section {
  width: 100%;
  margin-top: 4rem;
  padding: 3rem 1rem 2rem;
  border-top: 1px solid #eaeaea;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.01em;
}

.links-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.25rem 2rem;
  width: 100%;
  max-width: 900px;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #4b5563;
  text-decoration: none;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  max-width: 100%;
}

.contact-link span {
  word-break: break-word;
  overflow-wrap: anywhere;
}

.contact-link:hover {
  color: #111827;
  background-color: #f9fafb;
}

.icon {
  width: 18px;
  height: 18px;
  stroke-width: 1.75;
  flex-shrink: 0;
}

.copyright {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: #9ca3af;
}

/* Responsive Breakpoints */
@media (max-width: 640px) {
  #contact-section {
    margin-top: 2.5rem;
    padding: 2rem 1rem 1.5rem;
  }

  .footer-title {
    font-size: 1.15rem;
  }

  .links-row {
    flex-direction: column;
    gap: 0.75rem;
  }

  .contact-link {
    width: 100%;
    justify-content: center;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    background-color: #f9fafb;
  }
}
</style>