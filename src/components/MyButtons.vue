<template>
  <button class="btn"><slot></slot></button>
</template>

<script>
export default {
  name: "my-buttons",
};
</script>

<style scoped>
.btn {
  padding: 10px 14px;
  background: #f48f44;
  color: #fff;
  border: 1px solid;
  border-radius: 7px;
  cursor: pointer;
  font-size: 17px;
  font-family: "Comfortaa", cursive;
  border: 1px solid #f48f44;
}

.btn:hover {
  background: #af6832;
  border: 1px solid #af6832;
}
</style>