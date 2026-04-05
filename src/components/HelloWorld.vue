<script setup lang="ts">
import { onMounted } from 'vue';
import { switchBotFetch } from '../infrastructure/api/switchBotClient'

const API_BASE = "https://api.switch-bot.com/v1.1"

onMounted(async () => {
	await switchBotFetch(`${API_BASE}/devices`)
})
</script>

<template>
<h1>SwitchBot Home</h1>
</template>
