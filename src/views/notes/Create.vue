<template>
  <div class="notes-create">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>create new notes</h3>
          </div>
          <div class="card-body">
            <form
              action="#"
              @submit.prevent="store"
              enctype="multipart/form-data"
            >
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  v-model="form.title"
                  id="title"
                  class="form-control"
                />
                <div v-if="theErrors.title" class="mt-2 text-danger">
                  {{ theErrors.title[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <select
                  v-model="form.subject"
                  id="subject"
                  class="form-control"
                >
                  <option desable value="">Choice Subject</option>
                  <option v-for="sub of subjects" :key="sub.id" :value="sub.id">
                    {{ sub.name }}
                  </option>
                </select>
                <div v-if="theErrors.subject" class="mt-2 text-danger">
                  {{ theErrors.subject[0] }}
                </div>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  class="form-control"
                  id="description"
                  v-model="form.description"
                  rows="5"
                  cols="10"
                ></textarea>
                <div v-if="theErrors.description" class="mt-2 text-danger">
                  {{ theErrors.description[0] }}
                </div>
              </div>
              <img
                v-bind:src="imagePreview"
                width="100"
                height="100"
                v-show="showPreview"
              />
              <div v-if="theErrors.picture" class="mt-2 text-danger">
                {{ theErrors.picture[0] }}
              </div>
              <div class="form-group">
                <label for="image">Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="picture"
                  @change="onFileChange"
                  name="picture"
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary -flex align-items-center"
              >
                Create Note !
                <SaveAnimation v-if="loadingSave"></SaveAnimation>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import SaveAnimation from "../../components/saveAnimation";
export default {
  components: {
    SaveAnimation,
  },
  data() {
    return {
      form: {
        title: "",
        subject: "",
        description: "",
        picture: null,
      },
      errPicture: "",
      subjects: [],
      theErrors: [],
      loadingSave: false,
      imagePreview: null,
      showPreview: false,
    };
  },

  mounted() {
    this.getSubjects();
  },

  methods: {
    async getSubjects() {
      let response = await axios.get("subjects");
      console.log(response);
      // this.subjects = response.data;
      if (response.status === 200) {
        this.subjects = response.data;
      }
    },

    onFileChange(event) {
      /*
    Set the local file variable to what the user has selected.
    */
      console.log(event.target.files[0]);
      this.form.picture = event.target.files[0];

      /*
    Initialize a File Reader object
    */
      let reader = new FileReader();

      /*
    Add an event listener to the reader that when the file
    has been loaded, we flag the show preview as true and set the
    image to be what was read from the reader.
    */
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      /*
    Check to see if the file is not empty.
    */
      if (this.form.picture) {
        /*
            Ensure the file is an image file.
        */
        if (/\.(jpe?g|png|gif)$/i.test(this.form.picture.name)) {
          console.log("here");
          /*
            Fire the readAsDataURL method which will read the file in and
            upon completion fire a 'load' event which we will listen to and
            display the image in the preview.
            */
          reader.readAsDataURL(this.form.picture);
        }
      }
    },

    async store() {
      // if (this.form.picture) {
      try {
        this.loadingSave = true;

        let formData = new FormData();
        formData.append("picture", this.form.picture);
        formData.append("title", this.form.title);
        formData.append("description", this.form.description);
        formData.append("subject", this.form.subject);

        // axios
        //   .post("/notes/create-new-note", formData)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        let response = await axios.post(
          "notes/create-new-note",
          formData,
          config
        );

        if (response.status == 200) {
          console.log(response.data);
          // this.form = [];
          this.form.title = "";
          this.form.subject = "";
          this.form.description = "";
          this.form.picture = "";
          this.showPreview = false;
          this.theErrors = [];
          // this.$toast.open({
          //   message: response.data.message,
          //   position: top,
          // });
          this.loadingSave = false;
          // existingObj.success = res.data.success;
          this.$toasted.show(response.data.message, {
            type: "success",
            icon: "error_outline", //font awesome
            duration: 3000,
          });
          this.$router.push("/notes/table");
        }
      } catch (e) {
        this.loadingSave = false;
        console.log(e.response.data.errors);
        this.$toasted.error("somthing went wrong", {
          // override the global option
          position: "top-right",
        });
        this.theErrors = e.response.data.errors;
      }
      // }
      // else {
      //   this.errPicture = "data gambar kosong dan harus diisi";
      // }
    },
  },
};
</script>
