<template>
	<div>
		<AppNavBar
			v-model:sidebar-visible="sideBarVisible"
			v-once
		/>
		<LazyAppSidebar v-model:visible="sideBarVisible" />
		<!-- <AppBreadCrumb /> -->
		<div class="mb-20">
			<slot />
		</div>
		<AppFooterBar v-once />
		<LazyAppFooterBarEmpty>
			<div id="footer-content"></div>
		</LazyAppFooterBarEmpty>
	</div>
</template>

<script setup lang="ts">
const sideBarVisible = ref<boolean>(false)
</script>

<style scoped></style>
