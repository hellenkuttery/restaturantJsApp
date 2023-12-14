const pr = document.querySelector("#pr");
const sipButton = document.getElementById("siparisButton");
const productDiv = document.querySelectorAll(".product"); // Tüm .product sınıfına sahip div'leri seçer
const urunKoduGirisi = document.getElementById("urunKodu");
const masaKoduGirisi = document.getElementById("masaKodu");
const masaNo = document.querySelectorAll(".masa1");
const masaSiparis = document.getElementsByClassName("masaSip");
let MasaKodu = 0;
import data from "./data.js";

console.log(data);
let pTextContent = 0;

// Ürüne tıklanınca ürün textboxa ekleniyor

productDiv.forEach((div) => {
  div.addEventListener("click", function (e) {
    e.preventDefault();
    const pElement = div.querySelector("p"); // Tıklanan .product içindeki p öğesini seçer

    if (pElement) {
      pTextContent = pElement.textContent; // p öğesinin metin içeriğini alır

      console.log(pTextContent); // Örneğin, p öğesinin içeriğini konsola yazdırır
      urunKoduGirisi.value = pTextContent;
      // Değişken pTextContent'e istediğiniz şeyi yapabilirsiniz, örneğin başka bir yerde kullanabilirsiniz
    }
  });
});

// masaya tıklanınca masa numarası ekleniyor

masaNo.forEach((div) => {
  div.addEventListener("click", function (e) {
    e.preventDefault();
    const pMasa = div.querySelector("p");
    if (pMasa) {
      MasaKodu = pMasa.textContent;
      console.log(MasaKodu);
      masaKoduGirisi.value = MasaKodu;
    }
  });
});

// Sipariş butonuna basılınca masa görüntüsü üzerine ekleniyor

sipButton.addEventListener("click", function (e) {
  e.preventDefault();
  /* -------------------------------------------------------------------------- */
 
  if (masaKoduGirisi.value === "" || urunKoduGirisi.value === "") {
    const uyariUrunKodu = document.querySelector(".uyari-urunKodu");
    const uyariMasaKodu = document.querySelector(".uyari-masaKodu");
    const uyariSiparisOlustur = document.querySelector(".uyari-siparisOlustur");

    const hataMesaj =
      masaKoduGirisi.value === "" && urunKoduGirisi.value === ""
        ? (uyariSiparisOlustur.innerHTML = "Masa ve ürün kodu giriniz")
        : urunKoduGirisi.value === ""
        ? (uyariUrunKodu.innerHTML = "Ürün kodu giriniz")
        : (uyariMasaKodu.innerHTML = "Masa bilgisi giriniz");
        setTimeout(() => {
          uyariUrunKodu.innerHTML = "";
          uyariMasaKodu.innerHTML = "";
          uyariSiparisOlustur.innerHTML = "";
        }, 3000);
  }
  else{
      const masaNoList = document.querySelectorAll(".masaNo p");
  masaNoList.forEach((masa) => {
    const masaNumarasi = masa.textContent.trim(); // Masa numarasını alır ve boşlukları temizler

    const masaSip = masa.parentElement.nextElementSibling; // Masa numarasının ebeveyninin bir sonraki kardeşini (masaSip) seçer

    if (masaNumarasi === MasaKodu) {
      // masaSip.textContent = pTextContent;
      // Eğer masa numarası istenilen numaraysa, masaSip içine sipariş numarasını yazar

      data.forEach((x) => {
        if (x.id === pTextContent) {
          const contentSiparis = `
       

          <div class="SirarisEdilmisUrun">
          <img src="${x.icon}" width="40px" alt="">
          <p>${x.title}</p>
          <p>${x.price}TL</p>
          <a href="" id="del"><i class="fa-solid fa-trash"></i></a> 
          </div>     
      
        `;
          masaSip.innerHTML += contentSiparis;
        }
      });
      // Butonun tekrar tekrar tıklanmasını engellemek için butonu devre dışı bırak
      // Örnek olarak 2 saniye (2000 milisaniye) sonra butonu tekrar etkinleştir

      masaKoduGirisi.value = "";
      urunKoduGirisi.value = "";
    }
    masaSip.addEventListener("click", function (e) {
      console.log("merhaba");
      if (e.target.classList.contains("fa-trash")) {
        const itemToRemove = e.target.closest(".SirarisEdilmisUrun");
        if (itemToRemove) {
          itemToRemove.remove();
        }
      }
    });
  });
  }


  /* -------------------------------------------------------------------------- */


});

// hesabıkapat butonu ile hesap temizleme

// Tüm "Hesabı Kapat" bağlantılarını alır
const hesabiKapatLinks = document.querySelectorAll(".hesapKapat a");

hesabiKapatLinks.forEach((link) => {
  // Her bağlantıya tıklanma olayı ekler
  link.addEventListener("click", function (event) {
    event.preventDefault();

    // Tıklanan bağlantının üstünde bulunan ".masa1" elemanını bulur
    const parentMasa = link.closest(".masa1");

    // Eğer ".masa1" elemanı bulunursa ve içinde ".masaSip" elemanı varsa, içeriği temizler
    if (parentMasa) {
      const masaSipElement = parentMasa.querySelector(".masaSip");
      if (masaSipElement) {
        masaSipElement.innerHTML = ""; // İçeriği temizler
      }
    }
  });
});

// // Örnek bir işlem, UrunKodu ve MasaKodu girildiğinde siparişin otomatik olarak eklenmesi
// urunKoduGirisi.addEventListener("input", function (e) {
//   // UrunKodu girişi değiştiğinde tetiklenecek olay
//   const enteredUrunKodu = e.target.value; // Girilen ürün kodunu al

//   // Burada eklemek istediğiniz koşulları kontrol edebilirsiniz
//   // Örneğin, girilen ürün koduna göre ilgili siparişin masaSip içine eklenmesi
//   if (enteredUrunKodu && MasaKodu) {
//     // Ürün koduna göre siparişin masaya eklenmesi
//     // Aynı mantığı kullanarak ilgili ürünü pro içerisinden bulup ekleyebilirsiniz
//     pro.forEach((x) => {
//       if (x.id === enteredUrunKodu) {
//         const contentSiparis = `
//           <div class="SirarisEdilmisUrun">
//             <img src="${x.icon}" width="40px" alt="">
//             <p>${x.title}</p>
//             <p>${x.price}TL</p>
//             <a href="" id="del"><i class="fa-solid fa-trash"></i></a>
//           </div>`;
//         const masaSip = document.querySelector(
//           `.masa1:has(p:contains("${MasaKodu}")) .masaSip`
//         ); // İlgili masanın sipariş listesini bul
//         if (masaSip) {
//           masaSip.innerHTML += contentSiparis; // Siparişi ilgili masaya ekle
//           // Burada gerekirse UrunKodu veya MasaKodu gibi alanları temizleyebilirsiniz:
//           // urunKoduGirisi.value = "";
//           // masaKoduGirisi.value = "";
//         }
//       }
//     });
//   }
// });

// masaKoduGirisi.addEventListener("input", function (e) {
//   // MasaKodu girişi değiştiğinde tetiklenecek olay
//   MasaKodu = e.target.value; // Masa kodunu güncelle
// });

urunKoduGirisi.addEventListener("input", function (e) {
  const enteredUrunKodu = e.target.value;

  if (enteredUrunKodu && MasaKodu) {
    pro.forEach((x) => {
      if (x.id === enteredUrunKodu) {
        const contentSiparis = `
          <div class="SirarisEdilmisUrun">
            <img src="${x.icon}" width="40px" alt="">
            <p>${x.title}</p>
            <p>${x.price}TL</p>
            <a href="" id="del"><i class="fa-solid fa-trash"></i></a> 
          </div>`;
        const masaSip = document.querySelector(
          `.masa1:has(p:contains("${MasaKodu}")) .masaSip`
        );
        if (masaSip) {
          masaSip.innerHTML += contentSiparis;
        }
      }
    });
  }
});

masaKoduGirisi.addEventListener("input", function (e) {
  MasaKodu = e.target.value;

  if (urunKoduGirisi.value && MasaKodu) {
    pro.forEach((x) => {
      if (x.id === urunKoduGirisi.value) {
        const contentSiparis = `
          <div class="SirarisEdilmisUrun">
            <img src="${x.icon}" width="40px" alt="">
            <p>${x.title}</p>
            <p>${x.price}TL</p>
            <a href="" id="del"><i class="fa-solid fa-trash"></i></a> 
          </div>`;
        const masaSip = document.querySelector(
          `.masa1:has(p:contains("${MasaKodu}")) .masaSip`
        );
        if (masaSip) {
          masaSip.innerHTML += contentSiparis;
        }
      }
    });
  }
});
