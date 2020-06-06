<template>
    <div class="row add-to-favorites">
        <button class="btn btn-info my-2 my-sm-0" @click.prevent="addOrRemoveFavorites" type="button">{{ this.$store.state.buttonText }}</button>
    </div>
</template>

<script>
    export default {
        name: "AddToFavorites",
        methods: {
            addOrRemoveFavorites() {
                this.$store.state.toggleFavorites = !this.$store.state.toggleFavorites
                this.$store.state.toggleFavorites ? this.$store.state.buttonText = 'Remove From Favorites': this.$store.state.buttonText =  'Add To Favorites';
                this.$store.state.defaultLocation.favorite = this.$store.state.toggleFavorites;
            }
        }
    }
</script>

<style scoped>

</style>