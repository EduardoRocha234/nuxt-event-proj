<template>
	<div>
		<AppNavBar v-model:sidebar-visible="sideBarVisible" />
		<AppSidebar v-model:visible="sideBarVisible"/>
		<!-- <AppBreadCrumb /> -->
		<div class="mb-20">
			<slot />
		</div>
		<AppFooterBar />
		<AppFooterBarEmpty>
			<div id="footer-content"></div>
		</AppFooterBarEmpty>
	</div>
</template>

<script setup lang="ts">
const sideBarVisible = ref<boolean>(false)
</script>

<style scoped></style>
