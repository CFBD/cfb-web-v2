
<script setup lang="ts">
  import { computed, ref } from "vue";
  const config = useRuntimeConfig();

  const email = ref();
  const showForm = ref(true);
  const showSpinner = ref(false);
  const showSuccessMessage = ref(false);
  const showErrorMessage = ref(false);

  const validEmail = computed(() => {
      const emailPattern = /(.+)@(.+)\.(.+)/;
      return emailPattern.test(email.value);
  });

  const submitEmail = () => {
      if (validEmail.value) {
          showForm.value = false;
          showSpinner.value = true;

          $fetch("/auth/key", {
              baseURL: config.public.apiBaseUrl,
              method: "POST",
              body: {
                email: email.value
              }
          }).then(() => {
              showSuccessMessage.value = true;
          }).catch((err) => {
              showSpinner.value = false;
              showErrorMessage.value = true;
              console.error(err);
          }).finally(() => {
              showSpinner.value = false;
          });
      }
  }
</script>

<template>
    <Card class="m-3 text-center">
        <template #title>
            CFBD API Keys
        </template>
        <template #subtitle>
            Submit your email to receive your free API key. By submittting your email, you agree to the <NuxtLink to="/terms">Terms & Conditions</NuxtLink>.
        </template>
        <template #content>
            <div v-if="showForm">
                <div class="formgrid grid mt-3 justify-content-center">
                    <div class="field col-12 md:col-6 lg:col-4">
                        <label>Email Address</label>
                        <InputText v-model="email" placeholder="Enter email" class="w-full"></InputText>
                        <small>Your free API key will be sent to this address</small>
                    </div>
                </div>
                <Button label="Submit" @click="submitEmail"></Button>
            </div>
            <ProgressSpinner v-if="showSpinner" class="mt-3"></ProgressSpinner>
            <div v-if="showSuccessMessage" class="grid justify-content-center mt-3">
                <Message severity="success" class="w-12 md:w-6">Your API key request has been submitted and will be
                    sent to
                    the
                    specified email.
                </Message>
            </div>
            <div v-if="showErrorMessage" class="grid justify-content-center mt-3">
                <Message severity="error" class="w-12 md:w-6">Something went wrong. If this issue persists, please contact
                    the site administrator.
                </Message>
            </div>
        </template>
    </Card>
</template>

<style scoped></style>
