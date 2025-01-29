<template>
  <div class="global-centering">
    <h1 class="header-page-text pb-10">Register panel</h1>
    <div class="w-96">
      <a-form :model="formState" name="basic" @finish="onFinish">
        <a-form-item
          name="name"
          :rules="[
            { required: true, message: 'Please input your username!' },
            {
              max: 40,
              message: 'Username must be less than or equal to 40 characters!',
            },
          ]"
        >
          <a-input v-model:value="formState.name" placeholder="Username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          name="email"
          :rules="[
            { required: true, message: 'Please input your e-mail!' },
            { type: 'email', message: 'Please enter a valid email address!' },
            {
              max: 50,
              message: 'Email must be less than or equal to 50 characters!',
            },
          ]"
        >
          <a-input v-model:value="formState.email" placeholder="E-mail">
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Password"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <div class="flex flex-row justify-between items-center">
          <div class="pb-4">
            <a-button
              class="pb-10 text-white"
              type="link"
              html-type="submit"
              @click="onRegistrationSuccess"
              >Log in</a-button
            >
          </div>
          <a-form-item>
            <a-button html-type="submit" class="text-white">Register</a-button>
          </a-form-item>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { Form, Input, Button, message } from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive } from "vue";
import axios from "../utils/axiosInterceptor";
export default defineComponent({
  props: {
    onRegistrationSuccess: {
      type: Function,
      required: true,
    },
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputPassword: Input.Password,
    AButton: Button,
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup(props) {
    const formState = reactive({
      name: "",
      password: "",
      email: "",
    });

    const onFinish = async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          values
        );
        message.info("The account has been created.");
        props.onRegistrationSuccess();
      } catch (error) {
        console.log(error);
      }
    };
    return {
      formState,
      onFinish,
    };
  },
});
</script>
