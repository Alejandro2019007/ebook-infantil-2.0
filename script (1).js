function handlePurchase() {
  fbq('track', 'InitiateCheckout');
}

// Evento adicional para a página de obrigado (exemplo, caso exista)
// if (window.location.pathname.includes('pagina-de-obrigado')) {
//   fbq('track', 'Purchase', {
//     value: 67.00,
//     currency: 'BRL'
//   });
// }



// Evento adicional para quando clicar no botão de compra (já tratado pelo handlePurchase)
// fbq('track', 'InitiateCheckout');

// Para página de obrigado (caso exista):
// Exemplo de como usar:
// if (window.location.pathname.includes('/pagina-de-obrigado')) {
//   fbq('track', 'Purchase', {
//     value: 67.00,
//     currency: 'BRL'
//   });
// }

