console.log('[Conversor de Caixa Alta] Content script carregado!');


function addBanner() {
    if (document.getElementById('extension-banner-converter')) { return; }

    const banner = document.createElement('div');
    banner.id = 'extension-banner-converter';
    banner.textContent = '✅ A extensão "Conversor de Caixa Alta" está ativa nesta página.';
    banner.style.backgroundColor = '#28a745';
    banner.style.color = 'white';
    banner.style.padding = '10px';
    banner.style.textAlign = 'center';
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.zIndex = '9999';
    
    document.body.prepend(banner);

    setTimeout(() => {
        banner.style.transition = 'opacity 0.5s ease';
        banner.style.opacity = '0';
        setTimeout(() => banner.remove(), 500);
    }, 4000);
}

addBanner();