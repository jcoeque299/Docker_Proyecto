<template>
    <section class="form__container">
        <h1>Registrarse</h1>
        <form @submit.prevent="register" class="form">
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formName" class="form__label">Nickname</label>
                </div>
                <div class="form__column__big">
                    <input type="text" v-model="formName" id="formName" ref="formName" name="nickname" class="form__input" @blur="validateField(this.$refs.formName)">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formEmail" class="form__label">Email</label>
                </div>
                <div class="form__column__big">
                    <input type="text" v-model="formEmail" id="formEmail" ref="formEmail" name="email" class="form__input" @blur="validateField(this.$refs.formEmail)">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formPassword" class="form__label">Contraseña</label>
                </div>
                <div class="form__column__big">
                    <input type="password" v-model="formPassword" id="formPassword" ref="formPassword" name="contraseña" class="form__input" @blur="validateField(this.$refs.formPassword)">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formLocation" class="form__label">Ubicacion</label>
                </div>
                <div class="form__column__big">
                    <select v-model="formLocation" id="formLocation" class="form__input">
                        <option v-for="country in countryData" v-bind:value="country.code">{{ country.name }}</option>
                    </select>
                </div>
            </fieldset>
            <fieldset class="form__row">
                <button @submit="register" class="form__button" ref="submitButton" disabled>Registrarse</button>
            </fieldset>
        </form>
    </section>
</template>

<script>
    import {useCookies} from '@vueuse/integrations/useCookies'
    import { render, h } from 'vue'
    import FormError from "../components/FormError.vue"
    import countryData from "/src/data.json"
    const cookies = useCookies(["token"])
    export default {
        data() {
            return {
                formName: "",
                formEmail: "",
                formPassword: "",
                formLocation: countryData[0].code,
                countryData: countryData
            }
        },
        methods: {
            async register() {
                const data = await fetch('http://localhost:8000/api/register', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.formName,
                        email: this.formEmail,
                        password: this.formPassword,
                        location: this.formLocation
                    })
                })
                const response = await data.json()
                if (response.statusCode === 200) {
                    cookies.set("token", response.token, {maxAge: 86400, sameSite: "strict", path:"/"})
                    this.$router.push("/profile")
                }
                else {
                    this.createRegisterError()
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
                else if (field.type === "password" && field.value.length < 8) {
                    this.createFormError(`Error, el campo ${field.name} debe contener 8 caracteres como mínimo`, field.parentElement)
                    return
                }
                this.removeFormError()
                this.changeSubmitButton(emailRegex)
            },
            createRegisterError() {
                const formError = h(FormError, {message: 'Nickname o correo ya registrado'})
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
                if (this.$refs.formName.value !== "" && this.$refs.formEmail.value !== "" && this.$refs.formEmail.value.toLowerCase().match(emailRegex) && this.$refs.formPassword.value !== "") {
                    this.$refs.submitButton.removeAttribute("disabled")
                }
            }
        }
    }
</script>