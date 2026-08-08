<template>
    <header class="container">
        <div class="header-container">
            <div class="logo">Marcos Merino Sánchez</div>

            <div class="menu-content" :class="{ 'is-active': isMobileMenuOpen }">
                <nav>
                    <ul>
                        <li><a href="#about-me-section" @click="closeMobileMenu">{{ $t('nav.about-me') }}</a></li>
                        <li><a href="#skills-section" @click="closeMobileMenu">{{ $t('nav.skills') }}</a></li>
                        <li><a href="#timeline-section" @click="closeMobileMenu">{{ $t('nav.timeline') }}</a></li>
                        <li><a href="#contact-section" @click="closeMobileMenu">{{ $t('nav.contact') }}</a></li>
                    </ul>
                </nav>

                <div class="menu-actions">
                    <div class="lang-switch">
                        <button :class="{ active: locale === 'es' }" @click="locale = 'es'">ES</button>
                        <button :class="{ active: locale === 'en' }" @click="locale = 'en'">EN</button>
                    </div>
                    <a :href="CV_URL" target="_blank" rel="noopener noreferrer" class="cv-button">
                        {{ $t('nav.downloadCv') }}
                    </a>
                </div>
            </div>

            <button class="hamburger-btn" :class="{ 'is-active': isMobileMenuOpen }" @click="toggleMobileMenu"
                aria-label="Menú navegación">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isMobileMenuOpen = ref(false);
const CV_URL = import.meta.env.VITE_URL_CV;
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};
</script>

<style scoped>
.container {
    position: sticky;
    top: 0;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #eaeaea;
    background-color: #ffffff;
    z-index: 100;
}

.header-container {
    width: 100%;
    max-width: 1280px;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 0.5px;
    color: #111827;
    text-align: center;
}

.menu-content {
    display: flex;
    align-items: center;
    gap: 2.5rem;
}

nav {
    display: flex;
    align-items: center;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;
}

nav ul li a {
    text-decoration: none;
    color: #4b5563;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.2s ease;
}

nav ul li a:hover {
    color: #000000;
}

.menu-actions {
    display: flex;
    align-items: center;
    gap: 1.25rem;
}

.lang-switch {
    display: flex;
    gap: 0.25rem;
    background-color: #f3f4f6;
    padding: 0.2rem;
    border-radius: 6px;
}

.lang-switch button {
    padding: 0.3rem 0.6rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 700;
    color: #6b7280;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.lang-switch button.active {
    background: #ffffff;
    color: #111827;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.cv-button {
    display: inline-block;
    text-decoration: none;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 8px;
    background-color: #111827;
    color: #ffffff;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    transition: background-color 0.2s ease, transform 0.1s ease;
}

.cv-button:hover {
    background-color: #1f2937;
    transform: translateY(-1px);
}

.hamburger-btn {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
}

.hamburger-btn .bar {
    width: 100%;
    height: 2px;
    background-color: #111827;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.hamburger-btn.is-active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger-btn.is-active .bar:nth-child(2) {
    opacity: 0;
}

.hamburger-btn.is-active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

/* =================================================== */
/* MEDIA QUERY: MOBILE SCREENS (<= 768px)               */
/* =================================================== */
@media (max-width: 768px) {
    .header-container {
        padding: 0 1rem;
    }

    .hamburger-btn {
        display: flex;
    }

    .menu-content {
        display: none;
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        background-color: #ffffff;
        border-bottom: 1px solid #eaeaea;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        padding: 1.5rem 1rem;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }

    .menu-content.is-active {
        display: flex;
    }

    nav ul {
        flex-direction: column;
        gap: 1.25rem;
        align-items: center;
    }

    nav ul li a {
        font-size: 1.1rem;
        font-weight: 600;
    }

    .menu-actions {
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        align-items: center;
    }

    .cv-button {
        width: 80%;
        max-width: 250px;
        text-align: center;
    }
}
</style>