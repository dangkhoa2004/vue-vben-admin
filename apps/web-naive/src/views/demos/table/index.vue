<script setup lang="ts">
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { NDataTable } from 'naive-ui';

const columns = ref([
  {
    key: 'no',
    title: 'No',
  },
  {
    key: 'title',
    title: 'Title',
  },
  {
    key: 'length',
    title: 'Length',
  },
]);
const data = [
  { length: '4:18', no: 3, title: 'Wonderwall' },
  { length: '4:48', no: 4, title: "Don't Look Back in Anger" },
  { length: '7:27', no: 12, title: 'Champagne Supernova' },
];
</script>

<template>
  <Page
    description="The form page is used to collect or validate information from the user. Basic forms are commonly used when there are fewer data items to handle."
    title="NDataTable">
    <NDataTable :columns="columns" :data="data" />
  </Page>
</template>


<style scoped></style>
