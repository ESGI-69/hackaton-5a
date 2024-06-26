<template>
  <table
    class="leading-normal inline-block min-w-full shadow-light rounded-lg overflow-hidden"
  >
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.prop"
          class="bg-primary-200 px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
          :style="{ width: column.width || 'auto' }"
        >
          {{ column.label || column.prop }}
        </th>
        <th
          v-if="hasActions"
          class="bg-primary-200 px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
        ></th>
      </tr>
    </thead>
    <tbody class="scroll-auto">
      <tr
        v-for="row in data"
        :key="row.toString()"
        @click="onRowClick(row)"
        class="bg-white"
        :class="{
          'cursor-pointer': areRowsClickable,
          'hover:bg-primary-50 transition duration-300 ease-in-out':
            areRowsClickable,
        }"
      >
        <td
          v-for="column in columns"
          :key="column.prop"
          class="px-5 py-5 border-b border-gray-200 text-sm text-gray-600"
        >
          <slot
            :name="column.prop"
            :row="row"
          >
            {{ row[column.prop] }}
          </slot>
        </td>
        <td
          v-if="hasActions"
          class="px-5 py-5 border-b border-gray-200 text-sm text-gray-600"
        >
          <slot
            v-if="hasActions"
            name="actions"
            :row="row"
          />
        </td>
      </tr>
      <tr v-if="data.length === 0">
        <td
          class="p-4 text-center text-sm text-gray-600"
          :colspan="columns.length"
        >
          {{ emptyMessage }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup generic="D extends Data">
export type Data = {
  [key: string]: any;
};

const props = withDefaults(
  defineProps<{
    columns: {
      prop: keyof D;
      label?: string;
      width?: HTMLElement['style']['width'];
    }[];
    data: D[];
    hasActions?: boolean;
    areRowsClickable?: boolean;
    emptyMessage?: string;
  }>(),
  {
    emptyMessage: 'Aucune donnée à afficher',
  },
);

const emit = defineEmits<{
  (event: 'row-click', row: D): void;
}>();

const onRowClick = (row: D) => {
  if (props.areRowsClickable) {
    emit('row-click', row);
  }
};
</script>
