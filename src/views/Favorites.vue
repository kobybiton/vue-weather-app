<template>
    <div class="home">
        <FavoriteWidget />
    </div>
</template>

<script>
    import FavoriteWidget from '@/components/FavoriteWidget.vue'; // import component

    export default {
        name: "Favorites",
        components: {
            FavoriteWidget
        }
    }
</script>

<style>

</style>