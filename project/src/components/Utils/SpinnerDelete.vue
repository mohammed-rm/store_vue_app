<template>
  <div id="deletionSpinner">
    X
  </div>
</template>

<script>
export default {};
</script>

<style>
#deletionSpinner {
  font-weight: 1000;
  color: #c14242;
  border-radius: 50%;
  -webkit-transition: -webkit-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out;
}
#deletionSpinner:hover {
  color: #d80c0c;
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
