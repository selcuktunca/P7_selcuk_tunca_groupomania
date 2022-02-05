<template>
    <div class="home">
        <img class="home__title" src="../assets/iconLong450.png" alt="Logo de Groupomania">

        <div class="home__display">
            
           
            <form @submit.prevent="signup" class="home__display__form">
                <h1 class="home__display__form__title">S'inscrire</h1>

                <div class="home__display__form__input">
                    <label for="username" class="home__display__form__input__label">Pseudo</label>
                    <input type="text" v-model="username" id="username" name="username">
                </div>

                <div class="home__display__form__input">
                    <label for="mail" class="home__display__form__input__label">Email</label>
                    <input type="email" v-model="email" id="mail" name="mail">
                </div>

                <div class="home__display__form__input">
                    <label for="password" class="home__display__form__input__label">Mot de passe</label>
                    <input type="password" v-model="password" id="password" name="password">
                </div>

                <button class="home__display__form__button">Inscription</button>

                <p>Vous avez déjà un compte ? <router-link to="/" class="home__display__form__login">Se connecter</router-link></p>
            </form>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'

    export default {
        name: 'Signup',
        data() {
            return {
                username: '',
                email: '',
                password: '',
            }
        },
        created() {
            this.notyf = new Notyf({
                duration: 4000,
                position: {
                    x: 'center',
                    y: 'bottom'
                }
            });
        },
        methods: {
            // Pour s'inscrire et passer sur la page de connexion 
            signup() {
                axios.post('http://localhost:3000/api/user/signup', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                })
                .then(() => {
                    this.notyf.success('Votre ¨Profil est créé ! Maintenant, il vous reste plus qu\'a vous connecter')
                    this.$router.push('/');
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },
        }
    }
</script>


<style scoped lang="scss">
.home {
        &__title {
            @media (max-width: 930px) {
                max-width: 400px;
                width: 90%;
                border-radius: 15px;
            }
        }
        &__display {
            margin-top: 2rem;
            display: flex;
            justify-content: space-around;
            @media (max-width: 930px) {
                display: flex;
                flex-direction: column-reverse;
            }
            &__picture {
                float: left;
                padding-top: 5rem;
                margin-left: 3rem;
                @media (max-width: 1170px) {
                    max-width: 350px;
                }
                @media (max-width: 930px) {
                    max-width: 250px;
                    margin: auto;
                    padding-top: 2rem;
                } 
            }
           
            &__form {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 40%;
                border: 3px solid #3f3d56;
                border-radius: 25px;
                margin-top: 2rem;
                margin-left: -2rem;
                padding: 1rem;
                @media (max-width: 930px) {
                    min-width: 250px;
                    margin: auto;
                }
                &__title {
                    margin-bottom: 3rem;
                    font-size: 27px;
                }
                &__input {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 2rem;
                    width: 70%;
                    &__label {
                        text-align: start;
                        font-weight: bolder;
                    }
                }
                &__button {
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
                &__login {
                    font-weight: bold;
                    text-decoration: none;
                    color: #E60A0A;
                    // color: #ff6363;
                }
            }
        }
    }
</style>