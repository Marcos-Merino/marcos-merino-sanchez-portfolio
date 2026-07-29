<template>
    <section id="hero-section">
        <img id="marcos-photo" :src="image_mms" alt="Marcos Merino Photo" />


        <p>
            {{ $t("hero-section.description") }}
        </p>

    </section>
</template>

<script setup>
const image_mms = import.meta.env.VITE_URL_IMAGE_MMS;
</script>

<style scoped>
#hero-section {
    text-align: center;
}

#marcos-photo {
    width: 30%;
    height: 30%;
    border-radius: 50%;
    margin: auto;
}
</style>