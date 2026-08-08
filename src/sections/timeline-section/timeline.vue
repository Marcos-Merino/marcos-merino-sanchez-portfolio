<template>
    <section id="timeline-section" class="timeline-section">
        <div class="timeline-header">
            <h2 class="timeline-title">{{ $t('timeline.title') }}</h2>
            <p class="timeline-subtitle">{{ $t('timeline.subtitle') }}</p>
        </div>
        <!-- DESKTOP / TABLET: HORIZONTAL SCROLLABLE TIMELINE -->
        <div class="desktop-timeline-wrapper">
            <div class="timeline-scroll-container">
                <div class="horizontal-timeline" :style="{ minWidth: `${timelineWidth}px` }">

                    <!-- Year Header Axis -->
                    <div class="year-axis">
                        <div v-for="year in yearList" :key="year" class="year-marker"
                            :class="{ 'is-current': year === currentYear }">
                            <span class="year-label">
                                {{ year }}
                                <span v-if="year === currentYear" class="present-badge">{{ $t('timeline.present')
                                    }}</span>
                            </span>
                            <div class="year-line"></div>
                        </div>
                    </div>
                    <!-- Lanes Container for Overlapping Spans -->
                    <div class="lanes-container" :style="{ height: `${calculatedContainerHeight}px` }">
                        <!-- Grid Background Lines -->
                        <div class="grid-lines">
                            <div v-for="year in yearList" :key="'grid-' + year" class="grid-col"></div>
                        </div>
                        <!-- Horizontal Item Bars -->
                        <div v-for="item in processedItems" :key="item.id" class="timeline-bar" :class="{
                            'is-expandable': item.descripcion !== null,
                            'is-non-expandable': item.descripcion === null,
                            'is-active': selectedItemId === item.id
                        }" :style="getItemBarStyle(item)" @click="handleItemClick(item)">
                            <div class="bar-content">
                                <!-- Type Icon -->
                                <div class="bar-icon-badge" :style="{ backgroundColor: item.color }">
                                    <svg v-if="item.tipo === 'experiencia'" xmlns="http://www.w3.org/2000/svg"
                                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                    </svg>
                                </div>
                                <div class="bar-text">
                                    <span class="bar-title">{{ getTranslatedProp(item, 'titulo') }}</span>
                                    <span class="bar-lugar">{{ getTranslatedProp(item, 'lugar') }}</span>
                                </div>
                                <div class="bar-right">

                                    <!-- Expand Indicator -->
                                    <span v-if="item.descripcion !== null" class="expand-indicator"
                                        title="Haz clic para expandir">
                                        <svg class="chevron-icon" :class="{ rotated: selectedItemId === item.id }"
                                            xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </span>
                                    <span v-else class="lock-indicator" title="Sin detalles expandibles">
                                        •
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- DESKTOP EXPANDABLE DETAIL DRAWER -->
            <Transition name="slide-fade">
                <div v-if="selectedItem" class="detail-drawer">
                    <div class="drawer-header">
                        <div class="drawer-title-group">
                            <span class="type-pill" :style="{ color: selectedItem.color }">
                                <svg v-if="selectedItem.tipo === 'experiencia'" xmlns="http://www.w3.org/2000/svg"
                                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2.5" style="margin-right: 4px;">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                    style="margin-right: 4px;">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                </svg>
                                {{ selectedItem.tipo === 'experiencia' ? $t('timeline.filterExp') :
                                    $t('timeline.filterEdu') }}
                            </span>
                            <h3 class="drawer-title">{{ getTranslatedProp(selectedItem, 'titulo') }}</h3>
                            <p class="drawer-lugar">{{ getTranslatedProp(selectedItem, 'lugar') }}</p>
                        </div>

                        <div class="drawer-meta">
                            <button class="close-btn" @click="selectedItemId = null" :aria-label="$t('timeline.close')">
                                ✕
                            </button>
                        </div>
                    </div>
                    <div class="drawer-body">
                        <div class="drawer-description markdown-content" v-html="getRenderedDescription(selectedItem)">
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <!-- MOBILE: VERTICAL TIMELINE -->
        <div class="mobile-timeline">
            <div class="vertical-line"></div>

            <div v-for="item in filteredRawItems" :key="'mobile-' + item.id" class="mobile-card" :class="{
                'is-expandable': item.descripcion !== null,
                'is-expanded': selectedItemId === item.id
            }" :style="{ borderLeftColor: item.color }">
                <div class="mobile-card-header" @click="handleItemClick(item)">
                    <div class="mobile-card-top">
                        <span class="mobile-type-badge" :style="{ color: item.color }">
                            <svg v-if="item.tipo === 'experiencia'" xmlns="http://www.w3.org/2000/svg" width="13"
                                height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                            </svg>
                            {{ item.tipo === 'experiencia' ? $t('timeline.filterExp') : $t('timeline.filterEdu') }}
                        </span>
                        <span class="mobile-dates">
                            {{ formatDateRange(item) }}
                        </span>
                    </div>
                    <h3 class="mobile-card-title">{{ getTranslatedProp(item, 'titulo') }}</h3>
                    <p class="mobile-card-lugar">{{ getTranslatedProp(item, 'lugar') }}</p>
                    <div class="mobile-expand-hint">
                        <span v-if="item.descripcion !== null" class="hint-text">
                            {{ selectedItemId === item.id ? $t('timeline.close') : $t('timeline.clickToExpand') }}
                            <svg class="chevron-icon" :class="{ rotated: selectedItemId === item.id }"
                                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </span>
                        <span v-else class="hint-text disabled">
                            {{ $t('timeline.noDescription') }}
                        </span>
                    </div>
                </div>
                <Transition name="expand">
                    <div v-if="selectedItemId === item.id && item.descripcion !== null" class="mobile-card-body">
                        <div class="mobile-description markdown-content" v-html="getRenderedDescription(item)"></div>
                    </div>
                </Transition>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { parseMarkdown } from '@/utils/markdown.js';

const { tm, rt, t } = useI18n();
const currentFilter = ref('all');
const selectedItemId = ref(null);

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

// Get items array from i18n safely
const rawItems = computed(() => {
    const items = tm('timeline.items');
    if (!Array.isArray(items)) return [];
    return items;
});

// Helper for i18n object property resolution
const getTranslatedProp = (item, prop) => {
    if (!item || item[prop] === undefined || item[prop] === null) return null;
    return typeof item[prop] === 'object' ? rt(item[prop]) : item[prop];
};

// Helper for markdown description rendering
const getRenderedDescription = (item) => {
    const desc = getTranslatedProp(item, 'descripcion');
    if (!desc) return '';
    return parseMarkdown(desc);
};

// Helper for formatting date ranges with month + year
const formatMonthYear = (month, year) => {
    if (!year) return '';
    if (!month) return `${year}`;
    const m = String(month).padStart(2, '0');
    return `${m}/${year}`;
};

const formatDateRange = (item) => {
    if (!item) return '';
    const startStr = formatMonthYear(item.mesInicio, item.anioInicio);
    if (!item.anioFin) {
        return `${startStr} - ${t('timeline.present')}`;
    }
    const endStr = formatMonthYear(item.mesFin, item.anioFin);
    return `${startStr} - ${endStr}`;
};

// Helper to convert item start date to fractional year
const getStartVal = (item) => {
    const m = item.mesInicio ? item.mesInicio - 1 : 0;
    return item.anioInicio + (m / 12);
};

// Helper to convert item end date to fractional year
const getEndVal = (item) => {
    if (!item.anioFin) {
        return currentYear + ((currentMonth - 1) / 12);
    }
    const m = item.mesFin ? item.mesFin : 12;
    return item.anioFin + (m / 12);
};

// Filtered raw items
const filteredRawItems = computed(() => {
    if (currentFilter.value === 'all') return rawItems.value;
    return rawItems.value.filter(item => item.tipo === currentFilter.value);
});

// Calculate overall min year for the axis
const minYear = computed(() => {
    if (!rawItems.value.length) return 2020;
    const mins = rawItems.value.map(i => i.anioInicio);
    return Math.min(...mins);
});

const maxYear = computed(() => currentYear);

// Generate year list from minYear to currentYear
const yearList = computed(() => {
    const years = [];
    for (let y = minYear.value; y <= maxYear.value; y++) {
        years.push(y);
    }
    return years;
});

// Dynamic width calculation for horizontal scrolling timeline
const timelineWidth = computed(() => {
    const totalYears = yearList.value.length;
    return Math.max(850, totalYears * 120);
});

// Calculate lane placement for overlapping time intervals with month-level precision
const processedData = computed(() => {
    const items = [...filteredRawItems.value];

    // Sort items by startVal ascending, then longest duration first
    items.sort((a, b) => {
        const startA = getStartVal(a);
        const startB = getStartVal(b);
        if (Math.abs(startA - startB) > 0.001) return startA - startB;
        const durationA = getEndVal(a) - startA;
        const durationB = getEndVal(b) - startB;
        return durationB - durationA;
    });

    const lanes = []; // stores endVal of items in each lane

    const itemsWithLanes = items.map(item => {
        const start = getStartVal(item);
        const end = getEndVal(item);

        let laneIndex = -1;
        for (let i = 0; i < lanes.length; i++) {
            // Check if item starts after or near the end of the previous item in this lane
            if (start >= lanes[i] - 0.01) {
                laneIndex = i;
                lanes[i] = end;
                break;
            }
        }

        if (laneIndex === -1) {
            laneIndex = lanes.length;
            lanes.push(end);
        }

        return {
            ...item,
            laneIndex
        };
    });

    return {
        items: itemsWithLanes,
        totalLanes: Math.max(lanes.length, 1)
    };
});

const processedItems = computed(() => processedData.value.items);

const calculatedContainerHeight = computed(() => {
    const lanesCount = processedData.value.totalLanes;
    return lanesCount * 70 + 20; // 70px per lane + padding
});

// Position style for horizontal bar with month-level precision
const getItemBarStyle = (item) => {
    const start = getStartVal(item);
    const end = getEndVal(item);
    // Span years from minYear to maxYear + 1
    const totalSpanYears = (maxYear.value + 1) - minYear.value;

    const leftPercent = ((start - minYear.value) / totalSpanYears) * 100;
    const rawWidthPercent = ((end - start) / totalSpanYears) * 100;
    // Ensure a minimum bar width for legibility
    const widthPercent = Math.max(rawWidthPercent, 5);

    const topOffset = item.laneIndex * 70 + 10;

    return {
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        top: `${topOffset}px`,

    };
};

const selectedItem = computed(() => {
    if (!selectedItemId.value) return null;
    return rawItems.value.find(item => item.id === selectedItemId.value) || null;
});
const handleItemClick = (item) => {
    // If description is null, do not expand
    if (item.descripcion === null) {
        return;
    }
    if (selectedItemId.value === item.id) {
        selectedItemId.value = null;
    } else {
        selectedItemId.value = item.id;
    }
};
</script>
<style scoped>
.timeline-section {
    padding: 4rem 0;
    max-width: 1280px;
    margin: 0 auto;
}

.timeline-header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.timeline-title {
    font-size: 2rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
}

.timeline-subtitle {
    font-size: 1rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
}

/* Filter Controls */
.filter-container {
    display: inline-flex;
    gap: 0.5rem;
    background-color: #f3f4f6;
    padding: 0.35rem;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
}

.filter-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1.1rem;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #4b5563;
    cursor: pointer;
    transition: all 0.2s ease;
}

.filter-btn:hover {
    color: #111827;
}

.filter-btn.active {
    background-color: #ffffff;
    color: #111827;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.btn-icon {
    display: flex;
    align-items: center;
}

/* DESKTOP HORIZONTAL TIMELINE STYLES */
.desktop-timeline-wrapper {
    display: block;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

.timeline-scroll-container {
    overflow-x: auto;
    padding-bottom: 0.75rem;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 #f1f5f9;
}

.timeline-scroll-container::-webkit-scrollbar {
    height: 6px;
}

.timeline-scroll-container::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

.timeline-scroll-container::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

.horizontal-timeline {
    position: relative;
    width: 100%;
}

/* Year Axis */
.year-axis {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
}

.year-marker {
    position: relative;
    flex: 1;
    text-align: left;
}

.year-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.year-marker.is-current .year-label {
    color: black;
}

.present-badge {
    font-size: 0.65rem;
    background-color: black;
    color: #ffffff;
    padding: 0.1rem 0.4rem;
    border-radius: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.year-line {
    width: 2px;
    height: 8px;
    background-color: #d1d5db;
    margin-top: 0.3rem;
}

.year-marker.is-current .year-line {
    background-color: black;
    height: 12px;
}

/* Lanes Container */
.lanes-container {
    position: relative;
    width: 100%;
    transition: height 0.3s ease;
}

.grid-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

.grid-col {
    flex: 1;
    border-right: 1px dashed #f3f4f6;
}

.grid-col:last-child {
    border-right: none;
}

/* Timeline Bars */
.timeline-bar {
    position: absolute;
    height: 52px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 0.4rem 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    user-select: none;
    box-sizing: border-box;
}

.timeline-bar.is-expandable {
    cursor: pointer;
}

.timeline-bar.is-non-expandable {
    cursor: default;
    opacity: 0.88;
}

.timeline-bar.is-expandable:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;
}

.timeline-bar.is-active {
    background-color: #ffffff;

}

.bar-content {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 0.6rem;
    overflow: hidden;
}

.bar-icon-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    color: #ffffff;
    flex-shrink: 0;
}

.bar-text {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
    flex-grow: 1;
}

.bar-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: #111827;
    text-overflow: ellipsis;
    overflow: hidden;
}

.bar-lugar {
    font-size: 0.72rem;
    color: #6b7280;
    text-overflow: ellipsis;
    overflow: hidden;
}

.bar-right {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-shrink: 0;
    margin-left: auto;
}

.bar-dates {
    font-size: 0.7rem;
    font-weight: 600;
    color: #4b5563;
    background-color: #edf2f7;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
}

.expand-indicator {
    display: flex;
    align-items: center;
    color: #6b7280;
}

.chevron-icon {
    transition: transform 0.2s ease;
}

.chevron-icon.rotated {
    transform: rotate(180deg);
}

.lock-indicator {
    color: #9ca3af;
    font-size: 0.9rem;
}

/* DESKTOP DETAIL DRAWER */
.detail-drawer {
    margin-top: 1.5rem;
    background-color: #f8fafc;
    border-top: 4px solid black;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.type-pill {
    display: inline-flex;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    margin-bottom: 0.4rem;
}

.drawer-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #111827;
    margin: 0;
}

.drawer-lugar {
    font-size: 0.9rem;
    color: #4b5563;
    margin-top: 0.2rem;
    font-weight: 600;
}

.drawer-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.drawer-dates-badge {
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
}

.close-btn {
    background: #e2e8f0;
    border: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: bold;
    color: #475569;
    cursor: pointer;
    transition: background 0.2s ease;
}

.close-btn:hover {
    background: #cbd5e1;
    color: #0f172a;
}

.drawer-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #334155;
    margin-bottom: 1rem;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.tech-tag {
    font-size: 0.75rem;
    font-weight: 600;
    background-color: #ffffff;
    color: #475569;
    border: 1px solid #e2e8f0;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
}

/* MOBILE VERTICAL TIMELINE STYLES */
.mobile-timeline {
    display: none;
    position: relative;
    padding-left: 1.25rem;
    margin-top: 1rem;
}

.vertical-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6px;
    width: 3px;
    background: linear-gradient(180deg, #3b82f6 0%, #10b981 50%, #8b5cf6 100%);
    border-radius: 2px;
}

.mobile-card {
    position: relative;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-left-width: 5px;
    border-radius: 12px;
    margin-bottom: 1.25rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mobile-card.is-expandable .mobile-card-header {
    cursor: pointer;
}

.mobile-card.is-expanded {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.mobile-card-header {
    padding: 1.1rem;
}

.mobile-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.mobile-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
}

.mobile-dates {
    font-size: 0.75rem;
    font-weight: 700;
    color: #4b5563;
    background-color: #f3f4f6;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
}

.mobile-card-title {
    font-size: 1.05rem;
    font-weight: 800;
    color: #111827;
    margin: 0.2rem 0;
}

.mobile-card-lugar {
    font-size: 0.85rem;
    color: #6b7280;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
}

.mobile-expand-hint {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    font-size: 0.78rem;
    font-weight: 600;
}

.hint-text {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: #2563eb;
}

.hint-text.disabled {
    color: #9ca3af;
    font-weight: 500;
}

.mobile-card-body {
    padding: 0 1.1rem 1.1rem 1.1rem;
    border-top: 1px dashed #e5e7eb;
    background-color: #f8fafc;
    padding-top: 0.9rem;
}

.mobile-description {
    font-size: 0.88rem;
    line-height: 1.55;
    color: #334155;
    margin-bottom: 0.75rem;
}

/* TRANSITIONS */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
    transition: all 0.3s ease;
    max-height: 300px;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
}

/* RESPONSIVE MEDIA QUERIES */
@media (max-width: 768px) {
    .timeline-section {
        padding: 2.5rem 1rem;
    }

    .timeline-title {
        font-size: 1.6rem;
    }

    .desktop-timeline-wrapper {
        display: none;
    }

    .mobile-timeline {
        display: block;
    }
}

/* MARKDOWN STYLES */
:deep(.markdown-content) {
    font-size: 0.95rem;
    line-height: 1.65;
    color: #334155;
}

:deep(.markdown-content p) {
    margin-bottom: 0.75rem;
}

:deep(.markdown-content p:last-child) {
    margin-bottom: 0;
}

:deep(.markdown-content strong) {
    font-weight: 700;
    color: #0f172a;
}

:deep(.markdown-content ul.markdown-list),
:deep(.markdown-content ol.markdown-list) {
    margin: 0.5rem 0 0.85rem 1.25rem;
    padding: 0;
}

:deep(.markdown-content ul.markdown-list li),
:deep(.markdown-content ol.markdown-list li) {
    margin-bottom: 0.4rem;
    line-height: 1.55;
}

:deep(.markdown-content a) {
    color: #2563eb;
    text-decoration: underline;
    font-weight: 600;
}

:deep(.markdown-content code) {
    background-color: #f1f5f9;
    color: #0f172a;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.88em;
}
</style>