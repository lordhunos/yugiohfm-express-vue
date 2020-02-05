<template>
    <div class="appContainer">
        <navigation-bar></navigation-bar>
        <router-view></router-view>
    </div>
</template>

<script>
import navigationBar from './components/navigation.vue'
import headerBanner from './components/header.vue'
import registerCard from './components/register.vue'
import errorRequest from './components/error.vue'

export default {
    name: "App",
    components: {
        "navigation-bar": navigationBar,
        "header-banner": headerBanner,
        "register-card": registerCard,
        "error-request": errorRequest
    },
    data() {
        return {
            
        }
    }
}
</script>