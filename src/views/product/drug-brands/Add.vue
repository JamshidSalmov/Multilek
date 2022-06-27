<template>
  <b-form @submit.prevent="changeBrand">
    <b-card>
      <b-row>
        <!-- Brand Name -->
        <b-col cols="12">
          <b-form-group label="Brand name" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  placeholder="Uz Brand name"
                  v-model="title.uz"
                  required
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  placeholder="Ru Brand name"
                  v-model="title.ru"
                  required
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  placeholder="En Brand name"
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
    };
  },
  methods: {
    async changeBrand() {
      const form = new FormData();
      form.append("title", this.title.ru);
      form.append("title_uz", this.title.uz);
      form.append("title_ru", this.title.ru);
      form.append("title_en", this.title.en);

      form.append("code", this.product.code);

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/product/brand/`, form, params)
        .then(() => {
          this.$router.push({name: "drug-brands"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi brand yaratildi!",
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
