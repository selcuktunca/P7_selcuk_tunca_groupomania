<template> 
    <div v-if="revele" class="modaleBloc">
        <div @click="displayModale" class="modaleBloc__overlay"></div>
        
        <div class="modaleBloc__card">
            <div class="modaleBloc__card__title">
                <h2>Voulez vous vtaiment supprimer votre compte ?</h2>
                <p>(Cette action est irréversible)</p>
                <div class="modaleBloc__card__title__close">
                    <i @click="displayModale" class="far fa-times-circle fa-2x modaleBloc__card__title__close"></i>
                </div>
            </div>

            <button @click="deleteAccount" class="modaleBloc__card__button">Oui, je supprime mon compte</button>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'


    export default {
        name: 'ModaleDeleteAccount',
        props: ['revele', 'displayModale'],
        created() {
            this.notyf = new Notyf({
                duration: 2000,
                position: {
                    x: 'center',
                    y: 'bottom'
                }
            });
        },
        methods: {
            // Pour de supprimer le compte
            deleteAccount(){
                const userId = localStorage.getItem('userId');

                axios.delete('http://localhost:3000/api/user/' + userId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    this.notyf.success('Votre compte est supprimé')
                    localStorage.clear();
                    this.$router.push('/');
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            }
        }
    }
</script>


<style scoped lang="scss">
    .modaleBloc {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &__overlay {
            background: rgba(0,0,0,0.5);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
        &__card {
            z-index: 2;
            position: fixed;
            background: #f1f1f1;
            color: #3f3d56;
            &__title {
                display: flex;
                flex-direction: column;
                text-align: center;
                padding: 3rem 6rem 1.5rem 6rem;
                & h2 {
                    margin-top: 0px;
                    @media (max-width: 500px) {
                        font-size: 20px;
                    }
                }
                &__close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    color: #3f3d56;
                    &:hover, &:focus {
                        color: #ff6363;
                    }
                }
            }
            &__button {
                border: 3px solid #3f3d56;
                border-radius: 25px;
                color: #3f3d56;
                font-size: 15px;
                font-weight: bold;
                padding: 0.9rem;
                margin: 1rem 0 2rem 0;
                outline-style: none;
                &:hover, &:focus {
                    border: 3px solid #ff6363;
                    color: #ff6363;
                }
            }
        }       
    }
</style>