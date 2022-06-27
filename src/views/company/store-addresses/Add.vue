<template>
  <b-form @submit.prevent="addAddress">
    <b-card>
      <b-row>
        <!-- Address Name -->
        <b-col cols="12">
          <b-form-group label="Address" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  placeholder="Uz Address"
                  v-model="addressName.uz"
                  required
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  placeholder="Ru Address"
                  v-model="addressName.ru"
                  required
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  placeholder="En Address"
                  v-model="addressName.en"
                  required
                />
              </b-tab>
            </b-tabs>
          </b-form-group>
        </b-col>
        <!-- City -->
        <b-col cols="12">
          <b-form-group label="City" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  placeholder="Uz City"
                  v-model="cityName.uz"
                  required
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  placeholder="Ru City"
                  v-model="cityName.ru"
                  required
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  placeholder="En City"
                  v-model="cityName.en"
                  required
                />
              </b-tab>
            </b-tabs>
          </b-form-group>
        </b-col>
        <!-- Location -->
        <b-col cols="12">
          <b-form-group label="Location" label-cols-md="4">
            <b-form-input
              placeholder="Location"
              v-model="address.location"
              required
            />
          </b-form-group>
        </b-col>
        <!-- Map -->
        <b-col cols="12" class="mt-1 mb-2">
          <MapCreate class="my-map-cabinet" @getMapData="getMapData" />
        </b-col>
        <!-- Phone number -->
        <b-col cols="12">
          <b-form-group label="Phone number" label-cols-md="4">
            <b-form-input
              type="tel"
              placeholder="Phone number"
              v-model="address.phone_number"
              required
            />
          </b-form-group>
        </b-col>
        <!-- Email -->
        <b-col cols="12">
          <b-form-group label="Email" label-cols-md="4">
            <b-form-input
              type="email"
              placeholder="Email"
              v-model="address.email"
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
  </b-form>
</template>

<script>
import axios from "axios";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import MapCreate from "./MapCreate.vue";
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
    MapCreate,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      brand: {},
      address: {
        location: "",
        lat: "",
        long: "",
      },
      addressName: {
        uz: "",
        ru: "",
        en: "",
      },
      cityName: {
        uz: "",
        ru: "",
        en: "",
      },
    };
  },
  methods: {
    getMapData(data) {
      this.address.lat = data.lat;
      this.address.long = data.lng;
      this.address.location = this.address.lat + ", " + this.address.long;
    },
    async addAddress() {
      const form = {};
      form.address = this.addressName.ru;
      form.address_uz = this.addressName.uz;
      form.address_ru = this.addressName.ru;
      form.address_en = this.addressName.en;

      form.city = this.cityName.ru;
      form.city_uz = this.cityName.uz;
      form.city_ru = this.cityName.ru;
      form.city_en = this.cityName.en;

      form.location = this.address.location;
      form.lat = this.address.lat;
      form.long = this.address.long;

      form.phone_number = this.address.phone_number;
      form.email = this.address.email;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/map/create/`, form, params)
        .then(() => {
          this.$router.push({name: "store-addresses"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Manzil yaratildi!",
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
