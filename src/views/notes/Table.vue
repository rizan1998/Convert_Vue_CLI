<template>
  <div class="note-table">
    <div class="row">
      <div class="col-lg-12">
        <!-- <div class="table">
          <thead>
            <tr>
              <th>title</th>
              <th>subject</th>
              <th>published</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="note of notes" :key="note.id">
              <td> -->
        <!-- noteSlug samakan dengan dirouter -->
        <!-- <router-link
                  :to="{ name: 'notes.show', params: { noteSlug: note.slug } }"
                  >{{ note.title }}</router-link
                >
              </td>
              <td>{{ note.subject }}</td>
              <td>{{ note.publish }}</td>
              <td>
                <router-link
                  class="btn btn-warning btn-sm"
                  :to="{ name: 'notes.edit', params: { noteSlug: note.slug } }"
                  >Edit</router-link
                >
              </td>
              <td>
                <DeleteNote
                  :endpoint="note.slug"
                  :btnlarge="'sm'"
                  :btn="'danger'"
                />
              </td>
            </tr>
          </tbody>
        </div> -->
        <bootstrap-4-datatable
          :columns="columns"
          :data="notes"
          :filter="filter"
          :per-page="perPage"
          :theme="'dark'"
        ></bootstrap-4-datatable>
        <bootstrap-4-datatable-pager
          v-model="page"
          type="abbreviated"
        ></bootstrap-4-datatable-pager>
      </div>
    </div>
  </div>
</template>

<script>
// import btn_deleteNote from "./Delete";
import axios from "axios";

export default {
  components: {
    // DeleteNote: btn_deleteNote,
  },
  data() {
    return {
      notes: [],
      columns: [
        {
          label: "id",
          field: "id",
        },
        {
          label: "title",
          field: "title",
        },
        {
          label: "subject",
          field: "subject",
        },
        {
          label: "description",
          field: "description",
        },
      ],

      page: 1,
      filter: "",
      perPage: 12,
    };
  },
  mounted() {
    axios.get("notes").then((response) => {
      this.notes = response.data.data;
      // console.log(response.data);
    });
  },
};
</script>

