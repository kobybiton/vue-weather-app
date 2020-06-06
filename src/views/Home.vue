<template>
    <div class="home">
        <ForecastOneDay />
    </div>
</template>

<script>
    import ForecastOneDay from '@/components/ForecastOneDay.vue'; // import component

    export default {
        name: "Home",
        components: {
            ForecastOneDay
        }
    }
</script>

<style>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
}
</style>