<template>
	<div class="newPost__photo">
		<img :src="src || 'user-circle-solid.svg'" crossorigin class="image" alt="Photo de profil"/>
	</div>
</template>


<script>
	export default {
		name: 'ProfileImage',
		props: ['src']
	}
</script>


<style lang="scss">
	.image {
		object-fit: cover;
		width: 3rem;
		height: 3rem;
		border-radius: 100%;
	}
</style>