<template>
    <section id="about-me-section">
        <div class="about-me-section__div">
            <img id="marcos-photo" :src="image_mms" alt="Marcos Merino Photo" />

            <div class="about-me-section__content">
                <h1>{{ $t("about-me-section.title") }}</h1>
                <p>
                    {{ $t("about-me-section.description") }}
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
const image_mms = import.meta.env.VITE_URL_IMAGE_MMS;
</script>

<style scoped>
#about-me-section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.about-me-section__div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    text-align: left;
    width: 100%;
}

.about-me-section__content {
    flex: 1;
}

.about-me-section__content h1 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: #111827;
}

#about-me-section p {
    white-space: pre-line;
}

#marcos-photo {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 50%;
    flex-shrink: 0;
}

@media (max-width: 768px) {
    .about-me-section__div {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;
    }

    #marcos-photo {
        width: 180px;
        height: 180px;
    }
}
</style>
