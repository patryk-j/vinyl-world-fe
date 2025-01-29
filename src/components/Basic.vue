<script>
import { Card } from "ant-design-vue";

export default {
  components: {
    Card,
  },
};
</script>
<template>
  <div>
    <h1 class="header-page-text">Welcome to the World of Vinyl</h1>
    <div class="global-centering px-4">
      <div class="flex flex-col text-center">
        <Card class="w-1/2 opacity-90 text-black bg-gray-100 py-5 my-8">
          <h1 class="text-3xl font-extralight">History of vinyl</h1>
          <p class="text-lg p-4">
            Vinyl records have been a popular way to listen to music for over a
            century. While they were largely replaced by digital formats in the
            late 20th century, vinyl records have experienced a resurgence in
            recent years. Many music lovers appreciate the warm, analog sound
            that vinyl records provide, as well as the physical experience of
            holding and playing a record.
          </p>
        </Card>
        <Card class="w-1/2 opacity-90 text-black bg-gray-100 ml-auto py-5 my-8">
          <h1 class="text-3xl font-extralight decoration-2">
            Explore our collection
          </h1>
          <p class="text-lg p-4">
            Whether you're a die-hard vinyl collector or just getting started
            with vinyl, we have something for you. Browse our online store or
            sign up for our vinyl rental service to discover new music and enjoy
            the unique sound of vinyl records.
          </p>
        </Card>
        <Card class="w-1/2 opacity-90 text-black bg-gray-100 py-5 my-8">
          <h1 class="text-3xl font-extralight decoration-2">
            Register right now
          </h1>
          <p class="text-lg p-4">
            Are you ready to unlock the full potential of our platform? By
            creating an account, you gain access to a plethora of exciting
            features and personalized experiences that enhance your music
            exploration journey. Click on the button in the upper right corner
            to start the adventure.
          </p>
        </Card>
        <Card class="w-1/2 opacity-90 text-black bg-gray-100 ml-auto py-5 my-8">
          <h1 class="text-3xl font-extralight decoration-2">About us</h1>
          <p class="text-lg p-4">
            At our company, we are passionate about music and vinyl records. We
            specialize in providing a wide selection of new and used vinyl
            records from a variety of genres and time periods. Our inventory
            includes classic rock albums, jazz records, hip-hop vinyl, and much
            more.
          </p>
        </Card>
      </div>
    </div>
  </div>
</template>
