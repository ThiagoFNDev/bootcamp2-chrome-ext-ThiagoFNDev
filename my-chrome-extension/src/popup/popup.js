document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const convertBtn = document.getElementById('convertBtn');
    const feedback = document.getElementById('feedback');

    convertBtn.addEventListener('click', () => {
        const text = inputText.value;
        if (text) {
            const uppercaseText = text.toUpperCase();
            
            
            inputText.value = uppercaseText;

            
            navigator.clipboard.writeText(uppercaseText).then(() => {
                
                feedback.classList.remove('feedback-hidden');
                feedback.classList.add('feedback-visible');
                
                
                setTimeout(() => {
                    feedback.classList.remove('feedback-visible');
                    feedback.classList.add('feedback-hidden');
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar texto: ', err);
                feedback.textContent = 'Erro ao copiar!';
                feedback.style.color = 'red';
            });
        }
    });
});