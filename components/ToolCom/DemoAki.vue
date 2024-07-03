<template>{{ currentAge }}</template>

<script setup lang="ts">
const birthDate = new Date("2002-07-09");
const currentDate = new Date();

function calculateAge(birthDate: Date, currentDate: Date): number {
  const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
  const daysDiff = currentDate.getDate() - birthDate.getDate();

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    return yearsDiff - 1;
  } else {
    return yearsDiff;
  }
}

const currentAge = calculateAge(birthDate, currentDate);
</script>
