<template>
    <section class="footer__container">
        <section class="footer__content">
            <article class="footer__content__aboutus">
                <h3 class="footer_headings">Sobre nosotros</h3>
                <img src="images/logo-1.png" alt="" />
                <p>
                    Somos una página dedicada a ofrecer una experiencia de usuario sencilla y rápida para buscar cualquier evento al que quieras asistir. Busca y conecta con otros usuarios con tus mismos intereses
                </p>
                <div class="social_icons">
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-pinterest"></i>
                    <i class="fa-brands fa-youtube"></i>
                </div>
            </article>
            <article class="footer__content__links">
                <h3 class="footer_headings">Enlaces útiles</h3>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to=/search>Búsqueda avanzada</router-link></li>
                    <li><router-link to="/contact">Soporte</router-link></li>
                    <li><router-link to="/login">Iniciar sesion</router-link></li>
                    <li><router-link to="/register">Registrarse</router-link></li>
                </ul>
            </article>
            <article class="footer__content__contactinfo">
                <h3 class="footer_headings">Contacto</h3>
                <ul>
                    <li>
                    <i class="fa fa-envelope"></i>
                    <span>eventwizard@eventwizard.es</span>
                    </li>
                    <li>
                    <i class="fa-solid fa-location-dot"></i>
                    <span>Madrid. España</span>
                    </li>

                    <li>
                    <i class="fa-solid fa-phone"></i>
                    <span>900 100 200</span>
                    </li>
                </ul>
            </article>
        </section>
    </section>
</template>

<script>

</script>