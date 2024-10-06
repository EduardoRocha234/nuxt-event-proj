<template>
	<AppSectionCard>
		<AppHeadPage />
		<LazyPartialEventForm />
	</AppSectionCard>
</template>

<script setup lang="ts">
const footerbarStore = useFooterBarStore()

onMounted(() => {
	footerbarStore.setFooterBarVisible(false)
})
</script>

<style scoped></style>
