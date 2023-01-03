<template>
    <div>
        Usuario {{ route.params.codigo }}
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'autenticado'
})

const route = useRoute()

</script>