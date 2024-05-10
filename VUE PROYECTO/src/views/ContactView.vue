<template>
    <section class="form__container">
        <h1>Enviar ticket a soporte</h1>
        <form @submit.prevent="sendTicket">
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formEmail" class="form__label">Email de contacto</label>
                </div>
                <div class="form__column__big">
                    <input type="text" v-model="formEmail" id="formEmail" ref="formEmail" name="email" class="form__input" @blur="validateField(this.$refs.formEmail)">
                </div>
            </fieldset>
            <fieldset class="form__row">
                <div class="form__column__small">
                    <label for="formText" class="form__label">Describa su problema</label>
                </div>
                <div class="form__column__big">
                    <textarea v-model="formText" id="formText" ref="formText" name="contenido" class="form__input" @blur="validateField(this.$refs.formText)"></textarea>
                </div>
            </fieldset>
            <fieldset class="form__row">
                <button @submit="sendTicket" class="form__button" ref="submitButton" disabled>Enviar</button>
            </fieldset>
        </form>
    </section>
</template>

<script>
    import { render, h } from 'vue'
    import FormError from "../components/FormError.vue"
    export default {
        data() {
            return {
                formEmail: "",
                formText: ""
            }
        },
        methods: {
            async sendTicket() {
                const data = await fetch('http://localhost:8000/api/tickets', {
                    method: "post",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contactEmail: this.formEmail,
                        text: this.formText,
                    })
                })
                const response = await data.json()
                this.$router.push("/")
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
                if (this.$refs.formEmail.value !== "" && this.$refs.formEmail.value.toLowerCase().match(emailRegex) && this.$refs.formText.value !== "") {
                    this.$refs.submitButton.removeAttribute("disabled")
                }
            }
        }
    }
</script>