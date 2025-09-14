
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertToUppercase",
    title: "Converter para MAIÚSCULAS",
    contexts: ["selection"] 
  });
  console.log("Menu de contexto criado.");
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertToUppercase" && info.selectionText) {
    const uppercaseText = info.selectionText.toUpperCase();
    
    
    
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: copyToClipboard,
      args: [uppercaseText]
    });
  }
});


function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => console.log("Texto copiado com sucesso!"))
    .catch(err => console.error("Falha ao copiar texto: ", err));
}