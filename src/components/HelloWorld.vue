<script setup lang="ts">
import { onMounted } from 'vue';
import { switchBotFetch } from '../infrastructure/api/switchBotClient'

onMounted(async () => {
	await switchBotFetch('https://www.example.com')
})
</script>

<template>
<h1>SwitchBot Home</h1>
</template>
