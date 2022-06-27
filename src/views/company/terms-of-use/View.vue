<template>
  <b-form @submit.prevent="changeTerms">
    <div>
      <b-card>
        <b-row>
          <b-col cols="12">
            <!-- Terms content -->
            <b-col cols="12">
              <b-form-group
                label="Terms content"
                label-cols-md="4"
                class="mt-2"
              >
                <b-tabs pills align="left">
                  <b-tab title="Uz" active>
                    <quill-editor
                      v-model="terms_of_use.uz"
                      :options="snowOption"
                    />
                  </b-tab>
                  <b-tab title="Ру">
                    <quill-editor
                      v-model="terms_of_use.ru"
                      :options="snowOption"
                    />
                  </b-tab>
                  <b-tab title="En">
                    <quill-editor
                      v-model="terms_of_use.en"
                      :options="snowOption"
                    />
                  </b-tab>
                </b-tabs>
              </b-form-group>
            </b-col>
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
    </div>
    <b-overlay :show="busy" no-wrap></b-overlay>
  </b-form>
</template>

<script>
import axios from "axios";
import {quillEditor} from "vue-quill-editor";
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
  BOverlay,
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
    quillEditor,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      busy: true,
      terms: {},
      terms_of_use: {
        uz: "",
        ru: "",
        en: "",
      },
      snowOption: {
        theme: "snow",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      await axios
        .get(
          `${this.$baseUrl}/company/terms-of-use/${this.$route.params.id}/`,
          {
            headers: {
              "Accept-Language": "ru",
            },
          }
        )
        .then((res) => {
          this.terms = res.data;
          this.terms_of_use.uz = this.terms.terms_of_use_uz;
          this.terms_of_use.ru = this.terms.terms_of_use_ru;
          this.terms_of_use.en = this.terms.terms_of_use_en;

          this.busy = false;
        });
    },
    async changeTerms() {
      const form = {};
      form.terms_of_use = this.terms_of_use.ru;
      form.terms_of_use_uz = this.terms_of_use.uz;
      form.terms_of_use_ru = this.terms_of_use.ru;
      form.terms_of_use_en = this.terms_of_use.en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .patch(
          `${this.$baseUrl}/company/terms-of-use/${this.$route.params.id}/`,
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
<style scoped lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
