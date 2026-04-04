<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'

  const inputText: Ref<string, string> = ref('')
  const todoItems: Ref<string[], string[]> = ref([])

  const isDisabled = computed(() => {
    return inputText.value.length == 0
  })

  const addTodo = ((item: string) => {
    item = item.trim();

    if (item.length > 0) {
      todoItems.value.push(item)
    } else {
      alert("empty!!")
    }
  })
</script>

<template>
  <div>
    <p>TODOを入力</p>
    <input v-model="inputText"><button :disabled="isDisabled" @click="addTodo(inputText)">Add</button>
  </div>
  <div>
    <p>入力文字数: {{ inputText.length }}</p>
    <p>登録件数: {{ todoItems.length }}</p>
  </div>
  <div>
    <div v-for="todoItem in todoItems">
      {{ todoItem }}
    </div>
  </div>
</template>