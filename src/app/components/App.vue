<template>
    <div class="appContainer">
        <navigation-bar></navigation-bar>
        <header-banner></header-banner>
    </div>
</template>

<script>
import navigationBar from './navigation.vue'
import header from './header.vue'

export default {
    name: "App",
    components: {
        "navigation-bar": navigationBar,
        "header-banner": header
    },
    data() {
        return {
            
        }
    }
}
</script>