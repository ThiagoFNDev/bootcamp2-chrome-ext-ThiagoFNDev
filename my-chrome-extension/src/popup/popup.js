document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const convertBtn = document.getElementById('convertBtn');
    const feedback = document.getElementById('feedback');
    const adviceBox = document.getElementById('advice-box');

    // ============================
    //      Carregar Conselho
    // ============================
    async function loadAdvice() {
        try {
            const res = await fetch("https://api.adviceslip.com/advice");
            const data = await res.json();
            adviceBox.textContent = `💡 Conselho: ${data.slip.advice}`;
        } catch (error) {
            adviceBox.textContent = "Não foi possível carregar o conselho.";
        }
    }

    // Executa ao abrir o popup
    loadAdvice();

    // ============================
    //   Converter texto e copiar
    // ============================
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
