<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { NButton, NCard, useMessage } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import { getAllMenusApi } from '#/api';

const message = useMessage();
const [Form, formApi] = useVbenForm({
  commonConfig: {
    // Common component props for all form items
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  // On large screens, 3 items per row; on medium screens, 2; on small screens, 1
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  handleSubmit: (values) => {
    message.success(`Form data: ${JSON.stringify(values)}`);
  },
  schema: [
    {
      // The component needs to be registered in #/adapter.ts with its type
      component: 'ApiSelect',
      // Component-specific props
      componentProps: {
        // Transform menu API data to options format
        afterFetch: (data: { name: string; path: string }[]) => {
          return data.map((item: any) => ({
            label: item.name,
            value: item.path,
          }));
        },
        // Menu API
        api: getAllMenusApi,
      },
      // Field name
      fieldName: 'api',
      // Label displayed in the form
      label: 'ApiSelect',
      rules: 'required',
    },
    {
      component: 'ApiTreeSelect',
      componentProps: {
        api: getAllMenusApi,
        childrenField: 'children',
        labelField: 'name',
        valueField: 'path',
      },
      fieldName: 'apiTree',
      label: 'ApiTreeSelect',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'string',
      label: 'String',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'number',
      label: 'Number',
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      fieldName: 'radio',
      label: 'Radio',
      componentProps: {
        options: [
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' },
          { value: 'D', label: 'D' },
          { value: 'E', label: 'E' },
        ],
      },
      rules: 'selectRequired',
    },
    {
      component: 'RadioGroup',
      fieldName: 'radioButton',
      label: 'RadioButton',
      componentProps: {
        isButton: true,
        class: 'flex flex-wrap', // Use class to wrap if there are many options
        options: [
          { value: 'A', label: 'Option A' },
          { value: 'B', label: 'Option B' },
          { value: 'C', label: 'Option C' },
          { value: 'D', label: 'Option D' },
          { value: 'E', label: 'Option E' },
        ],
      },
      rules: 'selectRequired',
    },
    {
      component: 'CheckboxGroup',
      fieldName: 'checkbox',
      label: 'Checkbox',
      componentProps: {
        options: [
          { value: 'A', label: 'Option A' },
          { value: 'B', label: 'Option B' },
          { value: 'C', label: 'Option C' },
        ],
      },
      rules: 'selectRequired',
    },
    {
      component: 'DatePicker',
      fieldName: 'date',
      label: 'Date',
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'textArea',
      label: 'TextArea',
      componentProps: {
        type: 'textarea',
      },
      rules: 'required',
    },
  ],
});
function setFormValues() {
  formApi.setValues({
    string: 'string',
    number: 123,
    radio: 'B',
    radioButton: 'C',
    checkbox: ['A', 'C'],
    date: Date.now(),
  });
}
</script>
<template>
  <Page
    description="The form adapter re-wraps CheckboxGroup and RadioGroup, allowing options data to be passed via the options property (options data will be treated as child component props)."
    title="Form Demo">
    <NCard title="Basic Form">
      <template #header-extra>
        <NButton type="primary" @click="setFormValues">Set Form Values</NButton>
      </template>
      <Form />
    </NCard>
  </Page>
</template>
