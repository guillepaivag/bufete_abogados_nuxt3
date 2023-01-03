<template>
    <div>
        Usuario {{ route.params.codigo }}
    </div>
</template>

<script setup>
const route = useRoute()
</script>