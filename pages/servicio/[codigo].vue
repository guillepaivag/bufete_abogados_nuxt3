<template>
    <div>
        Servicio

        {{ $route.params.codigo }}
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'servicios'
})
</script>