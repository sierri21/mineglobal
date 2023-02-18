<template>
  <div
    id="contact"
    class="about__contact contact"
  >
    <div class="contact__content">
      <a
        href="mailto:info@mineglobal.ee"
        class="contact__mail"
      >
        {{ $t('sections.about.mail') }}
      </a>
      <p class="contact__address">
        {{ $t('sections.about.address') }}
      </p>
      <p class="contact__phone">
        {{ $t('sections.about.phone') }}
      </p>
      <img
        src="/images/tallin-office.jpg"
        alt="Tallinn office"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact {
  padding-bottom: 179px;
  @media screen and (max-width: 576px) {
    max-width: 343px;
    padding-bottom: 25px;
    &__mail {
      font-weight: 500;
      font-size: 22px;
      line-height: 140%;
      width: fit-content;
      margin: 0 auto 17px 25px;
      border-bottom-width: 2px;
    }
  }
  &__content {
   font-family: 'IBM Plex Sans', serif;
   font-weight: 300;
   font-size: 20px;
   line-height: 160%;
   color: #25306A;
   display: flex;
   flex-direction: column;
    align-items: center;
    @media screen and (max-width: 576px) {
      align-items: flex-start;
    }
  }
  &__mail, &__mail:visited {
    display: inline-block;
    font-weight: 500;
    font-size: 50px;
    line-height: 65px;
    color: #131839;
    border-bottom: 4px solid #0C1D58;
    margin-bottom: 46px;
    text-align: center;
    cursor: pointer;
    transition: all .3s ease;
    text-decoration: none;
    @media screen and (max-width: 576px) {
      font-size: 22px;
      line-height: 140%;
      width: fit-content;
      margin: 0 auto 17px 25px;
      border-bottom-width: 2px;
    }
    &:hover {
       background: #131839;
       color: #FFFFFF;
       border-color: #FFFFFF;
    }
  }
  &__address, &__phone {
    margin-bottom: 16px;
    max-width: 432px;
    text-align: center;
    @media screen and (max-width: 576px) {
      margin-left: 25px;
      text-align: left;
      font-weight: 300;
      font-size: 18px;
      line-height: 160%;
    }
  }
  img {
    max-width: 432px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 16px;
    object-fit: cover;
    @media screen and (max-width: 576px) {
      width: 100vw;
      margin: 25px calc(calc(-1 * (100vw - 347px) / 2)) 0;
      border-radius: 0;
    }
  }
}
</style>
