<template>
	<div>
		<Navbar/>
		<div>
			<h1 v-if="user">Bienvenue {{ user.username }} !</h1>

			<div class="profile">
				<h2>Vos informations</h2>

				<div class="profile__photo">
					<ProfileImage :src="user.imageProfile" class="profile__photo__image"/>

					<div class="profile__photo__modify">
						<button @click="uploadFile" type="button" class="profile__photo__modify__btnInvisible"><i class="far fa-edit"></i> Modifier ma photo de profil</button>
						
						<input type="file" ref="fileUpload" @change="onFileSelected"  accept="image/*" id="file-input" aria-label="Modifier ma photo de profil">
					</div>
				</div>
								
				<div class="profile__info">
					<p class="profile__info__title">Pseudo</p>
					<div class="profile__info__text">{{ user.username }}</div>
					
					<p class="profile__info__title">Email</p>
					<div class="profile__info__text">{{ user.email }}</div>
				</div>

				<button @click="modifyProfile" class="profile__smallButton">Enregister <i class="fas fa-check"></i></button>
			</div>

			<ModaleDeleteAccount v-bind:revele="revele" v-bind:displayModale='displayModale'/>
			<button class="profile__bigButton" v-on:click="displayModale">Supprimer mon compte <i class="far fa-trash-alt"></i></button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { Notyf } from 'notyf'
	import 'notyf/notyf.min.css'

	import Navbar from '@/components/Navbar.vue'
	import ModaleDeleteAccount from '@/components/ModaleDeleteAccount.vue'
	import ProfileImage from '../components/ProfileImage.vue'

	export default {
		name: 'Profile',
		components: {
			Navbar,
			ModaleDeleteAccount,
			ProfileImage
		},
		data(){
			return {
			revele: false,
			user: "",
			imageProfile: null,
			}
		},
		created() {
			this.displayProfile();  
			this.notyf = new Notyf({
			duration: 2000,
			position: {
				x: 'center',
				y: 'top'
			}
			}); 
		},
		methods: {
			// Pour afficher les infos du profil
			displayProfile() {
				const userId = localStorage.getItem('userId');

				axios.get('http://localhost:3000/api/user/' + userId, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				})
				.then(response => {
					this.user = response.data;
					localStorage.setItem('imageProfile', response.data.imageProfile);
				})
				.catch(error => {
					const msgerror = error.response.data
					this.notyf.error(msgerror.error)
				})
			},

			// Pour modifier la photo de profil
			uploadFile () {
				this.$refs.fileUpload.click()
			},
			onFileSelected(event) {
				this.imageProfile = event.target.files[0]
			},
			modifyProfile() {
				const userId = localStorage.getItem('userId');

				const formData = new FormData();
				formData.append("image", this.imageProfile);

				axios.put('http://localhost:3000/api/user/' + userId, formData, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token'),
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(() => {
					this.notyf.success('Votre profil a bien été modifié !')
					this.displayProfile();
				})
				.catch(error => {
					const msgerror = error.response.data
					this.notyf.error(msgerror.error)
				})
			},

			// Pour afficher la boîte modale pour suprimer le compte
			displayModale() {
				this.revele = !this.revele
			}
		}
	}
</script>

<style scoped lang="scss">
	h1, h2 {
	margin-top: 2rem;
	}
	.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 40%;
		max-width: 60%;
		margin: 3rem auto;
		background: rgb(190, 94, 94);
		border-radius: 25px;
		@media (max-width: 500px) {
			min-width: 80%;
		}
		&__photo {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 1rem;
			&__image {
			margin-right: 1rem;
			margin-bottom: 0.5rem;
			}
			&__modify>input {
			display: none; 
			}
			&__modify__btnInvisible {
			border: none;
			background-color: rgb(190, 94, 94);
			color: #3f3d56;
				&:hover, &:focus {
					color: white;
					cursor: pointer;
				}
			}
		}
		&__info {
			display: flex;
			flex-direction: column;
			text-align: left;
			margin: 1rem;
			&__title {
			font-weight: bold;
			margin: 1rem 0 0.4rem 0;
			}
			&__text {
			background: white;
			border-radius: 10px;
			padding: 0.5rem;
			width: 15rem;
			}
		}
		&__smallButton {
			border: 2px solid #3f3d56;
			border-radius: 25px;
			color: #3f3d56;
			font-size: 15px;
			font-weight: bold;
			padding: 0.4rem;
			margin: 1rem;
			outline-style: none;
			background: white;
			&:hover, &:focus {
			color: #ff6363;
			cursor: pointer;
			}
		}
		&__bigButton {
			border: 3px solid #3f3d56;
			border-radius: 25px;
			color: #3f3d56;
			font-size: 15px;
			font-weight: bold;
			padding: 0.9rem;
			margin: 1rem;
			outline-style: none;
			&:hover, &:focus {
			border: 3px solid #ff6363;
			color: #ff6363;
			cursor: pointer;
			}
		}
	}
</style>