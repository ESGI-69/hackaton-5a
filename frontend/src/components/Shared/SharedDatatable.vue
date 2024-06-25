<template>
  <table>
    <thead>
      <th
        v-for="column in columns"
        :key="column.prop"
      >
        {{ column.label || column.prop }}
      </th>
    </thead>
    <tbody>
      <tr
        v-for="row in data"
        :key="row.toString()"
      >
        <td
          v-for="column in columns"
          :key="column.prop"
        >
          <slot
            :name="column.prop"
            :row="row"
          >
            {{ row[column.prop] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup generic="D extends Data">
export type Data = {
  [key: string]: any;
};

defineProps<{
  columns: {
    prop: keyof D;
    label?: string;
  }[];
  data: D[];
}>();
</script>
