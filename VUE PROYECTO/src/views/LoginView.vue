<template>
    <section class="form__container">
        <h1>Iniciar sesión</h1>
        <form @submit.prevent="login" class="form">
            <fieldset class="form__row" id="formEmailContainer">
                <div class="form__column__small">
                    <label for="formEmail" class="form__label">Email</label>
                </div>
                <div class="form__column__big">
                    <input type="text" v-model="formEmail" id="formEmail" name="email" ref="formEmail" class="form__input" @blur="validateField(this.$refs.formEmail)">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formPassword" class="form__label">Contraseña</label>
                </div>
                <div class="form__column__big">
                    <input type="password" v-model="formPassword" id="formPassword" name="contraseña" ref="formPassword" class="form__input" @blur="validateField(this.$refs.formPassword)">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <button @submit="login" class="form__button" ref="submitButton" disabled>Login</button>
            </fieldset>
        </form>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    import { render, h } from 'vue'
    import FormError from "../components/FormError.vue"
    const cookies = useCookies(["token"])

    export default {
        data() {
            return {
                formEmail: "",
                formPassword: "",
            }
        },
        methods: {
            async login() {
                    const data = await fetch('http://localhost:8000/api/login', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.formEmail,
                        password: this.formPassword,
                    })
                })
                const response = await data.json()
                if (response.statusCode === 200) {
                    cookies.set("token", response.token, {maxAge: 86400, sameSite: "strict", path:"/"})
                    this.$router.push("/profile")
                }
                else {
                    this.createLoginError()
                }
            },
            validateField(field) {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (field.value === "") {
                    this.createFormError(`Error, el campo ${field.name} debe tener un valor`, field.parentElement)
                    return
                }
                else if (field.name === "email" && !field.value.toLowerCase().match(emailRegex)) {
                    this.createFormError(`Error, el campo ${field.name} debe contener un email válido`, field.parentElement)
                    return
                }
                this.removeFormError()
                this.changeSubmitButton(emailRegex)
            },
            createLoginError() {
                const formError = h(FormError, {message: 'Error de login, credenciales incorrectas'})
                render(formError, this.$el)
            },
            createFormError(message, location) {
                this.$refs.submitButton.setAttribute("disabled", true)
                const formError = h(FormError, {message: message})
                render(formError, location)
            },
            removeFormError() {
                const formError = document.querySelectorAll("#formError")
                formError.forEach((error) => {
                    error.remove()
                })
            },
            changeSubmitButton(emailRegex) {
                if (this.$refs.formEmail.value !== "" && this.$refs.formEmail.value.toLowerCase().match(emailRegex) && this.$refs.formPassword.value !== "") {
                    this.$refs.submitButton.removeAttribute("disabled")
                }
            }
        }
    }
</script>