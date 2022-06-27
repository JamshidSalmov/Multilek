<template>
  <b-form @submit.prevent="changeCategory">
    <b-card>
      <b-row>
        <!-- Category Name -->
        <b-col cols="12">
          <b-form-group label="Category name" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  placeholder="Uz Category name"
                  v-model="title.uz"
                  required
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  placeholder="Ru Category name"
                  v-model="title.ru"
                  required
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  placeholder="En Category name"
                  v-model="title.en"
                  required
                />
              </b-tab>
            </b-tabs>
          </b-form-group>
        </b-col>
        <!-- code -->
        <b-col lg="12">
          <b-form-group label="Code*" label-for="drugCode" label-cols-md="4">
            <b-form-input
              id="drugCode"
              required
              placeholder="Code*"
              v-model="product.code"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <hr />
      <!-- Category image -->
      <b-form-group label="Category image" label-cols-md="4">
        <b-form-file
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          @change="onFileChange"
          accept="image/png, image/gif, image/jpeg"
          v-model="mainImage"
          required
        />
        <img
          class="mt-1"
          v-if="mainImageUrl"
          :src="mainImageUrl"
          data-fancybox-image="mainImageUrl"
          alt="Category image"
          style="height: 150px; object-fit: contain"
        />
        <img
          style="height: 150px; object-fit: contain"
          v-else
          src="@/assets/img/noimage.png"
          alt="noimage"
        />
      </b-form-group>
    </b-card>

    <!-- Sumbit -->
    <b-card>
      <b-row>
        <!-- submit and reset -->
        <b-col class="d-flex justify-content-center">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
          >
            Submit
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-form>
</template>

<script>
import axios from "axios";
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import "@fancyapps/ui/dist/panzoom.controls.css";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BCard,
  BTab,
  BTabs,
  BCardText,
  BFormFile,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BCard,
    Ripple,
    BTabs,
    BTab,
    BCardText,
    BFormFile,
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      category: {},
      title: {
        uz: "",
        ru: "",
        en: "",
      },
      product: {
        code: "",
      },
      mainImage: null,
      mainImageUrl: null,
      imageFile: null,
      imageFileName: null,
      imageFileType: null,
      changed: false,
    };
  },
  mounted() {
    Fancybox.bind("[data-fancybox-image]", {
      Image: {
        zoom: true,
      },
    });
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.mainImageUrl = URL.createObjectURL(file);
      this.imageFile = file;
      this.imageFileName = file.name.split(".")[0];
      this.changed = true;
    },
    async changeCategory() {
      const form = new FormData();
      form.append("name", this.title.ru);
      form.append("name_uz", this.title.uz);
      form.append("name_ru", this.title.ru);
      form.append("name_en", this.title.en);

      form.append("code", this.product.code);
      
      if (this.changed) {
        form.append("image", this.imageFile);
        this.changed = false;
      }

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/product/category/`, form, params)
        .then(() => {
          this.$router.push({name: "drug-categories"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi kategorya yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Xatolik ketti :(",
              icon: "AlertCircleIcon",
              variant: "warning",
            },
          });
        });
    },
  },
};
</script>
