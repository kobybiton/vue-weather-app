<template>
    <div id="app">
        <NavBar />
        <router-view />
    </div>
</template>

<script>
    import NavBar from '@/components/NavBar.vue'; // import component

    export default {
        name: "App",
        components: { // and register it
            NavBar
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400&display=swap&subset=cyrillic');

    body {
        font-family: 'Montserrat', sans-serif;
        background-image: url("assets/weather.jpg");
        background-repeat: no-repeat;
        background-attachment: fixed;
    }

    a {
        color: #153B50;
        text-decoration-color: rgba($color: #153B50, $alpha: 0.5);
        transition: all 0.3s ease;

    &:hover {
         text-decoration-color: #153B50;
     }
    }

    .nav {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .nav__link {
    &:not(:last-child) {
         margin-right: 15px;
     }
    }

</style>