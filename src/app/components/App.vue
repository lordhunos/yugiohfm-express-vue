<template>
    <div class="appContainer">
        <navigation-bar></navigation-bar>
        <header-zone></header-zone>
    </div>
</template>

<script>
import navigationBar from './navigation.vue'
import header from './header.vue'

export default {
    data() {
        return {
            
        }
    },
    components: {
        "navigation-bar": navigationBar,
        "header-zone": header
    }
}
</script>