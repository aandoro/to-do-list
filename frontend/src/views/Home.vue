<template>
  <div class="container">
    <h2>To-Do List</h2>

    <div class="d-flex">
      <input
        v-model="item.name"
        type="text"
        class="form-control"
        placeholder="Enter Item"
      />
      <button class="btn btn-primary" @click="submit">Add</button>
    </div>
    <table class="table mt-5">
      <thead>
        <tr>
          <th>Status</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="completed"
                v-model="item.completed"
                @click="completed(item, !item.completed)"
              />
            </div>
          </td>
          <td>{{ item.name }}</td>
          <td>
            <div class="row">
              <div class="col">
                <router-link
                  class="btn btn-primary"
                  :to="{ name: 'Edit', params: { id: item._id } }"
                  ><font-awesome-icon icon="edit"
                /></router-link>
                <button
                  class="btn btn-outline-danger"
                  @click="remove(item._id)"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ToDoList",
  data() {
    return {
      items: [],
      item: { name: "" },
    };
  },
  created: async function () {
    await this.getAll();
  },
  methods: {
    getAll: async function () {
      try {
        let res = await this.$axios.get("http://localhost:8080/items");
        this.items = res.data.items;
      } catch (error) {
        console.log(error);
      }
    },
    submit: async function () {
      if (this.item.name.localeCompare("")) {
        try {
          let res = await this.$axios.post(
            "http://localhost:8080/items/create",
            this.item
          );
          this.items.push(res.data.item);
          this.clear();
        } catch (error) {
          console.log(error);
        }
      }
    },
    remove: async function (id) {
      try {
        let res = await this.$axios.delete(`http://localhost:8080/items/${id}`);
        this.items = this.items.filter(
          (item) => item._id !== res.data.item._id
        );
        this.clear();
      } catch (error) {
        console.log(error);
      }
    },
    completed: async function (item, res) {
      try {
        item.completed = res;
        await this.$axios.put(`http://localhost:8080/items/${item._id}`, item);
      } catch (error) {
        console.log(error);
      }
    },
    clear: function () {
      this.item = { name: "" };
    },
  },
};
</script>