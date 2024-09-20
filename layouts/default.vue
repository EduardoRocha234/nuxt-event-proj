<template>
	<div>
		<AppNavBar />
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

<script setup lang="ts"></script>

<style scoped></style>
