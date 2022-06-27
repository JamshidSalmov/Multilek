<template>
  <div class="ecommerce-application">
    <b-form @submit.stop.prevent="changeUserItem">
      <b-card>
        <b-row>
          <!-- Phone number -->
          <b-col cols="12">
            <b-form-group
             label="Phone number" 
             label-for="Phone_number"
             label-cols-md="4">
              <b-form-input
                type="tel"
                id="Phone_number"
                placeholder="Phone number"
                v-model="user.phone_number"
              />
            </b-form-group>
          </b-col>
          <!-- Password -->
          <b-col cols="12">
            <b-form-group label="Password" label-cols-md="4" label-for="Password">
              <b-form-input
                id="Password"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </b-form-group>
          </b-col>
          <!-- User Name -->
          <b-col cols="12">
            <b-form-group label="Name"
            label-cols-md="4"
            label-for="Name">
              <b-form-input
                id="Name"
                placeholder="First name"
                v-model="user.first_name"
              />
            </b-form-group>
          </b-col>
          <!-- User last name -->
          <b-col cols="12">
            <b-form-group label="Last Name" label-cols-md="4"
            label-for="LastName">
              <b-form-input
              id="LastName"
                placeholder="Last name"
                v-model="user.last_name"
              />
            </b-form-group>
          </b-col>
          <!-- Brithday -->
          <b-col cols="12">
            <b-form-group label="Brithday" label-cols-md="4"
            label-for="Brithday">
              <b-form-input
                id="Brithday"
                placeholder="Brithday"
                v-model="user.birthday"
                type="date"
              />
            </b-form-group>
          </b-col>
          <!-- User Full Name -->
          <b-col cols="12">
            <b-form-group label="Full Name" label-cols-md="4"
            label-for="Full_name">
              <b-form-input
                id="Full_name"
                placeholder="Full name"
                v-model="user.full_name"
              />
            </b-form-group>
          </b-col>
          <!-- Address -->
          <b-col cols="12">
            <b-form-group label="Address" label-cols-md="4"
            label-for="Address">
              <b-form-input
                id="Address"
                placeholder="Address"
                v-model="user.address"
              />
            </b-form-group>
          </b-col>
          <!-- User gender -->
          <!-- <b-col cols="12">
            <b-form-group
                label="Gender"
                label-for="h-gender"
                label-cols-md="4"
            >
                <v-select
                id="h-gender"
                :value="user.selectedGender"
                label="name"
                :options="Genders"
                placeholder="Gender"
                @input="setGender"
                >
                <template #selected-option="{ name }">
                    {{ name }}
                </template>
                </v-select>
            </b-form-group>
          </b-col> -->
          <b-col cols="12">
            <b-form-group label="Gender" label-cols-md="4"
            label-for="gender">
              <b-form-input
                id="gender"
                placeholder="Gender"
                v-model="user.gender"
              />
            </b-form-group>
          </b-col>
          <!-- Location -->
          <b-col cols="12">
            <b-form-group label="Location" label-cols-md="4"
            label-for="location">
              <b-form-input
                id="location"
                placeholder="Location"
                v-model="user.location"
              />
            </b-form-group>
          </b-col>
          <!-- ill_history -->
          <b-col cols="12">
            <b-form-group label="Ill history" label-cols-md="4"
            label-for="ill_hestory">
              <b-form-input
                id="ill_hestory"
                placeholder="Ill history"
                v-model="user.ill_history"
              />
            </b-form-group>
          </b-col>
          <!-- finance_sum -->
          <b-col cols="12">
            <b-form-group label="finance_sum" label-cols-md="4"
            label-for="summ">
              <b-form-input
              id="summ"
                placeholder="finance_sum"
                v-model="user.finance_sum"
                type="number"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
          <b-form-group label="is_active" label-cols-md="4"
          label-for="is_active">
            <b-form-checkbox
              id="is_active"
              v-model="user.is_active"
              class="custom-control-primary"
            >
              Is active
            </b-form-checkbox>
          </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="is_superuser" label-cols-md="4"
            label-for="is_superuser">
                <b-form-checkbox
                id="is_superuser"
                v-model="user.is_superuser"
                class="custom-control-primary"
                >
                Is superuser
                </b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="is_staff" label-cols-md="4"
            label-for="is_staff">
                <b-form-checkbox
                id="is_staff"
                v-model="user.is_staff"
                class="custom-control-primary"
                >
                Is staff
                </b-form-checkbox>
            </b-form-group>
          </b-col>

        </b-row>
      </b-card>
      <b-card>
        <b-row>
        <!-- submit and reset -->
        <b-col offset-md="4">
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
            @click="reset_all"
            >
            Reset
            </b-button>
        </b-col>
        </b-row>
      </b-card>
    </b-form>
    
  </div>
</template>

<script>
import axios from "axios";
// import ECommerceWishlist from "./ECommerceWishlist.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
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
    vSelect,
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
    BFormCheckbox,
    ToastificationContent,
    // ECommerceWishlist,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      Genders: ["Male","Female"],
      
      user: {
        phone_number: "",
        password: null,
        first_name: "",
        last_name: "",
        birthday: null,
        full_name: "",
        address: null,
        gender: null,
        location: null,
        ill_history: null,
        finance_sum: null,
        is_active: false,
        is_superuser: false,
        is_staff: false,
      },
    };
  },
  mounted(){
      this.getData();
  },
  methods: {
    reset_all(){
        this.user.is_active = false;
        this.user.is_superuser= false;
        this.user.is_staff= false;
        this.user.gender = null;
    },
    async getData() {
    const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
        
      await axios
        .get(`${this.$baseUrl}/user/profile/${this.$route.params.id}/`,params)
        .then((res) => {
            console.log('Jamshid Qaraaa',res)
            this.user.phone_number = res.data.phone_number;
            this.user.first_name = res.data.first_name;
            this.user.last_name = res.data.last_name;
            this.user.birthday = res.data.birthday;
            this.user.full_name = res.data.full_name;
            this.user.gender = res.data.gender;
            this.user.address = res.data.address;
            this.user.location = res.data.location;
            this.user.ill_history = res.data.ill_history;
            this.user.finance_sum = res.data.finance_sum;
            this.user.is_active = res.data.is_active;
            this.user.is_superuser = res.data.is_superuser;
            this.user.is_staff = res.data.is_staff;
        });
    },
    async changeUserItem() {
      const form = new FormData();
      form.append("phone_number", this.user?.phone_number);
      form.append("password", this.user?.password);
      form.append("first_name", this.user?.first_name);
      form.append("last_name", this.user?.last_name);
      form.append("birthday", this.user?.birthday);
      form.append("full_name", this.user?.full_name);
      form.append("address", this.user?.address);
      form.append("gender", this.user?.gender);
      form.append("location", this.user?.location);
      form.append("ill_history", this.user?.ill_history);
      form.append("finance_sum", this.user?.finance_sum);
      form.append("is_active", this.user?.is_active);
      form.append("is_superuser", this.user?.is_superuser);
      form.append("is_staff", this.user?.is_staff);

    //   this.changePassword(),

      console.log("this.userNeww",this.user)
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      }
      await axios
        .patch(`${this.$baseUrl}/user/profile-update/${this.$route.params.id}/`, form, params)
        .then((res) => {
          this.getData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi user yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
          this.$router.push({name: "users"});
        })
        .catch((err) => {
          const errors = Object.values(err.response.data);
          console.log(errors);
          for (let index = 0; index < errors.length; index++) {
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: "Xato ketdi! - " + errors[index],
                icon: "CheckCircleIcon",
                variant: "danger",
              },
            });
          }
        });
    },

    // async changePassword() {
    //   const form = new FormData();
    //   console.log("Salom hammaga",form)
    //   form.append("password", this.user?.password);
    //   const access = localStorage.getItem("access");
    //   const params = {
    //     headers: {
    //       "Accept-Language": "ru",
    //       Authorization: `Bearer ${access}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   };
    //   await axios
    //     .post(`${this.$baseUrl}/user/change-password/`, form, params)
    //     .then((res) => {
    //       console.log('Password Funktion')
    //       this.$toast({
    //         component: ToastificationContent,
    //         position: "top-right",
    //         props: {
    //           title: "Pasword ham uzgartirildi!",
    //           icon: "CheckCircleIcon",
    //           variant: "success",
    //         },
    //       });
    //     })
    //     .catch((err) => {
    //       const errors = Object.values(err.response.data);
    //       console.log(errors);
    //       for (let index = 0; index < errors.length; index++) {
    //         this.$toast({
    //           component: ToastificationContent,
    //           position: "top-right",
    //           props: {
    //             title: "Passwordni o'zgartirishda xato keldi! - " + errors[index],
    //             icon: "CheckCircleIcon",
    //             variant: "danger",
    //           },
    //         });
    //       }
    //     });
    // },

  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/quill.scss";

</style>
