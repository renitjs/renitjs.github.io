# Yol haritası

Renit'in nasıl bir gelişim göstereceği konusunda birkaç fikrimiz var. Yapılacakların garantisi olmamakla birlikte, üzerinde düşündüklerimiz bunlar.

<div class="road ready">
  <div class="message">
    <p><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><g id="row1_1_"><g id="_x36__2_"><path class="st2" d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm20.8-60.5H70.4V46.5c0-2.6-2.2-4.8-4.8-4.8-2.7 0-4.8 2.1-4.8 4.8v14.3H46.4c-2.7 0-4.8 2.1-4.8 4.8 0 2.6 2.1 4.8 4.8 4.8h14.4v14.3c0 2.6 2.1 4.8 4.8 4.8 2.6 0 4.8-2.1 4.8-4.8V70.4h14.4c2.6 0 4.8-2.1 4.8-4.8 0-2.6-2.1-4.8-4.8-4.8z"/></g></g></svg><span>Hazırlanıyor</span></p>
  </div>
  <div class="content">
    <h2>Öznitelik Değiştiricileri</h2>
    <p class="mb-1">Öznitelikleri ekleyip kaldırabilecek bir değiştirici mekanizmasına ihtiyacımız var.</p>

```html
<script>
  let check = true;
  function click() {
    check = !check;
  }
</script>

<div class:blue="{check}">BLUE!</div>
<button @click>Switch</button>

<style>
  .blue {
    color: blue;
  }
</style>
```

  </div>
</div>

<div class="road idea">
  <div class="message">
    <p><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><g id="row1_1_"><g id="_x33__2_"><path class="st2" d="M64 32.2c-4.4 0-8 3.3-8 7.3v24.8c0 4.1 3.6 7.3 8 7.3s8-3.3 8-7.3V39.5c0-4.1-3.6-7.3-8-7.3zM64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm0-40.1c-4.4 0-8 3.3-8 7.3s3.6 7.3 8 7.3 8-3.3 8-7.3-3.6-7.3-8-7.3z" id="alert_transparent"/></g></g></svg><span>Fikir aşamasında</span></p>
  </div>
  <div class="content">
    <h2>If Blokları</h2>
    <p class="mb-1">If, elseif ve else sorguları yapmamızı sağlayacak bloklar.</p>

```html
<script>
  let check = true;
</script>

<if check>
  <p>true</p>

  <else>
    <p>false</p>
  </else>

  <p>true continue</p>
</if>

<!-- <if :="check == true"> -->
<if :={check == true}>
  <p>true</p>
</if>
```

  </div>
</div>

<div class="road completed">
  <div class="message">
    <p><svg version="1.1" id="icons_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><style>.st0{display:none}.st1{display:inline}.st2{fill:#0a0a0a}</style><g id="row1_1_"><g id="_x35__2_"><path class="st2" d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm23.2-76.8c-.9-.9-2.3-.9-3.2 0L55.2 73.2 41.4 59.5c-.9-.9-2.3-.9-3.2 0l-4.8 4.8c-.9.9-.9 2.3 0 3.2l15.3 15.3 3.3 3.3.8.8.7.7c.9.9 2.3.9 3.2 0L92 52.5c.9-.9.9-2.3 0-3.2l-4.8-4.8z" id="error_transparent_copy"/></g></g></svg><span>Tamamlandı</span></p>
  </div>
  <div class="content">
    <h2>Derleyici</h2>
    <p>Derleyici için gereken tüm kütüphaneleri hazırladık, ancak henüz bir derleyicimiz yok. Şu anda tüm odağımız bu işe yönelik.</p>
  </div>
</div>
