const S=window.SITE, $=id=>document.getElementById(id);
const wa=(t)=>`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(t)}`;
const ph=(src,alt)=>`<div class="ph"><img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()"></div>`;
$("wa-hero").href=wa("Hola Diego, quiero agendar una sesión.");$("wa-foot").href=wa("Hola Diego, quiero información.");
$("ig").href=S.redes.instagram;$("fb").href=S.redes.facebook;$("tt").href=S.redes.tiktok;
$("y").textContent=new Date().getFullYear();
$("portafolio-grid").innerHTML=S.portafolio.map((f,i)=>ph(f,"Fotografía de Diego Román "+(i+1))).join("");
$("catalogos-box").innerHTML=S.catalogos.map(c=>`<article class="cat" id="${c.id}"><h3>${c.titulo}</h3><p>${c.detalle}</p>
<div class="grid">${c.fotos.map((f,i)=>ph(f,c.titulo+" "+(i+1))).join("")}</div>
<div class="pk">${c.paquetes.map(p=>`<div><span>${p.nombre}</span><strong>${S.moneda} ${p.precio}</strong><small>${p.incluye}</small>
<a class="btn wa" href="${wa(`Hola Diego, quiero agendar: ${c.titulo} - ${p.nombre} (${S.moneda} ${p.precio}).`)}">Agendar por WhatsApp</a></div>`).join("")}</div></article>`).join("");
