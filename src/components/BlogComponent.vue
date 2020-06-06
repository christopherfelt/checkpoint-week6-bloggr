<template>
  <router-link :to="{ name: 'BlogDetail', params: { id: blogProp._id } }">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ blogProp.title }}</h4>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Blog",
  props: ["blogProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>

<style scoped>
.card-width {
  width: 10em;
}
</style>
