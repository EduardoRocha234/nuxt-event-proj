<template>
	<header
		ref="header"
		id="header"
		class="px-5 py-9 relative flex flex-col font-medium justify-between text-lg transition-all ease-in duration-300 bg-blue-500 rounded-b-[3rem]"
	>
		<nav
			class="flex justify-between items-center w-full text-white font-bold text-xl"
		>
			<Icon
				name="ri:menu-2-fill"
				:size="35"
				class="text-white"
			/>
			<span>RachaConnect</span>
			<div class="flex justify-center items-center p-2 rounded-full bg-blue-400">
				<Icon
					name="mi:notification"
					:size="25"
					class="text-white"
				/>
			</div>
		</nav>
		<div class="flex justify-between items-center mt-5 mb-3">
			<div class="flex gap-2">
				<Icon
					name="ri:search-line"
					:size="25"
					class="text-white"
				/>
				<div class="px-2 border-l-2">
					<input
						class="w-full h-full bg-transparent placeholder:text-slate-100 placeholder:opacity-50 focus:outline-none text-white"
						placeholder="Pesquisar..."
					/>
				</div>
			</div>
			<div
				class="flex items-center px-2 py-1 gap-1 text-sm bg-blue-400 rounded-full text-white"
			>
				<div class="flex justify-center items-center p-1 border rounded-full">
					<Icon
						name="ion:filter"
						:size="15"
					/>
				</div>
				Filtros
			</div>
		</div>
        <div class="absolute -bottom-4 flex gap-2">
            <div class="flex items-center gap-1 bg-orange-500 text-white text-md px-2 py-1 rounded-full">
                <Icon name="la:basketball-ball" :size="20"/>
                Basquete
            </div>
            <div class="flex items-center gap-1 bg-green-500 text-white text-md px-2 py-1 rounded-full">
                <Icon name="mdi:soccer" :size="20"/>
                Futsal
            </div>
            <div class="flex items-center gap-1 bg-blue-300 text-white text-md px-2 py-1 rounded-full">
                <Icon name="la:infinity" :size="20"/>
                Todos
            </div>
        </div>
	</header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
