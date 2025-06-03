<script lang="ts" setup>
import type {
  WorkbenchProjectItem,
  WorkbenchQuickNavItem,
  WorkbenchTodoItem,
  WorkbenchTrendItem,
} from '@vben/common-ui';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  AnalysisChartCard,
  WorkbenchHeader,
  WorkbenchProject,
  WorkbenchQuickNav,
  WorkbenchTodo,
  WorkbenchTrends,
} from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import AnalyticsVisitsSource from '../analytics/analytics-visits-source.vue';

const userStore = useUserStore();

// This is sample data; adjust as needed for your actual project.
// URLs can be external links (starting with http) or internal routes.
// Internal routes will be handled by the navTo method.
const projectItems: WorkbenchProjectItem[] = [
  {
    color: '',
    content: 'Don’t wait for opportunity, create it.',
    date: '2021-04-01',
    group: 'Open Source Group',
    icon: 'carbon:logo-github',
    title: 'Github',
    url: 'https://github.com',
  },
  {
    color: '#3fb27f',
    content: 'Who you are today shapes who you become tomorrow.',
    date: '2021-04-01',
    group: 'Algorithm Group',
    icon: 'ion:logo-vue',
    title: 'Vue',
    url: 'https://vuejs.org',
  },
  {
    color: '#e18525',
    content: 'Nothing is more important than effort.',
    date: '2021-04-01',
    group: 'Work Group',
    icon: 'ion:logo-html5',
    title: 'Html5',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  {
    color: '#bf0c2c',
    content: 'Passion and desire can overcome any obstacle.',
    date: '2021-04-01',
    group: 'UI',
    icon: 'ion:logo-angular',
    title: 'Angular',
    url: 'https://angular.io',
  },
  {
    color: '#00d8ff',
    content: 'A healthy body is the foundation for achieving goals.',
    date: '2021-04-01',
    group: 'Tech Masters',
    icon: 'bx:bxl-react',
    title: 'React',
    url: 'https://reactjs.org',
  },
  {
    color: '#EBD94E',
    content: 'The path is created by walking, not by wishful thinking.',
    date: '2021-04-01',
    group: 'Architecture Group',
    icon: 'ion:logo-javascript',
    title: 'Js',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
];

// Similarly, URLs here can also be external links (http...) or internal routes.
const quickNavItems: WorkbenchQuickNavItem[] = [
  {
    color: '#1fdaca',
    icon: 'ion:home-outline',
    title: 'Home',
    url: '/',
  },
  {
    color: '#bf0c2c',
    icon: 'ion:grid-outline',
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    color: '#e18525',
    icon: 'ion:layers-outline',
    title: 'Components',
    url: '/demos/features/icons',
  },
  {
    color: '#3fb27f',
    icon: 'ion:settings-outline',
    title: 'System Management',
    url: '/demos/features/login-expired', // This URL is a sample; adjust for your project.
  },
  {
    color: '#4daf1bc9',
    icon: 'ion:key-outline',
    title: 'Access Management',
    url: '/demos/access/page-control',
  },
  {
    color: '#00d8ff',
    icon: 'ion:bar-chart-outline',
    title: 'Charts',
    url: '/analytics',
  },
];

const todoItems = ref<WorkbenchTodoItem[]>([
  {
    completed: false,
    content: `Review recent frontend code submissions in the Git repo to ensure code quality and standards.`,
    date: '2024-07-30 11:00:00',
    title: 'Review frontend code submissions',
  },
  {
    completed: true,
    content: `Check and optimize system performance to reduce CPU usage.`,
    date: '2024-07-30 11:00:00',
    title: 'System performance optimization',
  },
  {
    completed: false,
    content: `Perform security checks to ensure there are no vulnerabilities or unauthorized access.`,
    date: '2024-07-30 11:00:00',
    title: 'Security checks',
  },
  {
    completed: false,
    content: `Update all npm dependencies in the project to ensure the latest versions are used.`,
    date: '2024-07-30 11:00:00',
    title: 'Update project dependencies',
  },
  {
    completed: false,
    content: `Fix UI display issues reported by users to ensure consistent display across different browsers.`,
    date: '2024-07-30 11:00:00',
    title: 'Fix UI display issues',
  },
]);
const trendItems: WorkbenchTrendItem[] = [
  {
    avatar: 'svg:avatar-1',
    content: `Created project <a>Vue</a> in <a>Open Source Group</a>`,
    date: 'Just now',
    title: 'William',
  },
  {
    avatar: 'svg:avatar-2',
    content: `Followed <a>William</a>`,
    date: '1 hour ago',
    title: 'Ivan',
  },
  {
    avatar: 'svg:avatar-3',
    content: `Posted a <a>personal update</a>`,
    date: '1 day ago',
    title: 'Chris',
  },
  {
    avatar: 'svg:avatar-4',
    content: `Published article <a>How to Write a Vite Plugin</a>`,
    date: '2 days ago',
    title: 'Vben',
  },
  {
    avatar: 'svg:avatar-1',
    content: `Replied to <a>Jack</a>’s question <a>How to optimize the project?</a>`,
    date: '3 days ago',
    title: 'Pete',
  },
  {
    avatar: 'svg:avatar-2',
    content: `Closed issue <a>How to run the project</a>`,
    date: '1 week ago',
    title: 'Jack',
  },
  {
    avatar: 'svg:avatar-3',
    content: `Posted a <a>personal update</a>`,
    date: '1 week ago',
    title: 'William',
  },
  {
    avatar: 'svg:avatar-4',
    content: `Pushed code to <a>Github</a>`,
    date: '2021-04-01 20:00',
    title: 'William',
  },
  {
    avatar: 'svg:avatar-4',
    content: `Published article <a>How to use Admin Vben</a>`,
    date: '2021-03-01 20:00',
    title: 'Vben',
  },
];

const router = useRouter();

// This is a sample method; adjust according to your actual project requirements.
function navTo(nav: WorkbenchProjectItem | WorkbenchQuickNavItem) {
  if (nav.url?.startsWith('http')) {
    openWindow(nav.url);
    return;
  }
  if (nav.url?.startsWith('/')) {
    router.push(nav.url).catch((error) => {
      console.error('Navigation failed:', error);
    });
  } else {
    console.warn(`Unknown URL for navigation item: ${nav.title} -> ${nav.url}`);
  }
}
</script>

<template>
  <div class="p-5">
    <WorkbenchHeader :avatar="userStore.userInfo?.avatar || preferences.app.defaultAvatar">
      <template #title>
        Good morning, {{ userStore.userInfo?.realName }}! Let’s start your day.
      </template>
      <template #description> Today’s weather: sunny, 20℃ - 32℃! </template>
    </WorkbenchHeader>

    <div class="mt-5 flex flex-col lg:flex-row">
      <div class="mr-4 w-full lg:w-3/5">
        <WorkbenchProject :items="projectItems" title="Projects" @click="navTo" />
        <WorkbenchTrends :items="trendItems" class="mt-5" title="Latest Activity" />
      </div>
      <div class="w-full lg:w-2/5">
        <WorkbenchQuickNav :items="quickNavItems" class="mt-5 lg:mt-0" title="Quick Navigation" @click="navTo" />
        <WorkbenchTodo :items="todoItems" class="mt-5" title="To-Do List" />
        <AnalysisChartCard class="mt-5" title="Visit Sources">
          <AnalyticsVisitsSource />
        </AnalysisChartCard>
      </div>
    </div>
  </div>
</template>
