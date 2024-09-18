<template>
	<div>
		<AppNavBar />
		<!-- <AppBreadCrumb /> -->
		<div class="mb-20">
			<slot />
		</div>
		<AppFooterBar />
		<AppFooterBarEmpty>
			<div id="test"></div>
		</AppFooterBarEmpty>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
