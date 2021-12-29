<template>
  <div class="container">
    <h2>Editing Item "{{ item.name }}"</h2>
    <input class="form-control" v-model="item.name" type="text" />
    <div class="row mt-3">
      <div class="col mb-3">
        <button class="btn btn-primary" @click="edit">Save</button>
        <button class="btn btn-outline-danger" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      item: { name: "" },
    };
  },
  created: async function () {
    await this.get();
  },
  methods: {
    get: async function () {
      try {
        let res = await this.$axios.get(
          `http://localhost:8080/items/${this.$route.params.id}`
        );
        this.item = res.data.item;
      } catch (error) {
        console.log(error);
      }
    },
    edit: async function () {
      try {
        await this.$axios.put(
          `http://localhost:8080/items/${this.item._id}`,
          this.item
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.log(error);
      }
    },
    cancel: function () {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>