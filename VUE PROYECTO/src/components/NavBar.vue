<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <ul class="navbar">
        <span class="menu">
            <li class="logo"><img src="" alt="pageLogo"></li>
            <div class="menu__search">
                <label for="menuBusqueda" class="menu__search__label">Búsqueda</label>
                <input id="menuBusqueda" type="text" class="menu__search__input" placeholder="¿Qué quieres ver?" v-model="eventQuery">
                <router-link class="menu__search__button" :to="{name: 'results', params: {query: eventQuery, type: '', country: '', date: `${new Date().getFullYear()}-01-01`,}}">Buscar</router-link>
            </div>
        </span>
        <input type="checkbox" id="check">
        <span class="menu">
            <li><RouterLink to = "/">Inicio</RouterLink></li>
            <li><RouterLink to = "/search">Búsqueda avanzada</RouterLink></li>
            <li><RouterLink to = "/contact">Soporte</RouterLink></li>
            <li v-if="!token" :key="token"><RouterLink to = "/login">Iniciar sesion</RouterLink></li>
            <li v-if="!token" :key="token"><RouterLink to = "/register">Registrarse</RouterLink></li>
            <li v-if="token" :key="token"><RouterLink to = "/profile">Perfil</RouterLink></li>
            <li v-if="token" :key="token"><RouterLink to = "/watched">Guardados</RouterLink></li>
            <li v-if="adminView === 'admin'" :key="adminView"><RouterLink to = "/admin">Administracion</RouterLink></li>
            <li v-if="token" :key="token"><a @click="logout">Logout</a></li>
            <label for="check" class="menu--close"><i class="fas fa-times"></i></label>
        </span>
        <label for="check" class="menu--open"><i class="fas fa-bars"></i></label>
    </ul>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                token: cookies.get("token"),
                adminView: null,
                eventQuery: null
            }

        },
        mounted() {
            this.checkRole()
            cookies.addChangeListener(() => {
                this.token = cookies.get("token")
                this.checkRole()
            })
        },
        methods: {
            async logout() {
                const data = await fetch('http://localhost:8000/api/logout', {
                method: "post",
                headers: {
                    'Authorization': 'Bearer ' + cookies.get("token")
                }
                })
                if (data.ok) {
                    cookies.remove("token", {path:"/"})
                    this.$router.push("/")
                }
            },
            async checkRole() {
                if (this.token) {
                    const data = await fetch('http://localhost:8000/api/user/role', {
                        headers: {
                            'Authorization': 'Bearer ' + cookies.get("token")
                        },
                    })
                    const response = await data.json()
                    this.adminView = response.role
                    return
                }
                this.adminView = null
            }
        }
    }
    
</script>