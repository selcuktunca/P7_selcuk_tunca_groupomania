<template>  
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light nav">
            <img class="nav__logo" src="../assets/iconLong450.png" alt="Logo de Groupomania">

            <button class="navbar-toggler justify-content-center nav__menuButton" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars"></i>
            </button>
            
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav nav__links">
                    <li class="nav-item">
                        <router-link to="/post" class="nav__links__link">Accueil</router-link> 
                    </li>

                    <li class="nav-item">
                        <router-link to="/profile" class="nav__links__link">Mon profil</router-link>
                    </li>

                    <li class="nav-item">
                        <ModaleLogout v-bind:revele="revele" v-bind:displayModale='displayModale'/>
                        <button @click="displayModale" class="nav__links__logoutLink">Déconnexion <i class="fas fa-sign-out-alt"></i></button>    
                    </li>
                </ul>
            </div>
        </nav>

        <router-view/>
    </div>
</template>

<script>
    import ModaleLogout from '@/components/ModaleLogout.vue'

    export default {
        name: 'Navbar',
        data(){
            return {
                revele: false
            }
        },
        components: {
            ModaleLogout
        },
        methods: {
            // Pour afficher la boîte modale de déconnexion 
            displayModale() {
                this.revele = !this.revele
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem;
        box-shadow: 0px 5px 15px #3f3d56;
        &__logo {
            display: flex;
            justify-content: flex-start;
            max-width: 450px;
            width: 52%;
            border-radius: 15px;
        }
        &__menuButton:hover, &__menuButton:focus {
            color: #ff6363;
        }
        a, button {
            font-weight: bold;
            color: #3f3d56;
            border-radius: 15px;
            &:hover, &:focus  {
                color: #ff6363;
            }
        }
        &__links {
            padding: 2rem;
            align-items: flex-end;
            @media (max-width: 776px) {
                padding: 0;
            }
            &__link {   
                padding-right: 4rem;
                text-decoration: none;
                align-items: flex-end;
                @media (max-width: 990px) {
                    padding: 0;
                }
            }
            &__logoutLink {
                border: none;
                background-color: white;
                &:hover, &:focus  {
                    color: #ff6363;
                }
                @media (max-width: 990px) {
                    padding-right: 0;
                }
            }
        }
    }
</style>