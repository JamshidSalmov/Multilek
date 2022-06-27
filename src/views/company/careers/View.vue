<template>
  <b-form @submit.prevent="changeCareer">
    <div>
      <b-card>
        <b-row>
          <!-- Career title -->
          <b-col cols="12">
            <b-form-group label="Career title" label-cols-md="4">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <b-form-input
                    placeholder="Uz Career title"
                    v-model="career.uz"
                    required
                  />
                </b-tab>
                <b-tab title="Ру">
                  <b-form-input
                    placeholder="Ru Career title"
                    v-model="career.ru"
                    required
                  />
                </b-tab>
                <b-tab title="En">
                  <b-form-input
                    placeholder="En Career title"
                    v-model="career.en"
                    required
                  />
                </b-tab>
              </b-tabs>
            </b-form-group>
          </b-col>

          <!-- Career content -->
          <b-col cols="12">
            <b-form-group label="Career content" label-cols-md="4" class="mt-2">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <quill-editor
                    reqired
                    v-model="career_content.uz"
                    :options="snowOption"
                  />
                </b-tab>
                <b-tab title="Ру">
                  <quill-editor
                    required
                    v-model="career_content.ru"
                    :options="snowOption"
                  />
                </b-tab>
                <b-tab title="En">
                  <quill-editor
                    required
                    v-model="career_content.en"
                    :options="snowOption"
                  />
                </b-tab>
              </b-tabs>
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
      career: {
        uz: "",
        ru: "",
        en: "",
      },
      career_content: {
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
        .get(`${this.$baseUrl}/company/career/${this.$route.params.id}/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.careers = res.data;
          this.career.uz = this.careers.career_uz;
          this.career.ru = this.careers.career_ru;
          this.career.en = this.careers.career_en;

          this.career_content.uz = this.careers.career_content_uz;
          this.career_content.ru = this.careers.career_content_ru;
          this.career_content.en = this.careers.career_content_en;

          this.busy = false;
        });
    },
    async changeCareer() {
      const form = {};
      form.career = this.career.ru;
      form.career_uz = this.career.uz;
      form.career_ru = this.career.ru;
      form.career_en = this.career.en;

      form.career_content = this.career_content.ru;
      form.career_content_uz = this.career_content.uz;
      form.career_content_ru = this.career_content.ru;
      form.career_content_en = this.career_content.en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .patch(
          `${this.$baseUrl}/company/career/${this.$route.params.id}/`,
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
