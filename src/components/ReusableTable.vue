<template>
    <table>
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key" class="header">{{ column.label }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td v-for="column in columns" :key="column.key" class="header">
                    {{ item[column.key] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
export default {
    props: {
        columns: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
    },
};
</script>
<style scoped>
.header {
    padding-right: 2rem;
}
</style>
  