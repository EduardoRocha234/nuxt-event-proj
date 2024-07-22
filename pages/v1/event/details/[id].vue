<template>asd asd {{ navbarStore.isNavbarVisible }}</template>

<script setup lang="ts">
import {useNavBarStore} from '~/stores/navBar.store'

const navbarStore = useNavBarStore()

onMounted(() => {
	navbarStore.setSearchBarIsVisible(false)
})
</script>

<style scoped></style>
