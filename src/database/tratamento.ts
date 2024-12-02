import {QuerryRecomendation} from "../GeminiApi/Request.ts"

export default async function tratamento(choices:string[]) {
    const consumo:string = choices[0];
    const desempenho:string = choices[1];
    const custo:string = choices[2];
    const aplicação:string = choices[3];

    const recomendacao = await QuerryRecomendation(
        `
            CPU com as seguintes configurações:
            Consumo: ${consumo}
            Desempenho: ${desempenho}
            Custo: ${custo}
            Aplicação: ${aplicação}
        `
    );

    const resposta_recomendacao = recomendacao.candidates[0].content.parts[0].text;

    return resposta_recomendacao;
}