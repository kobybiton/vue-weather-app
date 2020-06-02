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
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px auto;
}
</style>