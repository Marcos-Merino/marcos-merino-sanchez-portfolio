<template>
    <div class="skill-card"
        :class="{ 'has-description': !!description, 'is-expanded': isVisible, 'is-pinned': isPinned }"
        @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="togglePin">
        <div class="skill-header">
            <span class="skill-name">{{ name }}</span>
            <svg v-if="description" class="chevron-icon" :class="{ 'is-rotated': isVisible }" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>

        <!-- Desplegable / Caja de descripción -->
        <div v-if="description" class="description-wrapper" :class="{ 'is-expanded': isVisible }">
            <div class="description-content">
                <p class="description-text">{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    }
});

const isHovered = ref(false);
const isPinned = ref(false);

const isVisible = computed(() => !!props.description && (isHovered.value || isPinned.value));

const onMouseEnter = () => {
    isHovered.value = true;
};

const onMouseLeave = () => {
    isHovered.value = false;
};

const togglePin = () => {
    if (!props.description) return;
    isPinned.value = !isPinned.value;
};
</script>

<style scoped>
.skill-card {
    display: inline-flex;
    flex-direction: column;
    background-color: #f4f4f6;
    border: 1px solid #e4e4e7;
    border-radius: 8px;
    padding: 0.45rem 0.85rem;
    user-select: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;
    max-width: 280px;
    vertical-align: top;
}

.skill-card.has-description {
    cursor: pointer;
}

.skill-card:hover,
.skill-card.is-expanded {
    background-color: #ffffff;
    border-color: #a1a1aa;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.skill-card.is-pinned {
    border-color: #18181b;
    box-shadow: 0 0 0 1px #18181b;
    background-color: #ffffff;
}

.skill-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.skill-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #27272a;
}

.chevron-icon {
    width: 14px;
    height: 14px;
    color: #71717a;
    flex-shrink: 0;
    transition: transform 0.2s ease, color 0.2s ease;
}

.skill-card:hover .chevron-icon,
.chevron-icon.is-rotated {
    color: #18181b;
}

.chevron-icon.is-rotated {
    transform: rotate(180deg);
}

/* Transición suave de la caja desplegable */
.description-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.2s ease,
        margin-top 0.2s ease;
    opacity: 0;
    overflow: hidden;
}

.description-wrapper.is-expanded {
    grid-template-rows: 1fr;
    opacity: 1;
    margin-top: 0.4rem;
    padding-top: 0.4rem;
    border-top: 1px solid #f4f4f6;
}

.description-content {
    min-height: 0;
}

.description-text {
    font-size: 0.8rem;
    color: #52525b;
    line-height: 1.4;
    margin: 0;
    font-weight: 400;
    white-space: pre-line;
}

@media (max-width: 640px) {
    .skill-card {
        display: flex;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        padding: 0.55rem 0.85rem;
    }

    .skill-name {
        font-size: 0.825rem;
    }

    .description-text {
        font-size: 0.775rem;
    }
}
</style>