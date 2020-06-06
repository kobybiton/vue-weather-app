<template>
    <div class="home">
        <FavoriteWidget />
    </div>
</template>

<script>
    import FavoriteWidget from '@/components/FavoriteWidget.vue'; // import component

    export default {
        name: "Favorites",
        components: { // and register it
            FavoriteWidget
        }
    }
</script>

<style>

</style>