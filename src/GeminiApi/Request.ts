
const API_KEY = import.meta.env.VITE_API_KEY;
const url = `${import.meta.env.VITE_URL}${API_KEY}`;
console.log(url)
export const QuerryRecomendation = async (question:string) => {
    const prompt = {
        contents: [{
            parts: [
                { text: `
                    forneça recomendações claras, incluindo o modelo da CPU mais indicado (Intel, AMD, etc.) e explicações fáceis de entender leve 
                    em consideração que a pessoa que está falando com você é completamente leiga e alheia a tecnologia então sua recomendação e explicação
                    deve ser a mais clara objetiva e facil de entender não pode conter informações absurdamente tecnicas porém, não pode faltar nenhum tipo de informação necessaria
                    para que faça sentido a configuração você deve verificar cuidadosamente se as peças de CPU que você está indicando faça sentido em conjuntas não pode indicar uma placa
                    mãe um processador que não tenha um mesmo socket alem disso, você deve fornecer um passo a passo que a pessoa precisa fazer para montar a CPU dela além disso
                    fornça uma lista de sites onde ela pode comprar as peças restantes. Leve essa tarefa com extrema antenção a pergunta do usuário a seguir:
                    O que o usuário está procurando (${question})
                `}
            ]
        }]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prompt)
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
}