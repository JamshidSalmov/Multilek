<template>
  <b-form @submit.prevent="changeContact">
    <div>
      <b-card>
        <b-row>
          <!-- Contact -->
          <b-col cols="12">
            <!-- Phone number -->
            <b-form-group label="Phone number" label-cols-md="4">
              <b-form-input
                placeholder="Phone number"
                v-model="contact.phone_number"
                required
              />
            </b-form-group>
            <!-- Email -->
            <b-form-group label="Email" label-cols-md="4">
              <b-form-input
                placeholder="Email"
                v-model="contact.email"
                required
              />
            </b-form-group>
            <!-- Google play link -->
            <b-form-group label="Google play link" label-cols-md="4">
              <b-form-input
                placeholder="Google play link"
                v-model="contact.google_play_link"
                required
              />
            </b-form-group>
            <!-- App store list -->
            <b-form-group label="App store list" label-cols-md="4">
              <b-form-input
                placeholder="App store list"
                v-model="contact.app_store_list"
                required
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
    </div>
    <b-overlay :show="busy" no-wrap></b-overlay>
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
    BOverlay,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      busy: true,
      contact: {},
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
        .get(`${this.$baseUrl}/company/contact/${this.$route.params.id}/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.contact = res.data;

          this.busy = false;
        });
    },
    async changeContact() {
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .patch(
          `${this.$baseUrl}/company/about/${this.$route.params.id}/`,
          this.contact,
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
