<template>
  <b-form @submit.prevent="changeType">
    <b-card>
      <b-row>
        <!-- Type Name -->
        <b-col cols="12">
          <b-form-group label="Type name" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  placeholder="Uz Type name"
                  v-model="title.uz"
                  required
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  placeholder="Ru Type name"
                  v-model="title.ru"
                  required
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  placeholder="En Type name"
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
      brand: {},
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
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await axios
        .get(`${this.$baseUrl}/product/type/${this.$route.params.id}/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.type = res.data;
          this.title.uz = this.type.title_uz;
          this.title.ru = this.type.title_ru;
          this.title.en = this.type.title_en;
          this.product.code = this.type?.code;
        });
    },
    async changeType() {
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
        .patch(
          `${this.$baseUrl}/product/type/${this.$route.params.id}/`,
          form,
          params
        )
        .then((res) => {
          if (res) {
            this.getData();

            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: "Muvaffaqiyatli yangilandi!",
                icon: "CheckCircleIcon",
                variant: "success",
              },
            });
            this.$router.push("/product/drug-types");
          }
        })
        .catch((err) => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: err.response.data.detail,
              icon: "CheckCircleIcon",
              variant: "warning",
            },
          });
        });
    },
  },
};
</script>
